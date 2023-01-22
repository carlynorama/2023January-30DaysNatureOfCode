"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// wanderer.ts
// written by calynorama 2023 Jan 21
//
class Wanderer {
    constructor(lookAheadDistance, lookAheadRadius, toWanderPointStartAngle, wobbleRadius) {
        this.vehicle = Vehicle.createStillVehicle(200, 200);
        this.toLookAhead = Vector.createAngleVector(0, lookAheadDistance);
        this.toWanderPoint = Vector.createAngleVector(toWanderPointStartAngle, lookAheadRadius);
        this.toWobblePoint = Vector.createAngleVector(Math.random() * Math.PI * 2, wobbleRadius);
    }
    wander() {
        this.toWobblePoint = Vector.createAngleVector(Math.random() * 2 * Math.PI, this.toWobblePoint.magnitude());
        this.toWanderPoint = this.calculateSeekPoint();
        let steering = this.vehicle.seek(this.wanderCanvasPoint());
        this.vehicle.applyInternalPower(steering);
    }
    update(boundsWidth, boundsHeight) {
        this.vehicle.wallWrap(boundsWidth, boundsHeight);
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
    calculateSeekPoint() {
        let newItems = this.toWobbleFromLookAhead();
        let newPoint = Vector.createAngleVector(newItems.angle(), this.toWanderPoint.magnitude());
        return newPoint;
    }
}
