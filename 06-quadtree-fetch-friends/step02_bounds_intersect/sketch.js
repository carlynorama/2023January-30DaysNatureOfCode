
let staticBounds;
let dynamicBounds;
let trapped = false;

function setup() {

  let colors = [
    color(204, 204, 0),
    color(0, 204, 204),
    color(204, 0, 204),
    color(0, 51, 204),
    color(204, 51, 0),
  ]

  createControlledCanvas(400, 400);
  background(51);
  staticBounds = Bounds.createBounds(150, 150, 100, 100);
  dynamicBounds = Bounds.createBounds(0, 0, 50, 50);

  let baseRange = new Range(150, 250);
  let subset = new Range(175,200);
  let outsideLower = new Range(15,25);
  let outsideHiger = new Range(275,300);
  let leftBoundsOverlap = new Range(25,157);
  let rightBoundsOverlap = new Range(240,300);
  let matches = new Range(150, 250);

  console.log(baseRange.overlaps(outsideLower), baseRange.overlaps(outsideHiger));
  console.log("sbt", baseRange.overlaps(subset), baseRange.holds(subset));
  console.log("bse", subset.overlaps(baseRange), subset.holds(baseRange));
  console.log("lbo", baseRange.overlaps(leftBoundsOverlap), baseRange.holds(leftBoundsOverlap));
  console.log("rbo", baseRange.overlaps(rightBoundsOverlap), baseRange.holds(rightBoundsOverlap));
  console.log("mch", baseRange.overlaps(matches), baseRange.holds(matches));

  //redo of map function so can do it outside of p5.
  //Not using map b/c that has other meaning
  console.log(Range.project(12, 0, 24, 0, 100));
  console.log(Range.project(18, 0, 24, 0, 100));
  console.log(Range.project(18, 0, 24, 100, 0));

  let testRangeA = new Range(0, 24);
  console.log(testRangeA.locationInRange(11));
  console.log(testRangeA.locationInRange(18));

  let testRangeB = new Range(24, 0);
  console.log(testRangeB.locationInRange(11));
  console.log(testRangeB.locationInRange(18));

  console.log("--------- End of Setup ---------");
  //noLoop();

}

function drawBounds(bounds) {
  rect(bounds.x, bounds.y, bounds.width, bounds.height);
  ellipseMode(CENTER);
  ellipse(bounds.x, bounds.y, 5);
}

function draw() {
  if (runFlag) {
    console.log(trapped);
    let bgColor = 51;
    let fColor = 204;

    if (trapped) {
      bgColor = 0;
      fColor = (204, 102, 102);
      dynamicBounds.size.width -= 0.1;
      dynamicBounds.size.height -= 0.1;
      if (dynamicBounds.size.width < 0 || dynamicBounds.size.height < 0) {
        noLoop();
      }
    }

    background(bgColor);
    stroke(153);
    fill(fColor);

    dynamicBounds.updateCenter(mouseX, mouseY);
    //dynamicBounds.updateOrigin(mouseX, mouseY);

    if (staticBounds.intersects(dynamicBounds)) { fill(204, 204, 204); }
    else { fill(102, 102, 102) } ;


    drawBounds(staticBounds);
    drawBounds(dynamicBounds);

    let intersection = staticBounds.intersection(dynamicBounds);

    if (intersection !== null) {
      if (intersection.matches(dynamicBounds) || intersection.holds(dynamicBounds)) {
        //Careful this might be by reference?
        fill(102, 102, 204)
        trapped = true;
      } else {
        let percent = intersection.size.area/dynamicBounds.size.area
        colorMode(HSB);
        let h = Range.project(percent, 0, 1, 120, 240);
        fill(h, 50, 80); //=> target 120
        colorMode(RGB);
      }
      drawBounds(intersection);
    } else { trapped = false; }

  }
}
