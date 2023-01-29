"use strict";
class Population {
    constructor(rules, strands, generation) {
        this.fitnesses = () => {
            return this.strands.map((element) => this.DNARules.fitness(element));
        };
        this.averageFitness = () => {
            let total = this.fitnesses().reduce((acc, element) => acc + element, 0);
            return total / this.strands.length;
        };
        this.bestMember = () => {
            let worldRecord = 0.0;
            let worldRecordIndex;
            const fitnesses = this.fitnesses();
            for (let i = 0; i < fitnesses.length; i++) {
                if (fitnesses[i] > worldRecord) {
                    worldRecord = fitnesses[i];
                    worldRecordIndex = i;
                }
            }
            if (worldRecord != undefined) {
                const fitStrand = this.strands[worldRecordIndex];
                const test = fitStrand.bases.every((v, i) => v === this.DNARules.targetStrand[i]);
                //console.log(DNA.toPhrase(this.strands[worldRecordIndex!].bases))
                return { bestFit: fitStrand, worldRecord, isTarget: test };
            }
            else {
                return { bestFit: new DNAStrand([]), worldRecord: 0, isTarget: false };
            }
        };
        //this.DNARules = DNA.createNewASCIISchema(targetPhrase);
        this.DNARules = rules;
        this.strands = strands;
        this.generation = generation;
    }
    static randomStrands(count, rules) {
        let newStrands = [];
        for (let i = 0; i < count; i++) {
            newStrands.push(rules.newRandomStrand());
        }
        return newStrands;
    }
    static createInitialPopulation(targetPhrase, count = 100) {
        const rules = DNA.createNewASCIISchema(targetPhrase);
        let strands = this.randomStrands(count, rules);
        return new Population(rules, strands, 0);
    }
    //Select sample will not work correctly because fitnesses do not sum to 1
    //Shuffling the array to avoid the problem? 
    static createChildPopulation(parentGen) {
        let newStrands = [];
        const fitnesses = parentGen.fitnesses();
        const maxFitness = Math.max(...fitnesses);
        for (let i = 0; i < parentGen.strands.length; i++) {
            const strandA = Population.selectShuffledSample(fitnesses, parentGen.strands, maxFitness);
            const strandB = Population.selectShuffledSample(fitnesses, parentGen.strands, maxFitness);
            //console.log(parentGen.DNARules.toPhenotype(strandA!), parentGen.DNARules.toPhenotype(strandB!))
            if (strandA == null || strandB == null) {
                throw new Error("did not create 2 parents");
            }
            const child = parentGen.DNARules.mutatedBases(parentGen.DNARules.combineParents(strandA, strandB));
            //console.log(parentGen.DNARules.toPhenotype(strandA!), parentGen.DNARules.toPhenotype(strandB!), DNA.toPhrase(child));
            newStrands.push(new DNAStrand(child));
        }
        return new Population(parentGen.DNARules, newStrands, parentGen.generation + 1);
    }
    static testWeights(weights, valuesLength) {
        let epsilon = 0.00001;
        if (weights.length != valuesLength) {
            throw new Error("did not provide a weight for every value");
        }
        const aboveZero = weights.filter((element) => element >= 0);
        if (aboveZero.length != weights.length) {
            throw new Error("some weights are below zero");
        }
        const sum = aboveZero.reduce((acc, current) => acc + current, 0);
        if (!(Math.abs(1 - sum) < epsilon)) {
            throw new Error("weights do not add up to be close enough 1");
        }
    }
    static selectSample(weights, values, scale) {
        // - Obtain a sample y from distribution Y and a sample u from Unif(0,1) (the uniform distribution over the unit interval).
        // - Check whether or not u < f(y)/Mg(y)  //(f(y)/M *g(y)) is the normalized probability
        //   - if this holds, accept y as a sample drawn from f
        //   - if not, reject the value of y and return to the sampling step.
        // The algorithm will take an average of M 
        let selectionNumber = Math.random() * scale;
        //console.log(selectionNumber);
        for (let i = 0; i < weights.length; i++) {
            const weight = weights[i];
            //console.log(weight, i);
            if (selectionNumber < weight) {
                //console.log("found one", values[i], weight, selectionNumber);
                return values[i];
            }
            else {
                selectionNumber -= weight;
            }
        }
        return null; //shouldn't happen. 
    }
    static selectShuffledSample(weights, values, scale) {
        // - Obtain a sample y from distribution Y and a sample u from Unif(0,1) (the uniform distribution over the unit interval).
        // - Check whether or not u < f(y)/Mg(y)  //(f(y)/M *g(y)) is the normalized probability
        //   - if this holds, accept y as a sample drawn from f
        //   - if not, reject the value of y and return to the sampling step.
        // The algorithm will take an average of M 
        let selectionNumber = Math.random() * scale;
        //console.log(selectionNumber);
        let indexOrder = shuffle(arrayRange(0, weights.length - 1, 1));
        //console.log(indexOrder);
        for (let i = 0; i < weights.length; i++) {
            let thisIndex = indexOrder[i];
            const weight = weights[thisIndex];
            //console.log(weight, i);
            if (selectionNumber < weight) {
                //console.log("found one", values[i], weight, selectionNumber);
                return values[thisIndex];
            }
            else {
                selectionNumber -= weight;
            }
        }
        return null; //shouldn't happen. 
    }
}
