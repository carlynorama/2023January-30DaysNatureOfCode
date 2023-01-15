// //
// // 2023 January Creative Coding Journal
// // https://github.com/carlynorama/2023January-30DaysNatureOfCode/
// //
// // sketch.ts
// // written by calynorama 2023 Jan 13
// //


// let originx = 200;
// let originy = 200;

// let noiseMax = 0.8;
// let rootOffsets = 100;
// let spikeRange = 50;
// let seed = 100;

// let angle = 0;


// let doneRecording = true; //Should be false at start if actually should run.
// let spacing = 3;
// let angle_inc =  0.01745329 * spacing//0.01745329 == 1 degree in radians. radians(1) 
// let detectionMark = angle_inc * (180/spacing); // should be a value ~3.14 etc. Using Math.PI will not work with modulo. 
// let loopCounter = 0;

// let noiseLoop1:NoiseLoop;
// let noiseLoop2:NoiseLoop;
// let noiseLoop3:NoiseLoop;

// let mover1:PolarMover;
// let mover2:PolarMover;
// let mover3:PolarMover;


// function setup() {
//   noiseSeed(seed);
//   pixelDensity(1);
//   createControlledCanvas(400, 400);
//   originx = width/2;
//   originy = height/2;

//   // noiseLoop1 = NoiseLoop.create2D(noiseMax, rootOffsets);
//   // noiseLoop2 = NoiseLoop.create2D(noiseMax, rootOffsets);
//   // noiseLoop3 = NoiseLoop.create2D(noiseMax, rootOffsets);

//   noiseLoop1 = NoiseLoop.createSpecific2D(noiseMax, 0.10181544243920149, 55.70224835112849);
//   noiseLoop2 = NoiseLoop.createSpecific2D(noiseMax, 36.748379405086865, 57.74560414740223);
//   noiseLoop3 = NoiseLoop.createSpecific2D(noiseMax, 71.13211038217582, 76.22767878070475);

//   // noiseLoop1 = NoiseLoop.createSpecific2D(noiseMax, 20.77644215903757, 97.27618505307356);
//   // noiseLoop2 = NoiseLoop.createSpecific2D(noiseMax, 80.29238687282576, 87.47713872827448);
//   // noiseLoop3 = NoiseLoop.createSpecific2D(noiseMax, 52.429205156931104, 26.05273965518402);

//   //------------------------------------------------- MAKE THE MOVER
//   //------------------  Make sure mover has the right start velocity. 
//   //move to 1 behind zero and create the conditions to seed the mover. 
//   let prepAngle = angle - 1 * angle_inc;
//   mover1 = PolarMover.createPolarMover(
//     prepAngle, 
//     noiseLoop1.scaledValue(prepAngle, 100-spikeRange, 100+spikeRange)
//     );
//   mover2 = PolarMover.createPolarMover(
//     prepAngle, 
//     noiseLoop2.scaledValue(prepAngle, 100-spikeRange, 100+spikeRange)
//     );
//   mover3 = PolarMover.createPolarMover(
//     prepAngle, 
//     noiseLoop3.scaledValue(prepAngle, 100-spikeRange, 100+spikeRange)
//     );
//   //------------------------------------------------------------------
  
  

//   background(204);
//   //noLoop();
// }

// function draw() {
  
//   if (runFlag) {
//   background(204, 5);
//     strokeWeight(1);
//     translate(originx, originy);

//     let r1 = noiseLoop1.scaledValue(angle, 100-spikeRange, 100+spikeRange);
//     let r2 = noiseLoop2.scaledValue(angle, 100-spikeRange, 100+spikeRange);
//     let r3 = noiseLoop3.scaledValue(angle, 100-spikeRange, 100+spikeRange);
  
//     mover1.setPosition(angle, r1);
//     mover2.setPosition(angle, r2);
//     mover3.setPosition(angle, r3);


//     // stroke(0, 51, 102, 200);
//     // if (angle % 0.0314 < 0.01) { line(0, 0, mover.position.x, mover.position.y);}
//     //line(0, 0, mover.position.x, mover.position.y);

//     stroke(51, 0, 0, 100);
//     fill(102, 0, 0, 80);
//     mover1.needsCartesian(drawMe);

//     stroke(0, 51, 0, 100);
//     fill(51, 102, 0, 80);
//     mover2.needsCartesian(drawMe);

//     stroke(0, 0, 51,100);
//     fill(0, 51, 102, 200);
//     mover3.needsCartesian(drawMe);
    
//     angle += angle_inc;

//   //  angle_inc is 
//   //   if (!doneRecording) {
//   //   if (angle % (angle_inc * 180) < 0.000001) { 
//   //     console.log("loopCounter", loopCounter );
//   //     loopCounter += 1 
//   //   }
//   //   let result = recordWindow(loopCounter, 2, 3, "noiseLoop_");
//   //   console.log(result);
//   //   if (result[0] == 'w') {
//   //     doneRecording = true;
//   //     frameRate(30);
//   //   } 
//   // }

// //let angle_inc =  0.01745329 * 3//0.01745329; //1 degree in radians. 
// //let detectionMark = angle_inc * (180/3); // should be a value ~3.14 etc. Using 
//     if (!doneRecording) {
//       //0.000001 is epsilon
//       if (angle % (detectionMark) < 0.000001) { 
//         //console.log("loopCounter", loopCounter );
//         loopCounter += 1 
//       }
//       let result = recordWindow(loopCounter, 6, 7, 1, "noiseLoop_");
//       console.log(result);
//       if (result[0] == 'w') {
//         doneRecording = true;
//         frameRate(30);
//       } 
//     }
  
//   }
// }

// function drawMe(x:number, y:number, a:number) {
//   push();
//   let size = 10; 
  
//   push();
//   translate(x, y);
//   rotate(a);
//   triangle(-size, -size / 2, -size, size / 2, size, 0);
  
//   pop();
//   point(x, y);
//   pop();
// }
