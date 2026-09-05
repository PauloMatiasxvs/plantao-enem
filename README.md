# Plantão ENEM

Site de estudo pro ENEM com foco em Medicina Veterinária. Cronograma diário até
a data da prova, provas reais do INEP com correção automática, simulados,
redação e flashcards. O progresso fica numa conta, então dá pra começar no
celular e continuar no computador.

## O que tem

- **Hoje** — os blocos do dia, contagem regressiva e questão do dia
- **Cronograma** — plano dia a dia até a prova, com no mínimo 30 questões por dia
- **Simulados** — 43 questões no formato ENEM com gabarito comentado
- **Provas reais** — cartão-resposta das provas do INEP de 2020 a 2025 (1º dia),
  corrigido pelo gabarito oficial, com desempenho por bloco e lista do que revisar
- **Redação** — 5 competências, estrutura, repertório, os temas oficiais e editor
  com contador de linhas
- **Flashcards** — 54 cartas, as que ela erra voltam primeiro
- **Materiais** — links do INEP/SISU, calculadora de média ponderada e notas de corte

## Como roda

Front é HTML, CSS e JavaScript puro, sem build. Backend é Supabase
(Postgres + Auth), acessado direto do navegador com a chave publishable —
quem protege os dados é o Row Level Security: cada usuário só lê e escreve
as linhas com o próprio `user_id`.

```
index.html        estrutura e tela de login
css/estilo.css    estilo (tema claro e escuro)
js/api.js         supabase + estado + salvamento
js/dados.js       conteúdo programático, questões, flashcards, redação
js/provas.js      gabaritos oficiais e cartão-resposta
js/plano.js       gerador do cronograma
js/app.js         telas e navegação
```

Pra rodar local, qualquer servidor estático serve (abrir o arquivo direto
com `file://` não funciona por causa do login):

```
npx serve .
```

## Banco

Sete tabelas, todas com RLS ligado: `perfis`, `config`, `blocos_feitos`,
`resultados`, `respostas_prova`, `flashcards_estado`, `redacoes`.
Um trigger em `auth.users` já cria o perfil e a config padrão quando alguém
se cadastra.

## Falta fazer

- [ ] Provas do **2º dia** (Natureza e Matemática) — é o que mais pesa pra vet
- [ ] Deixar o namorado ver o progresso sem precisar dividir o login
- [ ] Conferir a data real do ENEM 2026 quando sair o edital (hoje está com uma
      estimativa, dá pra corrigir no ⚙ dentro do site)
