$(document).ready(function(){
    primoAvvio = false;
    attendi1 = new attendi();
    attendi1.inAttesa();
    var restituisciOggetto = new restituisciJS();
    
   window.setTimeout(function(){
       eval(restituisciOggetto.restituisci('cambiaStato.js'));
      eval(restituisciOggetto.restituisci('main.js'));
   }, 800)
    
    
    
})
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if(testWidth > maxWidth) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}
//funzione richiamata sugli href per non riaggiornare la pagina al click
function funzioneVuota()
{}