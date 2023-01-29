//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 28-genetic-algorithms/02-to-be-full-normal/population.ts
// calynorama 2023 Jan 28
//

class Population {
    strands: DNAStrand[];
    DNARules: DNA
    generation: number
    noveltyPreference:number

    constructor(rules:DNA, strands: DNAStrand[], generation:number) {
        //this.DNARules = DNA.createNewASCIISchema(targetPhrase);
        this.DNARules = rules;
        this.strands = strands
        this.generation = generation
        this.noveltyPreference = 10;
    }

    static randomStrands(count: number, rules: DNA) {
        let newStrands: DNAStrand[] = []
        for (let i = 0; i < count; i++) {
            newStrands.push(rules.newRandomStrand())
        }
        return newStrands
    }

    static createInitialPopulation(targetPhrase: string, count:number = 100) {
        const rules = DNA.createNewASCIISchema(targetPhrase);
        let strands = this.randomStrands(count, rules);
        return new Population(rules, strands, 0);
    }

    static createChildPopulation(parentGen: Population) {
        let newStrands: DNAStrand[] = []
        //const fitnesses = parentGen.fitnesses();
        const normalizedScores = parentGen.fnScores(parentGen.noveltyPreference);
        //const maxFitness = Math.max(...fitnesses);
        for (let i = 0; i < parentGen.strands.length; i++) {
            const strandA = Population.selectFromNormalized(normalizedScores, parentGen.strands);
            const strandB = Population.selectFromNormalized(normalizedScores, parentGen.strands);
            //console.log(parentGen.DNARules.toPhenotype(strandA!), parentGen.DNARules.toPhenotype(strandB!))
            if (strandA == null || strandB == null) { throw new Error("did not create 2 parents") }
            const child = parentGen.DNARules.mutatedBases(parentGen.DNARules.combineParents(strandA!, strandB!));
            //console.log(parentGen.DNARules.toPhenotype(strandA!), parentGen.DNARules.toPhenotype(strandB!), DNA.toPhrase(child));
            newStrands.push(new DNAStrand(child));
        }

        return new Population(parentGen.DNARules, newStrands, parentGen.generation + 1);
    }

    fitnesses = () => {
        return this.strands.map((element) => this.DNARules.fitness(element))
    }

    averageFitness = () => {
       let total = this.fitnesses().reduce((acc, element) => acc + element, 0);
       return total/this.strands.length
    }

    noveltyScores = () => {
        //console.log("hello?");
        let baseline = new Vector(...averagedPerIndex(this.strands.map((element) => element.bases)));
        let currentMax = 0;
        let currentMin = +Infinity;

        let totalDistances = 0;
        
        const rawDistances = this.strands.map((element) => {
            const strand = new Vector(...element.bases)
            const distance = strand.magSquaredTo(baseline);
            if (distance > currentMax) { currentMax = distance }
            if (distance < currentMin) { currentMin = distance }
            totalDistances += distance
            //console.log("indiv distance", distance)
            return distance
        })

        const fullNormalized = rawDistances.map((element) => element/totalDistances) 
        //console.log("novelty",sum(fullNormalized), currentMin, currentMin/totalDistances, currentMax, currentMax/totalDistances);
        return fullNormalized
    }

    fnScores(noveltyScaleUp:number) {
        const novelties = this.noveltyScores()
        const fN = this.fitnesses().map((value, index) => value + novelties[index]*noveltyScaleUp)
        const total = sum(fN);
        const normalizedCollection = fN.map((value) => value/total)
        return normalizedCollection
    }

    mostNovel = () => {
        let maxNovelty = 0.0
        let worldRecordIndex:number;
        const novelties = this.noveltyScores();
        for (let i = 0; i < novelties.length; i++) {
            if (novelties[i] > maxNovelty) {
                maxNovelty = novelties[i];
                worldRecordIndex = i
            }
        }

        if (maxNovelty != undefined) {
            const novelStrand = this.strands[worldRecordIndex!]
            //const test = novelStrand.bases.every((v,i)=> v === this.DNARules.targetStrand[i])
            //console.log("best", DNA.toPhrase(this.strands[worldRecordIndex!].bases), maxNovelty)
            return {mostNovel:novelStrand, maxNovelty }
        } else {
            return { mostNovel:new DNAStrand([]), maxNovelty:0 }
        }

    }

    bestMember = () => {
        let worldRecord = 0.0
        let worldRecordIndex:number;
        const fitnesses = this.fitnesses()
        for (let i = 0; i < fitnesses.length; i++) {
            if (fitnesses[i] > worldRecord) {
                worldRecord = fitnesses[i];
                worldRecordIndex = i
            }
        }

        if (worldRecord != undefined) {
            const fitStrand = this.strands[worldRecordIndex!]
            const test = fitStrand.bases.every((v,i)=> v === this.DNARules.targetStrand[i])
            //console.log("best", DNA.toPhrase(this.strands[worldRecordIndex!].bases), worldRecord)
            return {bestFit:fitStrand, worldRecord, isTarget:test}
        } else {
            return {bestFit:new DNAStrand([]), worldRecord:0, isTarget:false}
        }
    }

    static testWeights(weights: number[], valuesLength: number) {
        let epsilon = 0.00001
        if (weights.length != valuesLength) { throw new Error("did not provide a weight for every value") }
        const aboveZero = weights.filter((element) => element >= 0)
        if (aboveZero.length != weights.length) { throw new Error("some weights are below zero") }
        const sum = aboveZero.reduce((acc, current) => acc + current, 0);
        if (!(Math.abs(1 - sum) < epsilon)) { throw new Error("weights do not add up to be close enough 1") }
    }

    static selectFromNormalized<T>(nWeights: number[], values: T[]): T | null {
        let selectionNumber = Math.random();
        for (let i = 0; i < nWeights.length; i++) {
            const weight = nWeights[i]
            if (selectionNumber < weight) {
                return values[i]
            } else { selectionNumber -= weight }
        }
        return null //shouldn't happen. 
    }

    //For when you can't fully normalize for whatever reason. 
    static selectShuffledSample<T>(weights: number[], values: T[], scale: number): T | null {
        let selectionNumber = Math.random() * scale;
        let indexOrder = shuffle(arrayRange(0, weights.length-1, 1));
        for (let i = 0; i < weights.length; i++) {
            let thisIndex = indexOrder[i];
            const weight = weights[thisIndex]
            if (selectionNumber < weight) {
                return values[thisIndex]
            } else { selectionNumber -= weight }
        }
        return null //shouldn't happen. 
    }


    static normalizingSelect<T>(weights: number[], values: T[]): T | null {
        let selectionNumber = Math.random();
        const nWeights = normalized(weights);
        for (let i = 0; i < weights.length; i++) {
            let thisIndex = i;
            const weight = nWeights[thisIndex]
            if (selectionNumber < weight) {
                return values[thisIndex]
            } else { selectionNumber -= weight }
        }
        return null //shouldn't happen. 
    }

}