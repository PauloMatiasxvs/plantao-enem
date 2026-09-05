// conexao com o supabase + estado da aplicacao.
// a chave publishable pode ficar no front, quem protege os dados é o RLS
// (cada usuario so le e escreve as linhas com o proprio user_id).
const SUPABASE_URL = 'https://fabfyugjyqvyxfkbrptb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_IW8UHED8PhBSme6Lyfp-tw_nF42r7Pq';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const CHECK = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.2 3.2L13 4.8"/></svg>';

// mesmo formato que o app ja usava, so que agora vem do banco
const DEF = {cfg:{d1:'2026-11-08', d2:'2026-11-15', ritmo:3, folga:-1}, done:{}, sim:{}, fc:{}, red:{tema:'', texto:''}, prova:{}, meta:{}};
let S = JSON.parse(JSON.stringify(DEF));
let usuario = null;

// avisa no cabecalho o que esta acontecendo com o salvamento
function marcaSync(txt, erro){
  const el = document.getElementById('syncTag');
  if(!el) return;
  el.textContent = txt;
  el.style.color = erro ? 'var(--crit)' : '';
}
let pendentes = 0;
async function envia(promise){
  pendentes++;
  marcaSync('salvando…');
  try{
    const { error } = await promise;
    if(error) throw error;
    pendentes--;
    if(pendentes === 0) marcaSync('salvo na nuvem');
  }catch(e){
    pendentes--;
    console.error(e);
    marcaSync('erro ao salvar', true);
  }
}

// a calculadora de nota e o tema são só rascunho, deixo no proprio navegador
const LOCAL = 'plantao-local';
function lerLocal(){
  try{ return JSON.parse(localStorage.getItem(LOCAL) || '{}'); }catch(e){ return {}; }
}
function gravaLocal(){
  try{ localStorage.setItem(LOCAL, JSON.stringify({meta:S.meta})); }catch(e){}
}

const Api = {

  async sessao(){
    const { data } = await sb.auth.getSession();
    usuario = data.session ? data.session.user : null;
    return usuario;
  },

  async entrar(email, senha){
    const { data, error } = await sb.auth.signInWithPassword({ email, password: senha });
    if(error) throw error;
    usuario = data.user;
    return data;
  },

  async cadastrar(email, senha, nome){
    const { data, error } = await sb.auth.signUp({
      email, password: senha,
      options: { data: { nome } }
    });
    if(error) throw error;
    usuario = data.user;
    return data; // se data.session for null, o projeto exige confirmacao por email
  },

  async sair(){
    await sb.auth.signOut();
    usuario = null;
  },

  // puxa tudo de uma vez no login e monta o S
  async carregar(){
    const uid = usuario.id;
    const [cfg, blocos, res, resp, fc, red] = await Promise.all([
      sb.from('config').select('*').eq('user_id', uid).maybeSingle(),
      sb.from('blocos_feitos').select('dia,indice').eq('user_id', uid),
      sb.from('resultados').select('tipo,referencia,acertos,total,criado_em').eq('user_id', uid).order('criado_em', { ascending:false }),
      sb.from('respostas_prova').select('prova,questao,letra').eq('user_id', uid),
      sb.from('flashcards_estado').select('card,estado').eq('user_id', uid),
      sb.from('redacoes').select('tema,texto').eq('user_id', uid).order('atualizado_em', { ascending:false }).limit(1)
    ]);

    S = JSON.parse(JSON.stringify(DEF));

    if(cfg.data){
      S.cfg = { d1: cfg.data.d1, d2: cfg.data.d2, ritmo: cfg.data.ritmo, folga: cfg.data.folga };
    }
    (blocos.data || []).forEach(b => { S.done[b.dia + '|' + b.indice] = 1; });

    // guardo so o melhor resultado de cada simulado/prova, que é o que a tela mostra
    (res.data || []).forEach(r => {
      const chave = r.tipo === 'prova' ? 'prova-' + r.referencia : r.referencia;
      const atual = S.sim[chave];
      if(!atual || r.acertos > atual.acertos){
        S.sim[chave] = { acertos: r.acertos, total: r.total, data: (r.criado_em || '').slice(0,10) };
      }
    });

    (resp.data || []).forEach(r => {
      S.prova[r.prova] = S.prova[r.prova] || { resp:{} };
      S.prova[r.prova].resp[r.questao] = r.letra;
    });

    (fc.data || []).forEach(c => { S.fc[c.card] = c.estado; });

    if(red.data && red.data[0]) S.red = { tema: red.data[0].tema, texto: red.data[0].texto };

    S.meta = lerLocal().meta || {};
    marcaSync('salvo na nuvem');
    return S;
  },

  // ---- escritas ----

  bloco(dia, indice, feito){
    const uid = usuario.id;
    if(feito){
      envia(sb.from('blocos_feitos').upsert({ user_id: uid, dia, indice }, { onConflict:'user_id,dia,indice' }));
    }else{
      envia(sb.from('blocos_feitos').delete().eq('user_id', uid).eq('dia', dia).eq('indice', indice));
    }
  },

  config(cfg){
    envia(sb.from('config').upsert({
      user_id: usuario.id, d1: cfg.d1, d2: cfg.d2, ritmo: cfg.ritmo, folga: cfg.folga,
      atualizado_em: new Date().toISOString()
    }, { onConflict:'user_id' }));
  },

  resultado(tipo, referencia, acertos, total){
    envia(sb.from('resultados').insert({ user_id: usuario.id, tipo, referencia, acertos, total }));
  },

  respostaProva(prova, questao, letra){
    const uid = usuario.id;
    if(letra){
      envia(sb.from('respostas_prova').upsert({ user_id: uid, prova, questao, letra }, { onConflict:'user_id,prova,questao' }));
    }else{
      envia(sb.from('respostas_prova').delete().eq('user_id', uid).eq('prova', prova).eq('questao', questao));
    }
  },

  limparProva(prova){
    envia(sb.from('respostas_prova').delete().eq('user_id', usuario.id).eq('prova', prova));
  },

  flashcard(card, estado){
    envia(sb.from('flashcards_estado').upsert({
      user_id: usuario.id, card, estado, atualizado_em: new Date().toISOString()
    }, { onConflict:'user_id,card' }));
  },

  // o editor dispara a cada tecla, entao seguro 1,5s antes de mandar
  _redT: null,
  redacao(tema, texto, linhas){
    clearTimeout(Api._redT);
    marcaSync('digitando…');
    Api._redT = setTimeout(()=>{
      envia(sb.from('redacoes').upsert({
        user_id: usuario.id, tema, texto, linhas,
        atualizado_em: new Date().toISOString()
      }, { onConflict:'user_id,tema' }));
    }, 1500);
  },

  local: gravaLocal
};
