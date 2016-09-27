var rd = 0;
var gn = 0;
var bl = 0;


function indicatorSquare(){
	var palette = document.getElementById('palette');
	var paletteContext = palette.getContext('2d');
	paletteContext.beginPath();
	paletteContext.rect(0, 175, 255, 50);
	paletteContext.fillStyle= `rgb(${rd}, ${gn}, ${bl})`;
	paletteContext.fill();
}

function main(){
	var xBox = 0;
	var palette = document.getElementById('palette');
	var paletteContext = palette.getContext('2d');

	for(var i = 0; i < 255; i++){
	paletteContext.beginPath();
	paletteContext.rect(i, xBox, 1, 50);
	paletteContext.fillStyle = `rgb(${i}, 0, 0)`;
	paletteContext.fill(); }

	for(var i = 0; i < 255; i++){
	paletteContext.beginPath();
	paletteContext.rect(i, xBox+50, 1, 50);
	paletteContext.fillStyle = `rgb(0, ${i}, 0)`;
	paletteContext.fill(); }

	for(var i = 0; i < 255; i++){
	paletteContext.beginPath();
	paletteContext.rect(i, xBox+100, 1, 50);
	paletteContext.fillStyle = `rgb(0, 0, ${i})`;
	paletteContext.fill(); }

	indicatorSquare();

	palette.addEventListener('mousedown', function(e) {

	var buttonPress = e.buttons;
	
	if (buttonPress == 1){
	if (e.clientX > 0 && e.clientX < 255 && e.clientY > 0 && e.clientY < 60){
		rd = e.clientX;
		indicatorSquare();
	}

	if (e.clientX > 0 && e.clientX < 255 && e.clientY > 60 && e.clientY < 110){
		gn = e.clientX;
		indicatorSquare();
	}

	if (e.clientX > 0 && e.clientX < 255 && e.clientY > 110 && e.clientY < 160){
		bl = e.clientX;
		indicatorSquare();
	}
	}

	window.opener.colorLine = `rgb(${rd}, ${gn}, ${bl})`;
	});
}

window.addEventListener('load', main);