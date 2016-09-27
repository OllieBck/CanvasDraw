var thecontext;
var colorLine = "black";
var socket = io.connect();
			
socket.on('connect', function() {
	console.log("Connected");
});

// Receive a message
socket.on('message', function(data) {
//console.log("Got: " + data);
document.getElementById('messages').innerHTML += data;
});

// Receive from any event
socket.on('news', function (data) {
//console.log(data);
});

socket.on('drawing', function(drawingdata) {
	var thecanvas = document.getElementById('thecanvas');
	thecontext = thecanvas.getContext('2d');
	thecontext.beginPath();
	thecontext.strokeStyle = drawingdata.c;
	thecontext.moveTo(drawingdata.prex, drawingdata.prey);
	thecontext.lineTo(drawingdata.currx, drawingdata.curry);
	thecontext.stroke();
	thecontext.closePath();
});

socket.on('clear', function(go){
	var thecanvas = document.getElementById('thecanvas');
	thecontext = thecanvas.getContext('2d');
	thecontext.beginPath();
	thecontext.rect(0, 0, 1080, 720);
	thecontext.fillStyle = "rgb(255, 255, 255)";
	thecontext.fill();
});
			
var sendmessage = function() {
	var message = document.getElementById('message').value;
	//console.log("Sending: " + message);
				
	// Send a messaage
	socket.send(message);
	};
			
	var sendother = function() {
	var othermessage = document.getElementById('message').value;
	//console.log("sending: " + othermessage);
				
				// Send any kind of data with a custom event
				//socket.emit('otherevent',{ othermessage: othermessage });
	socket.emit('otherevent', othermessage);
	};


function ColorSelector(){
	window.open("http://job271.itp.io:8081/palette.html", "", "width=350. height=450");
}

function clearDrawing(){
	var thecanvas = document.getElementById('thecanvas');
	thecontext = thecanvas.getContext('2d');
	thecontext.beginPath();
	thecontext.rect(0, 0, 1080, 720);
	thecontext.fillStyle = "rgb(255, 255, 255)";
	thecontext.fill();
	var go = 1;
	socket.emit('clear', go);
}

function init() {

	var px = 0;
	var py = 0;
	var cx = 0;
	var cy = 0;

	var thecanvas = document.getElementById('thecanvas');
	thecanvas.addEventListener('mousemove', function(evt) {

		var buttonPress = evt.buttons;

		px = cx;
		py = cy;
		cx = evt.clientX;
		cy = evt.clientY;

		thecontext = thecanvas.getContext('2d');
		
		if (buttonPress == 1){

		thecontext.beginPath();
		thecontext.strokeStyle = colorLine;
		thecontext.moveTo(px, py);
		thecontext.lineTo(cx, cy);
		thecontext.stroke();
		thecontext.closePath();

		var thedata = {
			prex: px,
			prey: py,
			currx: cx,
			curry: cy,
			col: colorLine
		};

		socket.emit('drawing',thedata);
		}

		else{
		
			}

		}
	);

}		

window.addEventListener('load', init);