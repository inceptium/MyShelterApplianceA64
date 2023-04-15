$(document).ready(function(){
    testata1 = new testata();
    testata1.logoImpostazioni()
    testata1.eventi()
    footerImpostazioni1 = new footerImpostazioni();
    footerImpostazioni1.indietro();
    footerImpostazioni1.eventi();
    var stile1 = new stile();
    stile1.implementaStile()
    if(localStorage.scala=="kw"){
        $('#scala').val(localStorage.scala);
    }
    if(localStorage.valoreEnergiaConsumata==undefined)
    {
        $('#valoreEnergiaConsumata').val(3000);
    }else{
        $('#valoreEnergiaConsumata').val(localStorage.valoreEnergiaConsumata);
    }
    if(localStorage.valoreEnergiaProdotta==undefined)
    {
        $('#valoreEnergiaProdotta').val(3000);
    }else{
        $('#valoreEnergiaProdotta').val(localStorage.valoreEnergiaProdotta);
    }
    $('#'+localStorage.setIcone).attr('class','pulsante grandezzaPulsante2 sceltaIcone semplice tecno')   
    var clicktouch = "click";
    if(localStorage.editMode=='si'){
        $('#editMode').empty();
        $('#editMode').append('<b style="color:green">Si</b>/No Edit Mode Elementi')
    }else{
        $('#editMode').empty();
        $('#editMode').append('Si/<b style="color:red">No</b> Edit Mode Elementi')
    }
    if ('ontouchstart' in document.documentElement) {
        clicktouch = "touchstart";
    }
    $('#impostaScala').bind(clicktouch,function(){
        localStorage.scala = $('#scala').val();
        var finestra1 = new finestra();
        finestra1.apriFinestra2('Valore impostato correttamente! <br/> Attenzione! Impostare i valori dei fondoscala!');
    })
    $('#impostaEnergiaConsumata').bind(clicktouch,function(){
        localStorage.valoreEnergiaConsumata = $('#valoreEnergiaConsumata').val();
               var finestra1 = new finestra();
        finestra1.apriFinestra2('Valore impostato correttamente!');
    })
    $('#impostaEnergiaProdotta').bind(clicktouch,function(){
        localStorage.valoreEnergiaProdotta = $('#valoreEnergiaProdotta').val();
          var finestra1 = new finestra();
        finestra1.apriFinestra2('Valore impostato correttamente!');
    })
    $('.sceltaTema').bind(clicktouch,function(){
        var id= $(this).attr('id');
        if(id=='temaBianco'){
            localStorage.temaColore = 'bianco'
        }else{
            localStorage.temaColore = 'nero'
        }
        var stile1 = new stile();
        stile1.implementaStile()
    })
    if(localStorage.immagine=='no'){
        localStorage.immagine='no'
        $('#sceltaImmagine').empty();
        $('#sceltaImmagine').append('Si/<b style="color:red">No</b> Immagini in Locale')

    }else{
        localStorage.immagine='si'
        $('#sceltaImmagine').empty();
        $('#sceltaImmagine').append('<b style="color:green">Si</b>/No Immagini in Locale')
    }
    $('.sceltaImmagine').bind(clicktouch,function(){
        if(localStorage.immagine=='no'){
            localStorage.immagine='si'
            $(this).empty();
            $(this).append('<b style="color:green">Si</b>/No Immagini in Locale')
        }else{
            localStorage.immagine='no'
            $(this).empty();
            $(this).append('Si/<b style="color:red">No</b> Immagini in Locale')
        }
    })
    $('.sceltaIcone').bind(clicktouch,function(){
        var id= $(this).attr('id');
        localStorage.setIcone = id;
        var stile1 = new stile();
        stile1.implementaStile()
        var stileStringa = 'tecno';
        $('.sceltaIcone').attr('class','pulsante grandezzaPulsante2 sceltaIcone semplice')
        $(this).attr('class','pulsante grandezzaPulsante2 sceltaIcone semplice tecno')
        switch (id) {
            case 'set1':
                stileStringa = 'Metro';
                break;
            case 'set2':
                stileStringa = 'Push';
                break;
            case 'set2':
                stileStringa = 'Creative';
                break;
            case 'set4':
                stileStringa = 'Tecno';
                break;
            default:
                break;
        }
    })
    if ('ontouchstart' in document.documentElement) var clickTouch = 'touchstart'; else clickTouch = 'click';
    $('#impostazioniInit').bind(clickTouch,function(){
        localStorage.clear();
        var finestra1 = new finestra();
        finestra1.apriFinestra2('Impostazioni Iniziali Ripristinate, Aggiorna la pagina per attuarle.');
    })
    $('#cancellaPassword').bind(clickTouch,function(){
        localStorage.password = '';
        var finestra1 = new finestra();
        finestra1.apriFinestra2('Password Cancellata');
    })
    $('#editMode').bind(clickTouch,function(){
        if(localStorage.editMode=='no'||localStorage.editMode==null){
            localStorage.editMode='si'
            $(this).empty();
            $(this).append('<b style="color:green">Si</b>/No Edit Mode Elementi')
        }else{
            localStorage.editMode='no'
            $(this).empty();
            $(this).append('Si/<b style="color:red">No</b> Edit Mode Elementi')
        }
    })
})
function funzioneVuota()
{}