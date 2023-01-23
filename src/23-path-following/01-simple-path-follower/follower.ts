//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// wanderer.ts
// written by calynorama 2023 Jan 22
// building upon https://editor.p5js.org/codingtrain/sketches/EWHjy--Os

class PathFollower {
    vehicle: Vehicle;
    lookAheadDistance: number;
    currentPath: Vector[];
    paths: Vector[][];
    constructor(lookAheadDistance:number) {
        this.vehicle = Vehicle.createVehicle(200,50, 1,0);
        this.lookAheadDistance = lookAheadDistance;

        this.currentPath = [];
        //JavaScript madness.
        this.paths = [this.currentPath];
    }

    follow(path:Path) {
        // this.toWobblePoint = Vector.create2DAngleVector(Math.random() * 2*Math.PI, this.toWobblePoint.magnitude())
        // this.toWanderPoint = this.calculateSeekPoint();

        let pathPoint = this.findClosestPathPoint(path)

        let steering = this.vehicle.seek(pathPoint);
        
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


    lookAheadCanvasPoint() {
        let location = Vector.create2DAngleVector(this.vehicle.velocity.angle2D(), this.lookAheadDistance)
        return this.vehicle.position.addedTo(location);
        //this.vehicle.position.addedTo(this.toLookAhead);
    }

    findClosestPathPoint(path:Path):Vector {
        let newSegment = path.locations[1].subtracting(path.locations[0]);
        //TODO catch normalization problem.
        //@ts-expect-error
        let projection = this.vehicle.position.addedTo(this.vehicle.velocity.normalized().scaledBy(this.lookAheadDistance)).projectOn(newSegment);
        return projection
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