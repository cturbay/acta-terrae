// Lista das reportagens exibidas na página inicial (a mais recente primeiro).
// Para publicar uma nova: crie src/pages/reportagens/<slug>/index.astro e adicione um item aqui.
export const reportagens = [
  {
    slug: 'barreiras-costa-pataxo',
    secao: 'Território e história',
    titulo: 'As barreiras da costa pataxó',
    resumo:
      'As falésias coloridas do sul da Bahia guardam milhões de anos de história. Do clima do passado à floresta, dos pataxós à especulação imobiliária, o que está em jogo na costa pataxó?',
    autor: 'Caio Gabrig Turbay',
    data: 'Maio de 2025',
    imagem: '/reportagens/barreiras-costa-pataxo/abertura.jpg',
    en: {
      secao: 'Territory and history',
      data: 'May 2025',
      titulo: 'The barriers of the Pataxó coast',
      resumo:
        'The colourful cliffs of southern Bahia hold millions of years of history. From the climate of the past to the forest, from the Pataxó to real estate speculation, what is at stake on the Pataxó coast?',
    },
  },
  {
    slug: 'erosao-costeira-sul-da-bahia',
    secao: 'Mudanças climáticas',
    titulo: 'Erosão costeira: causas e desafios para o século 21',
    resumo:
      'Muros, cercas e construções à beira-mar enfraquecem a cada maré forte. O que explica o recuo da costa no litoral do sul da Bahia?',
    autor: 'Caio Gabrig Turbay',
    data: 'Agosto de 2023',
    imagem: '/reportagens/erosao-costeira-sul-da-bahia/abertura.jpg',
    en: {
      secao: 'Climate change',
      data: 'August 2023',
      titulo: 'Coastal erosion: causes and challenges for the 21st century',
      resumo:
        'Walls, fences and seafront buildings are weakened with every strong tide. What explains the retreat of the coast in southern Bahia?',
    },
  },
  {
    slug: 'desmatamento-arraial',
    secao: 'Meio ambiente',
    titulo: "Derrubada das florestas avança em Arraial D'Ajuda, Bahia",
    resumo:
      'Na última década, Arraial presenciou o avanço forte na derrubada de suas matas. Quem conhece a região percebe a destruição em intervalos de tempo muito curtos.',
    autor: 'Caio Gabrig Turbay',
    data: 'Agosto de 2021',
    imagem: '/reportagens/desmatamento-arraial/Abertura-rua-2-1024x702.png',
    en: {
      secao: 'Environment',
      titulo: "Deforestation advances in Arraial d'Ajuda, Bahia",
      resumo:
        'Over the past decade, Arraial d\'Ajuda has seen a sharp advance in the clearing of its forests. Anyone who knows the region notices the destruction happening in very short intervals of time.',
      data: 'August 2021',
    },
  },
];
