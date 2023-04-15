/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var pw_leto="";

var cifra=false;
var Durata_aggiornamento=1000;
var confirmed=false;
var cancella_pass=false;

var myScroll;
 



function getXMLHttp() {
    var xmlhttp = null;
    if (window.ActiveXObject ) {
        XMLHttpRequest2 = function () {
            try {
            
                return new ActiveXObject("Msxml2.XMLHTTP.6.0");
            }
            catch (e1) {}
            try {
       
                return new ActiveXObject("Msxml2.XMLHTTP.3.0");
            }
            catch (e2) {}
            try {

                return new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e3) {}
            //Microsoft.XMLHTTP points to Msxml2.XMLHTTP.3.0 and is redundant
            throw new Error("This browser does not support XMLHttpRequest.");
        };
        xmlhttp = new XMLHttpRequest2();
    }else{
      
        xmlhttp = new XMLHttpRequest();
    }
    
    return xmlhttp
}

function elaboraRisposta(id_ele,Elemento_Da_Elaborare,mom_ingra,objHTTP) {
    if (objHTTP.readyState   == 4) {
        OttieniToken2("OttieniStatoElemento","",id_ele,Elemento_Da_Elaborare,mom_ingra);
    //        OttieniStatoElemento(id_ele,Elemento_Da_Elaborare,mom_ingra);
    }


}
function OttieniToken(){
    Crea_Testata();
    var objHTTP2 = getXMLHttp();
    objHTTP2.open("GET", "http://"+window.location.host.toString()+"/command=get?token",true);

    objHTTP2.onreadystatechange = function() {
        elaboraRispostaToken(objHTTP2)
    }

    objHTTP2.send(null);


}


function OttieniToken2(Cosa_Fare,percorso,id_ele,Elemento_Da_Elaborare,mom_ingra){
    if (cifra){
        $("#a_stato").show();
        var objHTTP2 = getXMLHttp();
        objHTTP2.open("GET", "http://"+window.location.host.toString()+"/command=get?token",true);

        objHTTP2.onreadystatechange = function() {
            //            elaboraRispostaToken2(objHTTP2,Cosa_Fare,percorso,id_ele,Elemento_Da_Elaborare,mom_ingra)
            var token_leto2="";
            var MD5_aute="";
            if (this.readyState   == 4) {
                if (this.status==200){
                    if(this.responseText){

                        token_leto2=this.responseText;
                        MD5_aute="/"+$.md5(token_leto2+pw_leto);
                        Cosa_Facciamo(Cosa_Fare,percorso,id_ele,MD5_aute,Elemento_Da_Elaborare,mom_ingra);
                        setta_Stato(1);
                    }else{
                        setta_Stato(0);
                    }
                }else{
                    //            alert("no token");
                    setta_Stato(0);
                }
            }
        }

        objHTTP2.send(null);
    }else{
        $("#a_stato").show();
        Cosa_Facciamo(Cosa_Fare,percorso,id_ele,"",Elemento_Da_Elaborare,mom_ingra);
    }
 
}


function Cosa_Facciamo(Cosa_Fare,percorso,id_ele,MD5_Attivazione,Elemento_Da_Elaborare,mom_ingra){
    if (MD5_Attivazione==null){
        MD5_Attivazione="";
    }
    if (Cosa_Fare=="AggiornaStato"){
        AggiornaStato(MD5_Attivazione);
    }
    if (Cosa_Fare=="Attiva"){
        Attiva(percorso,id_ele,MD5_Attivazione);
    }
    if (Cosa_Fare=="OttieniStatoElemento"){
        OttieniStatoElemento(id_ele,Elemento_Da_Elaborare,mom_ingra, MD5_Attivazione);
    }
}

function Crea_Testata(){
    var div_globale=document.createElement("div");
    div_globale.id="div_unico";
    div_globale.className="div_globale";

    var div_connessione=document.createElement("div");
    div_connessione.id="div_connessione";
    $(div_connessione).append("<a id='a_reset' href='javascript:ResettaPassword()'>LOGIN</a>");
    $(div_connessione).append("<a id='a_connessione'></a>");
    $(div_connessione).append("<a id='a_stato'>CNN</a>");
    div_globale.appendChild(div_connessione);
    document.body.appendChild(div_globale);
    
}

function ResettaPassword(){
    if (cifra){
        //alert("Accesso Negato!!!");
        delete localStorage['chiave_leto']
        canella_passord=false;
        window.location.replace("http://"+window.location.host.toString()+"/contatta/contatta.html" );
    }
}

function elaboraRispostaToken(objHTTP2){
    var MD5_autenticazione="";
    if (objHTTP2.readyState== 4) {
        if (objHTTP2.status==200){
            if(objHTTP2.responseText){
            
                var token_leto=objHTTP2.responseText;
                if (token_leto!="no_md5"){
                    try {
                        //prova if (localStorage.chiave_leto==null){
                        if (localStorage.getItem("chiave_leto")==null){
                            pw_leto=prompt('Inserisci la Password del server LetoCrono', '');
                            confirmed = window.confirm("Memorizzo la Password?.");
                            localStorage.setItem("chiave_leto", pw_leto);
                            //alert("ciao"+localStorage.getItem("chiave_leto"));
                            
                        }else{
                            cancella_pass=false;
                            pw_leto=localStorage.chiave_leto;
                            confirmed=true;
                        }
                    }catch (e1) {
                        pw_leto=prompt('Inserisci la Password del server LetoCrono', '');
                        confirmed=true;
                    }
                    MD5_autenticazione= "/" + $.md5(token_leto+pw_leto);
                    cifra=true;
                    LeggiStato(MD5_autenticazione);
                //setta_Stato(1);
                }else{
                    //setta_Stato(0);
                    MD5_autenticazione="";
                    cifra=false;
                    LeggiStato(MD5_autenticazione);
                }
            }
        }

    }

}

function OttieniStatoElemento(id_elemento,Elemento_Da_Elaborare,mom_ingra,MD5_Attiva){
    if (MD5_Attiva==null){
        MD5_Attiva="";
    }
    var objHTTP2=null;
    objHTTP2 = getXMLHttp();

    
    objHTTP2.open("GET", "http://"+window.location.host.toString()+"/command=get?element?"+id_elemento+MD5_Attiva,true);
 
    objHTTP2.onreadystatechange = function() {
        new elaboraRispostaOttieniStato(Elemento_Da_Elaborare,mom_ingra,objHTTP2)
    }
    objHTTP2.send(null);
}



function elaboraRispostaOttieniStato(Elemento_Da_Elaborare,mom_ingra,objHTTP2){
    var figlio=null;
    var id_elementoLeto=null;
    var lista=null;
    var xmlDoc=null;

    
    if (objHTTP2.readyState   == 4) {
        if (objHTTP2.status==200){
            if(objHTTP2.responseXML){
                if (window.ActiveXObject) {
                    xmlDoc =new ActiveXObject("Microsoft.XMLDOM");
               
                    xmlDoc.async = false;

                    xmlDoc.loadXML(objHTTP2.responseText);
        
                    lista=xmlDoc.getElementsByTagName("elemento");
      
                }else{
                    xmlDoc = objHTTP2.responseXML;
               
                    lista=xmlDoc.getElementsByTagName("elemento");
                }
                for (var i=0;i<=lista.length-1;i++){
                    var ele=lista[i];
                    id_elementoLeto=ele.getAttribute("id").toString();
                    figlio=document.getElementById("img_"+id_elementoLeto);
               
                    if (ele.getAttribute("status").toString()=="1"){
                        document.getElementById(id_elementoLeto).href="javascript:Attiva_TK('/command=set_deactive?"+id_elementoLeto+"',"+id_elementoLeto+")";
              
                    }else{
                        document.getElementById(id_elementoLeto).href="javascript:Attiva_TK('/command=set_active?"+id_elementoLeto+"',"+id_elementoLeto+")";
               
                    }

                    figlio.src=getImmagineAdatta(parseInt(ele.getAttribute("type").toString()),parseInt(ele.getAttribute("status").toString()));
     

                }
                Elemento_Da_Elaborare.setAttribute("border",0);
                $(mom_ingra).hide();
                $("#a_stato").hide();
                setta_Stato(1);
     
        
            }else{
                setta_Stato(0);
                $(mom_ingra).hide();
                $("#a_stato").hide();
            //            OttieniToken2();
            }
        }else{
            setta_Stato(0);
            $(mom_ingra).hide();
            $("#a_stato").hide();
        }
    }
}

function Attiva_TK(percorso,id_ele){
    var mom_ingra=document.getElementById("in_"+id_ele);
    $(mom_ingra).show();
    OttieniToken2("Attiva",percorso,id_ele);
}

function Attiva(percorso,id_ele,MD5_Attivazione){
    var mom_ingra=document.getElementById("in_"+id_ele);
    var mom_ele=document.getElementById(id_ele);
    
    var objHTTP=null;
 
   
    
   
    objHTTP = getXMLHttp();
   
 
    objHTTP.open("GET", "http://"+window.location.host.toString()+percorso+MD5_Attivazione,true);
  
 
   
    objHTTP.onreadystatechange = function() {
        new elaboraRisposta(id_ele,mom_ele,mom_ingra,objHTTP)
    }

    objHTTP.send();
}




function LeggiStato(MD5_autenticazione){
    
    var objHTTP3 = getXMLHttp();
    //Passo 1
   
    objHTTP3.open("GET", "http://"+window.location.host.toString()+"/command=get?elements_status"+MD5_autenticazione,true);

   

    //Passo 2
  
    objHTTP3.onreadystatechange = function() {
           
        elaboraRispostaStato(objHTTP3)
    }

    //Passo 3
    objHTTP3.send()
   
}

function AggiornaStato(MD5_Attivazione){
    var objHTTP3 = getXMLHttp();
    //Passo 1
    
    objHTTP3.open("GET", "http://"+window.location.host.toString()+"/command=get?elements_status"+MD5_Attivazione,true);

    //Passo 2

    objHTTP3.onreadystatechange = function() {

        elaboraRispostaStatoAggiorna(objHTTP3)
    }

    //Passo 3
    objHTTP3.send(null)

}

function elaboraRispostaStatoAggiorna(objHTTP) {
    
    if (objHTTP.readyState == 4) {
        var id_elementoLeto=null;
        var lista=null;
        var xmlDoc=null;
        if (objHTTP.status==200){
            if(objHTTP.responseXML){
                if (window.ActiveXObject) {
                    xmlDoc =new ActiveXObject("Microsoft.XMLDOM");

                    xmlDoc.async = false;

                    xmlDoc.loadXML(objHTTP.responseText);

                    lista=xmlDoc.getElementsByTagName("elemento");

                }else{

                    xmlDoc = objHTTP.responseXML;



                    lista=xmlDoc.getElementsByTagName("elemento");


                }
                for (var i=0;i<=lista.length-1;i++){

                    var ele=lista[i];
                    id_elementoLeto=ele.getAttribute("id").toString();

                    if (ele.getAttribute("type").toString()!="5" && ele.getAttribute("type").toString()!="7" && ele.getAttribute("type").toString()!="2" && ele.getAttribute("type").toString()!="9"){
                        if (ele.getAttribute("status").toString()=="1"){

                            document.getElementById(id_elementoLeto).href="javascript:Attiva_TK('/command=set_deactive?"+id_elementoLeto+"',"+id_elementoLeto+")";
                        
                        }else{

                            document.getElementById(id_elementoLeto).href="javascript:Attiva_TK('/command=set_active?"+id_elementoLeto+"',"+id_elementoLeto+")";
                        
                        }

                        if (ele.getAttribute("type").toString()=="6"){
                            $(document.getElementById("val_"+id_elementoLeto)).text(ele.getAttribute("currentvalue").toString()+"  sec -");
                        }
                    }else{
                        if (ele.getAttribute("type").toString()=="9"){
                            //                            $(document.getElementById("val_"+id_elementoLeto)).add('<div>ciao antonio</div>'); //text(ele.getAttribute("currenttextvalue").toString()+"<br> antonio3");
                            $("#val_"+id_elementoLeto).html(ele.getAttribute("currenttextvalue").toString().replace(/@n/g, "<br>"));
                        }else{
                            $(document.getElementById("val_"+id_elementoLeto)).text(ele.getAttribute("currentvalue").toString()+" "+ele.getAttribute("label_value").toString()+" -");
                        }
                    }
                    document.getElementById("img_"+id_elementoLeto).src=getImmagineAdatta(parseInt(ele.getAttribute("type").toString()),parseInt(ele.getAttribute("status").toString()));
                
                
                }


                //            Controllo_Elementi=window.setTimeout("OttieniToken2('AggiornaStato','','')", Durata_aggiornamento);
                setta_Stato(1);
           
            }else{
                setta_Stato(0);
            
            //            Controllo_Elementi=window.setTimeout("OttieniToken2('AggiornaStato','','')", Durata_aggiornamento);
            
            }
        }else{
            setta_Stato(0);
        //            alert( objHTTP.status );
        }
        //        setta_Stato(0);
        pausa(100);
        Controllo_Elementi=window.setTimeout("OttieniToken2('AggiornaStato','','')", Durata_aggiornamento);
        $("#a_stato").hide();
    //        return
    //        alert(objHTTP.status);
    }
   
    
    
}

function pausa(millis)
{
    var date = new Date();
    var curDate = null;

    do {
        curDate = new Date();
    }
    while(curDate-date < millis);
}

function elaboraRispostaStato(objHTTP) {
    
    var ImmagineElemento=null;
    var Contenitore=null;
    var a_nome_elemento=null;
    var div_img=null;
    var a_img=null;
    var a_ingranaggio=null;
 
    var id_elementoLeto=null;
    var ingranagio=null;
    var div_ingranaggio;
    var lista=null;
    var xmlDoc=null;
    var div_Nome_Elemento=null;
    var vecchia_categoria=null;
    var categoria_corrente=null;
    var Categoria=null;
    var div_globale=null;

    if (objHTTP.readyState   == 4) {
        if (objHTTP.status==200){
            //            alert(objHTTP.responseText+"-");
            if(objHTTP.responseXML){
                if (confirmed)
                {
                    try {
                    //alert("ciao"+localStorage.getItem("chiave_leto"));

                        localStorage.setItem("chiave_leto", pw_leto);
                        //alert("ciao"+localStorage.getItem("chiave_leto"));

                    }
                    catch (e1){
                        alert("Il tuo browser non supporta l'HTML5 !!!!.\nPertanto la password non verrà memorizzata.");
                    }
                }

                if (window.ActiveXObject) {
                    xmlDoc =new ActiveXObject("Microsoft.XMLDOM");
               
                    xmlDoc.async = false;
                
                    xmlDoc.loadXML(objHTTP.responseText);
              
                    lista=xmlDoc.getElementsByTagName("elemento");
           
                }else{

                    xmlDoc = objHTTP.responseXML;

               
               
                    lista=xmlDoc.getElementsByTagName("elemento");
           
            
                }
                div_globale=document.getElementById("div_unico") //document.createElement("div");
                //div_globale.className="div_globale";
            

                //document.body.appendChild(div_globale);
                for (var i=0;i<=lista.length-1;i++){
             
                    var ele=lista[i];
                    id_elementoLeto=ele.getAttribute("id").toString();
                    categoria_corrente=ele.getAttribute("des_group");
                
                    if (categoria_corrente!=vecchia_categoria){
                        if (Categoria!=null){
                            $(div_generale).hide();
                            div_globale.appendChild(Categoria);
                        }
                        vecchia_categoria=ele.getAttribute("des_group");
                        Categoria=document.createElement("div");
                       
                        Categoria.className="categoria";
                        $(Categoria).append("<a href='javascript:cambio_div_generale("+ele.getAttribute("id_group").toString()+ ")' class='titolo_categoria' id='cat_"+ele.getAttribute("id_group").toString()+"'>"+vecchia_categoria+"</a>");
                        var div_generale=document.createElement("div");
                        div_generale.id="div_gen_"+ele.getAttribute("id_group").toString()
                        div_generale.className="div_generale";

                    }

                    Contenitore=document.createElement("div");
                    if (ele.getAttribute("type").toString()=="9"){
                        Contenitore.className="contenitore_monitor";
                    }else{
                        Contenitore.className="contenitore";
                    }
               
                
                    div_img=document.createElement("div");
                    div_img.id="div_img";

                    a_img=document.createElement("a");
                    a_img.id=id_elementoLeto;
                

                    id_elementoLeto=ele.getAttribute("id").toString();
                    ImmagineElemento=document.createElement("img");
               
                    ImmagineElemento.id="img_"+id_elementoLeto;

              

                    ImmagineElemento.width=60;
                    ImmagineElemento.height=48;
               
                    ImmagineElemento.className="immagini";
               
                    if (ele.getAttribute("type").toString()!="5" && ele.getAttribute("type").toString()!="7" && ele.getAttribute("type").toString()!="2" && ele.getAttribute("type").toString()!="9"){
                
                        if (ele.getAttribute("status").toString()=="1"){
                            a_img.href="javascript:Attiva_TK('/command=set_deactive?"+id_elementoLeto+"',"+id_elementoLeto+")";

                        }else{
                    
                            a_img.href="javascript:Attiva_TK('/command=set_active?"+id_elementoLeto+"',"+id_elementoLeto+")";
                        }
                    }
                    
                    ImmagineElemento.src=getImmagineAdatta(parseInt(ele.getAttribute("type").toString()),parseInt(ele.getAttribute("status").toString()));
                
                    a_img.appendChild(ImmagineElemento);
                    div_img.appendChild(a_img);


                    div_Nome_Elemento=document.createElement("div");
                    div_Nome_Elemento.id="div_titolo";


                    a_nome_elemento=document.createElement("a");
                    if (ele.getAttribute("type").toString()=="9"){
                        a_nome_elemento.id="titolo_monitor";
                    }else{
                        a_nome_elemento.id="titolo";

                    }
                
                    a_nome_elemento.innerHTML= ele.getAttribute("title").toString();

                    div_Nome_Elemento.appendChild(a_nome_elemento);
                    if (ele.getAttribute("type").toString()=="9"){
                        $(div_Nome_Elemento).append("<div id='val_"+id_elementoLeto+"' class='valori_monitor'></div>");
                    }else{
                        $(div_Nome_Elemento).append("<div id='val_"+id_elementoLeto+"' class='valori'></div>");
                    }


               
               
                    div_ingranaggio=document.createElement("div");
                    div_ingranaggio.id="in_"+id_elementoLeto;
                    div_ingranaggio.className="div_ingranaggio";


                    a_ingranaggio=document.createElement("a");
                    a_ingranaggio.id="a_ingranaggio";

                    ingranagio=document.createElement("img");
                    ingranagio.id="immagine_ingranaggio";
                    ingranagio.width=33;
                    ingranagio.height=30;
       
                    ingranagio.src="media/ingranaggio2.gif";

                    a_ingranaggio.appendChild(ingranagio);

                    div_ingranaggio.appendChild(a_ingranaggio);

               
 
                    Contenitore.appendChild(div_img)
                    Contenitore.appendChild(div_Nome_Elemento);
                    Contenitore.appendChild(div_ingranaggio);
                    div_generale.appendChild(Contenitore);
                    Categoria.appendChild(div_generale);
                
                
 
                }
                $(div_generale).hide();
                div_globale.appendChild(Categoria);
           
           
            
            

                Controllo_Elementi=window.setTimeout("OttieniToken2('AggiornaStato','','')", Durata_aggiornamento);

           
                //window.clearInterval(Controllo_Elementi);
            
                setta_Stato(1);
                



              
            }else{
                OttieniToken();
                setta_Stato(0);
            
            }
        }else{
            setta_Stato(0);
        }
    }
}




function setta_Stato(stato){
    switch (stato){
        case 0:
            $("#a_connessione").text("Stato: NON CONNESSO");
            break;
        case 1:
            $("#a_connessione").text("Stato: CONNESSO");
            break;
    }

}
function cambio_div_generale(id_gruppo){
    var mom=document.getElementById("div_gen_"+id_gruppo);
    if($(mom).is(':visible')==true){
        $(mom).hide();
    }else{
        $(mom).show();
    }
}

function getImmagineAdatta(tipo,Attivo){
    var Restituisci="";
    switch (tipo){
        case 1:
            if (Attivo==1){
                Restituisci= "media/BT-Interruttore-acceso.png"
            }else{
                Restituisci= "media/BT-Interruttore-Spento.png"
            }

            break;
        case 2:
            if (Attivo==1){
                Restituisci= "media/BT-Timer-Acceso.png"
            }else{
                Restituisci= "media/BT-Timer-Spento.png"
            }

            break;

        case 3:
            if (Attivo==1){
                Restituisci= "media/BT-Interruttore-acceso.png"
            }else{
                Restituisci= "media/BT-Interruttore-Spento.png"
            }

            break;
        case 4:
            if (Attivo==1){
                Restituisci= "media/BT-Action-Acceso.png"
            }else{
                Restituisci= "media/BT-Action-Spento.png"
            }

            break;
        case 5:
            if (Attivo==1){
                Restituisci= "media/BT-Ingresso-Acceso.png"
            }else{
                Restituisci= "media/BT-Ingresso-Spento.png"
            }

            break;
        case 6:
            if (Attivo==1){
                Restituisci= "media/BT-InterruttoreTemp-acceso.png"
            }else{
                Restituisci= "media/BT-InterruttoreTemp-Spento.png"
            }

            break;
        case 7:
            if (Attivo){
                Restituisci= "media/BT-Analogico-Acceso.png"
            }else{
                Restituisci= "media/BT-Analogico-Spento.png"
            }

            break;
        case 8:
            if (Attivo==1){
                Restituisci= "media/PulsanteIngressoAcceso.png"
            }else{
                Restituisci= "media/PulsanteIngressoSpento.png"
            }

            break;
        case 9:
            if (Attivo==1){
                Restituisci= "media/MonitorStatus.png"
            }else{
                Restituisci= "media/MonitorStatus.png"
            }

            break;

        case 10:
            if (Attivo==1){
                Restituisci= "media/SendMessageB.png"
            }else{
                Restituisci= "media/SendMessageA.png"
            }

            break;
    }
    return Restituisci;
}

