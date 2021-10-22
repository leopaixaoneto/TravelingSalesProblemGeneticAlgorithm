function calcFitness() {
  for (var i = 0; i < population.length; i++) {
    var d = calcDistance(cities, population[i]);
    if (d < bestDistance) {
      bestDistance = d;
      bestArrange = population[i];
    }
    fitness[i] = 1 / (d + 1);
  }
}

function normalizeFitness() {
  var sum = 0;

  for (var i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }

  for (var i = 0; i < fitness.length; i++) {
    fitness[i] = sum / fitness[i];
  }
}

function nextGeneration() {
  var newPopulation = [];

  for (var i = 0; i < population.length; i++) {
    var order = pickOne(population, fitness);

    mutate(order);

    newPopulation[i] = order;
  }

  population = newPopulation;
}

function pickOne(list, prob) {
  var index = 0;
  var r = random(1);

  while (r > 0) {
    r = r - prob[index];
    index++;
  }

  index--;
  return list[index].slice();
}

function mutate(order, mutationRate) {
  var indexA = floor(random(order.length));
  var indexB = floor(random(order.length));
  swap(order, indexA, indexB);
}
