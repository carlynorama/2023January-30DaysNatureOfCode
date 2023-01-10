let thisWidth = 400;
let thisHeight = 400;
let element_limit = 6;

let particleSet;


function mouseClicked() {
  runFlag = false;
}

// ------------------------------------------------------------------------ setup()
function setup() {

  createControlledCanvas(thisWidth, thisHeight);
  background(51);

  particleSet = new ParticleSet(thisWidth, thisHeight, element_limit);
  particleSet.populateSet(1000);


  console.log("--------- End of Setup ---------");
  //noLoop();
}


// ------------------------------------------------------------------------ draw()
function draw() {
if (runFlag) {  
 background(51);
 particleSet.update();
 
 particleSet.draw();
}

}


// ------------------------------------------------------------ functions passed to QuadTree()


