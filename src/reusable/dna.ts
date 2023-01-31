//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 28-genetic-algorithms/02-to-be-full-normal/dna.ts
// calynorama 2023 Jan 28
//
// works with population.ts and needs array_helpers.ts



class DNA {
    validBases:number[]
    targetStrand:number[]
    combinationStrategy:((strandA:DNAStrand, strandB:DNAStrand) => DNAStrand)
    mutationRate:number;
    fitness_smudge:number;

    constructor(components:number[], target:number[], mutationRate:number = 0.01) {
        this.validBases = components
        this.targetStrand = target
        this.combinationStrategy = DNA.swapHalves
        this.mutationRate = mutationRate;
        this.fitness_smudge = 0.01;
    }

    static convertPhraseToDNAStrand(phrase:string):number[] {
        //this will be weird for unicode strings outside of ascii range because will only return first value from cluster.
        return [...phrase].map((element) => element.charCodeAt(0))
    }

    //a-z, A-Z, . and space. 
    static createNewASCIISchema(targetPhrase:string) {
        // const minValue = 65
        // const maxValue = 122
        const upper = arrayRange(65, 90, 1);
        const lower = arrayRange(97, 122, 1);
        let values = upper.concat(lower);
        values.push(32) //space
        values.push(46) //.
        DNA.convertPhraseToDNAStrand(targetPhrase);
        return new DNA(values, DNA.convertPhraseToDNAStrand(targetPhrase))
    }

    newBase() {
    //Math.random is < 1 not <=
    return this.validBases[Math.floor(Math.random() * this.validBases.length)];
    }

    newBaseSet() {
        let newBases:number[] = []
        for (let i=0; i< this.targetStrand.length; i++) {
            newBases.push(this.newBase())
        }
        return newBases
    }

    newRandomStrand() {
        return new DNAStrand(this.newBaseSet())
    }
    
    toPhenotype(strand:DNAStrand):string {
        // this is for type ASCII
        return strand.bases.map((element) => {  return String.fromCharCode(element)}).join("")
    }

    static toPhrase(bases:number[]):string {
        // this is for type ASCII
        return bases.map((element) => {  return String.fromCharCode(element)}).join("")
    }

    fitness(strand:DNAStrand):number {
    //Plan B    
    //    let strand_vector = new Vector(...strand.bases);
    //    let phrase_vector = new Vector(...this.targetStrand);
    //    return 1/strand_vector.magSquaredTo(phrase_vector);

    const percentCorrect = strand.bases.filter((component, index) => (this.targetStrand[index] == component)).length / this.targetStrand.length
    return percentCorrect ** 2;
    }

    combineParents(strandA:DNAStrand, strandB:DNAStrand):DNAStrand {
        return this.combinationStrategy(strandA, strandB);
    }

    //Assumes A & B are of same length
    static swapHalves(strandA:DNAStrand, strandB:DNAStrand) {
        let splitIndex = Math.floor(strandA.bases.length/2);
        let frontHalf:number[] = [];
        if (splitIndex + splitIndex != strandA.bases.length) { 
            frontHalf = [...strandA.bases.slice(0,splitIndex + 1)]
         }
        else {
            frontHalf = [...strandA.bases.slice(0,splitIndex)]
        }
        const newStrandBases = frontHalf.concat(strandB.bases.slice(-splitIndex));
        //console.log(splitIndex, DNA.toPhrase(strandA.bases.slice(0,splitIndex)), DNA.toPhrase(strandB.bases.slice(-splitIndex)))
        //console.log("newStrand", DNA.toPhrase(newStrandBases));
        return new DNAStrand(newStrandBases);
    }

    //Assumes A & B are of same length
    static interleaf(strandA:DNAStrand, strandB:DNAStrand) {
        let newStrandBases:number[] = [];
        for (let i =0; i < strandA.bases.length; i++) {
            if (i % 2 == 0) { newStrandBases.push(strandA.bases[i]) } 
            else { newStrandBases.push(strandB.bases[i]) } 
        }
        return new DNAStrand(newStrandBases);
    }

    mutatedBases(strand:DNAStrand):number[] {
        let newBases:number[] = [];
        for (let i = 0; i < strand.bases.length; i++) {
          if (Math.random() < this.mutationRate) {
            newBases.push(this.newBase()) ; //This provides some diversity because it can be anything allowable? 
          } else {
            newBases.push(strand.bases[i])
          }
        }
        return newBases
      }

}
class DNAStrand {
    bases:number[]

    constructor(bases:number[]) {
        this.bases = bases
    }

}