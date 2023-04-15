var altezzaCanvas = 300;
var puntiKw = 50;
var zoomTempo = 1;
var puntiMinuto = 60*zoomTempo;
var inizioDisegno = 0;
var inizioGrafico = 0;
var ultimaDataVisualizzata = -1;
var oralocale2;
var vecchiaOraLocale =0;
var ctx;
var posizioneNomi = 5;
var dataPassata = 0;
var larghezzaCanvas = 500;

$(document).ready(function(){
    var c=document.getElementById("grafico");
    ctx=c.getContext("2d");
    testata1 = new testata();
    testata1.logoImpostazioni()
    testata1.eventi()
    footerImpostazioni1 = new footerImpostazioni();
    footerImpostazioni1.indietro();
    footerImpostazioni1.eventi();
    var stile1 = new stile();
    stile1.implementaStile()
    var grafico1 = new graficoEnergia();
    grafico1.aggiungiAzioneAlClick();
 
} );    
function funzioneVuota()
{}
