// Confere, depois de montar o site, se os itens básicos continuam em todas as páginas (português e inglês).
// Se algum sumir, a publicação é interrompida e o site no ar continua como estava.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const comuns = [
  ['logo', 'logo-transparente.png'],
  ['menu (Quem faz / bio)', 'bio/"'],
  ['seletor de idioma PT | EN', 'class="idioma'],
  ['rodapé com contato', 'actaterrae@gmail.com'],
];
const reportagem = [
  ['botão Início', 'class="voltar'],
  ['ícones de compartilhar', 'class="compartilhar'],
  ['comentários', 'id="comentarios"'],
  ['menu com Podcast', 'Podcast'],
];
const inicio = [['carrossel de fotos', 'class="reel'], ['menu lateral', 'class="lateral']];

function paginas(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? paginas(p) : p.endsWith('index.html') ? [p] : [];
  });
}
let erros = 0;
for (const arq of paginas('dist')) {
  const html = readFileSync(arq, 'utf8');
  const ehReportagem = arq.includes('reportagens');
  const ehInicio = arq === join('dist', 'index.html') || arq === join('dist', 'en', 'index.html');
  const lista = [...comuns, ...(ehReportagem ? reportagem : []), ...(ehInicio ? inicio : [])];
  for (const [nome, trecho] of lista) {
    if (!html.includes(trecho)) { console.error(`✗ ${arq}: faltou ${nome}`); erros++; }
  }
}
if (erros) { console.error(`\n${erros} item(ns) básico(s) sumiram. Publicação interrompida.`); process.exit(1); }
console.log('✓ Itens básicos conferidos em todas as páginas.');
