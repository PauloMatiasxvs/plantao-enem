// helpers de data
const DIAS = ['dom','seg','ter','qua','qui','sex','sáb'];
const MESES = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
const MESES_L = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
function ymd(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function parseYmd(s){ const p = s.split('-').map(Number); return new Date(p[0], p[1]-1, p[2]); }
function hoje(){ const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); }
function addDays(d,n){ const x = new Date(d); x.setDate(x.getDate()+n); return x; }
function diffDays(a,b){ return Math.round((b-a)/86400000); }

// monta o cronograma dia a dia ate a prova
function filaTopicos(){
  const pend = {}, virt = {};
  for(const a in AREAS){
    pend[a] = CURRICULO[a].map((o,i)=>({...o, a, id:a+i})).sort((x,y)=>x.p-y.p);
    virt[a] = 0;
  }
  const fila = [];
  const total = Object.values(pend).reduce((s,l)=>s+l.length,0);
  for(let k=0;k<total;k++){
    let best=null, bv=Infinity;
    for(const a in pend){
      if(!pend[a].length) continue;
      const v = (virt[a]+1)/AREAS[a].peso;
      if(v < bv){ bv=v; best=a; }
    }
    if(!best) break;
    virt[best]++;
    fila.push(pend[best].shift());
  }
  return fila;
}

const META_Q = 30; // minimo de questoes por dia
const PROVAS_IDS = ['ENEM 2025','ENEM 2024','ENEM 2023','ENEM 2022','ENEM 2021','ENEM 2020'];

function construirPlano(){
  const cfg = S.cfg;
  const ini = hoje();
  const prova1 = parseYmd(cfg.d1);
  const fim = addDays(prova1, -1);
  const dias = [];
  const n = diffDays(ini, fim);
  if(n < 0) return dias;
  const fila = filaTopicos();
  const revQ = fila.filter(t=>t.p===1).concat(fila.filter(t=>t.p===2));
  let fi = 0, ri = 0, simI = 0;
  const areasSim = ['bio','qui','mat','lin','hum','fis'];
  const historico = {};

  for(let i=0;i<=n;i++){
    const d = addDays(ini, i);
    const dow = d.getDay();
    const key = ymd(d);
    const faltam = diffDays(d, prova1);
    const reta = faltam <= 12;
    const blocos = [];
    const isFolga = dow === Number(cfg.folga);
    let simDia = (dow===0 && !isFolga) || (dow===6 && Number(cfg.folga)===0);

    if(isFolga && !simDia){
      blocos.push({tipo:'exercicios', a:null, q:30, t:'Dia leve — só questões', s:'Sem teoria hoje. 30 questões mistas em ritmo tranquilo, corrigindo uma a uma. Descansar a cabeça sem perder o hábito.', min:45});
    } else if(simDia){
      const ar = reta ? 'geral' : areasSim[simI % areasSim.length];
      simI++;
      const provaSim = PROVAS_IDS[simI % PROVAS_IDS.length];
      blocos.push({tipo:'simulado', a: ar==='geral'?null:ar, q:45,
        t: reta ? 'Prova completa cronometrada' : 'Bloco de prova real — '+provaSim,
        s: reta ? 'Uma prova inteira do INEP, no mesmo horário da prova real, com 5h30 de cronômetro.' : 'Aba Provas reais → '+provaSim+'. Faça os 45 números de um bloco sem consultar nada e lance no cartão-resposta.', min:100});
      blocos.push({tipo:'correcao', a: ar==='geral'?null:ar, q:0, t:'Correção e análise', s:'Corrija pelo gabarito oficial e abra o caderno nas questões erradas. Leia o comentário de todas — inclusive das que acertou.', min:50});
      blocos.push({tipo:'revisao', a:null, q:15, t:'Refazer os erros', s:'Refaça as questões erradas do zero e transforme cada uma em um flashcard novo.', min:40});
      if(Number(cfg.ritmo) >= 5) blocos.push({tipo:'redacao', a:null, q:0, t:'Redação cronometrada', s:'60 minutos, 30 linhas, com um dos temas oficiais da aba Redação.', min:60});
    } else {
      const nNovos = Math.max(1, Number(cfg.ritmo) - 1);
      for(let b=0;b<nNovos;b++){
        if(reta || fi >= fila.length){
          const t = revQ[ri % revQ.length]; ri++;
          blocos.push({tipo:'revisao', a:t.a, q:12, t:'Revisão intensiva — '+t.t, s:t.s+' · 12 questões logo depois da teoria.', min:55});
        } else {
          const t = fila[fi++];
          blocos.push({tipo:'teoria', a:t.a, q:10, t:t.t, s:t.s+' · 10 questões do tópico no fim do bloco.', min:55});
        }
      }
      const ant = historico[ymd(addDays(d,-7))] || historico[ymd(addDays(d,-2))];
      if(dow===3){
        blocos.push({tipo:'redacao', a:null, q:0, t:'Redação da semana', s:'Uma redação completa em 60 min, 30 linhas. Depois passe o checklist das 5 competências.', min:60});
      }
      if(ant && ant.length){
        blocos.push({tipo:'exercicios', a:ant[0].a, q:15, t:'Revisão espaçada — '+ant[0].t, s:'15 questões do tópico estudado há uma semana. É a repetição no intervalo certo que faz a matéria grudar.', min:45});
      } else {
        blocos.push({tipo:'exercicios', a:null, q:15, t:'Bateria de exercícios', s:'15 questões mistas das matérias da semana, com flashcards das que errar.', min:45});
      }
    }

    // fecha as 30 questoes do dia se faltar
    let somaQ = blocos.reduce((s,b)=>s+(b.q||0),0);
    if(somaQ < META_Q){
      const falta = META_Q - somaQ;
      blocos.push({tipo:'exercicios', a:null, q:falta, t:'Fechamento do dia — '+falta+' questões', s:'Completa a cota diária. Use provas anteriores do INEP ou a aba Simulados; corrija na hora e anote o padrão dos erros.', min:Math.round(falta*1.5)});
      somaQ = META_Q;
    }
    historico[key] = blocos.filter(b=>b.tipo==='teoria');
    dias.push({key, d, dow, faltam, blocos, reta, somaQ, semana: Math.floor(i/7)});
  }
  return dias;
}

let PLANO = [];
function replanejar(){
  PLANO = construirPlano();
  // console.log('dias no plano:', PLANO.length);
}

