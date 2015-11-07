/* global downloadLnk */
var canvas  = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");
//Variable para saber si s esta pintando localmente
var isLocalDrawing = true;
// eventos del mause
canvas.addEventListener("mousedown", function(evt){
    isLocalDrawing = true;
    beginDraw(evt);
},false);
canvas.addEventListener("maouseup", end, false);
canvas.addEventListener("mouseout", end, false);
//Para obtener las coordenadas en el canvas
function getCoords(clientX, clientY){
    var rect = canvas.getBoundingClientRect();
    
    return {
       x: clientX - rect.left, 
       y: clientY - rect.top
   };
}
//Para iniciar a pintar
function beginDraw(evt){
    if(evt == null) isLocalDrawing = false;    
    ctx.beginPath();    
    if(isLocalDrawing){
        canvas.addEventListener("mousemove", drawImage, false);
        sendData(evt, "beginDraw")
    }    
}
//Para pintar cada que se ejecuta un evento con el mause
function drawImage(evt, currentCoords){
    var coords;
    if(isLocalDrawing) coords = getCoords(evt.clientX, evt.clientY);
    else coords = getCoords(currentCoords.x, currentCoords.y);
    
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    
    if(isLocalDrawing){
        sendData(evt, "drawImage");
    }
}
//Finaliza la graficacion en el canvas
function end(evt){
   if(isLocalDrawing) canvas.removeEventListener("mouseMove", drawImage);
}

//Metodo para enviar datos a traves de los websockets
function sendData(evt, methodName){
    websocket.send(JSON.stringify(
        {
            coords: {
                x: evt.clientX,
                y: evt.clientY
            },
            methodName: methodName

        }
        ));
}
//Limpiar el tablero
function clearCanvas(){
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}
//descargar el canvas como imagen
function download() {
    var dt = canvas.toDataURL('image/png');
    this.href = dt;
};
downloadLnk.addEventListener('click', download, false);

//Cambiar el color del marcador
var colors = ['black','green','blue','yellow','red'];

for(var i=0, n=colors.length; i<n; i++){    
    var swatch = document.createElement('option');   
    swatch.className = 'swatch';     
    swatch.style.backgroundColor = colors[i];    
    swatch.addEventListener('click', setSwatch);    
    document.getElementById('colors').appendChild(swatch);
}

function setColor(color){
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	var active = document.getElementsByClassName('active')[0];
	if(active){
		active.className = 'swatch';
	}
}

function setSwatch(e){
	var swatch = e.target;
	setColor(swatch.style.backgroundColor);
	swatch.className +='active';
}

setSwatch({target: document.getElementsByClassName('swatch')[0]});




