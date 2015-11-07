var wsUri= "ws://"+document.location.host + document.location.pathname + "pizarraendpoint";
var websocket = new WebSocket(wsUri);

websocket.onopen = function(evt){
    console.log("Se ha conectado a: "+evt.data);    
};
websocket.onmessage = function(evt){
    console.log("Se ha recibido un mensaje del servidor: " +evt.data);
    
    var json = JSON.parse(evt.data);
    
    if(json.methodName == "beginDraw") beginDraw(null);
    if(json.methodName == "drawImage") drawImage(null, json.coords);
        
    
};
websocket.onerror = function(evt){
    console.log("Ha ocurrido un error: "+evt.data);
};