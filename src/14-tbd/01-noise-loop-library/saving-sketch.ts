// // Based On
// // GIF Loop
// // Daniel Shiffman
// // https://thecodingtrain.com/CodingChallenges/135-gif-loop.html
// // https://youtu.be/nBKwCCtWlUg

// const totalFrames = 120;
// let counter:number = 0;
// let record = true;

// function setup() {
//   createCanvas(400, 400);
// }

// function draw() {
//   let percent = 0;
//   if (record) {
//     frameRate(3);
//     percent = counter / totalFrames;
//   } else {
//     percent = (counter % totalFrames) / totalFrames;
//   }
//   render(percent);
//   recordSeries(counter, 0, totalFrames);
//   counter++;
// }

// function render(percent:number) {
//   let angle = map(percent, 0, 1, 0, TWO_PI);
//   background(0);
//   translate(width / 2, height / 2);
//   rotate(angle);
//   stroke(255);
//   noFill();
//   rectMode(CENTER);
//   square(0, 0, 100);
// }
// // -------------------------------------------------------------- 
// // -----------------------------------   my change to pull it out. 
// function recordSeries(x: number, min:number, max:number, nameRoot = 'output_gif-'):string {
//     if (x > max) { return "widow is past" }
//     else if (x < min) { return "not yet" }
//     else 
//     { save(nameRoot + nf(x, 3) + '.png');
//       return "saved frame" } 
//   }
// // function recordSeries(x: number, min:number, max:number):string {
// //     let range = new NumRange(min, max);
// //     if (range.inclusiveContains(x)) {
// //       save('output/gif-' + nf(x, 3) + '.png');
// //       return "saved frame"
// //     }
// //     else if (x > max) { return "widow is past" }
// //     else if (x < min) { return "not yet" }
// //   }
// // -------------------------------------------------------------- 