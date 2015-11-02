// Ultima modificacion: 29/10/2015

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',{
	preload:preload, create:create});

function preload() {
	game.load.image('mario',"{% static 'Phaser/phaser1/mario.png' %}");
}

var imagen;

function create() {
	imagen = game.add.sprite(100,100,'mario');
}