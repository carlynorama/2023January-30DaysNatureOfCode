//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// wanderer.ts
// written by calynorama 2023 Jan 21
// building upon https://editor.p5js.org/codingtrain/sketches/EWHjy--Os

class Wanderer {
    vehicle: Vehicle;
    toLookAhead: Vector;
    toWanderPoint: Vector;
    toWobblePoint: any;
    currentPath: Vector[];
    paths: Vector[][];
    constructor(
        lookAheadDistance:number, 
        lookAheadRadius:number, 
        toWanderPointStartAngle:number,
        wobbleRadius:number) {
        this.vehicle = Vehicle.createStillVehicle(200,200);
        this.toLookAhead = Vector.createAngleVector(0, lookAheadDistance)
        this.toWanderPoint = Vector.createAngleVector(toWanderPointStartAngle, lookAheadRadius);
        this.toWobblePoint = Vector.createAngleVector(Math.random() * Math.PI * 2, wobbleRadius);
        this.currentPath = [];
        //JavaScript madness.
        this.paths = [this.currentPath];
    }

    wander() {
        this.toWobblePoint = Vector.createAngleVector(Math.random() * 2*Math.PI, this.toWobblePoint.magnitude())
        this.toWanderPoint = this.calculateSeekPoint();
        let steering = this.vehicle.seek(this.wanderCanvasPoint());
        
        this.vehicle.applyInternalPower(steering)
    }

    update(boundsWidth: number, boundsHeight: number) {
        let wrapped = this.vehicle.wallWrap(boundsWidth, boundsHeight);
        if (wrapped) { 
            //JavaScript madness. 
            this.currentPath = [];
            this.paths.push(this.currentPath);
        }
        this.currentPath.push(this.vehicle.position.copy());
        this.managePathClearing(500);
        this.vehicle.update();
    }

    toWobbleFromLookAhead() {
        return (this.toWanderPoint.added(this.toWobblePoint));
    }

    lookAheadCanvasPoint() {
        return this.vehicle.position.added(this.toLookAhead);
    }

    wanderCanvasPoint() {
        return this.vehicle.position.added(this.toLookAhead.added(this.toWanderPoint));
    }

    wobbleCanvasPoint() {
        return this.vehicle.position.added(this.toLookAhead.added(this.toWanderPoint.added(this.toWobblePoint)));
    }

    calculateSeekPoint():Vector {

        let newItems = this.toWobbleFromLookAhead();
        let newPoint = Vector.createAngleVector(newItems.angle(), this.toWanderPoint.magnitude())

        return newPoint;
    }

    managePathClearing(maxPoints:number = 200) {
            // Count positions
    let total = 0;
    for (let path of this.paths) {
      total += path.length;
    }

    //unclear on why the time part?
    //if (total > maxPoints || (total > 10 && millis() > 3000)) {
    if (total > maxPoints) {
      this.paths[0].shift();
      if (this.paths[0].length === 0) {
        this.paths.shift();
      }
    }
    }
}