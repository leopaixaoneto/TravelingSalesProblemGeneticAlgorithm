var cities = [];
var totalCities = 10;
var populationSize = 300;

var population = [];

var fitness = [];

var bestDistance = Infinity;
var bestArrange;

var arrayOk = false;

function setup() {
  createCanvas(600, 600);

  //Main order 0,1,2,3,4,5,6...
  var order = [];

  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height));
    cities[i] = v;
    order[i] = i;
  }

  for (var i = 0; i < populationSize; i++) {
    population[i] = shuffle(order);
  }

  //console.log(population);
}

function draw() {
  //Genetic Algorithm
  calcFitness();

  normalizeFitness();

  //DRAW STUFF
  background(0);
  fill(255);

  drawCitiesPoints();

  //drawActualPath();

  drawBestPath();

  nextGeneration();
}

function drawCitiesPoints() {
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }
}

function drawActualPath() {
  if (!ended) {
    stroke(255, 255, 255, 50);
    strokeWeight(2);
    noFill();
    beginShape();

    for (var i = 0; i < order.length; i++) {
      var n = order[i];
      vertex(cities[n].x, cities[n].y);
    }

    endShape();
  }
}

function drawBestPath() {
  stroke(0, 255, 0, 100);
  strokeWeight(4);
  noFill();
  beginShape();

  for (var i = 0; i < cities.length; i++) {
    var n = bestArrange[i];
    vertex(cities[n].x, cities[n].y);
  }

  endShape();
}

function calcDistance(points, order) {
  var total = 0;

  for (var i = 0; i < points.length - 1; i++) {
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];

    var cityBIndex = order[i + 1];
    var cityB = points[cityBIndex];

    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    total += d;
  }
  return total;
}

function swap(a, i, j) {
  var aux = a[i];

  a[i] = a[j];
  a[j] = aux;
}
