// Google Apps Script: recebe o aviso do site e manda um e-mail pelo Gmail do dono do script.
function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  var corpo =
    d.nome + ' comentou em ' + d.link + ':\n\n' + d.texto + '\n\n' +
    'O comentário aguarda a sua aprovação.\nAbrir o painel de moderação: ' + d.painel;
  MailApp.sendEmail({
    to: Session.getEffectiveUser().getEmail(),
    subject: 'Novo comentário de ' + String(d.nome).slice(0, 40) + ' – Acta Terrae',
    body: corpo,
  });
  return ContentService.createTextOutput('ok');
}
