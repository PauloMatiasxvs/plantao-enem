// ---- aba provas reais ----
// gabaritos que eu tirei dos pdfs do inep (caderno 1 azul, 1o dia).
// 1-5 lingua estrangeira, 6-45 linguagens, 46-90 humanas
// TODO: baixar os pdf do 2o dia (natureza e matematica) e colocar aqui tbm,
// que é o que mais importa pra vet
const PROVAS = [
 {id:'2025d1', ano:2025, nome:'ENEM 2025 · 1º dia', cad:'Caderno 1 — Azul',
  tema:'Perspectivas acerca do envelhecimento na sociedade brasileira', novo:1,
  ing:'DDDEA', esp:'BADDC',
  lc:'ECDCEBCECAECAEBCBCBEBABABDEBCEDABCABADDC',
  ch:'EDECADCEEDCADBDEBBACDDECBADABBCABACEEDDBCBCEA'},
 {id:'2024d1', ano:2024, nome:'ENEM 2024 · 1º dia', cad:'Caderno 1 — Azul',
  tema:'Desafios para a valorização da herança africana no Brasil',
  ing:'CAAAE', esp:'CDDDA',
  lc:'ECBECEDDCBDEDDCECBDCBCEADBBDBDDCBEDADEEB',
  ch:'CECEBEBCDBADDEBBABCDCAECEDADBAEABEADCEDADACBC'},
 {id:'2023d1', ano:2023, nome:'ENEM 2023 · 1º dia', cad:'Caderno 1 — Azul',
  tema:'Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil',
  ing:'BBDAB', esp:'AAEBA',
  lc:'DACEEDCCDBADBDEDCCEBCACEACAACAACACBBEAAE',
  ch:'CDAEECABAACEAADECBDAABCDCABADCDEABAABCDDEBADB'},
 {id:'2022d1', ano:2022, nome:'ENEM 2022 · 1º dia', cad:'Caderno 1 — Azul',
  tema:'Desafios para a valorização de comunidades e povos tradicionais no Brasil',
  ing:'DCBDE', esp:'EDCAA',
  lc:'EAAACABBDBEBACCBEEECCBBDCAAADCCABEDBDECE',
  ch:'DEABEEDAEBAAECBECBABCDDAAADBCEDAEACDBBCDCBECA'},
 {id:'2021d1', ano:2021, nome:'ENEM 2021 · 1º dia', cad:'Caderno 1 — Azul',
  tema:'Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil',
  ing:'CAABB', esp:'CAEAA',
  lc:'BDCDEADCEDBEDDDABBBBDEBCEADABDBACACDCDDC',
  ch:'BADCBADBCEDDEBBADBCABEECCAEABEBAAECBBABAAEEBB'},
 {id:'2020d1', ano:2020, nome:'ENEM 2020 · 1º dia', cad:'Caderno 1 — Azul',
  tema:'O estigma associado às doenças mentais na sociedade brasileira',
  ing:'AAEDC', esp:'ACEEE',
  lc:'CEAACBAEBBEDACDBAADADDEBBEBAAADEACAAADBB',
  ch:'DABCBDDDAEDBECECBBEDEBDEECBCCCBACDCCADEBDECDD'}
];
const LETRAS = ['A','B','C','D','E'];
let provaAtiva = null, provaLang = 'ing', provaResp = {}, provaFim = false;

function gabaritoDe(p, n){
  if(n <= 5) return (provaLang==='esp' ? p.esp : p.ing)[n-1];
  if(n <= 45) return p.lc[n-6];
  return p.ch[n-46];
}
function blocoDe(n){ return n<=5 ? 'le' : (n<=45 ? 'lc' : 'ch'); }
const BLOCOS_PROVA = {le:'Língua estrangeira', lc:'Linguagens e Códigos', ch:'Ciências Humanas'};

function viewProvas(){
  const el = $('v-provas');
  if(provaAtiva) return renderProva();
  el.innerHTML = `
  <div class="sect-h"><h2>Provas reais do INEP</h2><span class="eyebrow">gabarito oficial · 1º dia</span></div>
  <p class="small muted" style="max-width:65ch;margin-bottom:18px">Aqui está o material mais importante do estudo: a prova de verdade. Baixe o caderno de questões, resolva no papel com 5h30 de cronômetro e depois passe as respostas para o cartão abaixo — a correção usa o gabarito oficial do INEP, mostra o desempenho por bloco e lista exatamente quais questões revisar.</p>
  <div class="grid-2">
    ${PROVAS.map(p=>{
      const r = S.sim['prova-'+p.id];
      return `<button class="tile pick" data-prova="${p.id}">
        <div class="row" style="justify-content:space-between">
          <b style="font-family:var(--f-display);font-size:16.5px">${p.nome}</b>
          ${r?`<span class="chip ${r.acertos/r.total>=0.6?'o':'c'}">${r.acertos}/${r.total}</span>`:'<span class="chip n">não corrigida</span>'}
        </div>
        <p class="tiny muted" style="margin-top:5px">${p.cad} · 90 questões · Linguagens, Humanas e Redação</p>
        <p class="small" style="margin-top:9px"><b>Tema da redação:</b> ${p.tema}</p>
      </button>`;
    }).join('')}
  </div>
  <div class="card pad" style="margin-top:20px">
    <div class="eyebrow">Onde baixar os cadernos de questões</div>
    <p class="small" style="margin-top:8px">Os PDFs das provas de todos os anos ficam na página oficial do INEP: <a href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos" target="_blank" rel="noopener">provas e gabaritos</a>. Baixe o <b>Caderno 1 (Azul)</b> para as respostas baterem com o gabarito daqui.</p>
    <p class="note" style="margin-top:12px">São ${PROVAS.length} provas cadastradas, todas do <b>1º dia</b> — Linguagens, Humanas e Redação. O 2º dia (Ciências da Natureza e Matemática), que é o que mais pesa para Medicina Veterinária, ainda falta: mande os PDFs <b>PV</b> e <b>GB</b> do D2 desses mesmos anos e eu acrescento do mesmo jeito.</p>
  </div>`;
  el.querySelectorAll('[data-prova]').forEach(b=>b.addEventListener('click',()=>{
    provaAtiva = PROVAS.find(p=>p.id===b.dataset.prova);
    provaResp = (S.prova && S.prova[provaAtiva.id] && S.prova[provaAtiva.id].resp) ? Object.assign({}, S.prova[provaAtiva.id].resp) : {};
    provaFim = false;
    renderProva(); window.scrollTo(0,0);
  }));
}

function renderProva(){
  const el = $('v-provas'), p = provaAtiva;
  const respondidas = Object.keys(provaResp).length;
  const linhas = [];
  for(let n=1;n<=90;n++){
    if(n===1) linhas.push('<div class="gsep eyebrow">Questões 1–5 · língua estrangeira</div>');
    if(n===6) linhas.push('<div class="gsep eyebrow">Questões 6–45 · Linguagens, Códigos e suas Tecnologias</div>');
    if(n===46) linhas.push('<div class="gsep eyebrow">Questões 46–90 · Ciências Humanas e suas Tecnologias</div>');
    const sel = provaResp[n], sol = gabaritoDe(p,n);
    let cls = '';
    if(provaFim && sel) cls = (sel===sol) ? 'ok' : 'err';
    linhas.push(`<div class="gr ${cls}"><span class="gn">${n}</span>${LETRAS.map(L=>{
      const marc = sel===L;
      let bc = '';
      if(provaFim){ if(L===sol) bc='sol'; else if(marc) bc='bad'; }
      return `<button class="gb ${bc}" aria-pressed="${marc}" data-n="${n}" data-l="${L}" ${provaFim?'disabled':''}>${L}</button>`;
    }).join('')}</div>`);
  }

  let res = '';
  if(provaFim){
    const st = {le:{c:0,t:0}, lc:{c:0,t:0}, ch:{c:0,t:0}};
    const erradas = [];
    for(let n=1;n<=90;n++){
      const b = blocoDe(n); st[b].t++;
      const sel = provaResp[n], sol = gabaritoDe(p,n);
      if(sel===sol) st[b].c++; else erradas.push({n, sel, sol});
    }
    const ac = st.le.c + st.lc.c + st.ch.c;
    res = `<div class="card pad" style="margin-bottom:20px">
      <div class="grid-3">
        <div><div class="eyebrow">Acertos</div><span class="v" style="color:${ac>=54?'var(--ok)':'var(--iodo)'}">${ac}/90</span></div>
        <div><div class="eyebrow">Aproveitamento</div><span class="v">${Math.round(ac/90*100)}%</span></div>
        <div><div class="eyebrow">Em branco</div><span class="v">${90-Object.keys(provaResp).length}</span></div>
      </div>
      <div style="margin-top:18px;display:flex;flex-direction:column;gap:9px">
        ${Object.keys(st).map(b=>`<div class="row" style="gap:12px;flex-wrap:nowrap">
          <span style="width:150px;font-size:13.5px;font-weight:600;flex:none">${BLOCOS_PROVA[b]}</span>
          <span class="bar" style="flex:1"><i style="width:${st[b].c/st[b].t*100}%"></i></span>
          <span class="mono tiny" style="flex:none;width:44px;text-align:right">${st[b].c}/${st[b].t}</span>
        </div>`).join('')}
      </div>
      <p class="note" style="margin-top:16px">A nota do ENEM não é o número de acertos: o TRI pesa a coerência das respostas, e acertar as fáceis vale mais do que acertar as difíceis chutando. Como referência de estudo, ${ac} acertos de 90 no 1º dia costuma corresponder a uma nota entre ${Math.round(400+ac*4.2)} e ${Math.round(430+ac*4.6)} pontos por área — trate como estimativa grosseira, não como nota real.</p>
      ${erradas.length?`<div style="margin-top:18px">
        <div class="eyebrow">Questões para revisar (${erradas.length})</div>
        <div class="row" style="margin-top:9px;gap:6px">
          ${erradas.map(e=>`<span class="chip ${e.sel?'c':'n'}" title="${e.sel?'Você marcou '+e.sel:'Em branco'} · gabarito ${e.sol}">${e.n} → ${e.sol}</span>`).join('')}
        </div>
        <p class="tiny muted" style="margin-top:10px">Abra o caderno de questões nessas numerações e refaça cada uma com calma, agora sabendo a resposta certa. Passe o mouse sobre a etiqueta para ver o que você tinha marcado.</p>
      </div>`:''}
    </div>`;
  }

  el.innerHTML = `
  <div class="sect-h">
    <h2>${p.nome}</h2>
    <span class="eyebrow">${p.cad}</span>
    <span style="margin-left:auto" class="row">
      <span class="tiny mono muted">${respondidas}/90</span>
      <button class="btn ghost" id="pvSair">Voltar</button>
      ${provaFim?'<button class="btn ghost" id="pvRefazer">Refazer</button>':`<button class="btn" id="pvCorrigir" ${respondidas===0?'disabled':''}>Corrigir</button>`}
    </span>
  </div>
  ${res}
  <div class="card pad">
    <div class="row" style="justify-content:space-between;margin-bottom:6px">
      <div>
        <div class="eyebrow">Tema da redação deste ano</div>
        <p class="small" style="margin-top:3px;max-width:60ch">${p.tema}</p>
      </div>
      <div class="row" style="gap:6px">
        <span class="tiny muted">Língua estrangeira:</span>
        <button class="btn ${provaLang==='ing'?'':'ghost'}" style="padding:5px 11px;font-size:13px" data-lang="ing">Inglês</button>
        <button class="btn ${provaLang==='esp'?'':'ghost'}" style="padding:5px 11px;font-size:13px" data-lang="esp">Espanhol</button>
      </div>
    </div>
    <div class="gab">${linhas.join('')}</div>
  </div>`;

  el.querySelectorAll('.gb').forEach(b=>b.addEventListener('click',()=>{
    const n = Number(b.dataset.n), L = b.dataset.l;
    const marcou = provaResp[n] !== L;
    if(marcou) provaResp[n] = L; else delete provaResp[n];
    S.prova = S.prova || {};
    S.prova[p.id] = Object.assign({}, S.prova[p.id], {resp:provaResp});
    Api.respostaProva(p.id, n, marcou ? L : null);
    const row = b.parentElement;
    row.querySelectorAll('.gb').forEach(x=>x.setAttribute('aria-pressed', String(provaResp[n]===x.dataset.l)));
    const cnt = el.querySelector('.sect-h .mono');
    if(cnt) cnt.textContent = Object.keys(provaResp).length+'/90';
    const cb = $('pvCorrigir'); if(cb) cb.disabled = Object.keys(provaResp).length===0;
  }));
  el.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{ provaLang=b.dataset.lang; renderProva(); }));
  $('pvSair').addEventListener('click', ()=>{ provaAtiva=null; provaFim=false; viewProvas(); window.scrollTo(0,0); });
  const c = $('pvCorrigir');
  if(c) c.addEventListener('click', ()=>{
    provaFim = true;
    let ac = 0; for(let n=1;n<=90;n++) if(provaResp[n]===gabaritoDe(p,n)) ac++;
    const prev = S.sim['prova-'+p.id];
    if(!prev || ac > prev.acertos) S.sim['prova-'+p.id] = {acertos:ac, total:90, data:ymd(hoje())};
    Api.resultado('prova', p.id, ac, 90);
    renderProva(); window.scrollTo(0,0);
  });
  const rf = $('pvRefazer');
  if(rf) rf.addEventListener('click', ()=>{
    provaResp = {}; provaFim = false;
    S.prova[p.id] = {resp:{}};
    Api.limparProva(p.id);
    renderProva(); window.scrollTo(0,0);
  });
}
