"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// controller.ts
// written by calynorama 2023 Jan 13
// updated Jan 18
//import { Renderer } from "p5";
class ControlledCanvas {
    constructor(x, y) {
        this.run = () => {
            if (this.runFlag == false) {
                //console.log('running');
                this.runFlag = true;
            }
        };
        this.stop = () => {
            if (this.runFlag == true) {
                //console.log('stopping');
                this.runFlag = false;
            }
        };
        this.toggleRunState = () => {
            if (this.runFlag) {
                this.runFlag = false;
            }
            else {
                this.runFlag = true;
            }
        };
        this.keyPressed = () => {
            // if (keyCode === UP_ARROW) {
            //   if (this.runFlag) {this.runFlag = false} else {this.runFlag = true};
            // } 
            console.log(key);
            if (this.trackedKeys.has(key)) {
                console.log("had key");
                let toDo = this.trackedKeys.get(key);
                toDo();
            }
        };
        //--------------------------------------------- RECORDING
        // MUST decrease frame rate in order to use without skipping frames. 
        this.recordFrames = (x, min, max, nameRoot = 'output_gif-') => {
            if (x > max) {
                return "widow is past";
            }
            else if (x < min) {
                return "not yet";
            }
            else {
                save(nameRoot + nf(x, 3) + '.png');
                return "saved frame";
            }
        };
        this.recordWindow = (x, min, max, sampleRate = 1, nameRoot = 'output_gif-') => {
            if (x > max) {
                return "window is past";
            }
            else if (x < min) {
                return "not yet";
            }
            else {
                frameRate(3);
                if (frameCount % sampleRate == 0) {
                    save(nameRoot + nf(frameCount, 3) + '.png');
                    return "saved frame";
                }
                return "skipped frame";
            }
        };
        let canvas = createCanvas(x, y);
        //let myParent = canvas.parent();
        let selection = select('#embedded-p5js');
        if (selection) {
            console.log(selection);
            this.runFlag = false;
            canvas.mouseOver(this.run);
            canvas.mouseOut(this.stop);
            this.embedded = true;
        }
        else {
            console.log("I am not embedded");
            this.runFlag = true;
            this.embedded = false;
        }
        this.trackedKeys = new Map();
        this.trackedKeys.set("l", this.toggleRunState);
    }
}
// MUST decrease frame rate in order to use without skipping frames. 
// function recordWindow(x: number, min:number, max:number, nameRoot = 'output_gif-'):string {
//   if (x > max) { return "widow is past" }
//   else if (x < min) { return "not yet" }
//   else 
//   { 
//     frameRate(3);
//     save(nameRoot + nf(frameCount, 3) + '.png');
//     return "saved frame" } 
// }
//------------------------
//in the sketch. 
//------------------------ 
//--header
//let doneRecording = false;
//let angle_inc =  0.01745329 * 3//0.01745329; //1 degree in radians. 
//let detectionMark = angle_inc * (180/3); // should be a value ~3.14 etc. Using 
//--setup
//pixelDensity(1);
//--draw loop
// if (!doneRecording) {
//   //0.000001 is epsilon
// if (angle % (detectionMark) < 0.000001) { 
// console.log("loopCounter", loopCounter );
// loopCounter += 1 
// }
// let result = recordWindow(loopCounter, 2, 3, "noiseLoop_");
// console.log(result);
// if (result[0] == 'w') {
// doneRecording = true;
// frameRate(30);
// } 
// }
//  angle_inc is 
//   if (!doneRecording) {
//   if (angle % (angle_inc * 180) < 0.000001) { 
//     console.log("loopCounter", loopCounter );
//     loopCounter += 1 
//   }
//   let result = recordWindow(loopCounter, 2, 3, "noiseLoop_");
//   console.log(result);
//   if (result[0] == 'w') {
//     doneRecording = true;
//     frameRate(30);
//   } 
// }
