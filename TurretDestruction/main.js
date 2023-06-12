const scoreboard = document.getElementById("scoreboard")
var explodeSound;
explodeSound = new sound("./music/explodesfx.mp3")

var deerX = 455;
var deerY = 365;
speed = 2;
score = 0;

var car1X = 680;
var car1Y = 90;
car1speed = 1;

var car2X = -150;
var car2Y = 240;
car2speed = 1;

explosionTime = 11;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

var ctx = document.getElementById('canvas').getContext('2d');

var char = new Image();
char.src = './graphics/turretleft.png';

var car1 = new Image();
car1.src = './graphics/blobbert.png';

var car2 = new Image();
car2.src = './graphics/Eggpfp.png';

var explosion = new Image();
explosion.src = './graphics/explosion.gif'

function charLoad() {
	if(leftPressed) {
		char.src = './graphics/turretleft.png';
	}
	else if(rightPressed) {
		char.src ='./graphics/turretright.png';
	}
	ctx.drawImage(char, deerX, deerY, 100, 100)
}

function car1Load() {
	ctx.drawImage(car1, car1X, car1Y, 100, 100)
}

function car2Load() {
	ctx.drawImage(car2, car2X, car2Y, 100, 100)
}

function explosionLoad() {
	ctx.drawImage(explosion, explosionX, explosionY, 100, 100)
	explosionTime +=1
	explodeSound.play();
}

function main() {
	var ctx = document.getElementById('canvas').getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	car1Load();
	car2Load();
	charLoad();
	if (explosionTime < 10) {
		explosionLoad();
	}

	car1X -=car1speed
	if(car1X < -150) {
		car1X = 680;
	}
	else if(deerX <= car1X + 50 && deerX >= car1X - 50 && deerY <= car1Y + 50 && deerY >= car1Y - 50) {
		explosionX = car1X
		explosionY = car1Y
		explosionTime = 0
		car1X = 680
		score +=1
		scoreboard.innerHTML = "Opps destroyed: " + score;
	}

	car2X +=car2speed
	if(car2X > 680) {
		car2X = -150;
	}
	else if(deerX <= car2X + 50 && deerX >= car2X - 50 && deerY <= car2Y + 50 && deerY >= car2Y - 50) {
		explosionX = car2X
		explosionY = car2Y
		explosionTime = 0
		car2X = -150
		score +=1
		scoreboard.innerHTML = "Opps destroyed: " + score;
	}

	if(rightPressed) {
		deerX +=speed;
		if (deerX + 100 > canvas.width){
			deerX = canvas.width - 100;
		}
	}
	else if(leftPressed) {
		deerX -=speed;
		if (deerX < 0){
			deerX = 0;
		}
	}

	if(upPressed) {
		deerY -=speed;
		if (deerY < 0){
			deerY = 0;
		}
	}
	else if(downPressed) {
		deerY +=speed;
		if (deerY + 100 > canvas.height) {
			deerY = canvas.height - 100;
		}
	}
}

function keyDownHandler(e) {
	if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d" || e.key == "D") {
		rightPressed = true;
	}
	else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
		leftPressed = true;
	}

	if(e.key == "Up" || e.key == "ArrowUp" || e.key == "w" || e.key == "W") {
		upPressed = true;
	}
	else if(e.key == "Down" || e.key == "ArrowDown" || e.key == "s" || e.key =="S") {
		downPressed = true;
	}
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d" || e.key == "D") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
        leftPressed = false;
    }

	if(e.key == "Up" || e.key == "ArrowUp" || e.key == "w" || e.key == "W") {
		upPressed = false;
	}
	else if(e.key == "Down" || e.key == "ArrowDown" || e.key == "s" || e.key =="S") {
		downPressed = false;
	}
}

function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){
	  this.sound.play();
	}
	this.stop = function(){
	  this.sound.pause();
	}
  }

var Loop = setInterval(main, 10);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);