"use strict";
function arrayRange(start, stop, step) {
    return Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);
}
//https://en.wikipedia.org/wiki/Fisher–Yates_shuffle
function shuffle(array) {
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
