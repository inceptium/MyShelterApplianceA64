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
    this.nomeElemento = 'EnergiaProdotta';
    this.qualeG = 'real';
    this.dataDal = "0-0-0";
    this.dataAl = "0-0-0";
    this.ultimaDataVisualizzata = -1;
    this.oralocale2;
    this.vecchiaOraLocale =0;
    this.dataPassata = 0;
    this.totValori =0;
    this.numValori =0;
    this.mediaW=0;
    this.numeroRighe = 10;
    this.minW = 0;
    this.maxW = 0;
    var thisOggetto = this;
    this.resetta = function(){
        thisOggetto.options;
        thisOggetto.qualeG ='real';
        thisOggetto.d3 = [];
        thisOggetto.puntiKw = 50;
        thisOggetto.dataDal = "0-0-0";
        thisOggetto.dataAl = "0-0-0";
        thisOggetto.ultimaDataVisualizzata = -1;
        thisOggetto.oralocale2;
        thisOggetto.vecchiaOraLocale =0;
        thisOggetto.dataPassata = 0;
        thisOggetto.totValori =0;
        thisOggetto.numValori =0;
        thisOggetto.mediaW=0;
        thisOggetto.numeroRighe = 10;
        thisOggetto.minW = 0;
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
    this.leggiXmlRange = function(){
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
            async:true,
            error:function(errore){
                var finestra1 = new finestra();
                finestra1.apriFinestra("Errore!</br></br>Ho riscontrato un errore nel ricevere dati dal server. Controlla il nome dell'elemento e la password del pannello. Assicurati di essere connesso all'apparato. </br> Nel caso il problema non si risolva, riavviare l'apparato.");
            },
            success: function(xml) {
                var stringa = $(xml).find('letocrono_status').text() ;
                if(stringa==''||stringa==' '||stringa.length==1)
                {
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
                            thisOggetto.aggiungiRigaTabella(arrayLocale);

                        }     
                    }
                    
                    var kwow = 1;
                    if(localStorage.scala=="kw")
                    {
                        kwow = 1000;
                    }
                    var divisor = 1000/kwow;
                    var valoretot = parseInt(thisOggetto.totValori)/1000;
                    switch (thisOggetto.qualeG) {
                        case 'G2':
                            refreshG2(Math.round((valoretot)*10)/10,Math.round((valoretot+valoretot/2)));
                            break;
                        case 'G3':
                            refreshG3(Math.round((valoretot)*10)/10,Math.round((valoretot+valoretot/2)));
                            break;
                        case 'G4':
                            refreshG4(Math.round((valoretot)*10)/10,Math.round((valoretot+valoretot/2)));
                            break;

                    }
                    
                    thisOggetto.AvviaLeggiXml();
                    thisOggetto.resetta();
                    thisOggetto.leggiXml();

                    
                   
                    
                }
            }
        })
    }
    this.leggiUltimoGiorno = function()
    {
        thisOggetto.resetta();
        thisOggetto.qualeG ='G2';
        var oggi = new Date();
        var mese = (oggi.getMonth()+1).toString();
        var meseDefinitivo = '0';
        var giorno = (oggi.getDate()).toString();
        var giornoDefinitivo = '0';
        if(mese.length==1){meseDefinitivo+=mese}else{meseDefinitivo=mese};
        if(giorno.length==1){giornoDefinitivo+=giorno}else{giornoDefinitivo=giorno};
        thisOggetto.dataDal = oggi.getFullYear()+"-"+meseDefinitivo+"-"+giornoDefinitivo;
        thisOggetto.dataAl = oggi.getFullYear()+"-"+meseDefinitivo+"-"+giornoDefinitivo;
        thisOggetto.leggiXmlRange();
    }
    this.leggiUltimaSettimana = function()
    {
        thisOggetto.resetta();
        thisOggetto.qualeG ='G3';
        var oggi = new Date();
        var mese = (oggi.getMonth()+1).toString();
        var meseDefinitivo = '0';
        var giorno = (oggi.getDate()).toString();
        var giornoDefinitivo = '0';
        if(mese.length==1){meseDefinitivo+=mese}else{meseDefinitivo=mese};
        if(giorno.length==1){giornoDefinitivo+=giorno}else{giornoDefinitivo=giorno};
        thisOggetto.dataAl = oggi.getFullYear()+"-"+meseDefinitivo+"-"+giornoDefinitivo;
        oggi.setDate(oggi.getDate()-7);
        var mese2 = (oggi.getMonth()+1).toString();
        var meseDefinitivo2 = '0';
        var giorno2 = (oggi.getDate()).toString();
        var giornoDefinitivo2 = '0';
        if(mese2.length==1){meseDefinitivo2+=mese2}else{meseDefinitivo2=mese2};
        if(giorno2.length==1){giornoDefinitivo2+=giorno2}else{giornoDefinitivo2=giorno2};
        thisOggetto.dataDal = oggi.getFullYear()+"-"+meseDefinitivo2+"-"+giornoDefinitivo2;
        thisOggetto.leggiXmlRange();
    }
    this.leggiUltimoMese = function()
    {
        thisOggetto.resetta();
        thisOggetto.qualeG ='G4';
        var oggi = new Date();
        var mese = (oggi.getMonth()+1).toString();
        var meseDefinitivo = '0';
        var giorno = (oggi.getDate()).toString();
        var giornoDefinitivo = '0';
        if(mese.length==1){meseDefinitivo+=mese}else{meseDefinitivo=mese};
        if(giorno.length==1){giornoDefinitivo+=giorno}else{giornoDefinitivo=giorno};
        thisOggetto.dataAl = oggi.getFullYear()+"-"+meseDefinitivo+"-"+giornoDefinitivo;
        oggi.setMonth(oggi.getMonth()-1);
        var mese2 = (oggi.getMonth()+1).toString();
        var meseDefinitivo2 = '0';
        var giorno2 = (oggi.getDate()).toString();
        var giornoDefinitivo2 = '0';
        if(mese2.length==1){meseDefinitivo2+=mese2}else{meseDefinitivo2=mese2};
        if(giorno2.length==1){giornoDefinitivo2+=giorno2}else{giornoDefinitivo2=giorno2};
        thisOggetto.dataDal = oggi.getFullYear()+"-"+meseDefinitivo2+"-"+giornoDefinitivo2;

        thisOggetto.leggiXmlRange();
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
    this.settaElemento = function(nomeElemento1)
    {
        thisOggetto.nomeElemento = nomeElemento1;
    }
    this.creaGrafico = function(nomeElemento)
    {
        thisOggetto.nomeElemento = nomeElemento;
            
        $('#labelUltimoValoreW').empty();
        $('#labelUltimoValoreW').append('<b style="color:red">'+localStorage.nomeElemento+' Kw/h:</b> ');
        $('#labelMediaW').empty();
        $('#labelMediaW').append('<b style="color:rgb(10,168,208)">'+localStorage.nomeElemento+' Kw/h:</b> ');
        $('#ultimoValoreW').css('display','none');
        $('#ultimoValoreWData').css('display','none');
        $('#energiaProdotta').css('display','block');
        $('#mediaW').empty();
        $('#mediaW').append('-');
        var totValoriStr = (thisOggetto.totValori/1000).toString()
        var totValoriVirg = totValoriStr.replace('.',',')
        $('#energiaProdotta').empty();
        $('#energiaProdotta').append(totValoriVirg);
        $('#ultimoValoreW').empty();
        $('#ultimoValoreW').append(totValoriVirg);
        $('#pulsantiNavigazione').css('display','none');
        $('#energiaProdotta').css('display','none');
        $('#ultimoValoreW').css('display','block');
        $('#labelUltimoValoreW').empty();
        $('#labelUltimoValoreW').append('');//Potenza istantanea
        $('#labelMediaW').empty();
        $('#labelMediaW').append('');
        thisOggetto.AvviaLeggiXml();
        thisOggetto.leggiXml();
    }
    this.aggiungiRigaTabella = function(arrayDiValori)
    {
        var kwow = 1;
        if(localStorage.scala=="kw")
        {
            kwow = 1000;
        }
        thisOggetto.totValori += parseInt(arrayDiValori[2]);
        
        thisOggetto.numValori += 1;
        thisOggetto.mediaW = Math.round(thisOggetto.totValori/thisOggetto.numValori);
        $('#ultimoValoreW').empty();
        
        refreshG1(Math.round((arrayDiValori[2]/kwow)*10)/10);
        $('#ultimoValoreW').append(arrayDiValori[2]);
        $('#ultimoValoreWData').empty();
        $('#ultimoValoreWData').append(arrayDiValori[0]+' '+arrayDiValori[1]);
        $('#mediaW').empty();
    }
    
    
}