//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 27-selection/01-rejection-sampling/sketch.ts
// calynorama 2023 Jan 27
//

// https://en.wikipedia.org/wiki/Rejection_sampling
/*
The algorithm, which was used by John von Neumann[4] and dates back to Buffon and his needle,[5] obtains a sample from distribution X
, with density f, using samples from distribution Y, with density g, as follows:

- Obtain a sample y from distribution Y and a sample u from Unif(0,1) (the uniform distribution over the unit interval).
- Check whether or not u < f(y)/Mg(y)  //(f(y)/M *g(y)) is the normalized probability
  - if this holds, accept y as a sample drawn from f
  - if not, reject the value of y and return to the sampling step.
The algorithm will take an average of M
*/

// https://github.com/CodingTrain/Suggestion-Box/issues/119
// https://github.com/CodingTrain/Suggestion-Box/issues/146


let controller:ControlledCanvas;

//DOM items
let bestPhrase: Element;
let allPhrases: Element;
let stats: Element;

//Population 
let population:Population
let foundFlag = false;

function setup() {
  controller = new ControlledCanvas(400, 400);
  colorMode(HSB);
  // background(0, 0, 80);

  //testSuite();

  population = Population.createInitialPopulation("To be or not to be.", 1000);

  //@ts-expect-error
  bestPhrase = createP("Best phrase:");
  //bestPhrase.position(10,10);
  //@ts-expect-error
  bestPhrase.class("best");

  //@ts-expect-error
  allPhrases = createP("All phrases:");
  //@ts-expect-error
  allPhrases.position(600, 10);
  //@ts-expect-error
  allPhrases.class("all");

  //@ts-expect-error
  stats = createP("Stats");
  //stats.position(10,200);
  //@ts-expect-error
  stats.class("stats");


  displayInfo(population);

  console.log("------------ END SETUP! -------------");
  //noLoop();
}


function draw() {
    //background(0, 0, 80);
    if (!foundFlag) {
      makeNewGeneration();
    }
    
 
}

function makeNewGeneration() {
  population = Population.createChildPopulation(population);
  displayInfo(population);
  stroke(population.generation % 360, 50, 50)
  drawFitnesses(1.00, population.fitnesses());
}


function keyPressed() {
  controller.keyPressed();
  if (key == "t") {
    
    
  }
}

// ------------------------------------------------------------------------------- HTML

function displayInfo(population:Population) {
  // Display current status of population
  let answer = population.bestMember();

   foundFlag = answer.isTarget

  //@ts-expect-error
  bestPhrase.html("Best phrase:<br>" + DNA.toPhrase(answer.bestFit.
    bases));

  let statstext =
    "total generations:     " + population.generation + "<br>";
  statstext +=
   "average fitness:       " + nf(population.averageFitness()) + "<br>";
  statstext += "total population:      " + population.strands.length + "<br>";
  statstext += "mutation rate:         " + floor(population.DNARules.mutationRate * 100) + "%";

  //@ts-expect-error
  stats.html(statstext);

  //@ts-expect-error
  allPhrases.html("All phrases:<br>" + strandsText(population.strands));
}

function strandsText(strands:DNAStrand[]):string {
  let everything = "";

  let displayLimit = min(strands.length, 50);

  for (let i = 0; i < displayLimit; i++) {
    everything += DNA.toPhrase(strands[i].bases) + "<br>";
  }
  return everything;
}


//--------------------------------------------------------------------------------- Shapes 

let epsilon = 0.00001
function testWeights(weights:number[], valuesLength:number) {
  if (weights.length != valuesLength) { throw new Error("did not provide a weight for every value")}
  const aboveZero = weights.filter((element) => element >= 0)
  if (aboveZero.length != weights.length) {throw new Error("some weights are below zero")}
  const sum = aboveZero.reduce((acc, current) => acc + current, 0);
  if (!(Math.abs(1-sum) < epsilon)) { throw new Error("weights do not add up to be close enough 1")}
}

//Questions: 
//This algorithm assumes array in random order every time or a sorted order? 
function selectSample_limitedFast<T>(weights:number[], values:T[]):T | null {
// - Obtain a sample y from distribution Y and a sample u from Unif(0,1) (the uniform distribution over the unit interval).
// - Check whether or not u < f(y)/Mg(y)  //(f(y)/M *g(y)) is the normalized probability
//   - if this holds, accept y as a sample drawn from f
//   - if not, reject the value of y and return to the sampling step.
// The algorithm will take an average of M
  let selectionNumber = Math.random();
  //console.log(selectionNumber);
  for (let i = 0; i<weights.length; i++) {
    const weight = weights[i]
    //console.log(weight, i);
      if(selectionNumber < weight) {
        //console.log("found one", values[i]);
        return values[i]
      } else { selectionNumber -= weight }
  }
  return null //shouldn't happen. 
} 





function testSuite() {
  
  console.log(DNA.convertPhraseToDNAStrand("A"));
  let dna_example = DNA.createNewASCIISchema("To be or not to be.")
  console.log(dna_example.validBases)
  const testStrandA = new DNAStrand(DNA.convertPhraseToDNAStrand("Ta ce or nqt tp be."));
  const testStrandB = new DNAStrand(DNA.convertPhraseToDNAStrand("aabaabaabaaabaabaac"));
  console.log(dna_example.fitness(testStrandA), dna_example.toPhenotype(testStrandA), testStrandA.bases);
  console.log(dna_example.fitness(testStrandB), dna_example.toPhenotype(testStrandB), testStrandB.bases);
  const child_s = DNA.swapHalves(testStrandA, testStrandB);
  console.log("swapped halves child", DNA.toPhrase(child_s.bases));
  const child_i = DNA.interleaf(testStrandA, testStrandB);
  console.log("interleaved child", DNA.toPhrase(child_i.bases));
  const child_c = dna_example.combineParents(testStrandA, testStrandB);
  console.log("rules strategy", DNA.toPhrase(child_c.bases));

  let mutatedChildren = []
  for (let i = 0; i < 100; i ++) {
    mutatedChildren.push(dna_example.mutatedBases(child_c));
    console.log(DNA.toPhrase(mutatedChildren[i]));
    //console.log("mutated", DNA.toPhrase(mutated_child), mutated_child)
  } 

  let testPopulation = Population.createInitialPopulation("To be or not to be.", 100);
  const fitnesses = testPopulation.fitnesses();
  const average = testPopulation.averageFitness();
  const maxFitness = testPopulation.bestMember().worldRecord;

  console.log("fitness_checks", average, maxFitness, Math.max(...fitnesses));

  const bestMember_asWritten = testPopulation.bestMember().bestFit
  const bestMember_recheck = testPopulation.strands.find((value) => testPopulation.DNARules.fitness(value) == maxFitness)

  console.log("best members", 
              DNA.toPhrase(bestMember_asWritten.bases), 
              DNA.toPhrase(bestMember_recheck!.bases), 
              bestMember_asWritten.bases.every((v,i)=> v === bestMember_recheck!.bases[i]));
  
  // const recalcFitness = (values:number[], baseLine:number[]) => {
  //   let counter = 0;
  //   for (let i = 0; i < values.length; i++) {
  //     if (values[i] == baseLine[i]) { counter ++ }
  //   }
  //   return pow(counter/values.length, 2) + 0.01 //Magic Number
  // }

  // for (let i = 0; i < 100; i ++) {
  //   const fitness = fitnesses[i];
  //   const value = testPopulation.strands[i];
  //   const recalced = recalcFitness(value.bases, dna_example.targetStrand)
  //   console.log("individual fitness checks", value, fitness, recalced)
  // }
  stroke(0, 50, 50);
  const maxF = 1
  drawFitnesses(maxF, fitnesses);

  let oldPopulation = [...testPopulation.strands]
  testPopulation = Population.createChildPopulation(testPopulation);

  const fitnesses2 = testPopulation.fitnesses();
  const average2 = testPopulation.averageFitness();
  const maxFitness2 = testPopulation.bestMember().worldRecord;

  console.log("fitness_checks", average2, maxFitness2, Math.max(...fitnesses2));

  const bestMember_asWritten2 = testPopulation.bestMember().bestFit
  const bestMember_recheck2 = testPopulation.strands.find((value) => testPopulation.DNARules.fitness(value) == maxFitness2)

  console.log("best members", 
  DNA.toPhrase(bestMember_asWritten2.bases), 
    DNA.toPhrase(bestMember_recheck2!.bases), 
  bestMember_asWritten2.bases.every((v,i)=> v === bestMember_recheck2!.bases[i]));

  stroke(180, 50, 50);
  drawFitnesses(maxF, fitnesses2);


  stroke(90, 50, 50);
  testPopulation = Population.createChildPopulation(testPopulation);
  drawFitnesses(maxF, testPopulation.fitnesses());
  // let round2 = testPopulation.bestMember();
  // console.log(round2);

  // for (let i=0; i < 100; i++) {
  //   testPopulation = Population.createChildPopulation(testPopulation);
  //   const best = testPopulation.bestMember();
  //   console.log(best);
  // }

  // console.log(testPopulation);
 

}

function drawFitnesses(maxPossible:number, fitnesses:number[]) {
    const length = fitnesses.length
    const xShift = width/length
    for (let i = 0; i < length; i++) {
      const x = i * xShift;
      const y = height - ((fitnesses[i] / maxPossible) * height);

      circle(x, y, 3);
    }

    const average = fitnesses.reduce((acc, element) => acc + element, 0)/length
    const y = height - ((average / maxPossible) * height);

    line(0, y, width, y);


}