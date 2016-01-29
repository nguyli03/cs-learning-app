// basic player and map for drawing
var canvas = null;
var ctx = null;
var array;

// time variables
var fps = 30;
var then;
var interval = 1000/fps;

var start = false;

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

$(document).ready(function() {
	init();

	requestAnimationFrame(main);

	$('#start').click(function() {
		start = true;
	});
});

function swap(a, i, j) {
	var now = Date.now();
	var timeDelta = now - then;

	if(timeDelta > interval) {
		then = now - (timeDelta % interval);
		draw();
	}
	
	requestAnimationFrame(swap);
}

function init() {
	canvas = $('#c')[0];
	canvas.width = 700;
	canvas.height = 500;

	ctx = canvas.getContext('2d');
	ctx.fillStyle = '#7FFF00';

	then = Date.now();

	// YOUR CODE HERE
	array = [3, 2 ,5];
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(var i = 0; i < array.length; i++)
		ctx.strokeRect(i * 20, 20, 20, 20);
}