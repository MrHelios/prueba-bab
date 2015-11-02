// Ultima modificacion: 28/10/2015
// Crea un tablero sobre un fondo azul.

var game = new Phaser.Game(800, 700, Phaser.CANVAS, 'renderCanvas',{
		create: create, update:update, render:render });

var lineV;
var lineH;
var LineaGira;
v = [];
h = [];
x0 = 100;


function create() {
	var x = 0;
	game.stage.backgroundColor = '#124184';

	for (var i=0; i<11 ; i++){
		lineV = new Phaser.Line(x0+50+x, 50, x0+50+x, 550);
		v.push(lineV);
		lineH = new Phaser.Line(x0+50, 50+x, x0+550, 50+x);
		h.push(lineH);
		x += 50;
		}

	LineaGira = new Phaser.Line(50,50,200,200);
}

function update() {
	LineaGira.centerOn(game.input.activePointer.x, game.input.activePointer.y);
	LineaGira.rotate(0.05);	
}

function render() {
	
	// Dibuja Tablero:	
	for (var i=0; i<11 ; i++) {
		game.debug.geom(v[i],'black');
		game.debug.geom(h[i],'black');
	}

	// Dibuja Linea:
	game.debug.geom(LineaGira,'white');
	
	
}