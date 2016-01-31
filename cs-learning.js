// basic player and map for drawing
var canvas = null;
var ctx = null;
var array;
var mainY = 40;
var SIZE = 20;
var STEP = 5;

// time variables
var fps = 30;
var then;
var interval = 1000/fps;

// animationID
var animationID;

function bubbleSort(a) {
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i] > a[i+1]) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}

// Main
$(document).ready(function() {
	init();
	swap(array, 0, 2);
	draw();
});

// Functions
function swap(a, i, j) {
	var destXLeft = a[i].x;
	var destXRight = a[j].x;
	var didMoveHorizontal = false;
	var stopped = false;

	var swapAnimation = function() {
		var now = Date.now();
		var timeDelta = now - then;
		if(timeDelta > interval) {
			then = now - (timeDelta % interval);

			// Move squares
			if(a[i].y > mainY - SIZE && !didMoveHorizontal)
				a[i].y -= STEP;
			else if(a[i].x < destXRight)
				a[i].x += STEP;
			else if(a[i].y < mainY)
				a[i].y += STEP;

			if(a[j].y < mainY + SIZE && !didMoveHorizontal)
				a[j].y += STEP;
			else if(a[j].x > destXLeft) 
				a[j].x -= STEP;
			else if(a[j].y > mainY)
				a[j].y -= STEP;
			
			if(a[i].x == destXRight && a[j].x == destXLeft) {
				didMoveHorizontal = true;

				if(a[i].y == mainY && a[j].y == mainY)
					stopped = true;
			}
			draw();
		}

		animationID = requestAnimationFrame(swapAnimation);
		if(stopped)
			cancelAnimationFrame(animationID);
	};

	animationID = requestAnimationFrame(swapAnimation);
}

function init() {
	canvas = $('#c')[0];
	canvas.width = 700;
	canvas.height = 500;

	ctx = canvas.getContext('2d');
	ctx.font = '20px Arial';

	then = Date.now();

	// YOUR CODE HERE
	values = [3, 2, 5];
	array = []
	for(var i = 0; i < 3; i++) {
		array.push(new Entry(i*SIZE, mainY, SIZE, SIZE, values[i]));
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(var i = 0; i < array.length; i++) {
		ctx.strokeRect(array[i].x, array[i].y, array[i].width, array[i].height);
		ctx.fillText(array[i].value, array[i].x + SIZE / 4, array[i].y + SIZE, array[i].width, array[i].height);
	}
}