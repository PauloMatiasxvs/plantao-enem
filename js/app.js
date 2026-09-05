
// helpers
const $ = id => document.getElementById(id);
function esc(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function areaChip(a){ return a ? '<span class="row" style="gap:6px"><span class="dot" style="background:'+AREAS[a].cor+'"></span><span class="tiny muted">'+AREAS[a].nome+'</span></span>' : ''; }
function tipoChip(t){
  const m = {teoria:['Teoria',''], exercicios:['Exercícios',''], revisao:['Revisão',''], simulado:['Simulado','i'], correcao:['Correção','i'], redacao:['Redação','i'], folga:['Folga','n']};
  const v = m[t] || ['Estudo',''];
  return '<span class="chip '+v[1]+'">'+v[0]+'</span>';
}
function isDone(k,i){ return !!S.done[k+'|'+i]; }
function toggle(k,i){
  const id = k+'|'+i;
  const feito = !S.done[id];
  if(feito) S.done[id] = 1; else delete S.done[id];
  Api.bloco(k, i, feito);
  renderAll();
}

// ---- aba hoje ----
function viewHoje(){
  const prova1 = parseYmd(S.cfg.d1), prova2 = parseYmd(S.cfg.d2);
  const t = hoje();
  const dd = diffDays(t, prova1);
  const dia = PLANO[0];
  const el = $('v-hoje');

  if(dd < 0){
    el.innerHTML = '<div class="card pad"><h1 style="font-size:24px">A data da prova já passou</h1><p class="muted" style="margin-top:8px">Abra os ajustes (⚙) e informe as datas do próximo ENEM para o cronograma ser recalculado.</p></div>';
    return;
  }
  const feitos = dia ? dia.blocos.filter((b,i)=>isDone(dia.key,i)).length : 0;
  const tot = dia ? dia.blocos.length : 0;
  const pct = tot ? Math.round(feitos/tot*100) : 0;

  // ultimos 14 dias
  let streak = '', seqAtual = 0, contando = true;
  for(let i=13;i>=0;i--){
    const d = addDays(t,-i), k = ymd(d);
    const p = PLANO.find(x=>x.key===k);
    let ok = false;
    for(let j=0;j<8;j++){ if(S.done[k+'|'+j]) { ok = true; break; } }
    streak += '<i class="'+(ok?'on ':'')+(i===0?'today':'')+'" title="'+k+'"></i>';
  }
  for(let i=0;i<60;i++){ const k = ymd(addDays(t,-i)); let ok=false; for(let j=0;j<8;j++) if(S.done[k+'|'+j]){ok=true;break;} if(ok) seqAtual++; else if(i>0) break; }

  const totalBlocos = PLANO.reduce((s,d)=>s+d.blocos.length,0);
  const feitosTotal = Object.keys(S.done).length;
  const proxSim = PLANO.find(d=>d.blocos.some(b=>b.tipo==='simulado'));

  // questao do dia (muda sozinha, baseada na data)
  const qi = (t.getFullYear()*372 + t.getMonth()*31 + t.getDate()) % QUESTOES.length;
  const q = QUESTOES[qi];

  el.innerHTML = `
  <div class="hero">
    <div class="card">
      <div class="today-head">
        <div>
          <div class="eyebrow">${DIAS[t.getDay()]} · ${t.getDate()} de ${MESES_L[t.getMonth()]}</div>
          <h1 style="margin-top:4px">${dia && dia.blocos[0] && dia.blocos[0].tipo==='folga' ? 'Hoje é dia de folga' : 'O plano de hoje'}</h1>
          <p class="small muted" style="margin-top:4px">${tot} blocos · ${dia ? dia.blocos.reduce((s,b)=>s+b.min,0) : 0} minutos · <b style="color:var(--iodo)">${dia ? dia.somaQ : 0} questões</b></p>
        </div>
        <div class="ring" style="--p:${pct}"><i>${pct}%</i></div>
      </div>
      <div>${dia ? dia.blocos.map((b,i)=>`
        <button class="block ${isDone(dia.key,i)?'done':''}" data-k="${dia.key}" data-i="${i}">
          <span class="tick">${CHECK}</span>
          <span>
            <span class="b-t">${esc(b.t)}</span>
            <span class="b-s">${esc(b.s)}</span>
            <span class="row" style="margin-top:7px;gap:8px">${tipoChip(b.tipo)}${areaChip(b.a)}${b.q?'<span class="chip i">'+b.q+' questões</span>':''}</span>
          </span>
          <span class="b-m">${b.min} min</span>
        </button>`).join('') : '<div class="pad muted">Sem plano para hoje.</div>'}
      </div>
    </div>

    <div class="stack">
      <div class="card pad">
        <div class="eyebrow">Contagem regressiva</div>
        <div class="row" style="justify-content:space-between;margin-top:10px;align-items:flex-end">
          <div><div class="mono" style="font-size:38px;font-weight:600;letter-spacing:-.03em;line-height:1">${dd}</div><div class="tiny muted">dias até o 1º dia</div></div>
          <div style="text-align:right"><div class="mono" style="font-size:20px;font-weight:600">${diffDays(t,prova2)}</div><div class="tiny muted">até o 2º dia</div></div>
        </div>
        <div style="margin-top:14px" class="tiny muted">
          1º dia · ${prova1.getDate()} ${MESES[prova1.getMonth()]} — Linguagens, Humanas e Redação<br>
          2º dia · ${prova2.getDate()} ${MESES[prova2.getMonth()]} — Natureza e Matemática
        </div>
      </div>

      <div class="card pad">
        <div class="row" style="justify-content:space-between"><div class="eyebrow">Últimos 14 dias</div><div class="tiny muted">${seqAtual} ${seqAtual===1?'dia seguido':'dias seguidos'}</div></div>
        <div class="streak" style="margin-top:10px">${streak}</div>
        <div style="margin-top:14px">
          <div class="row" style="justify-content:space-between"><span class="tiny muted">Progresso do plano</span><span class="tiny mono">${feitosTotal}/${totalBlocos}</span></div>
          <div class="bar" style="margin-top:6px"><i style="width:${totalBlocos?Math.min(100,feitosTotal/totalBlocos*100):0}%"></i></div>
        </div>
      </div>

      ${proxSim ? `<div class="card pad">
        <div class="eyebrow">Próximo simulado</div>
        <p style="margin-top:6px;font-weight:600">${esc(proxSim.blocos.find(b=>b.tipo==='simulado').t)}</p>
        <p class="tiny muted" style="margin-top:3px">${DIAS[proxSim.dow]}, ${proxSim.d.getDate()} de ${MESES_L[proxSim.d.getMonth()]} · faltam ${diffDays(t,proxSim.d)} dias</p>
      </div>` : ''}
    </div>
  </div>

  <div style="margin-top:26px">
    <div class="sect-h"><h2>Questão do dia</h2><span class="eyebrow">${AREAS[q.a].nome}${q.vet?' · contexto veterinário':''}</span></div>
    <div class="card pad" id="qdia"></div>
  </div>`;

  renderQuestao($('qdia'), q, qi, 'dia');
}

// questao avulsa, mostra o gabarito depois que clica
function renderQuestao(host, q, idx, ns){
  const key = ns+'-'+idx;
  host.innerHTML = `<p class="q-en">${esc(q.en)}</p>
    <div class="alts">${q.alt.map((a,i)=>`<button class="alt" data-q="${key}" data-i="${i}"><span class="k">${'ABCDE'[i]}</span><span>${esc(a)}</span></button>`).join('')}</div>
    <div id="fb-${key}"></div>`;
  host.querySelectorAll('.alt').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const i = Number(btn.dataset.i);
      host.querySelectorAll('.alt').forEach((b,j)=>{
        b.disabled = true;
        if(j===q.c) b.classList.add('right');
        else if(j===i) b.classList.add('wrong');
      });
      $('fb-'+key).innerHTML = '<div class="expl"><b>'+(i===q.c?'Acertou. ':'Gabarito: '+'ABCDE'[q.c]+'. ')+'</b>'+esc(q.ex)+'</div>';
    });
  });
}

// ---- aba cronograma ----
let semanaAberta = 0;
function viewCronograma(){
  const t = hoje();
  const el = $('v-cronograma');
  const semanas = {};
  PLANO.forEach(d=>{ (semanas[d.semana] = semanas[d.semana] || []).push(d); });

  // quantos blocos cada materia pegou
  const cont = {};
  PLANO.forEach(d=>d.blocos.forEach(b=>{ if(b.a) cont[b.a]=(cont[b.a]||0)+1; }));
  const maxC = Math.max(...Object.values(cont), 1);

  el.innerHTML = `
  <div class="sect-h"><h2>Cronograma até a prova</h2><span class="eyebrow">${PLANO.length} dias · ${PLANO.reduce((s,d)=>s+d.blocos.length,0)} blocos · ${PLANO.reduce((s,d)=>s+d.somaQ,0).toLocaleString('pt-BR')} questões</span></div>
  <p class="small muted" style="max-width:65ch;margin-bottom:18px">Todo dia tem no mínimo <b>${META_Q} questões</b> — essa é a regra que manda no plano. Se os blocos de teoria e revisão não fecharem a cota, entra um bloco de fechamento com a diferença. O conteúdo novo cai na primeira metade do dia; o último bloco é sempre revisão espaçada do que foi estudado sete dias antes, porque é a repetição no intervalo certo que faz a matéria ficar. Nos últimos 12 dias o plano para de introduzir conteúdo novo e vira revisão e prova. Marque cada bloco concluído: o progresso fica salvo.</p>

  <div class="card pad" style="margin-bottom:22px">
    <div class="eyebrow">Distribuição de blocos por matéria</div>
    <div style="display:flex;flex-direction:column;gap:9px;margin-top:12px">
      ${Object.keys(AREAS).map(a=>`
        <div class="row" style="gap:12px;flex-wrap:nowrap">
          <span style="width:88px;font-size:13.5px;font-weight:600;flex:none">${AREAS[a].nome}</span>
          <span class="bar" style="flex:1"><i style="width:${(cont[a]||0)/maxC*100}%;background:${AREAS[a].cor}"></i></span>
          <span class="mono tiny" style="width:26px;text-align:right;flex:none">${cont[a]||0}</span>
        </div>`).join('')}
    </div>
    <p class="tiny muted" style="margin-top:12px">Biologia e Química recebem mais blocos porque Ciências da Natureza costuma ter o maior peso nos cursos de Medicina Veterinária no SISU. Confira o peso da universidade que ela quer e me peça para ajustar.</p>
  </div>

  ${Object.keys(semanas).map(w=>{
    const ds = semanas[w];
    const tot = ds.reduce((s,d)=>s+d.blocos.length,0);
    const fei = ds.reduce((s,d)=>s+d.blocos.filter((b,i)=>isDone(d.key,i)).length,0);
    const contemHoje = ds.some(d=>d.key===ymd(t));
    const aberta = Number(w)===semanaAberta || contemHoje && semanaAberta===0;
    return `<div class="wk">
      <button class="wk-h" data-w="${w}">
        <h3>Semana ${Number(w)+1}</h3>
        <span class="tiny muted mono">${ds[0].d.getDate()}/${ds[0].d.getMonth()+1} – ${ds[ds.length-1].d.getDate()}/${ds[ds.length-1].d.getMonth()+1}</span>
        ${ds[0].reta?'<span class="chip i">reta final</span>':''}
        <span style="margin-left:auto" class="row">
          <span class="bar" style="width:70px"><i style="width:${tot?fei/tot*100:0}%"></i></span>
          <span class="mono tiny">${fei}/${tot}</span>
          <span class="mono tiny muted">${aberta?'▾':'▸'}</span>
        </span>
      </button>
      <div style="display:${aberta?'block':'none'}">
      ${ds.map(d=>{
        const past = d.d < t, isT = d.key===ymd(t);
        return `<div class="day ${isT?'is-today':''} ${past?'is-past':''}">
          <div class="day-g"><b>${String(d.d.getDate()).padStart(2,'0')}/${String(d.d.getMonth()+1).padStart(2,'0')}</b>${DIAS[d.dow]}<br>D-${d.faltam}<br><span style="color:var(--iodo)">${d.somaQ} quest.</span></div>
          <div>${d.blocos.map((b,i)=>`
            <button class="mini ${isDone(d.key,i)?'done':''}" data-k="${d.key}" data-i="${i}">
              <span class="tick">${CHECK}</span>
              <span><span class="m-t">${esc(b.t)}</span><br><span class="m-s">${esc(b.s)}</span></span>
              <span class="b-m">${b.min}′${b.q?'<br>'+b.q+'q':''}</span>
            </button>`).join('')}</div>
        </div>`;
      }).join('')}
      </div>
    </div>`;
  }).join('')}`;

  el.querySelectorAll('.wk-h').forEach(b=>b.addEventListener('click',()=>{
    const w = Number(b.dataset.w);
    semanaAberta = (semanaAberta===w) ? -1 : w;
    viewCronograma();
  }));
}

// ---- aba simulados ----
const BLOCOS_SIM = [
 {id:'vet', nome:'Foco Medicina Veterinária', desc:'Questões com contexto de clínica, produção animal e saúde única — Biologia, Química e Matemática aplicadas.', f:q=>q.vet},
 {id:'nat', nome:'Ciências da Natureza', desc:'Biologia, Química e Física juntas, como no 2º dia de prova.', f:q=>AREAS[q.a].grande==='Natureza'},
 {id:'bio', nome:'Biologia', desc:'A matéria que mais decide a nota de quem quer veterinária.', f:q=>q.a==='bio'},
 {id:'qui', nome:'Química', desc:'Soluções, estequiometria, equilíbrio e orgânica.', f:q=>q.a==='qui'},
 {id:'mat', nome:'Matemática', desc:'Proporção, porcentagem, estatística, probabilidade e volumes.', f:q=>q.a==='mat'},
 {id:'lin', nome:'Linguagens', desc:'Interpretação, funções da linguagem, variação e inglês.', f:q=>q.a==='lin'},
 {id:'hum', nome:'Humanas', desc:'História, geografia, sociologia e filosofia.', f:q=>q.a==='hum'},
 {id:'geral', nome:'Simulado misto', desc:'Todas as questões do banco, embaralhadas. Use como prova geral.', f:()=>true}
];
let simAtivo = null, simResp = {}, simFim = false, simT0 = 0, simTimer = null;

function viewSimulados(){
  const el = $('v-simulados');
  if(simAtivo){ return renderSimAtivo(); }
  el.innerHTML = `
  <div class="sect-h"><h2>Simulados</h2><span class="eyebrow">${QUESTOES.length} questões com gabarito comentado</span></div>
  <p class="small muted" style="max-width:65ch;margin-bottom:18px">Faça sem consultar nada e com o cronômetro rodando — o ENEM cobra resistência tanto quanto conteúdo. Depois leia o comentário de todas, inclusive das que acertou: metade dos acertos no ENEM é chute com sorte, e o comentário revela qual foi qual.</p>
  <div class="grid-2">
    ${BLOCOS_SIM.map(b=>{
      const qs = QUESTOES.filter(b.f);
      const r = S.sim[b.id];
      return `<button class="tile pick" data-sim="${b.id}">
        <div class="row" style="justify-content:space-between"><b style="font-family:var(--f-display);font-size:16px">${b.nome}</b>${r?`<span class="chip ${r.acertos/r.total>=0.6?'o':'c'}">${r.acertos}/${r.total}</span>`:'<span class="chip n">novo</span>'}</div>
        <p class="tiny muted" style="margin-top:5px">${b.desc}</p>
        <p class="tiny mono" style="margin-top:8px;color:var(--ink-3)">${qs.length} questões · ${qs.length*3} min</p>
      </button>`;
    }).join('')}
  </div>
  <div class="card pad" style="margin-top:22px">
    <div class="eyebrow">Depois destes, o material principal</div>
    <p class="small" style="margin-top:8px">Este banco é para treino diário. A prova de verdade que você precisa fazer todo domingo é a do próprio INEP: <a href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos" target="_blank" rel="noopener">provas e gabaritos de todos os anos</a>, de graça. Imprima ou resolva na tela, com 5h30 de cronômetro.</p>
  </div>`;
  el.querySelectorAll('[data-sim]').forEach(b=>b.addEventListener('click',()=>iniciarSim(b.dataset.sim)));
}

function iniciarSim(id){
  const b = BLOCOS_SIM.find(x=>x.id===id);
  simAtivo = {id, nome:b.nome, qs: QUESTOES.map((q,i)=>({q,i})).filter(x=>b.f(x.q))};
  if(id==='geral') simAtivo.qs = simAtivo.qs.slice().sort(()=>Math.random()-0.5);
  simResp = {}; simFim = false; simT0 = Date.now();
  clearInterval(simTimer);
  simTimer = setInterval(()=>{ const e=$('simClock'); if(e) e.textContent = fmtT(Date.now()-simT0); }, 1000);
  renderSimAtivo(); window.scrollTo(0,0);
}
function fmtT(ms){ const s = Math.floor(ms/1000); return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); }

function renderSimAtivo(){
  const el = $('v-simulados');
  const A = simAtivo;
  const respondidas = Object.keys(simResp).length;
  let head = `
  <div class="sect-h">
    <h2>${A.nome}</h2>
    <span class="eyebrow" id="simClock">${fmtT(Date.now()-simT0)}</span>
    <span style="margin-left:auto" class="row">
      <span class="tiny mono muted">${respondidas}/${A.qs.length}</span>
      <button class="btn ghost" id="simSair">Sair</button>
      ${simFim?'':`<button class="btn" id="simFinal" ${respondidas===0?'disabled':''}>Finalizar</button>`}
    </span>
  </div>`;

  let resultado = '';
  if(simFim){
    const ac = A.qs.filter(x=>simResp[x.i]===x.q.c).length;
    const porArea = {};
    A.qs.forEach(x=>{ const a=x.q.a; porArea[a]=porArea[a]||{c:0,t:0}; porArea[a].t++; if(simResp[x.i]===x.q.c) porArea[a].c++; });
    resultado = `<div class="card pad" style="margin-bottom:22px">
      <div class="grid-3">
        <div><div class="eyebrow">Acertos</div><span class="v" style="color:${ac/A.qs.length>=0.6?'var(--ok)':'var(--iodo)'}">${ac}/${A.qs.length}</span></div>
        <div><div class="eyebrow">Aproveitamento</div><span class="v">${Math.round(ac/A.qs.length*100)}%</span></div>
        <div><div class="eyebrow">Tempo</div><span class="v">${fmtT(Date.now()-simT0)}</span></div>
      </div>
      <div style="margin-top:18px;display:flex;flex-direction:column;gap:9px">
        ${Object.keys(porArea).map(a=>`<div class="row" style="gap:12px;flex-wrap:nowrap">
          <span style="width:88px;font-size:13.5px;font-weight:600;flex:none">${AREAS[a].nome}</span>
          <span class="bar" style="flex:1"><i style="width:${porArea[a].c/porArea[a].t*100}%;background:${AREAS[a].cor}"></i></span>
          <span class="mono tiny" style="flex:none">${porArea[a].c}/${porArea[a].t}</span>
        </div>`).join('')}
      </div>
      <p class="note" style="margin-top:16px">Abaixo de 60% em uma matéria? Volte ao cronograma e refaça o bloco de teoria daquele tópico antes de seguir. Acima de 80%, troque teoria por exercícios: você já sabe, falta velocidade.</p>
    </div>`;
  }

  el.innerHTML = head + resultado + '<div class="card pad">' + A.qs.map((x,n)=>{
    const q = x.q, sel = simResp[x.i];
    return `<div class="q">
      <div class="row" style="justify-content:space-between">
        <span class="eyebrow">Questão ${n+1} · ${AREAS[q.a].nome} · ${esc(q.t)}</span>
        ${q.vet?'<span class="chip i">contexto vet</span>':''}
      </div>
      <p class="q-en">${esc(q.en)}</p>
      <div class="alts">${q.alt.map((a,i)=>{
        let cls = '';
        if(simFim){ if(i===q.c) cls='right'; else if(i===sel) cls='wrong'; }
        return `<button class="alt ${cls}" aria-pressed="${sel===i}" data-qi="${x.i}" data-i="${i}" ${simFim?'disabled':''}><span class="k">${'ABCDE'[i]}</span><span>${esc(a)}</span></button>`;
      }).join('')}</div>
      ${simFim?`<div class="expl"><b>${sel===q.c?'Acertou. ':(sel===undefined?'Em branco. ':'')}Gabarito: ${'ABCDE'[q.c]}.</b> ${esc(q.ex)}</div>`:''}
    </div>`;
  }).join('') + '</div>';

  el.querySelectorAll('.alt').forEach(b=>b.addEventListener('click',()=>{
    simResp[Number(b.dataset.qi)] = Number(b.dataset.i);
    renderSimAtivo();
  }));
  const sair = $('simSair'); if(sair) sair.addEventListener('click',()=>{ clearInterval(simTimer); simAtivo=null; viewSimulados(); window.scrollTo(0,0); });
  const fin = $('simFinal'); if(fin) fin.addEventListener('click',()=>{
    simFim = true; clearInterval(simTimer);
    const ac = A.qs.filter(x=>simResp[x.i]===x.q.c).length;
    const prev = S.sim[A.id];
    if(!prev || ac > prev.acertos) S.sim[A.id] = {acertos:ac, total:A.qs.length, data:ymd(hoje())};
    Api.resultado('simulado', A.id, ac, A.qs.length);
    renderSimAtivo(); window.scrollTo(0,0);
  });
}

// ---- aba redação ----
let redTimer = null, redT0 = 0;
// a folha oficial tem 30 linhas de ~33 caracteres, uso isso pra estimar
function linhasDe(v){ return Math.ceil(v.replace(/\s+/g,' ').length / 33); }
function viewRedacao(){
  const el = $('v-redacao');
  el.innerHTML = `
  <div class="sect-h"><h2>Redação</h2><span class="eyebrow">1000 pontos · 5 competências · 30 linhas</span></div>
  <p class="small muted" style="max-width:65ch;margin-bottom:20px">A redação vale tanto quanto uma prova inteira e é a parte mais treinável do ENEM. Uma por semana, cronometrada, seguindo sempre a mesma estrutura — é assim que a nota sobe.</p>

  <div class="grid-2" style="margin-bottom:24px">
    ${COMPETENCIAS.map(c=>`<div class="tile">
      <div class="row" style="gap:8px"><span class="chip">${c.n}</span><b style="font-family:var(--f-display);font-size:15.5px">${c.t}</b></div>
      <p class="small muted" style="margin-top:7px">${c.d}</p>
    </div>`).join('')}
  </div>

  <div class="sect-h"><h2 style="font-size:18px">Estrutura que funciona</h2></div>
  <div style="margin-bottom:24px">
    ${ESTRUTURA.map(e=>`<details><summary>${e.p}</summary><div class="body">${e.d}</div></details>`).join('')}
  </div>

  <div class="sect-h"><h2 style="font-size:18px">Repertório sociocultural</h2><span class="eyebrow">use dois por texto, sempre explicados</span></div>
  <div class="grid-2" style="margin-bottom:24px">
    ${REPERTORIOS.map(r=>`<div class="tile">
      <div class="eyebrow">${r.c}</div>
      <b style="font-family:var(--f-display);font-size:15.5px;display:block;margin-top:3px">${r.t}</b>
      <p class="small muted" style="margin-top:5px">${r.d}</p>
    </div>`).join('')}
  </div>

  <div class="sect-h"><h2 style="font-size:18px">Treinar agora</h2><span class="eyebrow" id="redClock">00:00</span></div>
  <div class="card pad stack">
    <div class="row" style="justify-content:space-between">
      <div style="flex:1;min-width:240px">
        <div class="eyebrow">Tema</div>
        <p id="redTema" style="font-family:var(--f-display);font-size:17px;font-weight:700;margin-top:4px">${esc(S.red.tema || 'Clique em sortear para receber um tema')}</p>
      </div>
      <div class="row">
        <button class="btn ghost" id="redSorteia">Sortear tema</button>
        <button class="btn" id="redStart">Iniciar 60 min</button>
      </div>
    </div>
    <textarea id="redTexto" placeholder="Escreva aqui. O contador embaixo estima quantas linhas você teria na folha oficial.">${esc(S.red.texto||'')}</textarea>
    <div class="row" style="justify-content:space-between">
      <span class="tiny mono muted" id="redCont">0 palavras · ~0 de 30 linhas</span>
      <span class="tiny muted">Salvo automaticamente</span>
    </div>
  </div>

  <div class="sect-h" style="margin-top:26px"><h2 style="font-size:18px">Checklist antes de considerar pronta</h2></div>
  <div class="card pad">
    <ul class="lst">${CHECKLIST.map(c=>`<li><span>${c}</span></li>`).join('')}</ul>
  </div>

  <div class="sect-h" style="margin-top:26px"><h2 style="font-size:18px">Temas para treinar</h2></div>
  <div class="card pad"><ul class="lst">${TEMAS.map(t=>`<li><span>${t}</span></li>`).join('')}</ul></div>`;

  const ta = $('redTexto'), cont = $('redCont');
  function upd(){
    const v = ta.value;
    const pal = v.trim() ? v.trim().split(/\s+/).length : 0;
    const linhas = linhasDe(v);
    cont.textContent = pal + ' palavras · ~' + linhas + ' de 30 linhas';
    cont.style.color = linhas > 30 ? 'var(--crit)' : (linhas >= 25 ? 'var(--ok)' : '');
  }
  ta.addEventListener('input', ()=>{
    upd();
    S.red.texto = ta.value;
    Api.redacao(S.red.tema, S.red.texto, linhasDe(ta.value));
  });
  upd();
  $('redSorteia').addEventListener('click', ()=>{
    S.red.tema = TEMAS[Math.floor(Math.random()*TEMAS.length)];
    $('redTema').textContent = S.red.tema;
    Api.redacao(S.red.tema, S.red.texto, linhasDe(ta.value));
  });
  $('redStart').addEventListener('click', ()=>{
    clearInterval(redTimer); redT0 = Date.now();
    redTimer = setInterval(()=>{
      const rest = 3600000 - (Date.now()-redT0);
      const c = $('redClock'); if(!c){ clearInterval(redTimer); return; }
      if(rest <= 0){ c.textContent = 'TEMPO ESGOTADO'; c.style.color='var(--crit)'; clearInterval(redTimer); return; }
      c.textContent = fmtT(rest) + ' restantes';
    }, 500);
  });
}

// ---- aba flashcards ----
let fcArea = 'todas', fcIdx = 0, fcVirado = false, fcBaralho = [];
function montaBaralho(){
  fcBaralho = CARDS.map((c,i)=>({c,i})).filter(x=>fcArea==='todas'||x.c.a===fcArea);
  fcBaralho.sort((a,b)=>{
    const sa = S.fc[a.i]||'novo', sb = S.fc[b.i]||'novo';
    const ord = {nao:0, novo:1, quase:2, sei:3};
    return ord[sa]-ord[sb];
  });
  fcIdx = 0; fcVirado = false;
}
function viewFlashcards(){
  const el = $('v-flashcards');
  if(!fcBaralho.length) montaBaralho();
  const cur = fcBaralho[fcIdx];
  const sabe = Object.values(S.fc).filter(v=>v==='sei').length;
  el.innerHTML = `
  <div class="sect-h"><h2>Flashcards</h2><span class="eyebrow">${CARDS.length} cartas · ${sabe} dominadas</span></div>
  <p class="small muted" style="max-width:65ch;margin-bottom:18px">Leia a pergunta, responda em voz alta e só então vire a carta. As que você marcar como "ainda não" voltam primeiro na próxima rodada.</p>
  <div class="row" style="margin-bottom:14px">
    ${['todas'].concat(Object.keys(AREAS)).map(a=>`<button class="btn ${fcArea===a?'':'ghost'}" style="padding:6px 12px;font-size:13.5px" data-fa="${a}">${a==='todas'?'Todas':AREAS[a].nome}</button>`).join('')}
  </div>
  ${cur ? `
  <div class="card fc" id="fcCard">
    <div class="eyebrow">${AREAS[cur.c.a].nome} · carta ${fcIdx+1} de ${fcBaralho.length}</div>
    <div class="front">${esc(cur.c.f)}</div>
    ${fcVirado ? `<div class="back">${esc(cur.c.b)}</div>` : '<p class="tiny muted">clique para virar</p>'}
  </div>
  <div class="row" style="margin-top:14px;justify-content:center">
    ${fcVirado ? `
      <button class="btn ghost" data-fr="nao" style="border-color:var(--crit);color:var(--crit)">Ainda não</button>
      <button class="btn ghost" data-fr="quase">Quase lá</button>
      <button class="btn" data-fr="sei">Sei de cor</button>`
     : '<button class="btn" id="fcVira">Virar carta</button>'}
  </div>
  <div class="bar" style="margin-top:20px;max-width:420px;margin-left:auto;margin-right:auto"><i style="width:${(fcIdx)/fcBaralho.length*100}%"></i></div>
  ` : '<div class="card pad muted">Nenhuma carta nesta matéria.</div>'}`;

  el.querySelectorAll('[data-fa]').forEach(b=>b.addEventListener('click',()=>{ fcArea=b.dataset.fa; montaBaralho(); viewFlashcards(); }));
  const card = $('fcCard'); if(card) card.addEventListener('click', ()=>{ fcVirado = true; viewFlashcards(); });
  const v = $('fcVira'); if(v) v.addEventListener('click', ()=>{ fcVirado = true; viewFlashcards(); });
  el.querySelectorAll('[data-fr]').forEach(b=>b.addEventListener('click',()=>{
    S.fc[cur.i] = b.dataset.fr;
    Api.flashcard(cur.i, b.dataset.fr);
    fcIdx++; fcVirado = false;
    if(fcIdx >= fcBaralho.length) montaBaralho();
    viewFlashcards();
  }));
}

// ---- aba materiais ----
function viewMateriais(){
  const el = $('v-materiais');
  const m = S.meta;
  el.innerHTML = `
  <div class="sect-h"><h2>Materiais e metas</h2><span class="eyebrow">tudo gratuito</span></div>

  ${MATERIAIS.map(g=>`
    <div class="eyebrow" style="margin:22px 0 10px">${g.g}</div>
    <div class="grid-2">
      ${g.its.map(i=>`<a class="linkcard" href="${i.u}" target="_blank" rel="noopener">
        <b>${i.t}</b><span>${i.d}</span>
      </a>`).join('')}
    </div>`).join('')}

  <div class="eyebrow" style="margin:28px 0 10px">Calculadora de nota</div>
  <div class="card pad">
    <p class="small muted" style="margin-bottom:14px">Coloque as notas de um simulado ou do ENEM anterior. A média é calculada com os pesos que a maioria dos cursos de Medicina Veterinária usa (Natureza pesa mais); ajuste se a universidade dela usar outros.</p>
    <div class="grid-3">
      ${[['cn','Natureza',3],['mt','Matemática',2],['lc','Linguagens',2],['ch','Humanas',1],['rd','Redação',2]].map(([k,n,p])=>`
        <label class="fl">${n.toUpperCase()} <span class="tiny" style="font-weight:400">(peso <input type="number" id="p-${k}" value="${(m['p-'+k]!==undefined?m['p-'+k]:p)}" min="0" max="5" step="0.5" style="width:52px;padding:2px 5px;display:inline-block">)</span>
          <input type="number" id="n-${k}" value="${m['n-'+k]||''}" min="0" max="1000" placeholder="0 a 1000">
        </label>`).join('')}
    </div>
    <div class="row" style="margin-top:16px;justify-content:space-between;align-items:flex-end">
      <div><div class="eyebrow">Média ponderada</div><span class="mono" id="calcOut" style="font-size:34px;font-weight:600;letter-spacing:-.03em">—</span></div>
      <span class="tiny muted" id="calcMsg"></span>
    </div>
  </div>

  <div class="eyebrow" style="margin:28px 0 10px">Notas de corte — Medicina Veterinária</div>
  <div class="tbl-wrap">
    <table>
      <thead><tr><th>Universidade</th><th>UF</th><th>Faixa aproximada</th></tr></thead>
      <tbody>${CORTES.map(c=>`<tr><td>${c.u}</td><td class="num">${c.uf}</td><td class="num">${c.f}</td></tr>`).join('')}</tbody>
    </table>
  </div>
  <p class="note" style="margin-top:12px">Estas faixas são referências de estudo, baseadas em processos seletivos recentes de ampla concorrência — não são números oficiais. A nota de corte muda a cada edição, conforme a concorrência, e cotas têm notas próprias, quase sempre menores. Confira sempre no <a href="https://acessounico.mec.gov.br/sisu" target="_blank" rel="noopener">SISU</a> antes de fechar uma meta.</p>

  <div class="card pad" style="margin-top:22px">
    <div class="eyebrow">Como usar isso na prática</div>
    <ul class="lst" style="margin-top:10px">
      <li><span><b>Meta realista primeiro.</b> Escolha duas universidades: uma "sonho" e uma "segura". A diferença entre elas costuma ser de 60 a 80 pontos.</span></li>
      <li><span><b>Redação é o atalho.</b> Sair de 600 para 900 na redação sobe a média ponderada mais rápido do que qualquer outra matéria, porque depende de estrutura, não de conteúdo novo.</span></li>
      <li><span><b>Não zere nenhuma área.</b> O TRI pune quem acerta muito em uma área e vai mal em outra; um desempenho equilibrado rende mais que picos.</span></li>
      <li><span><b>Acertar as fáceis vale mais.</b> Pelo TRI, errar questões fáceis e acertar difíceis derruba a nota — é o padrão de quem chutou. Garanta as fáceis primeiro.</span></li>
    </ul>
  </div>`;

  const calc = ()=>{
    let num=0, den=0, faltou=false;
    [['cn'],['mt'],['lc'],['ch'],['rd']].forEach(([k])=>{
      const n = parseFloat($('n-'+k).value), p = parseFloat($('p-'+k).value)||0;
      S.meta['p-'+k] = p;
      if(!isNaN(n)){ S.meta['n-'+k] = n; num += n*p; den += p; } else faltou = true;
    });
    const out = $('calcOut'), msg = $('calcMsg');
    if(den>0 && num>0){
      const med = num/den;
      out.textContent = med.toFixed(1);
      const ok = CORTES.filter(c=>med >= parseFloat(c.f.split('–')[0]));
      msg.innerHTML = ok.length ? 'Essa média já alcança a faixa inferior de '+ok.length+' das universidades da tabela.' : 'Ainda abaixo da faixa da tabela — foque nas matérias de maior peso.';
      out.style.color = med>=700 ? 'var(--ok)' : (med>=600?'var(--iodo)':'var(--ink)');
    } else { out.textContent = '—'; msg.textContent = faltou?'Preencha as cinco notas.':''; }
    Api.local(); // a calculadora é rascunho, fica so no navegador
  };
  el.querySelectorAll('input[type=number]').forEach(i=>i.addEventListener('input', calc));
  calc();
}


// nav e boot
const ABAS = [['hoje','Hoje'],['cronograma','Cronograma'],['simulados','Simulados'],['provas','Provas reais'],['redacao','Redação'],['flashcards','Flashcards'],['materiais','Materiais']];
let abaAtual = 'hoje';
function renderAll(){
  const t = hoje();
  const dd = diffDays(t, parseYmd(S.cfg.d1));
  $('dday').textContent = dd >= 0 ? dd : '—';
  viewHoje();
  if(abaAtual==='cronograma') viewCronograma();
  if(abaAtual==='simulados' && !simAtivo) viewSimulados();
  if(abaAtual==='flashcards') viewFlashcards();
}
function abrir(id){
  abaAtual = id;
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('on', v.id==='v-'+id));
  document.querySelectorAll('#tabs button').forEach(b=>b.setAttribute('aria-selected', String(b.dataset.t===id)));
  if(id==='cronograma') viewCronograma();
  if(id==='simulados') viewSimulados();
  if(id==='provas') viewProvas();
  if(id==='redacao') viewRedacao();
  if(id==='flashcards') viewFlashcards();
  if(id==='materiais') viewMateriais();
  window.scrollTo(0,0);
}

document.addEventListener('click', e=>{
  const b = e.target.closest('.block, .mini');
  if(b && b.dataset.k){ toggle(b.dataset.k, Number(b.dataset.i)); if(abaAtual==='cronograma') viewCronograma(); }
});

// tela de login. so mostra o app depois que a sessao existe e os dados chegaram
function telaLogin(){
  $('login').hidden = false;
  $('app').hidden = true;
  const erro = $('loginErro');
  const diz = (msg, ok) => { erro.textContent = msg; erro.style.color = ok ? 'var(--ok)' : 'var(--crit)'; };

  let modo = 'entrar';
  const troca = $('loginTroca'), titulo = $('loginTitulo'), acao = $('loginAcao'), campoNome = $('campoNome');
  troca.addEventListener('click', e => {
    e.preventDefault();
    modo = modo === 'entrar' ? 'criar' : 'entrar';
    titulo.textContent = modo === 'entrar' ? 'Entrar' : 'Criar conta';
    acao.textContent  = modo === 'entrar' ? 'Entrar' : 'Criar conta';
    troca.textContent = modo === 'entrar' ? 'Ainda não tem conta? Criar agora' : 'Já tenho conta, quero entrar';
    campoNome.hidden = modo === 'entrar';
    diz('');
  });

  $('loginForm').addEventListener('submit', async e => {
    e.preventDefault();
    const email = $('loginEmail').value.trim();
    const senha = $('loginSenha').value;
    if(!email || senha.length < 6) return diz('Preencha o e-mail e uma senha de pelo menos 6 caracteres.');
    acao.disabled = true; diz('');
    try{
      if(modo === 'entrar'){
        await Api.entrar(email, senha);
      }else{
        const r = await Api.cadastrar(email, senha, $('loginNome').value.trim());
        if(!r.session){
          acao.disabled = false;
          return diz('Conta criada. Confirme pelo link que chegou no seu e-mail e depois entre.', true);
        }
      }
      await iniciarApp();
    }catch(err){
      acao.disabled = false;
      const m = String(err.message || err);
      if(/Invalid login/i.test(m)) diz('E-mail ou senha errados.');
      else if(/already registered/i.test(m)) diz('Esse e-mail já tem conta. Escolha "já tenho conta".');
      else diz(m);
    }
  });
}

async function iniciarApp(){
  $('login').hidden = true;
  $('app').hidden = false;
  await Api.carregar();
  replanejar();
  renderAll();
  abrir(abaAtual);
}

async function boot(){
  $('tabs').innerHTML = ABAS.map(([id,n])=>`<button data-t="${id}" aria-selected="${id==='hoje'}">${n}</button>`).join('');
  document.querySelectorAll('#tabs button').forEach(b=>b.addEventListener('click',()=>abrir(b.dataset.t)));

  const tb = $('themeBtn');
  tb.addEventListener('click', ()=>{
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : (cur === 'light' ? '' : 'dark');
    if(next) document.documentElement.setAttribute('data-theme', next);
    else document.documentElement.removeAttribute('data-theme');
    try{ localStorage.setItem('plantao-tema', next); }catch(e){}
  });
  try{ const tm = localStorage.getItem('plantao-tema'); if(tm) document.documentElement.setAttribute('data-theme', tm); }catch(e){}

  $('sairBtn').addEventListener('click', async ()=>{
    await Api.sair();
    location.reload();
  });

  const dlg = $('cfg');
  $('cfgBtn').addEventListener('click', ()=>{
    $('cfgD1').value = S.cfg.d1; $('cfgD2').value = S.cfg.d2;
    $('cfgRitmo').value = String(S.cfg.ritmo); $('cfgFolga').value = String(S.cfg.folga);
    dlg.showModal();
  });
  dlg.addEventListener('close', ()=>{
    if(dlg.returnValue !== 'save') return;
    S.cfg = {d1:$('cfgD1').value||S.cfg.d1, d2:$('cfgD2').value||S.cfg.d2, ritmo:Number($('cfgRitmo').value), folga:Number($('cfgFolga').value)};
    Api.config(S.cfg);
    replanejar(); renderAll();
    if(abaAtual==='cronograma') viewCronograma();
  });

  // se ela ja estava logada, entra direto
  const u = await Api.sessao();
  if(u) await iniciarApp();
  else telaLogin();
}

boot();
