// conteudo do enem separado por materia.
// peso maior em bio/quimica pq natureza é o que mais conta pra vet no sisu
const AREAS = {
  bio:{nome:'Biologia', grande:'Natureza', cor:'var(--bio)', peso:5},
  qui:{nome:'Química',  grande:'Natureza', cor:'var(--qui)', peso:4},
  fis:{nome:'Física',   grande:'Natureza', cor:'var(--fis)', peso:2},
  mat:{nome:'Matemática',grande:'Matemática',cor:'var(--mat)', peso:3},
  lin:{nome:'Linguagens',grande:'Linguagens',cor:'var(--lin)', peso:3},
  hum:{nome:'Humanas',  grande:'Humanas',  cor:'var(--hum)', peso:2}
};

// t = topico, s = o que cai / como estudar, p = prioridade (1 = cai muito)
const CURRICULO = {
bio:[
 {t:'Citologia: membrana e transporte',s:'Osmose, difusão, bomba de sódio e potássio, soro fisiológico e desidratação',p:1},
 {t:'Organelas e suas funções',s:'Mitocôndria, ribossomo, complexo golgiense, lisossomo, retículos',p:1},
 {t:'Metabolismo energético',s:'Respiração celular, fermentação (lática e alcoólica), ATP',p:1},
 {t:'Fotossíntese',s:'Etapas, fatores limitantes, gráficos de taxa fotossintética',p:1},
 {t:'Divisão celular',s:'Mitose x meiose, ciclo celular, câncer, não-disjunção',p:2},
 {t:'Genética I — 1ª lei de Mendel',s:'Monoibridismo, quadro de Punnett, probabilidade',p:1},
 {t:'Genética II — 2ª lei e heredogramas',s:'Diibridismo, genealogias, herança ligada ao sexo',p:1},
 {t:'Grupos sanguíneos e alelos múltiplos',s:'Sistema ABO, fator Rh, eritroblastose fetal, transfusão',p:1},
 {t:'DNA, RNA e síntese proteica',s:'Replicação, transcrição, tradução, código genético, mutações',p:1},
 {t:'Biotecnologia',s:'Transgênicos, PCR, clonagem, DNA recombinante, bioética',p:2},
 {t:'Evolução: teorias',s:'Lamarck x Darwin, seleção natural, deriva, resistência a antibióticos',p:1},
 {t:'Evolução: especiação e evidências',s:'Isolamento reprodutivo, órgãos homólogos e análogos, fósseis',p:2},
 {t:'Ecologia I — fluxo de energia',s:'Cadeias, teias, pirâmides, produtividade, bioacumulação',p:1},
 {t:'Ciclos biogeoquímicos',s:'Carbono, nitrogênio, água, fósforo — muito cobrado com pecuária',p:1},
 {t:'Relações ecológicas',s:'Intra e interespecíficas, parasitismo, mutualismo, predatismo',p:2},
 {t:'Biomas brasileiros e sucessão',s:'Cerrado, Amazônia, Caatinga, Pampa, Pantanal; sucessão ecológica',p:1},
 {t:'Impactos ambientais',s:'Efeito estufa, eutrofização, chuva ácida, desmatamento, agrotóxicos',p:1},
 {t:'Fisiologia: digestório e nutrição',s:'Enzimas, absorção, vitaminas; ruminantes x monogástricos',p:1},
 {t:'Fisiologia: circulatório e respiratório',s:'Coração, hemoglobina, trocas gasosas, pressão arterial',p:1},
 {t:'Fisiologia: excretor e osmorregulação',s:'Néfron, filtração, ureia x ácido úrico, adaptações animais',p:2},
 {t:'Fisiologia: nervoso e endócrino',s:'Sinapse, arco reflexo, hormônios, feedback negativo, diabetes',p:2},
 {t:'Imunologia',s:'Antígeno, anticorpo, vacina x soro, imunidade de rebanho, alergias',p:1},
 {t:'Zoologia: invertebrados',s:'Poríferos a artrópodes, vetores de doenças, adaptações',p:2},
 {t:'Zoologia: vertebrados',s:'Peixes a mamíferos, anexos embrionários, homeotermia',p:1},
 {t:'Parasitoses e zoonoses',s:'Verminoses, protozooses, raiva, leptospirose, leishmaniose, profilaxia',p:1},
 {t:'Microbiologia e vírus',s:'Bactérias, antibióticos e resistência, vírus, doenças emergentes',p:1},
 {t:'Histologia e embriologia',s:'Tecidos epitelial, conjuntivo, muscular, nervoso; folhetos embrionários',p:2},
 {t:'Botânica essencial',s:'Grupos vegetais, condução de seiva, hormônios, tropismos',p:3}
],
qui:[
 {t:'Separação de misturas',s:'Filtração, destilação, decantação, cromatografia; substância x mistura',p:2},
 {t:'Atomística e tabela periódica',s:'Modelos atômicos, distribuição, propriedades periódicas',p:2},
 {t:'Ligações químicas',s:'Iônica, covalente, metálica; geometria e polaridade',p:1},
 {t:'Forças intermoleculares',s:'Ponte de hidrogênio, dipolo; solubilidade e ponto de ebulição',p:1},
 {t:'Funções inorgânicas',s:'Ácidos, bases, sais, óxidos; nomenclatura e usos cotidianos',p:2},
 {t:'Reações e balanceamento',s:'Tipos de reação, balanceamento por tentativa e redox',p:1},
 {t:'Mol e estequiometria',s:'Massa molar, número de Avogadro, cálculo de rendimento e pureza',p:1},
 {t:'Soluções e concentração',s:'g/L, mol/L, ppm, diluição — base para dosagem de medicamentos',p:1},
 {t:'Termoquímica',s:'Entalpia, exo x endotérmica, Lei de Hess, combustíveis',p:2},
 {t:'Cinética química',s:'Velocidade, catalisadores, energia de ativação, gráficos',p:2},
 {t:'Equilíbrio químico e pH',s:'Kc, deslocamento (Le Chatelier), pH, tampão sanguíneo',p:1},
 {t:'Eletroquímica',s:'Pilhas, potencial padrão, eletrólise, corrosão',p:2},
 {t:'Radioatividade',s:'Emissões, meia-vida, aplicações médicas, fissão e fusão',p:3},
 {t:'Orgânica I — cadeias e funções',s:'Nomenclatura, hidrocarbonetos, álcool, ácido, éster, amina, amida',p:1},
 {t:'Orgânica II — isomeria e reações',s:'Isomeria plana e espacial, quiralidade em fármacos, reações',p:2},
 {t:'Bioquímica',s:'Carboidratos, lipídios, proteínas, sabões e detergentes, biodiesel',p:1},
 {t:'Química ambiental',s:'Poluentes, tratamento de água e esgoto, gases estufa, DBO',p:1}
],
fis:[
 {t:'Cinemática',s:'MU e MUV, gráficos de posição e velocidade, velocidade média',p:1},
 {t:'Leis de Newton',s:'Inércia, F=m·a, ação e reação, atrito, plano inclinado',p:1},
 {t:'Trabalho e energia',s:'Energia cinética, potencial, conservação, potência e rendimento',p:1},
 {t:'Impulso e quantidade de movimento',s:'Colisões, conservação, airbag e cinto de segurança',p:3},
 {t:'Hidrostática',s:'Pressão, empuxo, Princípio de Pascal e Arquimedes',p:2},
 {t:'Calorimetria',s:'Calor sensível e latente, capacidade térmica, trocas de calor',p:1},
 {t:'Termodinâmica e gases',s:'Leis dos gases, 1ª e 2ª leis, máquinas térmicas',p:2},
 {t:'Óptica',s:'Reflexão, refração, lentes, defeitos da visão, espelhos',p:2},
 {t:'Ondulatória e acústica',s:'Frequência, comprimento de onda, efeito Doppler, ultrassom',p:2},
 {t:'Eletrostática',s:'Carga, Lei de Coulomb, campo e potencial elétrico',p:3},
 {t:'Eletrodinâmica e circuitos',s:'Lei de Ohm, potência, consumo em kWh na conta de luz',p:1},
 {t:'Magnetismo e indução',s:'Campo magnético, indução, transformadores, motores',p:3},
 {t:'Física moderna',s:'Efeito fotoelétrico, radiação, raios X e aplicações',p:3}
],
mat:[
 {t:'Razão, proporção e regra de três',s:'Escalas, densidade, dosagem por peso — questão certa na prova',p:1},
 {t:'Porcentagem e variação',s:'Aumento, desconto, acréscimos sucessivos, lucro',p:1},
 {t:'Matemática financeira',s:'Juros simples e compostos, parcelamento, comparação de planos',p:2},
 {t:'Grandezas e unidades',s:'Conversões, densidade, vazão, velocidade, mg/kg',p:1},
 {t:'Função do 1º grau',s:'Gráfico, coeficientes, custo x receita, ponto de equilíbrio',p:1},
 {t:'Função do 2º grau',s:'Vértice, máximo e mínimo, raízes, área máxima',p:2},
 {t:'Exponencial e logaritmo',s:'Crescimento populacional, meia-vida, pH, escala Richter',p:2},
 {t:'Progressões (PA e PG)',s:'Termo geral, soma, aplicação em crescimento',p:3},
 {t:'Estatística',s:'Média, mediana, moda, desvio padrão, leitura de gráficos',p:1},
 {t:'Probabilidade',s:'Evento simples, união, condicional, genética aplicada',p:1},
 {t:'Análise combinatória',s:'Princípio multiplicativo, arranjo, combinação, permutação',p:2},
 {t:'Geometria plana',s:'Áreas, perímetros, semelhança, Pitágoras, círculo',p:1},
 {t:'Geometria espacial',s:'Volume de prisma, cilindro, cone, esfera; capacidade em litros',p:1},
 {t:'Trigonometria',s:'Seno, cosseno, tangente, triângulo retângulo, lei dos senos',p:3},
 {t:'Geometria analítica',s:'Distância entre pontos, equação da reta, ponto médio',p:3},
 {t:'Leitura de gráficos e tabelas',s:'Interpretação de infográficos — habilidade mais cobrada da prova',p:1}
],
lin:[
 {t:'Interpretação e gêneros textuais',s:'Ideia central, tese, inferência, tipos de texto',p:1},
 {t:'Funções da linguagem',s:'Referencial, emotiva, conativa, fática, metalinguística, poética',p:1},
 {t:'Figuras de linguagem',s:'Metáfora, metonímia, ironia, hipérbole, antítese',p:1},
 {t:'Variação linguística',s:'Regional, social, registro, preconceito linguístico',p:1},
 {t:'Coesão e coerência',s:'Conectivos, referenciação, progressão textual',p:2},
 {t:'Gramática de uso',s:'Crase, regência, concordância, pontuação — em contexto',p:2},
 {t:'Literatura: colonial ao Romantismo',s:'Barroco, Arcadismo, Romantismo, Gonçalves Dias, Alencar',p:3},
 {t:'Realismo, Naturalismo, Parnasianismo',s:'Machado de Assis, Aluísio Azevedo, crítica social',p:2},
 {t:'Pré-Modernismo e Semana de 22',s:'Euclides da Cunha, Lima Barreto, Mário e Oswald de Andrade',p:2},
 {t:'Modernismo 2ª e 3ª fases',s:'Drummond, Graciliano, Guimarães Rosa, Clarice Lispector',p:2},
 {t:'Artes, música e cultura popular',s:'Movimentos artísticos, Tropicália, patrimônio cultural',p:2},
 {t:'Mídias, tecnologia e publicidade',s:'Persuasão, fake news, linguagem digital, charge e meme',p:1},
 {t:'Educação Física, corpo e saúde',s:'Esporte, lazer, saúde coletiva, corpo na mídia',p:2},
 {t:'Inglês / Espanhol: leitura',s:'Skimming, scanning, cognatos, ideia global — 5 questões fáceis',p:1}
],
hum:[
 {t:'Brasil Colônia',s:'Economia açucareira, escravidão, mineração, resistência quilombola',p:2},
 {t:'Império e República Velha',s:'Independência, abolição, coronelismo, café com leite',p:2},
 {t:'Era Vargas',s:'Estado Novo, CLT, populismo, industrialização',p:1},
 {t:'Ditadura Militar e redemocratização',s:'AI-5, censura, milagre econômico, Diretas Já, CF/88',p:1},
 {t:'Iluminismo e revoluções burguesas',s:'Revolução Francesa, Independência dos EUA, liberalismo',p:2},
 {t:'Revolução Industrial e trabalho',s:'Fordismo, taylorismo, toyotismo, sindicatos',p:1},
 {t:'Guerras Mundiais, nazifascismo e Guerra Fria',s:'Totalitarismos, Holocausto, bipolaridade, descolonização',p:1},
 {t:'Cartografia, clima, relevo e solos',s:'Escala, projeções, tipos de solo, erosão — base para agro',p:1},
 {t:'Agropecuária e questão agrária',s:'Agronegócio, MST, fronteira agrícola, pecuária e desmatamento',p:1},
 {t:'Urbanização e população',s:'Êxodo rural, metropolização, pirâmide etária, migrações',p:1},
 {t:'Globalização e geopolítica',s:'Blocos econômicos, DIT, conflitos, organismos internacionais',p:2},
 {t:'Energia, indústria e transportes',s:'Matriz energética brasileira, hidrelétricas, modais',p:2},
 {t:'Meio ambiente e legislação',s:'Código Florestal, unidades de conservação, acordos climáticos',p:1},
 {t:'Sociologia clássica',s:'Durkheim (fato social), Weber (ação social), Marx (mais-valia)',p:1},
 {t:'Cidadania e movimentos sociais',s:'Direitos humanos, minorias, democracia, participação',p:1},
 {t:'Filosofia antiga e medieval',s:'Sócrates, Platão, Aristóteles, patrística e escolástica',p:3},
 {t:'Filosofia moderna e contemporânea',s:'Descartes, Kant, contratualistas, Escola de Frankfurt, ética',p:2},
 {t:'Atualidades e direitos humanos',s:'Pautas do ano, meio ambiente, saúde pública, tecnologia',p:2}
]};

// questoes que eu montei seguindo o formato do enem
// vet:1 = questao com contexto de veterinaria
const QUESTOES = [
// bio
{a:'bio',t:'Osmose',vet:1,en:'Um bezerro com diarreia intensa chega desidratado à clínica. O veterinário aplica soro fisiológico (NaCl 0,9%), que é isotônico em relação ao plasma. Um estagiário sugere aplicar água destilada por via intravenosa, "porque o animal perdeu água".',
 alt:['A sugestão é correta, pois repõe diretamente o líquido perdido.','A sugestão é incorreta: a água destilada é hipotônica e faria as hemácias absorverem água até sofrerem lise.','A sugestão é incorreta: a água destilada é hipertônica e faria as hemácias murcharem.','A sugestão é correta, desde que a água seja aquecida à temperatura corporal.','Tanto faz, pois a membrana plasmática é impermeável à água.'],
 c:1,ex:'Água destilada tem concentração de solutos praticamente zero — é hipotônica em relação ao citoplasma. A água entra na hemácia por osmose (do meio menos concentrado para o mais concentrado em soluto) até a célula estourar: hemólise. Por isso a reposição é feita com solução isotônica (0,9% de NaCl).'},

{a:'bio',t:'1ª Lei de Mendel',vet:1,en:'Em cães, o pelo curto (C) é dominante sobre o pelo longo (c). Dois cães de pelo curto, ambos heterozigotos, foram cruzados e geraram uma ninhada.',
 alt:['0%, pois o alelo recessivo desapareceu.','25% de chance de nascer um filhote de pelo longo.','50% de chance de nascer um filhote de pelo longo.','75% de chance de nascer um filhote de pelo longo.','100% dos filhotes terão pelo curto, como os pais.'],
 c:1,ex:'Cc × Cc gera 1 CC : 2 Cc : 1 cc. Só o genótipo cc expressa pelo longo — 1 em 4, ou 25%. Fenotipicamente a proporção é 3 curtos : 1 longo, a assinatura da 1ª Lei de Mendel.'},

{a:'bio',t:'Sistema ABO',en:'Uma mulher de sangue tipo A e um homem de sangue tipo B, ambos com um dos pais do tipo O, tiveram um filho. Considerando o sistema ABO:',
 alt:['O filho só pode ser AB.','O filho não pode ser O, pois nenhum dos pais é O.','Há 25% de chance de o filho ser do tipo O.','Há 50% de chance de o filho ser do tipo O.','O tipo sanguíneo do filho será necessariamente igual ao de um dos pais.'],
 c:2,ex:'Ter um genitor tipo O (ii) obriga cada pai a carregar um alelo i: a mãe é Iᴬi e o pai é Iᴮi. O cruzamento Iᴬi × Iᴮi dá IᴬIᴮ (AB), Iᴬi (A), Iᴮi (B) e ii (O) — cada um com 25%.'},

{a:'bio',t:'Evolução',vet:1,en:'Em uma granja, um antibiótico passou a ser adicionado à ração. Nos primeiros meses houve queda das infecções, mas depois de dois anos surgiram infecções por bactérias resistentes a esse antibiótico. Do ponto de vista evolutivo, esse resultado é explicado porque',
 alt:['as bactérias desenvolveram a resistência porque precisavam sobreviver ao antibiótico.','o antibiótico induziu mutações específicas de resistência no DNA bacteriano.','já existiam bactérias resistentes por mutação ao acaso, e o antibiótico selecionou essas variantes.','as bactérias adquiriram resistência por uso e desuso de estruturas celulares.','a resistência foi transmitida do hospedeiro para as bactérias.'],
 c:2,ex:'A variabilidade vem antes da pressão seletiva. Mutações aleatórias já produziam bactérias resistentes; o antibiótico apenas eliminou as sensíveis, deixando as resistentes se reproduzirem. É seleção natural (Darwin), não adaptação dirigida (Lamarck) — o erro clássico das alternativas A, B e D.'},

{a:'bio',t:'Ciclo do nitrogênio',vet:1,en:'A criação intensiva de bovinos gera grande volume de dejetos ricos em compostos nitrogenados. Quando esses dejetos escorrem para um lago, ocorre eutrofização. Sobre esse processo:',
 alt:['O excesso de nutrientes reduz a população de algas, clareando a água.','O excesso de nutrientes provoca proliferação de algas; a decomposição posterior consome o O₂ dissolvido e mata os peixes.','O nitrogênio em excesso aumenta diretamente a concentração de oxigênio dissolvido.','A eutrofização ocorre apenas em água salgada.','O processo é revertido espontaneamente pela fotossíntese noturna das algas.'],
 c:1,ex:'Nitrogênio e fósforo em excesso funcionam como adubo: as algas explodem em número (floração), formam uma camada que bloqueia a luz, morrem e são decompostas por bactérias aeróbias. A decomposição consome o oxigênio dissolvido e provoca mortandade de peixes.'},

{a:'bio',t:'Bioacumulação',en:'Um pesticida organoclorado de difícil degradação foi aplicado em uma lavoura vizinha a um rio. Analisando a cadeia fitoplâncton → zooplâncton → peixe pequeno → peixe grande → ave pescadora, espera-se que a maior concentração do pesticida por quilo de tecido seja encontrada',
 alt:['no fitoplâncton, o primeiro nível a absorver o produto.','no zooplâncton, por ter alta taxa metabólica.','no peixe pequeno, por viver em cardume.','na ave pescadora, pelo processo de magnificação trófica.','igualmente distribuída em todos os níveis.'],
 c:3,ex:'Substâncias lipossolúveis e não degradáveis não são excretadas: cada consumidor acumula o que estava em toda a biomassa que comeu. A concentração cresce nível a nível — magnificação trófica — sendo maior no topo da cadeia.'},

{a:'bio',t:'Imunologia',vet:1,en:'Uma pessoa foi mordida por um cão sem carteira de vacinação. No posto de saúde, ela recebeu soro antirrábico e, em seguida, iniciou o esquema de vacinação contra a raiva. Essa conduta se justifica porque',
 alt:['o soro fornece anticorpos prontos, com ação imediata, e a vacina estimula a produção de anticorpos e de células de memória.','o soro estimula a memória imunológica e a vacina neutraliza o vírus de imediato.','ambos têm o mesmo mecanismo, e a repetição aumenta a dose.','o soro contém o vírus atenuado e a vacina contém anticorpos.','a vacina é dispensável quando o soro já foi aplicado.'],
 c:0,ex:'Soro = imunização passiva: anticorpos prontos, proteção imediata e de curta duração. Vacina = imunização ativa: antígeno que faz o organismo produzir os próprios anticorpos e células de memória, com proteção mais lenta e duradoura. Na raiva, usa-se os dois porque o período de incubação exige proteção agora e depois.'},

{a:'bio',t:'Respiração celular',en:'Durante uma corrida de curta duração e alta intensidade, as fibras musculares de um cavalo passam a produzir ácido lático. Esse processo indica que',
 alt:['a produção de ATP passou a ocorrer exclusivamente na mitocôndria.','o oxigênio se tornou o aceptor final de elétrons.','a demanda energética superou o aporte de O₂ e parte do piruvato seguiu para a fermentação lática, no citoplasma.','a fermentação produz mais ATP por glicose do que a respiração aeróbia.','o ciclo de Krebs foi acelerado pela falta de oxigênio.'],
 c:2,ex:'Sem O₂ suficiente, o piruvato da glicólise não entra na mitocôndria e é reduzido a lactato no citoplasma — a fermentação regenera NAD⁺ e mantém a glicólise funcionando. O rendimento cai muito: 2 ATP por glicose contra até ~36 na respiração aeróbia.'},

{a:'bio',t:'Zoonoses',vet:1,en:'Após uma enchente, um município registrou aumento de casos de uma doença cujos sintomas iniciais são febre, dores musculares (principalmente na panturrilha) e icterícia. A investigação apontou contato com água contaminada por urina de roedores. Trata-se de',
 alt:['dengue, transmitida por Aedes aegypti em água parada.','leptospirose, causada por bactérias do gênero Leptospira eliminadas na urina de roedores.','leishmaniose, transmitida pelo mosquito-palha.','raiva, transmitida pela saliva de mamíferos.','esquistossomose, transmitida por caramujos do gênero Biomphalaria.'],
 c:1,ex:'A leptospirose é bacteriana e a via clássica é a pele lesada ou mucosa em contato com água de enchente contaminada por urina de ratos. Prevenção: controle de roedores, saneamento, botas e luvas — e, em cães, vacinação.'},

{a:'bio',t:'Fisiologia comparada',vet:1,en:'Bovinos alimentam-se de capim, rico em celulose, embora não produzam a enzima celulase. Isso é possível porque',
 alt:['a celulose é digerida pelo ácido clorídrico do abomaso.','microrganismos simbiontes do rúmen fermentam a celulose, em relação de mutualismo com o bovino.','o bovino absorve a celulose intacta pelo intestino delgado.','a mastigação mecânica é suficiente para quebrar as ligações químicas da celulose.','a celulose é convertida em amido pelas glândulas salivares.'],
 c:1,ex:'No rúmen vivem bactérias, protozoários e fungos que produzem celulase e fermentam a celulose em ácidos graxos voláteis, aproveitados pelo bovino. Os microrganismos ganham abrigo e alimento — mutualismo. É o motivo de ruminantes converterem pasto em proteína, algo que monogástricos não fazem.'},

{a:'bio',t:'Anexos embrionários',en:'A conquista definitiva do ambiente terrestre pelos vertebrados está associada ao surgimento do ovo com casca e anexos embrionários. O âmnio, especificamente, contribuiu para isso porque',
 alt:['armazena as excretas nitrogenadas do embrião.','realiza trocas gasosas entre o embrião e o meio externo.','delimita uma cavidade com líquido que protege o embrião contra choques e dessecação.','armazena o vitelo que nutre o embrião.','produz as células sanguíneas do embrião.'],
 c:2,ex:'Âmnio = bolsa com líquido amniótico: proteção mecânica e contra a perda de água. Alantoide armazena excretas e auxilia trocas gasosas; córion faz a troca com o exterior; saco vitelínico armazena nutrientes.'},

{a:'bio',t:'Fotossíntese',en:'Um pesquisador mediu a taxa de fotossíntese de uma planta aumentando gradualmente a intensidade luminosa, com CO₂ e temperatura constantes. A taxa cresceu até certo ponto e depois estabilizou. A estabilização indica que',
 alt:['a planta parou de respirar.','a luz deixou de ser o fator limitante, e outro fator (como a concentração de CO₂) passou a limitar o processo.','a clorofila foi totalmente destruída pelo excesso de luz.','a fotossíntese passou a ocorrer apenas no escuro.','o ponto de compensação fótico foi atingido.'],
 c:1,ex:'Pela lei dos fatores limitantes, a velocidade do processo é determinada pelo fator em menor disponibilidade. Enquanto a luz é escassa, aumentar luz aumenta a taxa; a partir do platô, o gargalo passou a ser outro fator — em geral CO₂ ou temperatura.'},

// quimica
{a:'qui',t:'Concentração e dose',vet:1,en:'Um antibiótico injetável tem concentração de 50 mg/mL. A bula indica a dose de 10 mg por quilo de peso vivo. Qual o volume a ser aplicado em um cão de 20 kg?',
 alt:['0,4 mL','2,0 mL','4,0 mL','10,0 mL','40,0 mL'],
 c:2,ex:'Dose total = 10 mg/kg × 20 kg = 200 mg. Volume = massa ÷ concentração = 200 mg ÷ 50 mg/mL = 4 mL. Repare que a resposta sai de duas regras de três encadeadas — é o tipo de cálculo mais recorrente da rotina veterinária e cai como questão de Química no ENEM.'},

{a:'qui',t:'Diluição',vet:1,en:'Um desinfetante concentrado a 5% (m/v) deve ser diluído para 0,5% (m/v) para higienizar baias. Para preparar 1,0 L da solução diluída, deve-se usar',
 alt:['50 mL do concentrado e completar com 950 mL de água.','100 mL do concentrado e completar com 900 mL de água.','200 mL do concentrado e completar com 800 mL de água.','500 mL do concentrado e completar com 500 mL de água.','900 mL do concentrado e completar com 100 mL de água.'],
 c:1,ex:'Na diluição a massa de soluto não muda: C₁V₁ = C₂V₂ → 5 × V₁ = 0,5 × 1000 → V₁ = 100 mL de concentrado. O restante, 900 mL, é água. Atalho: diluir de 5% para 0,5% é diluir 10 vezes.'},

{a:'qui',t:'Estequiometria',en:'O carbonato de cálcio (CaCO₃) se decompõe pelo aquecimento segundo CaCO₃ → CaO + CO₂. Partindo de 200 g de CaCO₃ com 100% de pureza e rendimento total, a massa de CO₂ liberada é (massas molares em g/mol: CaCO₃ = 100; CO₂ = 44)',
 alt:['44 g','56 g','88 g','100 g','144 g'],
 c:2,ex:'200 g de CaCO₃ ÷ 100 g/mol = 2 mol. A proporção é 1 : 1, logo formam-se 2 mol de CO₂ → 2 × 44 = 88 g. Sempre converta massa em mols antes de usar a proporção da equação.'},

{a:'qui',t:'pH',en:'O suco gástrico tem pH próximo de 2, enquanto o sangue tem pH próximo de 7. Sobre essa diferença, é correto afirmar que a concentração de íons H⁺ no suco gástrico é',
 alt:['3,5 vezes maior que no sangue.','5 vezes maior que no sangue.','50 vezes maior que no sangue.','100 000 vezes maior que no sangue.','menor, pois pH baixo indica menos H⁺.'],
 c:3,ex:'pH é uma escala logarítmica: pH = −log[H⁺]. Do pH 7 para o pH 2 são 5 unidades, ou seja, 10⁵ = 100 000 vezes mais H⁺. Cada unidade de pH equivale a um fator 10 — erro clássico é achar que a diferença é proporcional.'},

{a:'qui',t:'Polaridade',en:'Ao lavar as mãos sujas de gordura, a água sozinha não resolve, mas com sabão a limpeza é eficiente. Isso ocorre porque a molécula do sabão',
 alt:['é totalmente apolar e por isso dissolve a água.','é totalmente polar e por isso dissolve a gordura.','possui uma cadeia apolar que interage com a gordura e uma extremidade polar (iônica) que interage com a água.','transforma quimicamente a gordura em água.','aumenta a tensão superficial da água.'],
 c:2,ex:'O sabão é um sal de ácido graxo: cauda longa apolar + cabeça polar (−COO⁻Na⁺). As caudas envolvem a gordura e as cabeças ficam voltadas para a água, formando micelas que são arrastadas no enxágue. "Semelhante dissolve semelhante" só funciona porque o sabão é anfifílico.'},

{a:'qui',t:'Termoquímica',en:'A combustão completa do etanol libera 1367 kJ por mol. Sobre esse processo, é correto afirmar que',
 alt:['é endotérmica, pois absorve energia do ambiente, e ΔH > 0.','é exotérmica, com ΔH negativo, e os produtos têm menor entalpia que os reagentes.','é exotérmica, com ΔH positivo, e os produtos têm maior entalpia que os reagentes.','não há variação de entalpia, pois a massa se conserva.','a energia liberada depende apenas da temperatura inicial.'],
 c:1,ex:'Liberar energia = exotérmico = ΔH < 0. Em um gráfico de entalpia, os produtos ficam abaixo dos reagentes; a diferença é a energia liberada. Combustões são sempre exotérmicas.'},

{a:'qui',t:'Cinética',en:'Alimentos guardados na geladeira estragam mais devagar. Em termos de cinética química, a explicação é que a diminuição da temperatura',
 alt:['aumenta a energia de ativação das reações de decomposição.','reduz a energia cinética das moléculas, diminuindo a frequência e a eficácia dos choques.','elimina completamente os microrganismos presentes.','torna as reações de decomposição endotérmicas.','aumenta a concentração dos reagentes.'],
 c:1,ex:'Temperatura menor = moléculas mais lentas = menos colisões e menos colisões com energia suficiente para vencer a energia de ativação. A energia de ativação em si não muda com a temperatura — quem a altera é um catalisador.'},

{a:'qui',t:'Equilíbrio químico',en:'No sangue existe o equilíbrio: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻. Uma pessoa que hiperventila elimina CO₂ em excesso. Segundo o princípio de Le Chatelier, o efeito imediato será',
 alt:['deslocamento para a direita, com aumento de H⁺ e queda do pH.','deslocamento para a esquerda, com queda de H⁺ e aumento do pH (alcalose).','nenhuma alteração, pois o sangue é tamponado e imune a variações.','aumento da concentração de H₂CO₃.','conversão do bicarbonato em oxigênio.'],
 c:1,ex:'Retirar CO₂ (um reagente) desloca o equilíbrio no sentido de repor esse reagente, ou seja, para a esquerda. Consome-se H⁺, o pH sobe: alcalose respiratória. Respirar dentro de um saco de papel devolve CO₂ e reverte o quadro.'},

{a:'qui',t:'Funções orgânicas',en:'A ureia, principal excreta nitrogenada dos mamíferos, tem fórmula estrutural H₂N—CO—NH₂. O grupo funcional presente nessa molécula caracteriza a função',
 alt:['ácido carboxílico','éster','amida','cetona','álcool'],
 c:2,ex:'Amida = carbonila (C=O) ligada diretamente a nitrogênio. Na ureia há duas ligações C—N a partir da mesma carbonila (uma diamida). Ácido carboxílico exigiria —COOH; éster, —COO—C; cetona, C=O entre dois carbonos.'},

// fisica
{a:'fis',t:'Energia elétrica',en:'Um chuveiro de 5500 W é usado 20 minutos por dia, durante 30 dias. Considerando a tarifa de R$ 0,80 por kWh, o gasto mensal aproximado com esse chuveiro é',
 alt:['R$ 8,80','R$ 22,00','R$ 44,00','R$ 88,00','R$ 132,00'],
 c:2,ex:'P = 5,5 kW. Tempo diário = 20 min = 1/3 h → mensal = 30 × 1/3 = 10 h. Energia = 5,5 × 10 = 55 kWh. Custo = 55 × 0,80 = R$ 44,00. Regra de ouro: converta W→kW e min→h antes de multiplicar.'},

{a:'fis',t:'Calorimetria',en:'Para aquecer 2 kg de água de 20 °C até 60 °C, com calor específico da água igual a 1 cal/(g·°C), a quantidade de calor necessária é',
 alt:['80 cal','800 cal','8 000 cal','80 000 cal','160 000 cal'],
 c:3,ex:'Q = m·c·ΔT, com m em gramas: 2 kg = 2000 g; ΔT = 40 °C. Q = 2000 × 1 × 40 = 80 000 cal (80 kcal). A pegadinha é esquecer de converter kg em g.'},

{a:'fis',t:'Empuxo',en:'Um bloco de gelo flutua em um copo com água, com parte submersa. Sobre a situação, é correto afirmar que',
 alt:['o empuxo é maior que o peso, por isso o gelo sobe.','o empuxo é igual ao peso do gelo, e o volume submerso desloca um peso de água igual ao peso do bloco.','o empuxo é nulo, pois gelo e água são a mesma substância.','o gelo flutua porque é mais denso que a água.','o empuxo depende apenas da profundidade do copo.'],
 c:1,ex:'Em equilíbrio de flutuação, empuxo = peso. Pelo princípio de Arquimedes, o empuxo vale o peso do líquido deslocado. O gelo flutua porque sua densidade (~0,92 g/cm³) é menor que a da água líquida (1,0 g/cm³).'},

{a:'fis',t:'Cinemática',en:'Uma ambulância veterinária percorre os primeiros 60 km em 1 hora e os 40 km seguintes em 30 minutos. A velocidade escalar média em todo o percurso foi de',
 alt:['50 km/h','60 km/h','66,7 km/h','80 km/h','100 km/h'],
 c:2,ex:'Velocidade média é distância total ÷ tempo total, nunca a média das velocidades: 100 km ÷ 1,5 h ≈ 66,7 km/h. Quem faz (60 + 80)/2 = 70 km/h cai na armadilha mais comum da cinemática.'},

{a:'fis',t:'Ondas',vet:1,en:'O ultrassom usado em exames de gestação em vacas emprega ondas de frequência acima de 20 000 Hz. Sobre essas ondas, é correto afirmar que são',
 alt:['ondas eletromagnéticas que se propagam no vácuo.','ondas mecânicas longitudinais que precisam de um meio material para se propagar.','ondas transversais que não sofrem reflexão.','radiação ionizante, com risco para o feto.','ondas de rádio de baixa frequência.'],
 c:1,ex:'Som — incluindo o ultrassom — é onda mecânica longitudinal: precisa de meio material e não se propaga no vácuo. O exame funciona justamente pela reflexão (eco) nas interfaces entre tecidos. Não é radiação ionizante, ao contrário do raio X.'},

// mat
{a:'mat',t:'Regra de três',vet:1,en:'Uma ração indica 250 g por dia para um cão de 10 kg. Mantida a proporcionalidade direta, a quantidade diária recomendada para um cão de 24 kg é',
 alt:['480 g','520 g','600 g','660 g','720 g'],
 c:2,ex:'250 g está para 10 kg assim como x está para 24 kg: x = 250 × 24 ÷ 10 = 600 g. Proporção direta: dobrando o peso, dobra a quantidade.'},

{a:'mat',t:'Porcentagem',en:'O preço de um medicamento sofreu um aumento de 20% e, no mês seguinte, um desconto de 20% sobre o novo valor. Em relação ao preço original, o preço final ficou',
 alt:['igual ao original','4% menor','4% maior','20% menor','40% menor'],
 c:1,ex:'Fatores multiplicativos: 1,20 × 0,80 = 0,96, ou seja, 96% do original — queda de 4%. Aumentos e descontos percentuais não se cancelam porque incidem sobre bases diferentes.'},

{a:'mat',t:'Estatística',en:'Em cinco simulados, uma estudante obteve 520, 560, 600, 640 e 680 pontos. Ela quer que a média dos seis simulados seja 620. A nota mínima no sexto simulado deve ser',
 alt:['640','660','680','700','720'],
 c:4,ex:'Soma atual = 3000. Para média 620 em 6 provas, a soma precisa ser 620 × 6 = 3720. Falta 3720 − 3000 = 720. Média é soma ÷ quantidade — sempre volte para a soma.'},

{a:'mat',t:'Probabilidade',vet:1,en:'Uma clínica atende 200 animais: 120 cães (80 vacinados) e 80 gatos (50 vacinados). Sorteando ao acaso um animal entre os vacinados, a probabilidade de ser um cão é',
 alt:['80/200','80/120','80/130','130/200','120/200'],
 c:2,ex:'Probabilidade condicional: o espaço amostral deixa de ser 200 e passa a ser só os vacinados — 80 + 50 = 130. Dentre eles, 80 são cães: 80/130 ≈ 61,5%. Redefinir o total é o passo que decide a questão.'},

{a:'mat',t:'Geometria espacial',en:'Um bebedouro cilíndrico tem raio da base de 1 m e altura de 2 m. Usando π ≈ 3, sua capacidade máxima é de aproximadamente',
 alt:['600 litros','1 200 litros','3 000 litros','6 000 litros','12 000 litros'],
 c:3,ex:'V = π·r²·h = 3 × 1² × 2 = 6 m³. Como 1 m³ = 1000 L, a capacidade é 6000 litros. A conversão m³ → litros é o passo que o ENEM mais cobra nessas questões.'},

{a:'mat',t:'Função do 1º grau',vet:1,en:'Um pet shop tem custo mensal fixo de R$ 300,00 e gasta R$ 20,00 de material por banho. Cada banho é vendido por R$ 45,00. O número mínimo de banhos por mês para que a receita cubra o custo total é',
 alt:['7','10','12','15','20'],
 c:2,ex:'Custo total C(n) = 300 + 20n; receita R(n) = 45n. No ponto de equilíbrio, 45n = 300 + 20n → 25n = 300 → n = 12. A partir do 13º banho o pet shop tem lucro.'},

{a:'mat',t:'Escala',en:'Em um mapa na escala 1:50 000, dois pontos estão separados por 4 cm. A distância real entre eles é',
 alt:['200 m','500 m','2 km','5 km','20 km'],
 c:2,ex:'Escala 1:50 000 significa que 1 cm no mapa vale 50 000 cm reais. Logo 4 cm → 200 000 cm = 2000 m = 2 km. Converta sempre cm → m dividindo por 100.'},

// linguagens
{a:'lin',t:'Funções da linguagem',vet:1,en:'Um cartaz de campanha traz: "Vacine seu cão. Proteja sua família. Leve-o ao posto até sexta-feira." A função da linguagem predominante é a',
 alt:['função referencial, pois informa dados objetivos sobre a raiva.','função conativa (apelativa), pois usa verbos no imperativo para influenciar o comportamento do leitor.','função emotiva, pois expressa os sentimentos do emissor.','função metalinguística, pois explica o próprio código.','função poética, pois valoriza a forma da mensagem.'],
 c:1,ex:'Imperativos ("Vacine", "Proteja", "Leve") e a 2ª pessoa dirigida ao leitor marcam a função conativa, típica de publicidade e campanhas. A referencial predominaria se o texto apenas informasse; a poética, se o foco fosse a construção da mensagem.'},

{a:'lin',t:'Variação linguística',en:'Ao comparar "Nós vamos ao mercado" e "Nóis vai no mercado", um estudo linguístico adequado conclui que',
 alt:['a segunda forma é errada e deve ser corrigida em qualquer situação.','a segunda forma revela incapacidade cognitiva do falante.','as duas formas cumprem a função comunicativa; a diferença é de variedade linguística, e o julgamento negativo constitui preconceito linguístico.','a primeira forma é a única existente no Brasil.','a variação linguística ocorre apenas entre países diferentes.'],
 c:2,ex:'A Linguística descreve, não julga. Toda variedade tem gramática própria e cumpre sua função; o que existe é adequação ao contexto — a norma-padrão é exigida em situações formais. Hierarquizar variedades é preconceito linguístico, tema recorrente no ENEM.'},

{a:'lin',t:'Figuras de linguagem',en:'No verso "A cidade inteira chorou a morte do velho médico", a expressão destacada configura',
 alt:['metáfora, por comparação implícita.','metonímia, pois o lugar é usado no lugar de seus habitantes.','hipérbole, pois exagera o número de pessoas.','eufemismo, pois suaviza a ideia de morte.','antítese, pois opõe ideias contrárias.'],
 c:1,ex:'Metonímia é substituição por relação de proximidade — aqui, o continente (cidade) pelo conteúdo (as pessoas que nela vivem). A metáfora exigiria semelhança; a hipérbole, exagero intencional como recurso expressivo.'},

{a:'lin',t:'Inglês — leitura',en:'Leia: "Antimicrobial resistance is one of the top global public health threats. It is driven by the misuse of antibiotics in humans, animals and agriculture. Tackling it requires coordinated action across all these sectors." A ideia central do texto é que a resistência aos antimicrobianos',
 alt:['atinge apenas a saúde humana e deve ser tratada por médicos.','é causada exclusivamente pelo uso de antibióticos na agricultura.','é uma ameaça global cujo enfrentamento exige ação coordenada entre saúde humana, animal e agricultura.','já foi superada pelos novos antibióticos.','não tem relação com o uso inadequado de medicamentos.'],
 c:2,ex:'"Across all these sectors" retoma humans, animals and agriculture — a resposta precisa manter os três. Estratégia de leitura: localize a palavra-chave repetida e a conclusão marcada por "requires". É exatamente o conceito de Saúde Única, ótimo repertório de redação.'},

{a:'lin',t:'Interpretação',en:'Um texto argumentativo afirma: "Não basta ampliar o número de vagas em cursos de saúde; sem investimento em estágio prático e supervisão, a formação continua deficiente." A tese defendida é que',
 alt:['o número de vagas deve ser reduzido.','a ampliação de vagas é suficiente para melhorar a formação.','a qualidade da formação depende de condições práticas, e não apenas da quantidade de vagas.','o estágio prático deve substituir as aulas teóricas.','a formação em saúde já é plenamente satisfatória.'],
 c:2,ex:'A estrutura "não basta X; sem Y, Z continua" concede um ponto e desloca o argumento para outro: quantidade não garante qualidade. Identificar o operador argumentativo ("não basta", "sem") é o caminho mais rápido para a tese.'},

// humanas
{a:'hum',t:'Agropecuária',vet:1,en:'A expansão da fronteira agrícola brasileira em direção ao Cerrado e à Amazônia, a partir da segunda metade do século XX, esteve associada a',
 alt:['queda da produtividade e abandono da mecanização.','incorporação de tecnologia (correção de solos, melhoramento genético e mecanização), concentração fundiária e pressão sobre a vegetação nativa.','redução das exportações agrícolas brasileiras.','fim dos conflitos por terra nas áreas de expansão.','substituição da pecuária pela agricultura familiar em larga escala.'],
 c:1,ex:'A ocupação do Cerrado dependeu da correção da acidez do solo com calcário e de cultivares adaptadas — pesquisa que viabilizou a soja no Centro-Oeste. Vieram junto a concentração de terras, conflitos agrários e o avanço do desmatamento, tema constante em Geografia e em redação.'},

{a:'hum',t:'Sociologia',en:'Para Émile Durkheim, um fato social caracteriza-se por ser',
 alt:['uma escolha individual, livre de qualquer influência coletiva.','exterior ao indivíduo, coercitivo e geral em determinada sociedade.','um fenômeno exclusivamente econômico.','uma ação orientada pelo sentido subjetivo que o agente lhe atribui.','a luta de classes como motor da história.'],
 c:1,ex:'Exterioridade, coercitividade e generalidade são os três traços do fato social em Durkheim. A alternativa D define a ação social de Weber; a E, o materialismo histórico de Marx — as três "pegadinhas" que o ENEM sempre embaralha.'},

{a:'hum',t:'Era Vargas',en:'A criação da Consolidação das Leis do Trabalho (CLT), em 1943, no governo Vargas, pode ser interpretada como',
 alt:['uma conquista exclusiva dos sindicatos independentes, sem participação do Estado.','uma concessão de direitos trabalhistas combinada ao controle estatal dos sindicatos, reforçando a legitimidade do governo junto aos trabalhadores urbanos.','uma medida liberal de redução da presença do Estado na economia.','uma política voltada prioritariamente aos trabalhadores rurais.','a extinção do imposto sindical e da Justiça do Trabalho.'],
 c:1,ex:'A CLT garantiu direitos reais (jornada, férias, salário mínimo) e, ao mesmo tempo, atrelou os sindicatos ao Ministério do Trabalho. É o duplo caráter do trabalhismo varguista: proteção social e controle político. Os trabalhadores rurais só seriam contemplados de forma ampla décadas depois.'},

{a:'hum',t:'Meio ambiente',en:'A Constituição Federal de 1988 estabelece, no artigo 225, que todos têm direito ao meio ambiente ecologicamente equilibrado, impondo ao poder público e à coletividade o dever de defendê-lo para as presentes e futuras gerações. Esse dispositivo consagra o princípio',
 alt:['da soberania absoluta do proprietário sobre sua terra.','da responsabilidade intergeracional, que vincula a proteção ambiental ao direito das gerações futuras.','da livre exploração dos recursos naturais.','da competência exclusiva da União, sem participação da sociedade.','da irretroatividade das normas ambientais.'],
 c:1,ex:'"Presentes e futuras gerações" é a marca da responsabilidade intergeracional — que dialoga com o princípio da responsabilidade de Hans Jonas. O artigo 225 é um dos repertórios legitimados mais versáteis para redações sobre meio ambiente, saúde e animais.'},

{a:'hum',t:'Geopolítica',en:'A Guerra Fria (1947–1991) caracterizou-se por',
 alt:['confronto militar direto e contínuo entre EUA e URSS em território europeu.','disputa por áreas de influência entre EUA e URSS, marcada por corrida armamentista, espacial e conflitos periféricos, sem enfrentamento direto entre as superpotências.','aliança permanente entre EUA e URSS contra a China.','ausência de conflitos armados no período.','predomínio de um mundo multipolar desde o início.'],
 c:1,ex:'Bipolaridade sem choque direto: a dissuasão nuclear empurrou o conflito para guerras periféricas (Coreia, Vietnã, Afeganistão) e para as corridas armamentista e espacial. A multipolaridade só se desenha após 1991.'}
];

// flashcards do que mais cai
const CARDS = [
{a:'bio',f:'Osmose: para onde a água vai?',b:'Do meio hipotônico (menos soluto) para o hipertônico (mais soluto), através da membrana semipermeável. Célula animal em meio hipotônico → hemólise; em meio hipertônico → crenação.'},
{a:'bio',f:'Saldo energético da respiração aeróbia',b:'Até ~36–38 ATP por glicose. Etapas: glicólise (citoplasma, 2 ATP) → ciclo de Krebs (matriz mitocondrial) → cadeia respiratória (cristas, aceptor final = O₂, forma H₂O).'},
{a:'bio',f:'Fermentação lática × alcoólica',b:'Ambas ocorrem no citoplasma e rendem 2 ATP. Lática: piruvato → lactato (músculo, Lactobacillus, iogurte). Alcoólica: piruvato → etanol + CO₂ (leveduras, pão e cerveja).'},
{a:'bio',f:'Mitose × meiose',b:'Mitose: 1 divisão, 2 células diploides idênticas, crescimento e reparo. Meiose: 2 divisões, 4 células haploides diferentes, gametas; permutação e segregação independente geram variabilidade.'},
{a:'bio',f:'Proporção fenotípica da 1ª e da 2ª lei de Mendel',b:'1ª lei (Aa × Aa): 3:1. 2ª lei (AaBb × AaBb): 9:3:3:1. Genotípica do monoibridismo: 1:2:1.'},
{a:'bio',f:'Herança ligada ao sexo',b:'Genes no cromossomo X. Homens (XY) são hemizigotos: um só alelo recessivo já se manifesta — daltonismo e hemofilia são muito mais frequentes em homens. Mulher heterozigota é portadora.'},
{a:'bio',f:'Vacina × soro',b:'Vacina: antígeno → imunização ATIVA, lenta, duradoura, gera memória. Soro: anticorpos prontos → imunização PASSIVA, imediata, curta, sem memória. Acidente com animal peçonhento ou raiva = soro (+ vacina).'},
{a:'bio',f:'Seleção natural em uma frase',b:'A variabilidade surge ANTES por mutação e recombinação, ao acaso; o ambiente apenas seleciona quem já era mais apto. O ambiente não induz a característica — esse é o erro lamarckista.'},
{a:'bio',f:'Ciclo do nitrogênio: quem faz o quê',b:'Fixação (bactérias, ex.: Rhizobium, N₂ → NH₃) → nitrificação (nitrossomonas: NH₃→NO₂⁻; nitrobacter: NO₂⁻→NO₃⁻) → assimilação pelas plantas → desnitrificação (devolve N₂ ao ar).'},
{a:'bio',f:'Eutrofização, passo a passo',b:'Excesso de N e P → floração de algas → bloqueio de luz → morte das algas → decomposição aeróbia → queda do O₂ dissolvido → mortandade de peixes.'},
{a:'bio',f:'Relações ecológicas com prejuízo',b:'Predatismo (+/−), parasitismo (+/−), competição (−/−), amensalismo (0/−), herbivoria (+/−). Harmônicas: mutualismo (+/+ obrigatório), protocooperação (+/+ facultativa), comensalismo (+/0), inquilinismo (+/0).'},
{a:'bio',f:'Zoonoses clássicas do ENEM',b:'Raiva (vírus, saliva de mamíferos), leptospirose (bactéria, urina de rato em enchente), leishmaniose (protozoário, mosquito-palha, cão como reservatório), toxoplasmose (protozoário, fezes de gato/carne crua), teníase e cisticercose (Taenia, carne mal cozida/ovos).'},
{a:'bio',f:'Anexos embrionários',b:'Âmnio: líquido, protege contra choque e dessecação. Saco vitelínico: nutrição. Alantoide: excretas e trocas gasosas. Córion: envoltório externo, trocas; nos mamíferos placentários origina a placenta.'},
{a:'bio',f:'Ruminante × monogástrico',b:'Ruminante (bovino): rúmen, retículo, omaso, abomaso; microrganismos simbiontes digerem celulose. Monogástrico (cão, suíno, humano): estômago simples, sem celulase — não aproveita capim.'},
{a:'bio',f:'Fatores limitantes na fotossíntese',b:'A taxa é limitada pelo fator em menor disponibilidade: luz, CO₂ ou temperatura. No gráfico, o platô indica que o fator do eixo x deixou de ser limitante.'},
{a:'bio',f:'Ponto de compensação fótico',b:'Intensidade luminosa em que a taxa de fotossíntese iguala a de respiração: consumo de O₂ = produção de O₂. Abaixo dele, a planta perde biomassa.'},
{a:'bio',f:'Tecidos animais básicos',b:'Epitelial (revestimento e secreção, células justapostas, avascular), conjuntivo (sustentação, muita matriz — inclui sangue, osso e cartilagem), muscular (contração: liso, estriado esquelético e cardíaco), nervoso (condução do impulso).'},
{a:'bio',f:'Antibiótico não age em vírus. Por quê?',b:'Antibióticos atuam em estruturas bacterianas (parede celular, ribossomo 70S, síntese de folato). Vírus não têm essas estruturas — usam a maquinaria da célula hospedeira. Contra vírus: antivirais e vacinas.'},

{a:'qui',f:'C₁V₁ = C₂V₂',b:'Fórmula da diluição: a massa de soluto não muda, só o volume de solvente. Diluir de 5% para 0,5% = diluir 10 vezes (1 parte de concentrado + 9 de água).'},
{a:'qui',f:'Concentração comum × molaridade',b:'C = m/V (g/L). M = n/V (mol/L), com n = m/MM. Para converter: M = C/MM. ppm = mg/L em soluções aquosas diluídas.'},
{a:'qui',f:'Mol e Avogadro',b:'1 mol = 6,02 × 10²³ entidades = massa molar em gramas = 22,4 L de gás nas CNTP. Em estequiometria: massa → mol → proporção da equação → mol → massa.'},
{a:'qui',f:'pH: escala',b:'pH = −log[H⁺]. pH < 7 ácido, = 7 neutro, > 7 básico (a 25 °C). Cada unidade = fator 10 na concentração de H⁺. pH + pOH = 14.'},
{a:'qui',f:'Le Chatelier',b:'O equilíbrio se desloca no sentido que anula a perturbação. Aumentou reagente → desloca para produtos. Aumentou pressão → desloca para o lado de menor volume gasoso. Aumentou temperatura → desloca no sentido endotérmico.'},
{a:'qui',f:'Exotérmico × endotérmico',b:'Exotérmico: libera calor, ΔH < 0, produtos com menos entalpia (combustão, neutralização). Endotérmico: absorve calor, ΔH > 0 (fotossíntese, evaporação, dissolução de alguns sais).'},
{a:'qui',f:'Catalisador: o que ele faz',b:'Diminui a energia de ativação criando um caminho alternativo. Acelera a reação, não é consumido e NÃO desloca o equilíbrio nem altera o ΔH — só faz chegar mais rápido ao mesmo ponto.'},
{a:'qui',f:'Geometria e polaridade',b:'Molécula é apolar quando a soma vetorial dos dipolos é zero: CO₂ (linear), CH₄ (tetraédrica), BF₃ (trigonal plana). Polar: H₂O (angular), NH₃ (piramidal), HCl.'},
{a:'qui',f:'Forças intermoleculares (da mais forte)',b:'Ligação de hidrogênio (H ligado a F, O ou N) > dipolo permanente > dipolo induzido (London). Quanto mais forte, maior o ponto de ebulição.'},
{a:'qui',f:'Principais funções orgânicas',b:'Álcool (R—OH), fenol (OH no anel), aldeído (CHO na ponta), cetona (C=O no meio), ácido carboxílico (COOH), éster (COO—R), éter (R—O—R), amina (N), amida (CO—N).'},
{a:'qui',f:'Sabão: como limpa',b:'Molécula anfifílica: cauda apolar dissolve a gordura, cabeça polar (—COO⁻Na⁺) interage com a água, formando micelas. Vem da saponificação: éster (gordura) + NaOH → sabão + glicerol.'},
{a:'qui',f:'Oxidação e redução',b:'Oxidação: perde elétrons, o NOX aumenta — é o agente redutor. Redução: ganha elétrons, o NOX diminui — é o agente oxidante. Na pilha: ânodo (−) oxida, cátodo (+) reduz.'},
{a:'qui',f:'Meia-vida',b:'Tempo para a massa de um radioisótopo cair pela metade. Após n meias-vidas, resta m₀/2ⁿ. Independe da massa inicial, da temperatura e da pressão.'},

{a:'fis',f:'Velocidade média',b:'v = distância total ÷ tempo total. Nunca é a média aritmética das velocidades quando os trechos têm durações diferentes.'},
{a:'fis',f:'Energia elétrica na conta de luz',b:'E (kWh) = P (kW) × t (h). Custo = E × tarifa. Converta W → kW dividindo por 1000 e minutos → horas dividindo por 60.'},
{a:'fis',f:'Q = m·c·ΔT',b:'Calor sensível (muda a temperatura). Massa em gramas, c da água = 1 cal/(g·°C). Calor latente (muda de estado, temperatura constante): Q = m·L.'},
{a:'fis',f:'Empuxo',b:'E = d_líquido × V_deslocado × g. Flutua se a densidade do corpo for menor que a do líquido. Em equilíbrio de flutuação, empuxo = peso.'},
{a:'fis',f:'Leis de Newton',b:'1ª — inércia: sem força resultante, o estado de movimento se mantém. 2ª — F = m·a. 3ª — ação e reação: forças de mesmo módulo, sentidos opostos, em corpos diferentes (por isso não se anulam).'},
{a:'fis',f:'Som × luz',b:'Som: onda mecânica longitudinal, precisa de meio, mais rápida em sólidos. Luz: onda eletromagnética transversal, propaga-se no vácuo a 3×10⁸ m/s. Ultrassom: f > 20 000 Hz.'},
{a:'fis',f:'Lei de Ohm e potência',b:'U = R·i. P = U·i = R·i² = U²/R. Em série a corrente é a mesma e as resistências somam; em paralelo a tensão é a mesma e a resistência equivalente diminui.'},

{a:'mat',f:'Regra de três: direta ou inversa?',b:'Direta: uma cresce, a outra cresce (multiplique em cruz). Inversa: uma cresce, a outra diminui (multiplique na horizontal). Ex. inversa: mais trabalhadores, menos tempo.'},
{a:'mat',f:'Acréscimos e descontos sucessivos',b:'Use fatores: +20% → ×1,20; −20% → ×0,80. Sucessivos multiplicam-se: 1,20 × 0,80 = 0,96 → queda de 4%. Nunca some porcentagens de bases diferentes.'},
{a:'mat',f:'Média, mediana e moda',b:'Média: soma ÷ quantidade (sensível a valores extremos). Mediana: valor central com os dados em ordem (se n é par, média dos dois centrais). Moda: o mais frequente.'},
{a:'mat',f:'Probabilidade condicional',b:'P(A|B) = casos favoráveis dentro de B ÷ total de B. O truque é redefinir o espaço amostral: o total passa a ser apenas o grupo da condição.'},
{a:'mat',f:'Volumes',b:'Prisma e cilindro: área da base × altura. Pirâmide e cone: (base × altura)/3. Esfera: (4/3)πr³. E lembre: 1 m³ = 1000 L; 1 dm³ = 1 L; 1 cm³ = 1 mL.'},
{a:'mat',f:'Função do 1º grau',b:'f(x) = ax + b. a = taxa de variação (inclinação), b = valor inicial. a > 0 cresce, a < 0 decresce. Ponto de equilíbrio: iguale receita e custo.'},
{a:'mat',f:'Função do 2º grau',b:'f(x) = ax² + bx + c. Vértice: xᵥ = −b/2a. a > 0 → parábola com mínimo; a < 0 → máximo. Δ = b² − 4ac define o número de raízes reais.'},
{a:'mat',f:'Escala de mapa',b:'1:n → 1 cm no mapa = n cm reais. Divida por 100 para metros e por 100 000 para quilômetros. Escala grande (1:1000) mostra área pequena com muito detalhe.'},

{a:'lin',f:'Funções da linguagem',b:'Referencial (informa), emotiva (emissor, 1ª pessoa), conativa (receptor, imperativo, publicidade), fática (testa o canal: "alô?"), metalinguística (fala do próprio código), poética (a forma da mensagem).'},
{a:'lin',f:'Metáfora × metonímia',b:'Metáfora: semelhança ("ele é uma raposa"). Metonímia: proximidade/substituição — autor pela obra, continente pelo conteúdo, parte pelo todo ("li Drummond", "a cidade chorou").'},
{a:'lin',f:'Preconceito linguístico',b:'Toda variedade é sistemática e cumpre sua função; não há língua "errada", há adequação ao contexto. A norma-padrão é uma variedade de prestígio, exigida em situações formais.'},
{a:'lin',f:'Estratégias de leitura em inglês',b:'Skimming (ideia geral, leia primeira e última frase de cada parágrafo), scanning (caça a informação específica), cognatos e falsos cognatos (pretend = fingir; parents = pais).'},

{a:'hum',f:'Os três clássicos da Sociologia',b:'Durkheim: fato social (exterior, coercitivo, geral) e solidariedade mecânica/orgânica. Weber: ação social e tipos ideais, burocracia. Marx: modo de produção, mais-valia, luta de classes.'},
{a:'hum',f:'Era Vargas em 3 marcos',b:'1930 Revolução; 1937–45 Estado Novo (autoritário, DIP, censura); 1943 CLT (direitos + controle dos sindicatos). Industrialização por substituição de importações, CSN em Volta Redonda.'},
{a:'hum',f:'Biomas brasileiros',b:'Amazônia (maior, floresta equatorial), Cerrado (savana, solo ácido, berço das águas), Caatinga (semiárido, exclusivamente brasileiro), Mata Atlântica (mais devastada), Pampa (campos) e Pantanal (maior planície alagável).'},
{a:'hum',f:'Artigo 225 da CF/88',b:'Direito ao meio ambiente ecologicamente equilibrado, dever do poder público e da coletividade de defendê-lo para as presentes e futuras gerações. Repertório curinga em redações ambientais e de saúde.'}
];

// redação: competencias, estrutura, repertorio e temas
const COMPETENCIAS = [
 {n:'C1', t:'Domínio da norma culta', d:'Ortografia, concordância, regência, pontuação, crase. Não é preciso escrever difícil: é preciso escrever certo. Erros isolados não zeram — desvios sistemáticos derrubam a nota.'},
 {n:'C2', t:'Compreender o tema e usar repertório', d:'Não fuja do tema e não faça só narração. Aqui entra o repertório sociocultural legitimado (lei, dado, obra, filósofo) — e ele precisa ser produtivo: usado para sustentar seu argumento, não citado por enfeite.'},
 {n:'C3', t:'Selecionar e organizar argumentos', d:'Projeto de texto claro: cada parágrafo defende uma ideia e avança em relação ao anterior. Autoria = seu ponto de vista visível, não um resumo de senso comum.'},
 {n:'C4', t:'Coesão e articulação', d:'Conectivos variados no início de cada parágrafo e dentro dele; retomadas por pronomes e sinônimos para não repetir palavras. Evite repetir "além disso" três vezes.'},
 {n:'C5', t:'Proposta de intervenção', d:'Precisa ter os 5 elementos: agente + ação + meio/modo + finalidade + detalhamento. É a competência mais fácil de garantir 200 pontos — e a que mais gente perde por esquecer um elemento.'}
];

const ESTRUTURA = [
 {p:'Introdução (4–6 linhas)', d:'Repertório ou contextualização histórica → apresentação do problema → tese com os dois argumentos que serão desenvolvidos. Fórmula segura: "Segundo [repertório], ... No Brasil, entretanto, [problema]. Isso decorre de [arg. 1] e de [arg. 2]."'},
 {p:'Desenvolvimento 1 (7–9 linhas)', d:'Tópico frasal com o argumento 1 → repertório de apoio (lei, dado, autor) → explicação de como isso comprova o argumento → fechamento retomando a tese. Nunca deixe o repertório solto.'},
 {p:'Desenvolvimento 2 (7–9 linhas)', d:'Mesma estrutura com o argumento 2, de outro campo (se o D1 foi histórico, o D2 pode ser econômico ou social). Conectivo de adição no início: "Ademais", "Somado a isso", "Outrossim".'},
 {p:'Conclusão (5–7 linhas)', d:'Retomada da tese + proposta completa: quem faz (agente), o que faz (ação), como faz (meio), para quê (finalidade) e um detalhamento. Ex.: "Cabe ao Ministério da Saúde (agente) ampliar campanhas de vacinação animal (ação), por meio de parcerias com universidades e conselhos regionais de medicina veterinária (meio), a fim de reduzir a circulação de zoonoses (finalidade), com mutirões trimestrais em áreas periféricas (detalhamento)."'}
];

const REPERTORIOS = [
 {c:'Saúde e animais', t:'Saúde Única (One Health)', d:'Conceito adotado pela OMS e pela Organização Mundial de Saúde Animal: a saúde humana, a animal e a ambiental são interdependentes. Serve para zoonoses, resistência a antibióticos, pandemias e meio ambiente — e é praticamente a bandeira da medicina veterinária.'},
 {c:'Direito animal', t:'Lei 14.064/2020', d:'Aumentou a pena para maus-tratos a cães e gatos (reclusão de 2 a 5 anos). Ótima para temas de proteção animal, abandono e violência doméstica interespécie.'},
 {c:'Meio ambiente', t:'Art. 225 da Constituição de 1988', d:'Meio ambiente ecologicamente equilibrado como direito de todos e dever do poder público e da coletividade, para presentes e futuras gerações.'},
 {c:'Filosofia', t:'Hans Jonas — Princípio Responsabilidade', d:'"Aja de modo que os efeitos da tua ação sejam compatíveis com a permanência de uma vida autêntica sobre a Terra." Encaixa em qualquer tema ambiental ou tecnológico.'},
 {c:'Filosofia', t:'Peter Singer — Libertação Animal', d:'Critica o especismo e defende a consideração dos interesses dos animais sencientes. Use com cuidado e sem radicalizar: serve para bem-estar animal e experimentação.'},
 {c:'Sociologia', t:'Zygmunt Bauman — Modernidade Líquida', d:'Relações e vínculos frágeis e descartáveis. Aplicável ao abandono de animais, consumo e relações digitais.'},
 {c:'Geografia', t:'Milton Santos', d:'O território usado e a produção de desigualdades no espaço. Bom para saneamento, acesso a serviços e periferias — inclusive para explicar por que zoonoses atingem mais os mais pobres.'},
 {c:'Sociologia', t:'Ailton Krenak — Ideias para adiar o fim do mundo', d:'Crítica à separação entre humanidade e natureza. Excelente para meio ambiente, povos originários e crise climática.'},
 {c:'Internacional', t:'ODS da ONU (Agenda 2030)', d:'ODS 3 (saúde e bem-estar), 6 (água e saneamento), 15 (vida terrestre). Citar o número do objetivo dá precisão ao repertório.'},
 {c:'História', t:'Constituição Cidadã e o SUS', d:'A CF/88 criou o SUS com princípios de universalidade, integralidade e equidade — base para qualquer tema de saúde pública, incluindo vigilância sanitária e zoonoses.'},
 {c:'Dados', t:'IBGE — mais de 100 milhões de animais de estimação', d:'O Brasil tem uma das maiores populações de pets do mundo. Use dados de forma honesta: se não lembra o número exato, escreva "segundo o IBGE, o país figura entre os maiores em população de animais de estimação".'},
 {c:'Literatura', t:'Vidas Secas — Graciliano Ramos', d:'A cachorra Baleia e a seca no sertão. Serve para desigualdade regional, fome e para a relação afetiva entre humanos e animais.'}
];

const TEMAS = [
 'Perspectivas acerca do envelhecimento na sociedade brasileira (tema oficial do ENEM 2025)',
 'Desafios para a valorização da herança africana no Brasil (tema oficial do ENEM 2024)',
 'Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil (tema oficial do ENEM 2023)',
 'Desafios para a valorização de comunidades e povos tradicionais no Brasil (tema oficial do ENEM 2022)',
 'Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil (tema oficial do ENEM 2021)',
 'O estigma associado às doenças mentais na sociedade brasileira (tema oficial do ENEM 2020)',
 'Caminhos para o combate ao abandono de animais domésticos no Brasil',
 'O desafio do controle de zoonoses em áreas urbanas brasileiras',
 'A resistência a antimicrobianos como desafio de saúde pública',
 'Bem-estar animal na produção de alimentos no Brasil',
 'Os impactos da expansão do agronegócio sobre os biomas brasileiros',
 'O acesso desigual a serviços de saúde nas periferias brasileiras',
 'Desafios para a valorização da vacinação no Brasil contemporâneo',
 'A invisibilidade do trabalho rural na sociedade brasileira',
 'Educação ambiental como instrumento de transformação social',
 'Os desafios da segurança alimentar em um país exportador de alimentos',
 'O papel das universidades públicas no desenvolvimento científico brasileiro',
 'Desinformação em saúde e seus impactos na sociedade brasileira'
];

const CHECKLIST = [
 'Escrevi um texto dissertativo-argumentativo em prosa (nem narração, nem poema)?',
 'A tese está clara na introdução e é retomada na conclusão?',
 'Usei pelo menos dois repertórios legitimados e expliquei cada um?',
 'Cada parágrafo começa com um conectivo diferente?',
 'Evitei repetir a mesma palavra em frases seguidas?',
 'Usei 3ª pessoa e evitei "eu acho", "a gente" e gírias?',
 'A proposta tem agente, ação, meio, finalidade e detalhamento?',
 'Respeitei o mínimo de 7 e o máximo de 30 linhas?',
 'Não copiei trechos dos textos motivadores?',
 'Não feri direitos humanos em nenhum momento?'
];

// links uteis + notas de corte
const MATERIAIS = [
 {g:'Oficial — INEP e MEC', its:[
  {t:'Provas e gabaritos de todos os anos', u:'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos', d:'A fonte mais importante do estudo. Baixe as provas de 2015 em diante e resolva uma por semana, cronometrada.'},
  {t:'Página do Participante', u:'https://enem.inep.gov.br/participante/', d:'Inscrição, cartão de confirmação, local de prova e resultado.'},
  {t:'Portal do INEP — ENEM', u:'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem', d:'Edital, matriz de referência, cronograma oficial e o Guia do Participante da Redação.'},
  {t:'SISU', u:'https://acessounico.mec.gov.br/sisu', d:'Onde a nota vira vaga. Consulte as notas de corte do último processo do curso de Medicina Veterinária.'},
  {t:'ProUni', u:'https://acessounico.mec.gov.br/prouni', d:'Bolsas integrais e parciais em faculdades privadas. Exige nota mínima de 450 e mais que zero na redação.'},
  {t:'FIES', u:'https://acessounico.mec.gov.br/fies', d:'Financiamento estudantil, para o caso de a aprovação vir em instituição privada.'}
 ]},
 {g:'Estudo gratuito', its:[
  {t:'Khan Academy (em português)', u:'https://pt.khanacademy.org/', d:'Matemática, física e química do zero, com exercícios que se adaptam ao seu nível. Melhor lugar para tapar buracos de base.'},
  {t:'Brasil Escola', u:'https://brasilescola.uol.com.br/', d:'Resumos de todas as matérias com exercícios comentados. Bom para revisão rápida de um tópico.'},
  {t:'Mundo Educação', u:'https://mundoeducacao.uol.com.br/', d:'Mesma linha, com muito conteúdo de biologia e química.'},
  {t:'Politize! — atualidades', u:'https://www.politize.com.br/', d:'Explica temas de cidadania e política em linguagem simples: repertório pronto para a redação.'}
 ]},
 {g:'Videoaulas (busca direta no YouTube)', its:[
  {t:'Biologia Total — Prof. Jubilut', u:'https://www.youtube.com/results?search_query=biologia+total+jubilut+enem', d:'Referência em biologia para o ENEM. Comece por genética, ecologia e citologia.'},
  {t:'Prof. Ferretto — Matemática e Física', u:'https://www.youtube.com/results?search_query=professor+ferretto+matematica+enem', d:'Explicação passo a passo, ótimo para quem tem base fraca em exatas.'},
  {t:'Química — Prof. Paulo Valim', u:'https://www.youtube.com/results?search_query=paulo+valim+quimica+enem', d:'Estequiometria, soluções e orgânica com foco em ENEM.'},
  {t:'Redação — Débora Aladim', u:'https://www.youtube.com/results?search_query=debora+aladim+redacao+enem', d:'Estrutura de parágrafo e proposta de intervenção, com correções comentadas.'},
  {t:'Curso Enem Gratuito / Descomplica no YouTube', u:'https://www.youtube.com/results?search_query=aulao+enem+gratuito+revisao', d:'Aulões de revisão, especialmente úteis no último mês.'}
 ]}
];

// faixas aproximadas do sisu pra vet, ampla concorrencia.
// NAO é numero oficial, muda todo ano - sempre conferir no sisu antes
const CORTES = [
 {u:'USP (FMVZ / Pirassununga)', uf:'SP', f:'760–790'},
 {u:'UNESP (Botucatu / Jaboticabal)', uf:'SP', f:'740–780'},
 {u:'UFMG', uf:'MG', f:'720–760'},
 {u:'UFPR (Curitiba)', uf:'PR', f:'710–750'},
 {u:'UFRGS', uf:'RS', f:'700–740'},
 {u:'UFV (Viçosa)', uf:'MG', f:'700–740'},
 {u:'UFSM (Santa Maria)', uf:'RS', f:'680–720'},
 {u:'UFRRJ (Seropédica)', uf:'RJ', f:'670–710'},
 {u:'UFBA', uf:'BA', f:'660–700'},
 {u:'UFPI / UFRA / UFERSA e demais', uf:'—', f:'620–680'}
];
