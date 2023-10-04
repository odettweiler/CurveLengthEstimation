var xCoords = [];
var n = 5;
var nSlider;

var start = 0;
var end = 5;

var xRange;
var yRange;

var estimationCoords;

var eqMode = 1;

function setup() {
    var canvas = createCanvas(800, 400);
    textSize(16);
    nSlider = createSlider(2, 1000, 5, 1);
    nSlider.style('width', '600px');
    
    background(0);
    stroke(255);

    updateRanges();
}

function draw() {
	background(0);
    stroke(102,179,255);
    strokeWeight(4)
    drawCurve();

    n = nSlider.value();
    n = round(n * (1+Math.pow((n/500), 3)));
    text("N: " + n, 5, 20);

    stroke(255);
    let sum = drawSegments();
    sum = Number((sum).toFixed(4));
    text("Sum: " + sum, 5, 45);

    switch (eqMode) {
        case 1:
            text("y = 3x - 5", 5, 70);
            break;
        case 2:
            text("y = x^3 - 7x^2 + 10x", 5, 70);
            break;
        case 3:
            text("y = -5 + 6x - x^2", 5, 70);
            break;
    }

    let actual = length_of_curve(eqMode);
    actual = Number((actual).toFixed(4))
    text("Actual: " + actual, 5, 95)
    let err = error(sum, actual);
    err = Number((err).toFixed(4));
    text("Error: " + err + "%", 5, 120);
}

function f(x) {
    switch (eqMode) {
        case 1:
            return (3*x) - 5;
            break;
        case 2:
            return Math.pow(x, 3) - (7*Math.pow(x, 2)) + (10 * x);
            break;
        case 3:
            return -5 + (6*x) - (x*x);
            break;
    }
}

function length_of_curve(eqMode) {
    switch(eqMode) {
        case 1:
            return 15.811388;
            break;
        case 2:
            return 25.39917;
            break;
        case 3:
            return 14.39387;
            break;
    }

    return 0.0;
}

function error(pred, actual) {
    return abs((pred-actual)/actual) * 100.0;
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x2-x1), 2) + Math.pow((y2-y1), 2));
}

function drawCurve() {
    for (var x = start+0.01; x < end; x += 0.01) {
        var screenX1 = (x/xRange) * 800;
        var screenY1 = (-(f(x)/yRange) * 400) + 400;
        var screenX2 = ((x+0.01)/xRange) * 800;
        var screenY2 = (-(f(x+0.01)/yRange) * 400) + 400;

        line(screenX1, screenY1, screenX2, screenY2);
    }
}

function drawSegments() {
    xIncrement = xRange/n;

    estimationCoords = [];
    for (var x = start; x < end; x += xIncrement) {
        var screenX1 = (x/xRange) * 800;
        var screenY1 = (-(f(x)/yRange) * 400) + 400;
        var screenX2 = ((x+xIncrement)/xRange) * 800;
        var screenY2 = (-(f(x+xIncrement)/yRange) * 400) + 400;

        strokeWeight(4)
        point(screenX1, screenY1);
        estimationCoords.push(createVector(x, f(x)));
        strokeWeight(2)
        line(screenX1, screenY1, screenX2, screenY2);
    }

    var sum = 0.0;
    for (var i = 0; i < estimationCoords.length-1; i++) {
        sum += distance(estimationCoords[i].x, estimationCoords[i].y, estimationCoords[i+1].x, estimationCoords[i+1].y);
    }

    return sum;
}

function updateRanges() {
    switch(eqMode) {
        case 1:
            xRange = (end-start);
            yRange = (5-f(start));
            break;
        case 2:
            xRange = (end-start);
            yRange = (10-f(start));
            break;
        case 3:
            xRange = (end-start);
            yRange = (15-f(start));
            break;
    }
}

function mousePressed() {
    if (mouseX < width && mouseY < height) {
        if (eqMode < 3) {
            eqMode++;
        } else if (eqMode >= 3) {
            eqMode = 1;
        }
        updateRanges();
    }
}