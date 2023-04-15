
$(document).ready(function(){
    if(localStorage.immagine==null)
    {
        localStorage.immagine = 'si';
    }
    primoAvvio = false;
    attendi1 = new attendi();
    attendi1.inAttesa();
    var restituisciOggetto = new restituisciJS();
    window.setTimeout(function(){
        
        eval(restituisciOggetto.restituisciLibreria('hammer.js','jquery'));
        eval(restituisciOggetto.restituisciLibreria('jquery.specialevent.hammer.js','jquery'));
        eval(restituisciOggetto.restituisciLibreria('jquery.md5.js','jquery'));
        eval(restituisciOggetto.restituisciLibreria('clickElemento.min.js','oggetti'));
        eval(restituisciOggetto.restituisci('firma.min.js','oggetti'));
        eval(restituisciOggetto.restituisci('cambiaStato.min.js','oggetti'));
        eval(restituisciOggetto.restituisci('leggiXml.min.js','oggetti'));
        eval(restituisciOggetto.restituisci('caricaGruppo.min.js','oggetti'));
        eval(restituisciOggetto.restituisci('elemento.min.js','oggetti'));
        eval(restituisciOggetto.restituisci('elaboraStringhe.min.js','oggetti'));
        eval(restituisciOggetto.restituisci('stile.min.js','oggetti'));
        eval(restituisciOggetto.restituisci('iconePersonalizzate.min.js','oggetti'));
        eval(restituisciOggetto.restituisci('footer.js'));
        //Per creare la testata (disegnare nel canvas testata e rendere le aree cliccabili
        testata1 = new testata();
        testata1.caricaImmagini();
        testata1.logo(false,'impostazioni');
        testata1.eventi();
        //Per creare la footer (disegnare nel canvas footer e rendere le aree cliccabili
        footer1 = new footer();
        footer1.indietro();
        footer1.home();
        footer1.impostazioni();
        footer1.connessione(footer1.immagineCNulla)
        footer1.eventi()
        //Array che viene popolato con tutti gli elementi presenti nel xml, caricato dai localStorage la seconda volta 
        arrayGruppi = new Array;
        arrayStatiElementi = new Array();
        //Oggetto che serve per settare il tema bianco o nero
        stile1 = new stile()
        stile1.implementaStile()
        //TextAreaAperta si riferisce alla finestra dello statusMonitor, se è aperta lo stato del currenttextvalue deve variare se varia nell'xml
        textAreaAperta = false;
        arrayIdGruppi = new Array();
        //if che decide se siamo su un supporto touch o click e si regola di conseguenza
        if ('ontouchstart' in document.documentElement) var clickTouch = 'touchstart'; else clickTouch = 'click';
        aggiornamentoInCorso = 1;
        //canvas per le immagini della testata
        canvasImmaginiMomentanee = document.createElement('canvas');
        arrayElementi = new Array();
        //carica il gruppo root(alias 0)
        attendi1.chiudiAttesa()
        gruppo1 = new caricaGruppo(0)
        gruppo1.carica();
        //richiama la funzione che aggiorna gli elementi ogni 7000 millisecondi 

        iconePersonalizzate1 = new iconePersonalizzate();
    }, 200)

    
})
function wrapText(context, text, x, y, maxWidth, lineHeight,maxaxpar) {
    var words = text.split(' ');
    var line = '';
    
    var maxax = maxaxpar;
    if(maxax==1){maxax=2}else{maxWidth-=10;}
    var ax = 0; 
    for(var n = 0; n < words.length; n++) {
        var testLine = line+words[n]+ ' ';
        var lunghezza = context.measureText(testLine).width;
        if(ax!=maxax){
            if(lunghezza>maxWidth){
                if(line!=''){
                    var lunghezzaLine = context.measureText(line).width;
                    var cent = (maxWidth-lunghezzaLine)/2 + x;
                    context.fillText(line, cent, y);
                    y += lineHeight
                    line = words[n];
                    ax +=1;
                }else{
                    line = testLine.slice(0,14);
                    var lline = context.measureText(line).width;
                    var centrato = (maxWidth-lline)/2 + x;
                    context.fillText(line, centrato, y);
                    y += lineHeight
                    line = '';
                    ax +=1;
                }
            }else{
                line += words[n]+' ';
            }
        }
    }
    var lunghezzaLine2 = context.measureText(line).width;
    var cent2 = (maxWidth-lunghezzaLine2)/2 + x;
    context.fillText(line, cent2, y);
}

//funzione per scrivere del testo sugli elementi senza fuoriuscire dal canvs
function wrapText2(context, text, x, y, maxWidth, lineHeight,maxaxpar) {
    var words = text.split(' ');
    var parolaPiuLunga = 0;
    var line = '';
    var centrato;
    var maxax = maxaxpar;
    var ax = 0;
    
    for(var n = 0; n < words.length-1; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if(testWidth > maxWidth) {
            if(ax<maxax){ 
                var lunghezzaLine = context.measureText(line).width;
                var cent = (maxWidth-lunghezzaLine)/2 + x;
                context.fillText(line, cent, y);
                line = words[n] + ' ';
                y += lineHeight;
                ax += 1;
                
            }
            
        }
        else {
            
            line = testLine;
        }
    }
    var lunghezzaLine2 = context.measureText(line).width;
    if(lunghezzaLine2<maxWidth){
        centrato = ((maxWidth-lunghezzaLine2)/2)+x;
    }else{
        
        line = line.slice(0,14);
        centrato = x;    
    }
    context.fillText(line, centrato, y);
    
}
//funzione richiamata sugli href per non riaggiornare la pagina al click
function funzioneVuota()
{}
//imageURI : string
//aType : string "image/png", "image/jpeg"
//return: base64 encoded data scheme strings
//function getBase64Image(img,tipoPallino) {
//    // Create an empty canvas element
//    var canvas = document.createElement('canvas')
//    canvas.width =16
//    canvas.height = 14
//
//    // Copy the image contents to the canvas
//    var ctx = canvas.getContext("2d");
//    img.onload=function(){
//        ctx.drawImage(img, 0, 0);
//        var dataURL = ctx.canvas.toDataURL("image/png");
//        if(tipoPallino=='nero'){
//            localStorage.pallinoNero = dataURL;
//        }else{
//            localStorage.pallinoVerde = dataURL;
//        }
//    }
//// Get the data-URL formatted image
//// Firefox supports PNG and JPEG. You could check img.src to
//// guess the original format, but be aware the using "image/jpg"
//// will re-encode the image.
//
//}