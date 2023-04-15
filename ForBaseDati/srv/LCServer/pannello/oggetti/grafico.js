var graficoEnergia = function() //footer con i tre pulsanti indirtro, home e aggiorna
{
    this.numeroDiValoriRealTime = 100;
    this.leggi = 'leggi';
    this.options;
    this.attendi1 = new attendi();
    this.d3 = [];
    this.d2 = [];
    this.altezzaCanvas = 300;
    this.larghezzaRigheW = 50;
    this.nomeElemento = '';
    this.puntiKw = 50;
    this.zoomTempo = 1;
    this.puntiMinuto = 60*this.zoomTempo;
    this.inizioDisegno = 40;
    this.dataDal = "0-0-0";
    this.dataAl = "0-0-0";
    this.inizioGrafico = 40;
    this.ultimaDataVisualizzata = -1;
    this.oralocale2;
    this.vecchiaOraLocale =0;
    this.ctx;
    this.posizioneNomi = 5;
    this.dataPassata = 0;
    this.larghezzaCanvas = 250; 
    this.totValori =0;
    this.numValori =0;
    this.mediaW=0;
    this.numeroRighe = 10;
    this.minW = 0;
    this.plot;
    this.valoreMisura = "m";
    this.maxW = 0;
    var thisOggetto = this;
    if(localStorage.nomeElemento!=''&&localStorage.nomeElemento!=undefined){
        $('#messaggi').append("<p>Nome Elemento Salvato in Locale: <b>"+localStorage.nomeElemento+"</b>, se non inserisci nessun nome elemento, verra' usato il nome elemento salvato.</p>");
    }
    $('#messaggi').append("</br><p><b style='color:red'>*</b> In caso di DataLogger Fotovoltaico inserire 'EnergiaConsumata' oppure 'EnergiaProdotta'.</p><br/><p>Se non inserisci le date, verra' visualizzata la potenza istantanea.</p> Se invece tralasci il secondo periodo, verra' mostrato solo il primo.</br> <b>N.B. Confrontare due periodi maggiori di 7 gg, potrebbe richiedere tempi lunghi.</b>");
    this.resetta = function(){
        thisOggetto.options;
        thisOggetto.attendi1 = new attendi();
        thisOggetto.d3 = [];
        thisOggetto.altezzaCanvas = 300;
        thisOggetto.larghezzaRigheW = 50;
        thisOggetto.nomeElemento = '';
        thisOggetto.puntiKw = 50;
        thisOggetto.zoomTempo = 1;
        thisOggetto.puntiMinuto = 60*this.zoomTempo;
        thisOggetto.inizioDisegno = 40;
        thisOggetto.dataDal = "0-0-0";
        thisOggetto.dataAl = "0-0-0";
        thisOggetto.inizioGrafico = 40;
        thisOggetto.ultimaDataVisualizzata = -1;
        thisOggetto.oralocale2;
        thisOggetto.vecchiaOraLocale =0;
        thisOggetto.ctx;
        thisOggetto.posizioneNomi = 5;
        thisOggetto.dataPassata = 0;
        thisOggetto.larghezzaCanvas = 250; 
        thisOggetto.totValori =0;
        thisOggetto.numValori =0;
        thisOggetto.mediaW=0;
        thisOggetto.numeroRighe = 10;
        thisOggetto.minW = 0;
        thisOggetto.valoreMisura = "m";
        thisOggetto.maxW = 0;
    }
    this.StopLeggiXml = function()
    {
        thisOggetto.leggi = 'stop';
    }
    this.AvviaLeggiXml = function()
    {
        thisOggetto.leggi = 'leggi';
    }
    this.leggiXmlRange = function(d){
        firma1 = new firma();
        if(firma1.token!='no_md5')
        {
            firmaM = firma1.nuovaFirma();
        }else{
            firmaM = ''
        }
        $.ajax({                                   
            type: "GET",
            url: "http://"+window.location.host.toString()+"/command=custom=logger_all_hour_element_log="+thisOggetto.nomeElemento+":"+thisOggetto.dataDal+":"+thisOggetto.dataAl+firmaM,
            dataType: "xml",
            timeout:18000,
            async:false,
            error:function(errore){
                var finestra1 = new finestra();
                finestra1.apriFinestra("Errore!</br></br>Ho riscontrato un errore nel ricevere dati dal server. Controlla il nome dell'elemento e la password del pannello. Assicurati di essere connesso all'apparato. </br> Nel caso il problema non si risolva, riavviare l'apparato.");
            },
            success: function(xml) {
                
                var stringa = $(xml).find('letocrono_status').text() ;
                if(stringa==''||stringa==' '||stringa.length==1)
                {
                    thisOggetto.attendi1.chiudiAttesa()
                    var finestra1 = new finestra();
                    finestra1.apriFinestra("Errore!</br></br>Ho riscontrato un errore nel ricevere dati dal server. Controlla il nome dell'elemento, potrebbe essere errato.");
                }else{
                    thisOggetto.numeroDiValoriRealTime = -1;
                    var arrayDiLog = new Array();
                    arrayDiLog = stringa.split(/\n/);
                    var arrayCompleto = new Array();
                    thisOggetto.valoreMisura = "h";
                    var timeStemp = 0;
                    for (i = arrayDiLog.length-1; i > 0; i--) {
                        if(arrayDiLog[i]!=""){
                            var arrayLocale = new Array();
                            arrayLocale = arrayDiLog[i].split(";");
                    
                            arrayCompleto.push(arrayLocale);
                            var arrayDiOra = new Array();
                            arrayDiOra = arrayLocale[1].split(".");
                            var oralocale = (arrayLocale[3]/60/60/1000)
                            if(timeStemp!=0){
                                thisOggetto.oralocale2 += oralocale-timeStemp;
                                timeStemp = (arrayLocale[3]/60/60/1000)
                            }else{
                                timeStemp = (arrayLocale[3]/60/60/1000)
                                thisOggetto.oralocale2 = 0;
                            }
                            thisOggetto.disegnaAncora(arrayLocale[2],thisOggetto.oralocale2,d)
                            thisOggetto.aggiungiRigaTabella(arrayLocale);

                        }     
                    }
                    thisOggetto.attendi1.chiudiAttesa()
                }
            }
        })
    }
    this.leggiXml = function()
    {
        firma1 = new firma();
        if(firma1.token!='no_md5')
        {
            firmaM = firma1.nuovaFirma();
        }else{
            firmaM = ''
        }
        $.ajax({                                   
            type: "GET",
            url: "http://"+window.location.host.toString()+"/command=custom=logger_real_time_element_log="+thisOggetto.nomeElemento+firmaM,
            dataType: "xml",
            timeout:18000,
            async:true,
            error:function(errore){
                var finestra1 = new finestra();
                finestra1.apriFinestra("Errore!</br></br>Ho riscontrato un errore nel ricevere dati dal server. Controlla la password del pannello. Assicurati di essere connesso all'apparato. </br> Nel caso il problema non si risolva, riavviare l'apparato.");

            },
            success: function(xml) {
                if(thisOggetto.leggi!='stop'){
                    var stringa = $(xml).find('letocrono_status').text() ;
                    
                    if(stringa==''||stringa==' '||stringa.length==1)
                    {
                        thisOggetto.attendi1.chiudiAttesa()
                        var finestra1 = new finestra();
                        finestra1.apriFinestra("Errore!</br></br>Ho riscontrato un errore nel ricevere dati dal server. Controlla il nome dell'elemento, potrebbe essere errato.");
                    }else{
                        var arrayDiLog = new Array();
                        arrayDiLog = stringa.split(/\n/);
                        var arrayCompleto = new Array();
                        for (i = arrayDiLog.length-1; i > 0; i--) {
                            if(arrayDiLog[i]!=""){
                                var arrayLocale = new Array();
                                arrayLocale = arrayDiLog[i].split(";");
                                thisOggetto.numeroDiValoriRealTime = arrayLocale.length;
                                arrayCompleto.push(arrayLocale);
                                var arrayDiOra = new Array();
                                arrayDiOra = arrayLocale[1].split(".");
                                var oralocale =(arrayLocale[3]/60/60/1000)*60;
                                if(thisOggetto.vecchiaOraLocale!=0){
                                    thisOggetto.oralocale2 += oralocale-thisOggetto.vecchiaOraLocale;
                                    thisOggetto.vecchiaOraLocale = oralocale;
                                }else{
                                    thisOggetto.vecchiaOraLocale = oralocale;
                                    thisOggetto.oralocale2 = 0;
                                }
                                if(thisOggetto.dataPassata==0 || thisOggetto.vecchiaOraLocale<=oralocale){
                                    if(oralocale>thisOggetto.dataPassata){
                                        thisOggetto.disegnaAncora(arrayLocale[2],thisOggetto.oralocale2,thisOggetto.d3)
                                        thisOggetto.dataPassata = oralocale;
                                        thisOggetto.aggiungiRigaTabella(arrayLocale);
                                    }
                                }
                            }     
                        }
                        thisOggetto.attendi1.chiudiAttesa()
                        if(thisOggetto.leggi!='stop'){
                            setTimeout(thisOggetto.leggiXml(), 2000)    
                        }
                    }
                }
            }
        });
    }
    this.inizializzaGrafico = function()
    {
        $('#zoomOut').bind("click",function(){
            thisOggetto.plot.zoomOut();
        })
        $('#zoomIn').bind("click",function(){
            thisOggetto.plot.zoom();
        })
        $('#left').bind("click",function(){
            thisOggetto.plot.pan({
                left: -100
            })
        })
        $('#right').bind("click",function(){
            thisOggetto.plot.pan({
                left: +100
            })
        })
    }
    this.aggiungiAzioneAlClick = function()
    {
        $( "#data1" ).datepicker({
            dateFormat: "yy-mm-dd"
        });
        $( "#data2" ).datepicker({
            dateFormat: "yy-mm-dd"
        });
        $( "#data3" ).datepicker({
            dateFormat: "yy-mm-dd"
        });
        $( "#data4" ).datepicker({
            dateFormat: "yy-mm-dd"
        });
        var elementoPresente = true;
        $('#creaGrafico').bind("click",function(){
            thisOggetto.StopLeggiXml();
            thisOggetto.resetta();
            thisOggetto.attendi1.inAttesa();
            $('placeholder').empty();
            thisOggetto.d3 = [];
            thisOggetto.d2 = [];
            if($("#nomeElemento").attr('value')!=''){
                thisOggetto.nomeElemento = $("#nomeElemento").attr('value');
                localStorage.nomeElemento = thisOggetto.nomeElemento;
            }else{
                if(localStorage.nomeElemento!='')
                {
                    thisOggetto.nomeElemento = localStorage.nomeElemento;
                }else{
                    alert('inserisci un valore valido');
                    elementoPresente = false;
                }
            }
            if(elementoPresente){
                if($("#data1").attr('value')!=''){
                    $('#pulsantiNavigazione').css('display','block');
                    thisOggetto.dataDal = $("#data1").attr('value');
                    if($("#data2").attr('value')!=''){
                        thisOggetto.dataAl = $("#data2").attr('value');
                    }else{
                        thisOggetto.dataAl = thisOggetto.dataDal;

                    }
                    
                    $('#labelUltimoValoreW').empty();
                    $('#labelUltimoValoreW').append('<b style="color:red">'+localStorage.nomeElemento+' Kw/h:</b> ');
                    $('#labelMediaW').empty();
                    $('#labelMediaW').append('<b style="color:rgb(10,168,208)">'+localStorage.nomeElemento+' Kw/h:</b> ');
                    $('#ultimoValoreW').css('display','none');
                    $('#ultimoValoreWData').css('display','none');
                    $('#energiaProdotta').css('display','block');
                    thisOggetto.leggiXmlRange(thisOggetto.d3);
                    $('#mediaW').empty();
                    $('#mediaW').append('-');
                    var totValoriStr = (thisOggetto.totValori/1000).toString()
                    var totValoriVirg = totValoriStr.replace('.',',')
                    $('#energiaProdotta').empty();
                    $('#energiaProdotta').append(totValoriVirg);
                    $('#ultimoValoreW').empty();
                    $('#ultimoValoreW').append(totValoriVirg);
                    if($("#data3").attr('value')!=''){
                        thisOggetto.dataDal = $("#data3").attr('value');
                        if($("#data4").attr('value')!=''){
                            thisOggetto.dataAl = $("#data4").attr('value');
                        }else{
                            thisOggetto.dataAl = thisOggetto.dataDal;

                        }
                        thisOggetto.totValori = 0;
                        thisOggetto.leggiXmlRange(thisOggetto.d2)
                        $('#mediaW').empty();
                        totValoriStr = (thisOggetto.totValori/1000).toString()
                        totValoriVirg = totValoriStr.replace('.',',')
                        $('#mediaW').append(totValoriVirg);
                    }
                }else{
                    $('#pulsantiNavigazione').css('display','none');
                    $('#energiaProdotta').css('display','none');
                    $('#ultimoValoreW').css('display','block');
                    $('#labelUltimoValoreW').empty();
                    $('#labelUltimoValoreW').append('Potenza Istantanea W: ');
                    $('#labelMediaW').empty();
                    $('#labelMediaW').append('');
                    thisOggetto.AvviaLeggiXml();
                    thisOggetto.leggiXml();
                }    
            }
           
             
        })
    }
    this.aggiungiRigaTabella = function(arrayDiValori)
    {
        thisOggetto.totValori += parseInt(arrayDiValori[2]);
        thisOggetto.numValori += 1;
        thisOggetto.mediaW = Math.round(thisOggetto.totValori/thisOggetto.numValori);
        $('#ultimoValoreW').empty();
        $('#ultimoValoreW').append(arrayDiValori[2]);
        $('#ultimoValoreWData').empty();
        $('#ultimoValoreWData').append(arrayDiValori[0]+' '+arrayDiValori[1]);
        $('#mediaW').empty();
    }
    this.disegnaAncora = function(valore,data,d)
    {
        d.push([data,valore]);
        if(thisOggetto.numeroDiValoriRealTime!=-1){
            if(d.length>150){
                d.shift();
            }
        }
        var options;
        var placeholder = $("#placeholder");
        options = {
            series: {
                lines: {
                    show: true
                }, 
                shadowSize: 1
            },
            xaxis: {
                zoomRange: [0, 2000], 
                panRange: [0,2000 ],
                tickFormatter: function (v) {
                    return v + " "+thisOggetto.valoreMisura;
                }
            },
            yaxis: {
                zoomRange: [0, 0], 
                panRange: [0, 6000],
                tickFormatter: function (v) {
                    return v + " W";
                }
            },
            zoom: {
                interactive: false
                    
            },
            pan: {
                interactive: true
            }
        };
        thisOggetto.plot = plot = $.plot($("#placeholder"), [{
            data: thisOggetto.d3,
            label: 'W',
            color: 'red'
        },{
            data: thisOggetto.d2,
            label: 'W',
            color: 'rgb(10,168,208)'  
        }],options);

  
    }
    
}