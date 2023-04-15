var testata = function()
{
    var thisOggetto = this;
    this.immagineOmino = new Image();
    this.immagineLogoRosso = new Image();
    this.immagineLogoNero = new Image();
    this.immagineLogoRossosrc = localStorage.logoRosso;
    this.immagineLogoNerosrc = localStorage.logoNero;
    this.immagineHeadNero = new Image();
    this.immagineAggiorna = new Image();
    this.canvas = document.getElementById('header');
    this.contesto = this.canvas.getContext('2d');
    this.logo = function(rossoNero,dove)
    {
        if(rossoNero){
            if(thisOggetto.immagineLogoRossosrc == null || dove =='impostazioni' ){
                thisOggetto.immagineLogoRosso.src = 'images/head2.png';
                thisOggetto.immagineLogoRosso.onload = function()
                {
                    thisOggetto.contesto.drawImage(thisOggetto.immagineLogoRosso,0,0)
                    localStorage.logoRosso = thisOggetto.canvas.toDataURL("image/png");
                }
            }else{
                thisOggetto.contesto.clearRect(0, 0, 243, 50);
                thisOggetto.immagineLogoRosso.src = thisOggetto.immagineLogoRossosrc;

                thisOggetto.contesto.drawImage(thisOggetto.immagineLogoRosso,0,0)

            }
        }else{
            if(thisOggetto.immagineLogoNerosrc == null ){
                thisOggetto.immagineLogoNero.src = 'images/head.png';
                thisOggetto.immagineLogoNero.onload = function()
                {
                    thisOggetto.contesto.drawImage(thisOggetto.immagineLogoNero,0,0)
                    localStorage.logoNero = thisOggetto.canvas.toDataURL("image/png");
                }
            }else{
                thisOggetto.contesto.clearRect(0, 0, 243, 50);
                thisOggetto.immagineLogoNero.src = thisOggetto.immagineLogoNerosrc;
                    
                thisOggetto.contesto.drawImage(thisOggetto.immagineLogoNero,0,0)

            }
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
            thisOggetto.contesto.strokeRect(0,0,45,50);     
            thisOggetto.contesto.strokeRect(0,0,45,50);
            thisOggetto.contesto.strokeRect(0,0,45,50);
            thisOggetto.contesto.strokeRect(0,0,45,50);
        }
        if(relativeX>223)
        {
            thisOggetto.contesto.strokeStyle = "#333";
            thisOggetto.contesto.strokeRect(222,0,40,50);
            thisOggetto.contesto.strokeRect(222,0,40,50);
            thisOggetto.contesto.strokeRect(222,0,40,50);
            thisOggetto.contesto.strokeRect(222,0,40,50);
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
            thisOggetto.contesto.strokeRect(0,0,45,50);   
        }
        if(relativeX>223)
        {
            thisOggetto.contesto.strokeStyle = "white";
            thisOggetto.contesto.strokeRect(222,0,40,50);
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
             
                thisOggetto.apriLogin() 
                thisOggetto.contesto.strokeStyle = "#333";
                thisOggetto.contesto.strokeRect(0,0,45,50);  
                thisOggetto.contesto.strokeRect(0,0,45,50);  
                thisOggetto.contesto.strokeRect(0,0,45,50);  
                thisOggetto.contesto.strokeRect(0,0,45,50); 
            }
            if(relativeX>223)
            {
                thisOggetto.aggiorna()
                thisOggetto.contesto.strokeStyle = "#333";
                thisOggetto.contesto.strokeRect(222,0,40,50);
                thisOggetto.contesto.strokeRect(222,0,40,50);
                thisOggetto.contesto.strokeRect(222,0,40,50);
                thisOggetto.contesto.strokeRect(222,0,40,50);
            }
           
        }else{
            relativeX = (event.clientX - thisOggetto.canvas.offsetLeft);
            relativeY = (event.clientY - thisOggetto.canvas.offsetTop);
            if(relativeX<45)
            {
                thisOggetto.apriLogin()       
            }
            if(relativeX>223)
            {
                thisOggetto.aggiorna()
            }
            

        }
    }
    this.apriLogin = function()
    {
        var password1 = new password();
        password1.setPassword(); 
    //        WinId = window.open('','newwin','width=100,height=100');
    //        if (!WinId.opener) WinId.opener = self;
    //        Text = '<form ';
    //        Text += 'onSubmit="localStorage.password="ciao"; window.close()">';
    //        Text += '<input id="password" type="password" name="password value="Password">';
    //        Text += '<input type="submit" value="Salva Password" />'
    //        Text += '<\/form>';
    //        alert(localStorage.password)
    //        WinId.document.open();
    //        WinId.document.write(Text);
    //        WinId.document.close();
    }
    this.aggiorna = function()
    {
        var password = localStorage.password;
        var setIcone = localStorage.setIcone;
        var colore = localStorage.temaColore;
        var imm = localStorage.immagine;
        localStorage.clear();
        localStorage.immagine = imm;
        localStorage.setIcone = setIcone;
        localStorage.password = password;
        localStorage.temaColore = colore;
        location.reload()   
    }

}