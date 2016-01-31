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
var swapAnimationID;
var bubbleSortAnimationID;

// Sorting methods
function bubbleSort(a) {
	var i = 0;
	var swapped = true;
	var done = true;

	var bubbleSortAnimation = function() {
	    if(swapped && swapAnimationID == null) {
	    	swapped = false;
	        while(i < a.length - 1 && swapped == false){
	            if (a[i] > a[i+1]) {
	                var temp = a[i];
	                a[i] = a[i+1];
	                a[i+1] = temp;
	                swapped = true;
	                done = false;

	                swap(array, i, i+1);
	                i += 1;
	                break;
	            }
	            i += 1;
	        }
	        if(i == a.length - 1 && !done) {
	        	i = 0;
	        	done = true;
	        	swapped = true;
	        }
	    }
	    bubbleSortAnimationID = requestAnimationFrame(bubbleSortAnimation);
	    if(swapped == false) {
	    	cancelAnimationFrame(bubbleSortAnimationID);
	    	bubbleSortAnimationID = null;
	    }
	}

	bubbleSortAnimationID = requestAnimationFrame(bubbleSortAnimation);
}

// Main
$(document).ready(function() {
	init();
	draw();
});

// Helper functions
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

				if(a[i].y == mainY && a[j].y == mainY) {
					var tmp = a[i];
					a[i] = a[j];
					a[j] = tmp;
					stopped = true;
				}
			}
			draw();
		}

		swapAnimationID = requestAnimationFrame(swapAnimation);
		if(stopped) {
			cancelAnimationFrame(swapAnimationID);
			swapAnimationID = null;
		}
	};

	swapAnimationID = requestAnimationFrame(swapAnimation);
}

function createAnimationArray(a) {
	var animationArray = [];
	for(var i = 0; i < a.length; i++)
		animationArray.push(new Entry(i*SIZE, mainY, SIZE, SIZE, a[i]))
	return animationArray;
}

// init and draw
function init() {
	canvas = $('#c')[0];
	canvas.width = 700;
	canvas.height = 500;

	ctx = canvas.getContext('2d');
	ctx.font = '20px Arial';

	then = Date.now();

	// YOUR CODE HERE
	a = [74,38,61,61,13,49,21,34,78,54,36,75,11,39,87,76,25,39,68,61];
	array = createAnimationArray(a);
	bubbleSort(a);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(var i = 0; i < array.length; i++) {
		ctx.strokeRect(array[i].x, array[i].y, array[i].width, array[i].height);
		ctx.fillText(array[i].value, array[i].x + SIZE / 4, array[i].y + SIZE, array[i].width/2, array[i].height);
	}
}