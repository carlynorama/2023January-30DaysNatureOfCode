import { makeNoise2D } from './main' 
import { makeNoise3D } from './main'
import { makeNoise4D } from './main'

const [width, height] = [888, 222];

//-----------------------------------------  2D Example

const canvas = document.querySelector("#canvas2DN");
const ctx = canvas.getContext("2d");
const imageData = ctx.createImageData(width, height);
const noise2D = makeNoise2D(Date.now()); // Using current date as seed

for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const i = (x + y * width) * 4;
    const value = (noise2D(x, y) + 1) * 128;
    imageData.data[i] = value;
    imageData.data[i + 1] = value;
    imageData.data[i + 2] = value;
    imageData.data[i + 3] = 255;
  }
}
ctx.putImageData(imageData, 0, 0);


//-----------------------------------------  3D Example

const canvas3DN = document.querySelector("#canvas3DN");
const ctx3DN = canvas3DN.getContext("2d");
const imageData3DN = ctx3DN.createImageData(width, height);
const noise3D = makeNoise3D(Date.now()); // Using current date as seed

let z = 0;
let z_inc = 0.01;



for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    z += z_inc;
    const i = (x + y * width) * 4;
    const value = (noise3D(x, y, z) + 1) * 128;
    imageData3DN.data[i] = value;
    imageData3DN.data[i + 1] = value;
    imageData3DN.data[i + 2] = value;
    imageData3DN.data[i + 3] = 255;
  }
}
ctx3DN.putImageData(imageData3DN, 0, 0);


//-----------------------------------------  4D Example

const canvas4DN = document.querySelector("#canvas4DN");
const ctx4DN = canvas4DN.getContext("2d");
const imageData4DN = ctx4DN.createImageData(width, height);
const noise4D = makeNoise4D(Date.now()); // Using current date as seed

let z4 = 0;
let z4_inc = 0.01;

let w = 0;
let w_inc = 0.06;

for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    z4 += z4_inc;
    w += w_inc;
    const i = (x + y * width) * 4;
    const value = (noise4D(x, y, z4, w) + 1) * 128;
    imageData4DN.data[i] = value;
    imageData4DN.data[i + 1] = value;
    imageData4DN.data[i + 2] = value;
    imageData4DN.data[i + 3] = 255;
  }
}
ctx4DN.putImageData(imageData4DN, 0, 0);