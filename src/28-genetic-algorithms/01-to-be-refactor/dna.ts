

function arrayRange(start:number, stop:number, step:number):number[] {
    return Array.from({ length: (stop - start) / step + 1 },(value, index) => start + index * step);
 }

class DNA {
    validBases:number[]
    targetStrand:number[]
    combinationStrategy:((strandA:DNAStrand, strandB:DNAStrand) => DNAStrand)
    mutationRate:number;

    constructor(components:number[], target:number[], mutationRate:number = 0.1) {
        this.validBases = components
        this.targetStrand = target
        this.combinationStrategy = DNA.swapHalves
        this.mutationRate = mutationRate;
    }

    static convertPhraseToDNAStrand(phrase:string):number[] {
        //this will be weird for unicode strings outside of ascii range because will only return first value from cluster.
        return [...phrase].map((element) => element.charCodeAt(0))
    }

    static createNewASCIISchema(targetPhrase:string) {
        const minValue = 65
        const maxValue = 122
        let values = arrayRange(minValue, maxValue, 1)
        values.push(32)
        values.push(46)
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

    fitness(strand:DNAStrand) {
    //Plan B    
    //    let strand_vector = new Vector(...strand.bases);
    //    let phrase_vector = new Vector(...this.targetStrand);
    //    return 1/strand_vector.magSquaredTo(phrase_vector);
       const score = strand.bases.filter((component, index) => (this.targetStrand[index] == component)).length
       //const targetLength = this.targetStrand.length
       return score*score;  
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
            newBases.push(this.newBase()) ; //This provides some diversity because it can be anything allowable. 
          } else {
            newBases.push(strand.bases[i])
          }
        }
        return newBases
      }

}
class DNAStrand {
    bases:number[]
    // fitness:number
    // diversity:number
    //dna_rules:DNA

    constructor(bases:number[]) {
        //this.dna_rules = DNA_style
        this.bases = bases
    }

    // static createRandomStrand(length:number, DNA_style:DNA) {
    //     const dna_rules = DNA_style
    //     let bases:number[] = []

    //     for (let i=0; i<length; i++) {
    //         bases.push(dna_rules.newBase())
    //     }
    //     return new DNAStrand(bases, dna_rules)
    // }


}