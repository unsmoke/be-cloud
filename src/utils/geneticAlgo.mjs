import { randomInt } from 'crypto'

// Function to calculate the total number of cigarettes in a day
const calculateTotalCigarettes = (combination) => combination.reduce((acc, cur) => acc + cur, 0)

// Fitness function: Lower number of cigarettes has better fitness
const calculateFitness = (combination, target) => {
    const totalCigarettes = calculateTotalCigarettes(combination)
    return Math.max(target - totalCigarettes, 0)
}

// Initialize the initial population
const initializePopulation = (populationSize, chromosomeLength, initialCigaretteCount) =>
    Array.from({ length: populationSize }, () =>
        Array.from({ length: chromosomeLength }, () => randomInt(0, initialCigaretteCount + 1))
    )

// Parent selection using tournament
const select = (population, fitness, tournamentSize) => {
    let tournament = Array.from(
        { length: tournamentSize },
        () => population[randomInt(0, population.length)]
    )
    return tournament.reduce((prev, curr) =>
        calculateFitness(curr, fitness) > calculateFitness(prev, fitness) ? curr : prev
    )
}

// Single point crossover operation
const crossover = (parent1, parent2) => {
    const crossoverPoint = randomInt(0, parent1.length)
    const child1 = [...parent1.slice(0, crossoverPoint), ...parent2.slice(crossoverPoint)]
    const child2 = [...parent2.slice(0, crossoverPoint), ...parent1.slice(crossoverPoint)]
    return [child1, child2]
}

// Mutation operation
const mutate = (individual, mutationProb, initialCigaretteCount) => {
    return individual.map((gene) =>
        Math.random() < mutationProb ? randomInt(0, initialCigaretteCount + 1) : gene
    )
}

// Genetic algorithm
export const geneticAlgorithm = (
    generationCount,
    populationSize,
    chromosomeLength,
    initialCigaretteCount,
    target
) => {
    let population = initializePopulation(populationSize, chromosomeLength, initialCigaretteCount)
    let children

    for (let i = 0; i < generationCount; i++) {
        const fitness = population.map((individual) => calculateFitness(individual, target))

        const parent1 = select(population, fitness, 3)
        const parent2 = select(population, fitness, 3)

        children = crossover(parent1, parent2) // children array now holds both child1 and child2
        children[0] = mutate(children[0], 0.1, initialCigaretteCount)
        children[1] = mutate(children[1], 0.1, initialCigaretteCount)

        population.push(...children) // Spread children array to push both children into the population

        if (children.some((child) => calculateTotalCigarettes(child) <= target)) {
            break
        }
    }

    // Add the last day with 0 cigarettes to each child
    children.forEach((child) => child.push(0))

    // Return the best solution
    const bestSolution = population.reduce((prev, curr) =>
        calculateFitness(curr, target) < calculateFitness(prev, target) ? curr : prev
    )

    return bestSolution.sort((a, b) => b - a)
}
