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

class DisplayShape {
  form:string;
  size:number;
  counter:number;
  //hue:number;

  constructor(form:string) {
    this.form = form
    this.size = 20;
    this.counter = 0;
    //this.hue = form.charCodeAt(0)/128 * 360;
    //console.log(this.hue);
  }
}

let lexicon: Record<string, (shape:DisplayShape)=>void> = { 
  "rect": (shape) => { fill(0, 60, 60); rect(0,0, shape.size, shape.size/2)},
  "ellipse": (shape) => { fill(72, 60, 60); ellipse(0,0, shape.size, shape.size/2) },
  "circle": (shape) =>  { fill(140, 60, 60); circle(0,0, shape.size) },
  "square": (shape) => { fill(210, 60, 60); rect(0,0, shape.size, shape.size)},
  "triangle": (shape) => { fill(280, 60, 60); triangle(0,0, -shape.size/2, shape.size, shape.size/2, shape.size,)},
}; 

const numberOfShapes = 10;
let xValues:number[];
let yValues:number[];

let shapes:DisplayShape[];
let weights:number[];

//DOM items
let bestPhrase: Element;
let allPhrases: Element;
let stats: Element;

//Population 
let population:Population

function setup() {
  controller = new ControlledCanvas(400, 400);
  colorMode(HSB);
  background(0, 0, 80);

  console.log(DNA.convertPhraseToDNAStrand("A"));
  let dna_example = DNA.createNewASCIISchema("To be or not to be.")
  const testStrandA = new DNAStrand(DNA.convertPhraseToDNAStrand("Ta ce or nqt tp be."));
  const testStrandB = new DNAStrand(DNA.convertPhraseToDNAStrand("aabaabaabaaabaabaac"));
  console.log(dna_example.fitness(testStrandA), dna_example.toPhenotype(testStrandA), testStrandA.bases);
  const child_s = DNA.swapHalves(testStrandA, testStrandB);
  console.log("swapped halves child", DNA.toPhrase(child_s.bases));
  const child_i = DNA.interleaf(testStrandA, testStrandB);
  console.log("interleaved child", DNA.toPhrase(child_i.bases));
  const child_c = dna_example.combineParents(testStrandA, testStrandB);
  console.log("rules strategy", DNA.toPhrase(child_c.bases));

  let testPopulation = Population.createInitialPopulation("To be or not to be.", 100);
  //console.log(testPopulation)
  let round1 = testPopulation.bestMember();
  console.log(round1, testPopulation);

  testPopulation = Population.createChildPopulation(testPopulation);
  let round2 = testPopulation.bestMember();
  console.log(round2);

  for (let i=0; i < 100; i++) {
    testPopulation = Population.createChildPopulation(testPopulation);
    const best = testPopulation.bestMember();
    console.log(best);
  }

  console.log(testPopulation);

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


  // Create a population with a target phrase, mutation rate, and population max

  shapes = [new DisplayShape("rect"), new DisplayShape("circle"), new DisplayShape("ellipse"), new DisplayShape("square"), new DisplayShape("triangle")]
  //weights = [0.325, 0.30, 0.225, 0.1, 0.05]
  //weights = [0.2, 0.2, 0.2, 0.2, 0.2];
  //weights = [0.52, 0.20, 0.12, 0.1, 0.06]
  weights = shuffle([0.52, 0.20, 0.12, 0.1, 0.06])
  testWeights(weights, shapes.length)

  xValues = new Array(numberOfShapes).fill(0).map((element) => random(0,width));
  yValues = new Array(numberOfShapes).fill(0).map((element) => random(0,height));


  console.log("------------ END SETUP! -------------");
  //noLoop();
}


function draw() {
    background(0, 0, 80);
    // for (let i = 0; i<numberOfShapes; i++) {
    //   push();
    //   translate(xValues[i], yValues[i]);
    //   //const whichShape = round(random(0, shapes.length-1));
    //   //const thisShape = shapes[whichShape];
    //   const thisShape = selectSample_limitedFast(weights, shapes);
    //   if (thisShape != null) {
    //     const doThis = lexicon[thisShape.form]
    //     doThis(thisShape);
    //     thisShape.counter +=1
    //   } else {
    //     noFill()
    //     circle(0,0, 5)
    //   }
    //   pop();
    // }


    // const sum = shapes.reduce((acc:number, e) => acc + e.counter, 0);
    // shapes.forEach((shape, index) => {
    //   console.log(shape.form, shape.counter, weights[index], shape.counter/sum);
    // })

    // console.log(sum);

    population = Population.createChildPopulation(population);
    displayInfo(population);
}

function keyPressed() {
  controller.keyPressed();
  // if (key == "t") {
    
  // }
}

// ------------------------------------------------------------------------------- HTML

function displayInfo(population:Population) {
  // Display current status of population
  let answer = population.bestMember();

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

  //https://en.wikipedia.org/wiki/Fisher–Yates_shuffle
  function shuffle(array:any[]) {
    let counter = array.length;
    let shallowCopy = Array.from(array);

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = shallowCopy[counter];
        shallowCopy[counter] = shallowCopy[index];
        shallowCopy[index] = temp;
    }

    return shallowCopy;
}
