export interface Cargo {
  id: string;
  nome: string;
  tipo: 'principal' | 'diretor' | 'diretor_associado' | 'secretario' | 'tesoureiro' | 'anciao';
}

export interface Ministerio {
  id: string;
  nome: string;
  descricao: string;
  categoria: 'lideranca' | 'ministerio' | 'clube' | 'personalizado';
  cargos: Cargo[];
  explicacao: string;
}

export const ministerios: Ministerio[] = [
  // LIDERANÇA PRINCIPAL
  {
    id: 'anciao',
    nome: 'Ancionato',
    descricao: 'Responsável pelo cuidado espiritual e administrativo da igreja local',
    categoria: 'lideranca',
    cargos: [
      { id: 'anciao-1', nome: 'Primeiro Ancião', tipo: 'anciao' },
      { id: 'anciao-2', nome: 'Segundo Ancião', tipo: 'anciao' },
      { id: 'anciao-3', nome: 'Terceiro Ancião', tipo: 'anciao' },
      { id: 'anciao-4', nome: 'Quarto Ancião', tipo: 'anciao' },
    ],
    explicacao: 'O ancionato é composto por membros escolhidos para auxiliar o pastor na administração da igreja e no cuidado espiritual dos membros. Os anciãos são responsáveis por visitar os membros, realizar cerimônias religiosas como batismos, casamentos e comunhões, além de aconselhamento espiritual. São líderes que devem ser exemplo de vida cristã, tendo bom testemunho dentro e fora da igreja.'
  },
  {
    id: 'diaconos',
    nome: 'Diáconos',
    descricao: 'Presta serviços práticos, cuidando de diversos aspectos das reuniões e da propriedade da igreja',
    categoria: 'lideranca',
    cargos: [
      { id: 'diacono-principal', nome: 'Primeiro Diácono', tipo: 'principal' },
    ],
    explicacao: 'Os diáconos são responsáveis pelos aspectos práticos dos cultos e eventos da igreja. Suas funções incluem: preparar o púlpito e a mesa da Santa Ceia, organizar o batistério, receber e acomodar visitantes, cuidar da conservação do templo, auxiliar na distribuição da comunhão, e manter a ordem durante os cultos. São servos dedicados que garantem que tudo funcione bem nos aspectos operacionais.'
  },
  {
    id: 'diaconisas',
    nome: 'Diaconisas',
    descricao: 'Presta serviços práticos, cuidando de diversos aspectos das reuniões e da propriedade da igreja',
    categoria: 'lideranca',
    cargos: [
      { id: 'diaconisa-principal', nome: 'Primeira Diaconisa', tipo: 'principal' },
    ],
    explicacao: 'As diaconisas são responsáveis pelos aspectos práticos dos cultos e eventos da igreja. Suas funções incluem: preparar o púlpito e a mesa da Santa Ceia, organizar o batistério, receber e acomodar visitantes, cuidar da conservação do templo, auxiliar na distribuição da comunhão, e manter a ordem durante os cultos. São servas dedicadas que garantem que tudo funcione bem nos aspectos operacionais.'
  },
  {
    id: 'secretaria',
    nome: 'Secretaria',
    descricao: 'Responsável pela documentação e registros oficiais da igreja',
    categoria: 'lideranca',
    cargos: [
      { id: 'secretario-1', nome: 'Primeiro Secretário(a)', tipo: 'secretario' },
      { id: 'secretario-2', nome: 'Segundo Secretário(a)', tipo: 'secretario' },
    ],
    explicacao: 'A secretaria da igreja é responsável por manter todos os registros atualizados, incluindo: livro de membros, atas de reuniões administrativas, transferências de membros, batismos, casamentos e disciplinas eclesiásticas. Também prepara relatórios estatísticos, cuida da correspondência oficial e mantém organizado o arquivo da igreja. É fundamental para a administração adequada da congregação.'
  },
  {
    id: 'tesouraria',
    nome: 'Tesouraria',
    descricao: 'Administra os recursos financeiros da igreja',
    categoria: 'lideranca',
    cargos: [
      { id: 'tesoureiro-1', nome: 'Primeiro Tesoureiro(a)', tipo: 'tesoureiro' },
      { id: 'tesoureiro-2', nome: 'Segundo Tesoureiro(a)', tipo: 'tesoureiro' },
    ],
    explicacao: 'O tesoureiro gerencia todas as finanças da igreja, incluindo: recebimento e contagem de dízimos e ofertas, pagamento de contas, elaboração de relatórios financeiros mensais, prestação de contas à comissão da igreja, e orientação aos membros sobre mordomia cristã. Deve ser pessoa de integridade, organizada e com conhecimentos básicos de contabilidade.'
  },

  // MINISTÉRIOS E DEPARTAMENTOS
  {
    id: 'escola-sabatina',
    nome: 'Escola Sabatina',
    descricao: 'Sistema de instrução religiosa, discipulado e crescimento espiritual',
    categoria: 'ministerio',
    cargos: [
      { id: 'es-diretor', nome: 'Diretor(a) de Escola Sabatina', tipo: 'diretor' },
      { id: 'es-associado', nome: 'Diretor(a) Associado(a) de Escola Sabatina', tipo: 'diretor_associado' },
    ],
    explicacao: 'A Escola Sabatina é o principal sistema de educação religiosa da igreja. Acontece todos os sábados antes do culto e é dividida em classes por faixas etárias. O diretor coordena todas as classes, escolhe professores, providencia materiais de estudo, organiza programas especiais e incentiva o estudo diário da Bíblia. É fundamental para o crescimento espiritual e discipulado dos membros.'
  },
  {
    id: 'ministerio-pessoal',
    nome: 'Ministério Pessoal',
    descricao: 'Comprometido em levar adiante o imperativo de pregar o evangelho a todos',
    categoria: 'ministerio',
    cargos: [
      { id: 'mp-diretor', nome: 'Diretor(a) de Ministério Pessoal', tipo: 'diretor' },
      { id: 'mp-associado', nome: 'Diretor(a) Associado(a) de Ministério Pessoal', tipo: 'diretor_associado' },
    ],
    explicacao: 'O Ministério Pessoal coordena todas as atividades evangelísticas da igreja. Isso inclui: distribuição de literatura, estudos bíblicos, pequenos grupos, campanhas evangelísticas, treinamento de membros para testemunhar, visitas missionárias e projetos comunitários. O objetivo é envolver todos os membros na missão de compartilhar o evangelho.'
  },
  {
    id: 'jovens',
    nome: 'Ministério Jovem',
    descricao: 'Dedicado ao desenvolvimento espiritual e social dos jovens',
    categoria: 'ministerio',
    cargos: [
      { id: 'jovens-diretor', nome: 'Diretor(a) de Jovens', tipo: 'diretor' },
      { id: 'jovens-associado', nome: 'Diretor(a) Associado(a) de Jovens', tipo: 'diretor_associado' },
    ],
    explicacao: 'O Ministério Jovem trabalha com adolescentes e jovens adultos (geralmente 16-35 anos), promovendo atividades que fortalecem a fé, desenvolvem talentos e incentivam o serviço. Organiza programas sabáticos especiais, congressos, retiros espirituais, projetos missionários, grupos pequenos e atividades sociais saudáveis. Busca preparar líderes cristãos comprometidos.'
  },
  {
    id: 'aventureiros',
    nome: 'Clube de Aventureiros',
    descricao: 'Voltado para crianças de 6 a 9 anos, promovendo atividades recreativas e espirituais',
    categoria: 'clube',
    cargos: [
      { id: 'aventureiros-diretor', nome: 'Diretor(a) de Aventureiros', tipo: 'diretor' },
      { id: 'aventureiros-associado-1', nome: 'Diretor(a) Associado(a) de Aventureiros 1', tipo: 'diretor_associado' },
      { id: 'aventureiros-associado-2', nome: 'Diretor(a) Associado(a) de Aventureiros 2', tipo: 'diretor_associado' },
    ],
    explicacao: 'O Clube de Aventureiros é um programa para crianças de 6 a 9 anos que combina atividades recreativas com ensino bíblico. As crianças aprendem através de brincadeiras, artesanato, histórias, música e atividades ao ar livre. O programa desenvolve habilidades sociais, ensina valores cristãos, promove vida saudável e cria memórias positivas sobre a igreja.'
  },
  {
    id: 'desbravadores',
    nome: 'Clube de Desbravadores',
    descricao: 'Para jovens de 10 a 15 anos, focado no desenvolvimento físico, mental e espiritual',
    categoria: 'clube',
    cargos: [
      { id: 'desbravadores-diretor', nome: 'Diretor(a) de Desbravadores', tipo: 'diretor' },
      { id: 'desbravadores-associado-1', nome: 'Diretor(a) Associado(a) de Desbravadores 1', tipo: 'diretor_associado' },
      { id: 'desbravadores-associado-2', nome: 'Diretor(a) Associado(a) de Desbravadores 2', tipo: 'diretor_associado' },
    ],
    explicacao: 'O Clube de Desbravadores trabalha com pré-adolescentes e adolescentes (10-15 anos) através de um programa estruturado que inclui: campismo, nós e amarras, estudo da natureza, ordem unida, classes progressivas, especialidades, e atividades comunitárias. Desenvolve liderança, trabalho em equipe, respeito, disciplina e valores cristãos. Usa uniformes e organização similar ao escotismo.'
  },
  {
    id: 'criancas',
    nome: 'Ministério da Criança',
    descricao: 'Auxilia as crianças a desenvolverem fé e caráter à semelhança de Jesus',
    categoria: 'ministerio',
    cargos: [
      { id: 'criancas-diretor', nome: 'Diretor(a) de Ministério da Criança', tipo: 'diretor' },
      { id: 'criancas-associado', nome: 'Diretor(a) Associado(a) de Ministério da Criança', tipo: 'diretor_associado' },
    ],
    explicacao: 'O Ministério da Criança coordena todas as atividades voltadas para crianças na igreja, incluindo: culto infantil, programas especiais, treinamento de professores da Escola Sabatina infantil, materiais didáticos, e eventos como Dia das Crianças e Semana da Criança. Trabalha para tornar a igreja um ambiente acolhedor e relevante para os pequenos.'
  },
  {
    id: 'adolescentes',
    nome: 'Ministério do Adolescente',
    descricao: 'Focado nas necessidades específicas dos adolescentes',
    categoria: 'ministerio',
    cargos: [
      { id: 'adolescentes-diretor', nome: 'Diretor(a) de Adolescentes', tipo: 'diretor' },
      { id: 'adolescentes-associado', nome: 'Diretor(a) Associado(a) de Adolescentes', tipo: 'diretor_associado' },
    ],
    explicacao: 'O Ministério do Adolescente atende especificamente a faixa etária de 13 a 17 anos, promovendo atividades relevantes para essa fase. Organiza classes de Escola Sabatina específicas, grupos de discussão, retiros, acampamentos, projetos missionários e eventos sociais. Aborda temas como relacionamentos, vocação, pressão de grupo e decisões importantes da adolescência numa perspectiva cristã.'
  },
  {
    id: 'mulheres',
    nome: 'Ministério da Mulher',
    descricao: 'Promove o desenvolvimento espiritual e social das mulheres',
    categoria: 'ministerio',
    cargos: [
      { id: 'mulheres-diretora', nome: 'Diretora de Ministério da Mulher', tipo: 'diretor' },
      { id: 'mulheres-associada', nome: 'Diretora Associada de Ministério da Mulher', tipo: 'diretor_associado' },
    ],
    explicacao: 'O Ministério da Mulher trabalha para fortalecer espiritualmente as mulheres da igreja e da comunidade. Promove encontros, seminários, retiros espirituais, projetos sociais, apoio a mulheres em situação de vulnerabilidade, e desenvolve talentos e liderança feminina. Aborda temas relevantes como família, saúde, relacionamentos e espiritualidade.'
  },
  {
    id: 'homens',
    nome: 'Ministério do Homem',
    descricao: 'Focado no desenvolvimento espiritual e liderança dos homens',
    categoria: 'ministerio',
    cargos: [
      { id: 'homens-diretor', nome: 'Diretor de Ministério do Homem', tipo: 'diretor' },
      { id: 'homens-associado', nome: 'Diretor Associado de Ministério do Homem', tipo: 'diretor_associado' },
    ],
    explicacao: 'O Ministério do Homem visa fortalecer os homens como líderes espirituais em seus lares e na igreja. Promove retiros masculinos, estudos bíblicos, projetos de serviço comunitário, mentorias, e aborda temas como paternidade, liderança, integridade e responsabilidade cristã. Incentiva os homens a serem exemplos de fé.'
  },
  {
    id: 'familia',
    nome: 'Ministério da Família',
    descricao: 'Reforça os ensinos bíblicos relativos à família e promove a unidade no lar',
    categoria: 'ministerio',
    cargos: [
      { id: 'familia-diretor', nome: 'Diretor(a) de Ministério da Família', tipo: 'diretor' },
      { id: 'familia-associado', nome: 'Diretor(a) Associado(a) de Ministério da Família', tipo: 'diretor_associado' },
    ],
    explicacao: 'O Ministério da Família trabalha para fortalecer as famílias através de seminários sobre casamento, educação de filhos, culto familiar, e eventos que unem as gerações. Oferece aconselhamento, promove o Dia da Família, organiza retiros para casais, e desenvolve recursos para ajudar as famílias a viverem princípios cristãos no cotidiano.'
  },
  {
    id: 'musica',
    nome: 'Ministério da Música',
    descricao: 'Cuida da liturgia musical dos cultos e programações',
    categoria: 'ministerio',
    cargos: [
      { id: 'musica-diretor', nome: 'Diretor(a) de Música', tipo: 'diretor' },
      { id: 'musica-associado', nome: 'Diretor(a) Associado(a) de Música', tipo: 'diretor_associado' },
    ],
    explicacao: 'O Ministério da Música coordena toda a parte musical da igreja: coral, grupos vocais, orquestra, bandas, músicos especiais e hinário congregacional. Seleciona músicas apropriadas para cada programação, treina músicos, organiza a escala de participações e promove a excelência musical na adoração. A música deve elevar a adoração e transmitir mensagens espirituais.'
  },
  {
    id: 'comunicacao',
    nome: 'Ministério da Comunicação',
    descricao: 'Promove o uso de técnicas de comunicação e mídia na propagação do evangelho',
    categoria: 'ministerio',
    cargos: [
      { id: 'comunicacao-diretor', nome: 'Diretor(a) de Comunicação', tipo: 'diretor' },
      { id: 'comunicacao-associado', nome: 'Diretor(a) Associado(a) de Comunicação', tipo: 'diretor_associado' },
    ],
    explicacao: 'O Ministério da Comunicação gerencia toda a comunicação da igreja: redes sociais, site, boletins, avisos, transmissões ao vivo, gravações de cultos, design gráfico, fotografia e vídeos. Mantém os membros informados, divulga eventos, e usa meios digitais para alcançar a comunidade. Também cuida da imagem institucional da igreja.'
  },
  {
    id: 'mordomia',
    nome: 'Mordomia Cristã',
    descricao: 'Promove o crescimento espiritual e a prática da beneficência sistemática',
    categoria: 'ministerio',
    cargos: [
      { id: 'mordomia-diretor', nome: 'Diretor(a) de Mordomia Cristã', tipo: 'diretor' },
      { id: 'mordomia-associado', nome: 'Diretor(a) Associado(a) de Mordomia Cristã', tipo: 'diretor_associado' },
    ],
    explicacao: 'O departamento de Mordomia Cristã ensina os princípios bíblicos sobre administração de recursos: tempo, talentos, saúde e finanças. Promove a fidelidade nos dízimos e ofertas, conscientiza sobre responsabilidade ambiental, e incentiva o uso sábio de todos os recursos que Deus confiou. Organiza campanhas de fidelidade e seminários sobre finanças pessoais.'
  },
  {
    id: 'publicacoes',
    nome: 'Ministério de Publicações',
    descricao: 'Distribui publicações promovendo qualidade de vida física, mental e espiritual',
    categoria: 'ministerio',
    cargos: [
      { id: 'publicacoes-diretor', nome: 'Diretor(a) de Publicações', tipo: 'diretor' },
      { id: 'publicacoes-associado', nome: 'Diretor(a) Associado(a) de Publicações', tipo: 'diretor_associado' },
    ],
    explicacao: 'O Ministério de Publicações promove a distribuição de livros, revistas e materiais da Casa Publicadora Brasileira. Apoia colportores (vendedores evangelistas), organiza feiras de livros, distribui literatura gratuita, e incentiva a leitura entre os membros. A literatura é uma ferramenta importante de evangelização e fortalecimento da fé.'
  },
  {
    id: 'educacao',
    nome: 'Ministério da Educação',
    descricao: 'Promove a educação adventista e apoia escolas da igreja',
    categoria: 'ministerio',
    cargos: [
      { id: 'educacao-diretor', nome: 'Diretor(a) de Educação', tipo: 'diretor' },
      { id: 'educacao-associado', nome: 'Diretor(a) Associado(a) de Educação', tipo: 'diretor_associado' },
    ],
    explicacao: 'O Ministério da Educação promove e apoia a rede de escolas adventistas, desde o ensino básico até o superior. Incentiva os pais a matricularem seus filhos em escolas adventistas, auxilia estudantes com bolsas de estudo, divulga os benefícios da educação cristã, e mantém conexão entre a igreja e as instituições educacionais.'
  },
  {
    id: 'saude',
    nome: 'Ministério da Saúde',
    descricao: 'Promove os princípios de saúde e vida saudável',
    categoria: 'ministerio',
    cargos: [
      { id: 'saude-diretor', nome: 'Diretor(a) de Ministério da Saúde', tipo: 'diretor' },
      { id: 'saude-associado', nome: 'Diretor(a) Associado(a) de Ministério da Saúde', tipo: 'diretor_associado' },
    ],
    explicacao: 'O Ministério da Saúde promove os oito remédios naturais (água, sol, ar puro, repouso, exercício, alimentação adequada, temperança e confiança em Deus). Organiza palestras sobre saúde, cursos de culinária vegetariana, programas para parar de fumar, feiras de saúde na comunidade, e conscientiza sobre prevenção de doenças e estilo de vida saudável.'
  },
  {
    id: 'servico-comunitario',
    nome: 'Ação Solidária Adventista (ASA)',
    descricao: 'Realiza ações sociais e atendimento à comunidade',
    categoria: 'ministerio',
    cargos: [
      { id: 'asa-diretor', nome: 'Diretor(a) de ASA', tipo: 'diretor' },
      { id: 'asa-associado', nome: 'Diretor(a) Associado(a) de ASA', tipo: 'diretor_associado' },
    ],
    explicacao: 'A ASA coordena projetos sociais como distribuição de alimentos, roupas e cobertores, atendimento médico e odontológico gratuito, alfabetização, cursos profissionalizantes, e apoio a comunidades carentes. Demonstra o amor de Cristo através de ações práticas, sendo as mãos e os pés de Jesus na comunidade.'
  },
  {
    id: 'liberdade-religiosa',
    nome: 'Liberdade Religiosa',
    descricao: 'Defende e promove a liberdade de consciência e culto',
    categoria: 'ministerio',
    cargos: [
      { id: 'liberdade-diretor', nome: 'Diretor(a) de Liberdade Religiosa', tipo: 'diretor' },
      { id: 'liberdade-associado', nome: 'Diretor(a) Associado(a) de Liberdade Religiosa', tipo: 'diretor_associado' },
    ],
    explicacao: 'O departamento de Liberdade Religiosa trabalha para defender o direito de todos adorarem segundo sua consciência. Monitora ameaças à liberdade religiosa, educa os membros sobre seus direitos, interage com autoridades, e promove tolerância religiosa. Também defende questões como guarda do sábado no ambiente de trabalho e educação.'
  },
  {
    id: 'ministerio-universitario',
    nome: 'Ministério Universitário',
    descricao: 'Atende estudantes universitários e profissionais jovens',
    categoria: 'ministerio',
    cargos: [
      { id: 'universitario-diretor', nome: 'Diretor(a) de Ministério Universitário', tipo: 'diretor' },
      { id: 'universitario-associado', nome: 'Diretor(a) Associado(a) de Ministério Universitário', tipo: 'diretor_associado' },
    ],
    explicacao: 'O Ministério Universitário apoia estudantes universitários e profissionais recém-formados. Promove grupos de estudo bíblico em campus, encontros sociais, aconselhamento vocacional, apoio acadêmico, e ajuda os jovens a integrarem fé e conhecimento. Mantém os universitários conectados à igreja durante uma fase crítica de suas vidas.'
  },
  {
    id: 'recepcao',
    nome: 'Ministério de Recepção',
    descricao: 'Responsável por acolher e integrar visitantes e novos membros',
    categoria: 'ministerio',
    cargos: [
      { id: 'recepcao-diretor', nome: 'Diretor(a) de Recepção', tipo: 'diretor' },
      { id: 'recepcao-associado', nome: 'Diretor(a) Associado(a) de Recepção', tipo: 'diretor_associado' },
    ],
    explicacao: 'O Ministério de Recepção garante que todos que chegam à igreja sejam bem recebidos. Treina recepcionistas para serem cordiais e prestativos, organiza a recepção de visitantes, faz acompanhamento de novos frequentadores, auxilia pessoas com necessidades especiais, e trabalha para integrar novos membros à comunidade da igreja.'
  },
];

export default ministerios;

