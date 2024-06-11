const calculateTotalCigarettes = (combination) => combination.reduce((acc, val) => acc + val, 0);

const calculateFitness = (combination, target) => {
  const totalCigarettes = calculateTotalCigarettes(combination);
  return Math.max(target - totalCigarettes, 0);
};

const initializePopulation = (populationSize, chromosomeLength, initialCigaretteCount) => {
  return Array.from({ length: populationSize }, () =>
    Array.from({ length: chromosomeLength - 1 }, () => Math.floor(Math.random() * (initialCigaretteCount + 1)))
  );
};

const selection = (population, fitnessScores, tournamentSize) => {
  const tournament = [];
  for (let i = 0; i < tournamentSize; i++) {
    const randomIndex = Math.floor(Math.random() * population.length);
    tournament.push([population[randomIndex], fitnessScores[randomIndex]]);
  }
  return tournament.reduce((prev, current) => (current[1] > prev[1] ? current : prev))[0];
};

const crossover = (parent1, parent2) => {
  const crossoverPoint = Math.floor(Math.random() * parent1.length);
  const child1 = [...parent1.slice(0, crossoverPoint), ...parent2.slice(crossoverPoint)];
  const child2 = [...parent2.slice(0, crossoverPoint), ...parent1.slice(crossoverPoint)];
  return [child1, child2];
};

const mutate = (individual, mutationProbability, initialCigaretteCount) => {
  return individual.map(cig => Math.random() < mutationProbability ? Math.floor(Math.random() * (initialCigaretteCount + 1)) : cig);
};

export const geneticAlgorithm = (generationCount, populationSize, chromosomeLength, initialCigaretteCount, target) => {
  let population = initializePopulation(populationSize, chromosomeLength, initialCigaretteCount);
  for (let generation = 0; generation < generationCount; generation++) {
    const fitnessScores = population.map(individual => calculateFitness(individual, target));

    const parent1 = selection(population, fitnessScores, 3);
    const parent2 = selection(population, fitnessScores, 3);

    let [child1, child2] = crossover(parent1, parent2);

    child1 = mutate(child1, 0.1, initialCigaretteCount);
    child2 = mutate(child2, 0.1, initialCigaretteCount);

    population.push(child1, child2);

    if (child1.concat(child2).some(ind => calculateTotalCigarettes(ind) <= target)) break;
  }

  child1.push(0);
  child2.push(0);

  const bestSolution = population.reduce((a, b) => calculateFitness(a, target) < calculateFitness(b, target) ? a : b);
  return bestSolution;
};
