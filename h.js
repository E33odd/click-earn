var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var x;
var y;
var distance;
var moveangle;

var ballstore = [];

var color1 = [
	"rgb(200, 0, 0)",
	"rgb(200, 100, 10)",
	"rgb(100, 20, 100)",
	"rgb(150, 10, 100)",
	"rgb(200, 100, 100)"
];
var color2 = [
	"rgb(0, 255, 200)",
	"rgb(0, 255, 0)",
	"rgb(100, 250, 250)",
	"rgb(100, 255, 200)",
	"rgb(10, 80, 100)"
];

addEventListener('resize', function() {
	cancelAnimtionFrame(anim);
  	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  	animateballs();
});

canvas.width = innerWidth;
canvas.height = innerHeight;


function ball(angle, clr, x) {
	distance = Math.sqrt((canvas.width*canvas.height)/Math.PI)/2;
	this.a = angle;
	moveangle = 0.02;
	this.c = clr;

	this.move = function() {

		ctx.fillStyle = this.c;
		ctx.beginPath();
		ctx.arc(this.x, this.y, 5, 0, Math.PI*2);
		ctx.fill();
		ctx.closePath();

		this.a += moveangle;
		this.x = x + (distance * Math.cos(this.a));
		this.y = canvas.height/2.2 + (distance * Math.sin(this.a));
	}
}
var xx = 1.6;
var agl = Math.PI/180 * 90;
for (var i = 0; i < 2; i++) {
	xx += 0.3;
	agl += Math.PI/180 * 180;
	var c = color2[Math.floor(Math.random()*5)];
	ballstore.push(new ball(agl, c, canvas.width/xx));

}
var anim;
function animateballs() {
	///ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
	//ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (var k = 0; k < ballstore.length; k++) {
		ballstore[k].move();
	}
	anim = requestAnimationFrame(animateballs);
}
animateballs();
