"use strict";
class DNA {
    constructor(components, target, mutationRate = 0.01) {
        this.validBases = components;
        this.targetStrand = target;
        this.combinationStrategy = DNA.swapHalves;
        this.mutationRate = mutationRate;
        this.fitness_smudge = 0.01;
    }
    static convertPhraseToDNAStrand(phrase) {
        //this will be weird for unicode strings outside of ascii range because will only return first value from cluster.
        return [...phrase].map((element) => element.charCodeAt(0));
    }
    //a-z, A-Z, . and space. 
    static createNewASCIISchema(targetPhrase) {
        // const minValue = 65
        // const maxValue = 122
        const upper = arrayRange(65, 90, 1);
        const lower = arrayRange(97, 122, 1);
        let values = upper.concat(lower);
        values.push(32); //space
        values.push(46); //.
        DNA.convertPhraseToDNAStrand(targetPhrase);
        return new DNA(values, DNA.convertPhraseToDNAStrand(targetPhrase));
    }
    newBase() {
        //Math.random is < 1 not <=
        return this.validBases[Math.floor(Math.random() * this.validBases.length)];
    }
    newBaseSet() {
        let newBases = [];
        for (let i = 0; i < this.targetStrand.length; i++) {
            newBases.push(this.newBase());
        }
        return newBases;
    }
    newRandomStrand() {
        return new DNAStrand(this.newBaseSet());
    }
    toPhenotype(strand) {
        // this is for type ASCII
        return strand.bases.map((element) => { return String.fromCharCode(element); }).join("");
    }
    static toPhrase(bases) {
        // this is for type ASCII
        return bases.map((element) => { return String.fromCharCode(element); }).join("");
    }
    fitness(strand) {
        //Plan B    
        //    let strand_vector = new Vector(...strand.bases);
        //    let phrase_vector = new Vector(...this.targetStrand);
        //    return 1/strand_vector.magSquaredTo(phrase_vector);
        //    const score = strand.bases.filter((component, index) => (this.targetStrand[index] == component)).length / this.targetStrand.length
        //    return score*score + this.fitness_smudge;
        //return strand.bases.filter((component, index) => (this.targetStrand[index] == component)).length / this.targetStrand.length
        const percentCorrect = strand.bases.filter((component, index) => (this.targetStrand[index] == component)).length / this.targetStrand.length;
        return percentCorrect ** 2;
    }
    combineParents(strandA, strandB) {
        return this.combinationStrategy(strandA, strandB);
    }
    //Assumes A & B are of same length
    static swapHalves(strandA, strandB) {
        let splitIndex = Math.floor(strandA.bases.length / 2);
        let frontHalf = [];
        if (splitIndex + splitIndex != strandA.bases.length) {
            frontHalf = [...strandA.bases.slice(0, splitIndex + 1)];
        }
        else {
            frontHalf = [...strandA.bases.slice(0, splitIndex)];
        }
        const newStrandBases = frontHalf.concat(strandB.bases.slice(-splitIndex));
        //console.log(splitIndex, DNA.toPhrase(strandA.bases.slice(0,splitIndex)), DNA.toPhrase(strandB.bases.slice(-splitIndex)))
        //console.log("newStrand", DNA.toPhrase(newStrandBases));
        return new DNAStrand(newStrandBases);
    }
    //Assumes A & B are of same length
    static interleaf(strandA, strandB) {
        let newStrandBases = [];
        for (let i = 0; i < strandA.bases.length; i++) {
            if (i % 2 == 0) {
                newStrandBases.push(strandA.bases[i]);
            }
            else {
                newStrandBases.push(strandB.bases[i]);
            }
        }
        return new DNAStrand(newStrandBases);
    }
    mutatedBases(strand) {
        let newBases = [];
        for (let i = 0; i < strand.bases.length; i++) {
            if (Math.random() < this.mutationRate) {
                newBases.push(this.newBase()); //This provides some diversity because it can be anything allowable? 
            }
            else {
                newBases.push(strand.bases[i]);
            }
        }
        return newBases;
    }
}
class DNAStrand {
    constructor(bases) {
        this.bases = bases;
    }
}
