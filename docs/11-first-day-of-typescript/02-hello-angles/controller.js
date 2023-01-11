"use strict";
// eslint-disable-next-line no-var
var runFlag = true;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createControlledCanvas(x, y) {
    // eslint-disable-next-line prefer-const
    let canvas = createCanvas(x, y);
    //let myParent = canvas.parent();
    // eslint-disable-next-line prefer-const
    let selection = select('#embedded-p5js');
    if (selection) {
        console.log(selection);
        runFlag = false;
        canvas.mouseOver(run);
        canvas.mouseOut(stop);
    }
    else {
        console.log("I am not embedded");
        runFlag = true;
    }
}
function run() {
    if (runFlag == false) {
        console.log('running');
        runFlag = true;
    }
}
function stop() {
    if (runFlag == true) {
        console.log('stopping');
        runFlag = false;
    }
}
//# sourceMappingURL=controller.js.map