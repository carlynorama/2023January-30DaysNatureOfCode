"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 23-path-following/02-path-follower-refine/follower.ts
// calynorama 2023 Jan 23
//
class PathFollower {
    constructor(x, y, lookAheadDistance) {
        //this.vehicle = Vehicle.createVehicle(x, y, 2, 0.5);
        this.vehicle = new Vehicle(new Vector(x, y), //position
        new Vector(2, 0.5), //velocity
        new Vector(0, 0), //acceleration
        2.5, //maxSpeed
        0.05, //maxForce
        40 //dockingDistance
        );
        this.lookAheadDistance = lookAheadDistance;
        this.currentTrail = [];
        //JavaScript madness.
        this.trails = [this.currentTrail];
    }
    follow(path) {
        let pathPoint = this.findClosestPathPoint(path);
        if (!this.distanceCheckTo(pathPoint.point, path)) {
            let steering = this.vehicle.seek(pathPoint.point);
            this.vehicle.applyInternalPower(steering);
        }
    }
    snapToPathInRadius(path) {
        let pathPoint = this.findClosestPathPoint(path);
        if (this.distanceCheckTo(pathPoint.point, path)) {
            let steering = this.vehicle.seek(pathPoint.point);
            this.vehicle.applyInternalPower(steering);
        }
    }
    distanceCheckTo(point, path) {
        return this.lookAheadCanvasPoint().distanceTo(point) < path.radius;
    }
    update(boundsWidth, boundsHeight) {
        let wrapped = this.vehicle.wallWrap(boundsWidth, boundsHeight);
        if (wrapped) {
            //JavaScript madness. 
            this.currentTrail = [];
            this.trails.push(this.currentTrail);
        }
        this.currentTrail.push(this.vehicle.position.copy());
        this.manageTrailClearing(500);
        this.vehicle.update();
    }
    lookAheadCanvasPoint() {
        let location = Vector.create2DAngleVector(this.vehicle.velocity.angle2D(), this.lookAheadDistance);
        return this.vehicle.position.addedTo(location);
    }
    closestPathPointInSegment(startIndex) {
        let endIndex = startIndex + 1;
        let newSegment = path.locations[endIndex].subtracting(path.locations[startIndex]);
        let toProject = pathFollower.lookAheadCanvasPoint().subtracting(path.locations[startIndex]);
        let projection = toProject.projectOn(newSegment);
        let projectionCanvasPoint = projection.addedTo(path.locations[startIndex]);
        return projectionCanvasPoint;
    }
    findClosestPathPoint(path) {
        return path.closestPointTo(this.lookAheadCanvasPoint());
    }
    manageTrailClearing(maxPoints = 200) {
        // Count positions
        let total = 0;
        for (let trail of this.trails) {
            total += trail.length;
        }
        //unclear on why the time part?
        //if (total > maxPoints || (total > 10 && millis() > 3000)) {
        if (total > maxPoints) {
            this.trails[0].shift();
            if (this.trails[0].length === 0) {
                this.trails.shift();
            }
        }
    }
}
