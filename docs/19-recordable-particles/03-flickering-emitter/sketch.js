"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 19-recordable-particles/03-flickering-emitter.ts
// written by calynorama 2023 Jan 18
// following: https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/4-particles/2-particle-emitters
//Image Texture: https://editor.p5js.org/codingtrain/sketches/TTVoNt58T
let controller;
let emitters = [];
//NOTE Particles have a dissipation factor to chill out the world.
const g = 0.01;
let gravity;
let wind;
const particleSize = 16;
let imgA;
let imgB;
let backgroundColor = 51;
function preload() {
    imgA = loadImage('pink_texture.png');
    imgB = loadImage('pink_texture-3.png');
}
function setup() {
    controller = new ControlledCanvas(400, 400);
    controller.disableGalleryMode();
    controller.enableRecording();
    background(backgroundColor);
    gravity = new Vector(0, g);
    emitters.push(new Emitter(width / 2, height * 5 / 6));
    imageMode(CENTER);
    ellipseMode(CENTER);
    noStroke;
    console.log("-------- DONE SETUP --------");
}
function draw() {
    clear();
    background(backgroundColor);
    blendMode(ADD);
    let dir = map(mouseX, 0, width, -0.05, 0.05);
    let wind = new Vector(dir, 0);
    emitters.forEach(emitter => {
        emitter.addParticle(2);
        emitter.applyForceAndWeaken(gravity.added(wind), 0.005);
        emitter.update();
        drawParticles(emitter.particles);
    });
    controller.recordingWatcher();
}
function keyPressed() {
    controller.keyPressed();
}
// function mousePressed() {
//   emitters.push(new Emitter(mouseX, mouseY));
// }
function drawParticles(particles) {
    for (let p = 0; p < particles.length - 1; p++) {
        showParticle(particles[p]);
        stroke(degrees(particles[p].heading), 50, 60, particles[p].health * 10);
        //showSpringBetween(particles[p], anchor)
    }
}
function showParticle(particle) {
    //tint(255, particle.health*255);
    push();
    //blendMode(REMOVE);
    //fill(0, 255-particle.health * 255);
    let img = imgA;
    if (particle.health < 0.02) {
        img = imgB;
    }
    image(img, particle.x, particle.y, particleSize, particleSize);
    //blendMode(OVERLAY)
    blendMode(REMOVE);
    fill(0, 1, 1, particle.health * 200);
    circle(particle.x, particle.y, particleSize);
    pop();
}
//https://editor.p5js.org/codingtrain/sketches/NS4rB1Yx-
//run this in the setup alone and comment out draw.
function makeParticleTexture() {
    createCanvas(32, 32); //<- size of texture
    pixelDensity(1);
    background(0); //<-is this necessary? why?
    loadPixels();
    const center_x = width / 2;
    const center_y = height / 2;
    const max_radius = height / 2; //point at which it is transparent. 
    for (let col = 0; col < width; col++) {
        for (let row = 0; row < height; row++) {
            const radius_to_location = dist(center_x, center_y, col, row);
            const alpha_channel = map(radius_to_location, 0, max_radius, 255, 0);
            let buffer_index = (col + row * width) * 4;
            pixels[buffer_index] = 204; //r
            pixels[buffer_index + 1] = 51; //g
            pixels[buffer_index + 2] = 102; //b
            pixels[buffer_index + 3] = alpha_channel;
        }
    }
    updatePixels();
    save("texture.png");
}
