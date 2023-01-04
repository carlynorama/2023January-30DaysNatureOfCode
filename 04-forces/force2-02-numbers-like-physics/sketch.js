let movers = [];
let numMovers = 12;

let liquidBoundary = 0;
//https://sciencenotes.org/table-of-density-of-common-materials/
let airRho = 0.001;
let liquidRho = airRho * 1000; //(water is about 1000 times more dense than air)
let sandRho = liquidRho * 10000000;

//multiply v every round. TODO: Move this into drag function.
//energy lost due to drag=𝐅𝐝𝐫𝐚𝐠⋅displacement which is volume.
// let energyDissapationAir = 1.0;
// let energyDissapationLiquid = 0.001;
// let energyDissapationTransition = 0.00001;
// let energyDissapationSand = 0.0000000001;

let energyDissapationAir = 1.0;
let energyDissapationLiquid = 0.001;
let energyDissapationTransition = 0.00001;
let energyDissapationSand = 0.0000000001;


function setup() {
  //let color1 = color(204, 204, 0, 255);
  let color2 = color(0, 204, 204, 255);
  //let color3 = color(204);
  createControlledCanvas(400, 400);
  liquidBoundary = width/2;
  background(51);
  let gravity = createVector(0,9.8);
  for (let i = 0; i < numMovers; i++) {
    movers[i] = new Mover(random(0, width), 0, random(0.0004,0.004), color2, gravity);
  }
}

function draw() {
  if (runFlag) {
    let color1 = color(204, 204, 0, 255);
    let color2 = color(0, 204, 204, 255);
    let color3 = color(204);

    let wind = createVector(0.5,0);

    background(51);

    stroke(color3);
    line(0, liquidBoundary, width,liquidBoundary);

    let windIsBlowing = false;
    if (mouseIsPressed) {
      windIsBlowing = true;
    }

    movers.forEach(mover => {
      let radius = mover.diameter/2;
      let tmin = liquidBoundary-radius;
      let tmax = liquidBoundary+radius;


      mover.applyGravity();

      //Is just even barely touching the sand put on the brakes, because I'm too
      //lazy to transition.
      if (mover.pos.y > height-(radius)) {
        mover.color = color2;

        mover.velocity.y *= 1/(this.volume*energyDissapationSand);
        mover.applyDrag(sandRho);

        mover.applyReverseGravity(); //<-- this is a bit of a cheat.
        //console.log("sand:", mover.velocity.y)
      }
      //fully in the liquid.
      else if (mover.pos.y > tmax) {
        mover.color = color3;
        //energy dissipates in sound, etc. TODO RealEQ
        //rain drops do bounce on the surface, etc.
        mover.velocity.y *= 1/(this.volume*energyDissapationLiquid);
        mover.applyDrag(liquidRho);
        //console.log("liquid:", mover.velocity.y)
      }
      //an attempt to play around with a transition
      else if (mover.pos.y >= tmin && mover.pos.y <= tmax) {
        mover.color = color(204, 102, 0);

        //it is correct that there is a transition, but this is not the right math.
        //I'm doing it by percentage of h
        //but it should be an integration over the surface area/delta-volume.
        //Also the decrease in acceleration needs to be dissapated? Will that come for free?
        let liquidPercent = (mover.pos.y - tmin)/mover.diameter;
        let airPercent = 1-liquidPercent; //this should never be negative.

        if (airPercent < 0) {
          log.console("something's gone wrong, airPercent is negative")
        }

        let drag = airPercent*airRho + liquidPercent*liquidRho;

        mover.velocity.y *= 1/(this.volume*energyDissapationLiquid);
        mover.applyDrag(drag);
        //console.log("transistion:", mover.velocity.y, airPercent, drag)
      }
      //default air.
      else {
        console.log("air:", mover.velocity.y)
        mover.color = color1;
        mover.velocity.y *= 1/(this.volume*energyDissapationAir);
        mover.applyDrag(airRho);
      }

      mover.update();
      mover.render();
    });

  }
}
