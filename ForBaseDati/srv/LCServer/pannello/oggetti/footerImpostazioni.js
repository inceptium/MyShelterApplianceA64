var footerImpostazioni = function()
{
    var thisOggetto = this;
    this.immagineIndietro = new Image();
    this.canvas = document.getElementById('footer');
    this.contesto = this.canvas.getContext('2d');
    this.indietro = function()
    {
        thisOggetto.immagineIndietro.src = 'images/indietro.png';
        thisOggetto.immagineIndietro.onload = function()
        {
            thisOggetto.contesto.drawImage(thisOggetto.immagineIndietro,0,0) 
        }
    }
    this.eventi2 = function()
    {
       
        if ('ontouchstart' in document.documentElement) {
            
            thisOggetto.canvas.addEventListener('touchstart', thisOggetto.touchs,false);
            thisOggetto.canvas.addEventListener('touchend', thisOggetto.clicca2,false);
            thisOggetto.canvas.addEventListener('touchmove',thisOggetto.touchm ,false);
        }else{
            thisOggetto.canvas.addEventListener('click', thisOggetto.clicca2,false);
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
    }
    this.clicca2 = function(event)
    {
        if ('ontouchstart' in document.documentElement) {
            event.preventDefault();
            var touch = event.changedTouches;
            var relativeX = (touch[0].pageX - thisOggetto.canvas.offsetLeft);
            var relativeY = (touch[0].pageY - thisOggetto.canvas.offsetTop);
            if(relativeX<45)
            {
             
                thisOggetto.tornaIndietroImpostazioni(); 
                thisOggetto.contesto.strokeStyle = "#333";
                thisOggetto.contesto.strokeRect(0,0,43,50);  
                thisOggetto.contesto.strokeRect(0,0,43,50);  
                thisOggetto.contesto.strokeRect(0,0,43,50);  
                thisOggetto.contesto.strokeRect(0,0,43,50); 
            }
           
        }else{
            relativeX = (event.clientX - thisOggetto.canvas.offsetLeft);
            relativeY = (event.clientY - thisOggetto.canvas.offsetTop);
            if(relativeX<45)
            {
                thisOggetto.tornaIndietroImpostazioni();    
            }

            

        }
    }
    this.clicca = function(event)
    {
        if ('ontouchstart' in document.documentElement) {
            event.preventDefault();
            var touch = event.changedTouches;
            var relativeX = (touch[0].pageX - thisOggetto.canvas.offsetLeft);
            var relativeY = (touch[0].pageY - thisOggetto.canvas.offsetTop);
            if(relativeX<45)
            {
             
                thisOggetto.tornaIndietro(); 
                thisOggetto.contesto.strokeStyle = "#333";
                thisOggetto.contesto.strokeRect(0,0,43,50);  
                thisOggetto.contesto.strokeRect(0,0,43,50);  
                thisOggetto.contesto.strokeRect(0,0,43,50);  
                thisOggetto.contesto.strokeRect(0,0,43,50); 
            }
           
        }else{
            relativeX = (event.clientX - thisOggetto.canvas.offsetLeft);
            relativeY = (event.clientY - thisOggetto.canvas.offsetTop);
            if(relativeX<45)
            {
                thisOggetto.tornaIndietro();    
            }

            

        }
    }
    this.tornaIndietroImpostazioni = function()
      {
          window.location.href="impostazioni.html"
      }
    this.tornaIndietro = function()
    {
        window.location.href="index.html"
    }

}