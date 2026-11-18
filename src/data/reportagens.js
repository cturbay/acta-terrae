// Lista das reportagens exibidas na página inicial (a mais recente primeiro).
// Para publicar uma nova: crie src/pages/reportagens/<slug>/index.astro e adicione um item aqui.
export const reportagens = [
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
