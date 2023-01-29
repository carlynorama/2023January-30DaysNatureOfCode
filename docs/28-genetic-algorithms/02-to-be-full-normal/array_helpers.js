"use strict";
function arrayRange(start, stop, step) {
    return Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);
}
function sum(values) {
    return values.reduce((acc, current) => acc + current, 0);
}
function average(values) {
    return values.reduce((acc, current) => acc + current, 0) / values.length;
}
function normalized(values) {
    const total = sum(values);
    return values.map((value) => value / total);
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
