var footer = function() //footer con i tre pulsanti indirtro, home e aggiorna
{
    var thisOggetto = this;
    this.immagineIndietro = new Image();
    this.immagineHome = new Image();
    this.immagineImpostazioni = new Image();
    this.canvas = document.getElementById('footer');
    this.contesto = this.canvas.getContext('2d');
    this.immagineConnessione = new Image();
    this.immagineCNulla = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAr1JREFUeNq0lj1rKkEUhm/2KoiCH9gEQdDCD0gjhMBFLG5p6U+0EktLsbISQQI2F9RChISQJhACUUNE8rBvGCfrum4uZIphdvbsM2fOvOfsXFxfX//6mRY5a3F5eVkoFOjT6bRmnp+fHx8fV6sV/X+i/7jNEI8ba4zH4+l0ut1uj99e+AYEN1utlqB8JgfpzVttJRaL8bher6E/PT3d3t6eQf91m5waDoez2czXKbjNZrNcLsfjcR4Xi0Wn07ENfudyOfsZZwkCAxzpdrv39/e73c43GswnEgkMIESj0Ww2yy7xwz/WQGu1GoNerwc6jAyurq7w+v39HTrfEjeir1eOrQQ2yKDf74fkwsrn8wz+uY0BBDhetLjsyCwbkosfd3d3y+VS0RDngC64TS6H5HIq8heuJvWtQUWMqdZHFccgj4peX1/FlbO2zCHU3IZSP72uVqv0YUKRTCbFnbrN81YE0RwdICJFvMGJK269XscYp1DRsQEEOBjAdCR+zQZzkRdceiyR/CkzcWA6CvxZtOG+vLy0223f/LTRMA/iC7AWl2iQGpPJJMDS5kTsdQKkJu5oNKIYBcfNxCBi1iE6HpGpkqEHzkRconFWQjo5mI7xmu9VwzzVSpInNcJwqVBKdJiOVjB0TxxMKpmUC25StCTo2FIvFovGiPqg1KBkh+SqdhraJ1r1noBUKhUeKb7GX9AhufxACAgcZaljFKPiwl8Df29ubsT1TblTiap/kylwB10DUsTxV6nxLS7C1+5NYXFsC2aNDObzeUgu0TMFwPbmC9oWLzHhGCXSgCxli6cKwJffLuP9fv/w8OA4TiaTQYuNRoOT4XiZZ2GZbTYbUq7htlQqxQxVmx2b28TJKw4IEoTdsRIISeVU4/pB6Oi/cXvCejAY4DjoUqlEQO23uvS8vb0FpOjFz10nPwQYABTTzHf/XmZXAAAAAElFTkSuQmCC'
    this.immagineCRossa = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADFJREFUeNrszbEJAEAIBEHtv2gfPtQCDJzBSA42AgA4K/uj/o1RCgsLCwuvhdc8AQYAk7UYDRb8HFoAAAAASUVORK5CYII='
    this.immagineCGialla = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEBJREFUeNpiYBgFo2AUjIKhBhhJ1fDnneJ/dDEWofskm8M0UD4etXjUYpoBFlpll9GgHrV41OJRi0ctHvoAIMAAA8gIKKxVmAMAAAAASUVORK5CYII='
    this.immagineCVerde = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEZJREFUeNpiYBgFdAKM1DbQcqvXf3Sx497bMOxhGigfj1o8ajHNAAutsstoUI9aPJqdqJZdRoN61OJRi0ctHrV46AOAAAMAMnMMOJGCEZIAAAAASUVORK5CYII='
    this.connessione = function(immagine)
    {
        thisOggetto.contesto.clearRect(250, 0,45, 45)
        thisOggetto.immagineConnessione.src = immagine;
        thisOggetto.immagineConnessione.onload = function()
        {
            thisOggetto.contesto.drawImage(thisOggetto.immagineConnessione,250,8) 
        }
    }
    this.indietro = function()
    {
        
        thisOggetto.immagineIndietro.src = 'images/indietro.png';
        thisOggetto.immagineIndietro.onload = function()
        {
            thisOggetto.contesto.drawImage(thisOggetto.immagineIndietro,0,0) 
        }
    }
    this.home = function()
    {
        thisOggetto.immagineHome.src = 'images/home.png';
        thisOggetto.immagineHome.onload = function()
        {
            thisOggetto.contesto.drawImage(thisOggetto.immagineHome,100,0) 
        }
    }
    this.impostazioni = function()
    {
        thisOggetto.immagineImpostazioni.src = 'images/settings.png';
        thisOggetto.immagineImpostazioni.onload = function()
        {
            thisOggetto.contesto.drawImage(thisOggetto.immagineImpostazioni,195,0)
        }
    }
    this.eventi = function()
    {
       
        if ('ontouchstart' in document.documentElement) {
            
            thisOggetto.canvas.addEventListener('touchstart', thisOggetto.touchs,false);
            thisOggetto.canvas.addEventListener('touchend', thisOggetto.clicca,false);
            thisOggetto.canvas.addEventListener('touchmove',thisOggetto.touchm ,false);
        }else{
            thisOggetto.canvas.addEventListener('click', thisOggetto.clicca,false);
        }
    }
    this.touchm = function(event)
    {

        event.preventDefault();
        var touch = event.changedTouches;
        var relativeX = (touch[0].pageX - thisOggetto.canvas.offsetLeft);
        var relativeY = (touch[0].pageY - thisOggetto.canvas.offsetTop);
        if(relativeX<45)
        {
             
            thisOggetto.contesto.strokeStyle = "#333";
            thisOggetto.contesto.strokeRect(0,0,43,50);     
            thisOggetto.contesto.strokeRect(0,0,43,50);
            thisOggetto.contesto.strokeRect(0,0,43,50);
            thisOggetto.contesto.strokeRect(0,0,43,50);
        }
        if(relativeX>190 && relativeX<243)
        {
            thisOggetto.contesto.strokeStyle = "#333";
            thisOggetto.contesto.strokeRect(196,0,45,50);
            thisOggetto.contesto.strokeRect(196,0,45,50);
            thisOggetto.contesto.strokeRect(196,0,45,50);
            thisOggetto.contesto.strokeRect(196,0,45,50);
        }
        if(relativeX>96 && relativeX<147)
        {
            thisOggetto.contesto.strokeStyle = "#333";
            thisOggetto.contesto.strokeRect(98,0,49,50); 
            thisOggetto.contesto.strokeRect(98,0,49,50);
            thisOggetto.contesto.strokeRect(98,0,49,50);
            thisOggetto.contesto.strokeRect(98,0,49,50);
        }
           
   
    }
    this.touchs = function(event)
    {
        event.preventDefault();
        var touch = event.changedTouches;
        var relativeX = (touch[0].pageX - thisOggetto.canvas.offsetLeft);
        var relativeY = (touch[0].pageY - thisOggetto.canvas.offsetTop);
        if(relativeX<45)
        {
             
            thisOggetto.contesto.strokeStyle = "white";
            thisOggetto.contesto.strokeRect(0,0,43,50);   
        }
        if(relativeX>190 && relativeX<243)
        {
            thisOggetto.contesto.strokeStyle = "white";
            thisOggetto.contesto.strokeRect(196,0,45,50);
        }
        if(relativeX>96 && relativeX<147)
        {
            thisOggetto.contesto.strokeStyle = "white";
            thisOggetto.contesto.strokeRect(98,0,49,50);  
        }
    }
    this.clicca = function(event)
    {
        if ('ontouchstart' in document.documentElement) {
            event.preventDefault();
            var touch = event.changedTouches;
            var relativeX = (touch[0].pageX - thisOggetto.canvas.offsetLeft);
            var relativeY = (touch[0].pageY - thisOggetto.canvas.offsetTop);
            if(relativeX>96 && relativeX<147)
            {
                thisOggetto.tornaHome();
                thisOggetto.contesto.strokeStyle = "#333";
                thisOggetto.contesto.strokeRect(98,0,49,50);  
                thisOggetto.contesto.strokeRect(98,0,49,50);  
                thisOggetto.contesto.strokeRect(98,0,49,50);  
                thisOggetto.contesto.strokeRect(98,0,49,50); 
            }
            if(relativeX<45)
            {
             
                thisOggetto.tornaIndietro(); 
                thisOggetto.contesto.strokeStyle = "#333";
                thisOggetto.contesto.strokeRect(0,0,43,50);  
                thisOggetto.contesto.strokeRect(0,0,43,50);  
                thisOggetto.contesto.strokeRect(0,0,43,50);  
                thisOggetto.contesto.strokeRect(0,0,43,50); 
            }
            if(relativeX>190 && relativeX<243)
            {
                thisOggetto.vaiImpostazioni();
                thisOggetto.contesto.strokeStyle = "#333";
                thisOggetto.contesto.strokeRect(196,0,45,50);
                thisOggetto.contesto.strokeRect(196,0,45,50);
                thisOggetto.contesto.strokeRect(196,0,45,50);
                thisOggetto.contesto.strokeRect(196,0,45,50);
            }
           
        }else{
            relativeX = (event.clientX - thisOggetto.canvas.offsetLeft);
            relativeY = (event.clientY - thisOggetto.canvas.offsetTop);
            if(relativeX>96 && relativeX<147)
            {
                thisOggetto.tornaHome();
            }
            if(relativeX<45)
            {
                thisOggetto.tornaIndietro();    
            }
            if(relativeX>190 && relativeX<243)
            {
                thisOggetto.vaiImpostazioni();
            }
            

        }
    }
    this.tornaHome = function()
    {
        aggiornamentoInCorso = 0;
        arrayElementi = new Array();
        arrayIdGruppi = new Array();
        gruppo1 = new caricaGruppo(0)
        gruppo1.carica();
        aggiornamentoInCorso = 1;
    }
    this.tornaIndietro = function()
    {
        var idGruppoCorrente = $('#contenuto').attr('data-id');
        if(idGruppoCorrente!=0){
            var  idGruppoPrecedente = arrayIdGruppi[arrayIdGruppi.length-2]
            arrayIdGruppi.splice(arrayIdGruppi.length-1,1);
            aggiornamentoInCorso = 0;
            arrayElementi = new Array();
            gruppo1 = new caricaGruppo(idGruppoPrecedente)
            gruppo1.carica();
            aggiornamentoInCorso = 1;
        }
    }
    this.vaiImpostazioni = function()
    {
        window.location.href="impostazioni.html"
    }

}