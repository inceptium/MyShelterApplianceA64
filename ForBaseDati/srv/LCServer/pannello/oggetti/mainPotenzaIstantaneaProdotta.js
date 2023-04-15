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
var attendi1 = new attendi();
var grafico1 = new graficoEnergia();
$(document).ready(function(){
    var c=document.getElementById("grafico");
    attendi1.inAttesa();
    ctx=c.getContext("2d");
    testata1 = new testata();
    testata1.logoImpostazioni()
    testata1.eventi()
    footerImpostazioni1 = new footerImpostazioni();
    footerImpostazioni1.indietro();
    footerImpostazioni1.eventi2();
    var clicktouch = 'click';
    if ('ontouchstart' in document.documentElement) {
        clicktouch = "touchstart";
    }
    $('.sceltaG').bind(clicktouch,function(){
        grafico1.attendi1.inAttesa();
        grafico1.StopLeggiXml();
        var id= $(this).attr('id');
        switch (id) {
            case 'pi':
      
                grafico1.AvviaLeggiXml();
                grafico1.settaElemento("EnergiaProdotta");
                $('#g1').css('display','inline-block');
               
                break;
            case 'ug':
              grafico1.leggiUltimoGiorno();
                break;
            case 'us':
                grafico1.leggiUltimaSettimana();
                break;
            case 'um':
                grafico1.leggiUltimoMese();
                break;
        }

    })
    var stile1 = new stile();
    stile1.implementaStile()
    
    grafico1.settaElemento("EnergiaProdotta");
    grafico1.creaGrafico("EnergiaProdotta");
 
} );    
function funzioneVuota()
{}
