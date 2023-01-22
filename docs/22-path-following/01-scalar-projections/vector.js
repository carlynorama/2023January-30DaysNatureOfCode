"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// vector.ts
// adapted by calynorama 2023 Jan 12 from 
// https://radzion.com/blog/linear-algebra/vectors
//
//https://www.robinwieruch.de/linear-algebra-matrix-javascript/
////https://textbooks.math.gatech.edu/ila/dot-product.html
class Vector {
    constructor(...components) {
        this.scaledBy = (value) => {
            return new Vector(...this.components.map(component => component * value));
        };
        this.components = components;
    }
    get x() { return this.components[0]; } //i-hat
    get y() { return this.components[1]; } //j-hat
    get z() { return this.components[2]; } //k-hat
    copy() { return new Vector(...this.components); }
    //add({ components }) //TypeScript had trouble with this?
    //ahhh this is the fix dotProduct({ components } : { components: number[] })
    //https://bobbyhadz.com/blog/typescript-binding-element-implicitly-has-an-any-type
    addedValues(...values) {
        return new Vector(...values.map((component, index) => this.components[index] + component));
    }
    addedTo(other) {
        return new Vector(...other.components.map((component, index) => this.components[index] + component));
    }
    static addedTo(lhs, rhs) {
        return new Vector(...rhs.components.map((component, index) => lhs.components[index] + component));
    }
    subtractingValues(...values) {
        return new Vector(...values.map((component, index) => this.components[index] - component));
    }
    subtracting(other) {
        return new Vector(...other.components.map((component, index) => this.components[index] - component));
    }
    static subtracting(lhs, rhs) {
        return new Vector(...rhs.components.map((component, index) => lhs.components[index] - component));
    }
    normalized() { return this.scaledBy(1 / this.length()); }
    negated() { return this.scaledBy(-1); }
    inverted() { return this.scaledBy(-1); }
    length() { return Math.hypot(...this.components); }
    magnitude() { return Math.hypot(...this.components); }
    //Same as dot*product with self.
    //https://textbooks.math.gatech.edu/ila/dot-product.html
    magnitudeSquared() {
        return this.components.reduce(function (sumSq, value) { return sumSq + (value ** 2); }, 0);
    }
    //The dot product between two vectors is the sum of the products of corresponding components.
    //citation: https://radzion.com/blog/linear-algebra/vectors
    dotProduct({ components }) {
        return components.reduce((acc, component, index) => acc + component * this.components[index], 0);
    }
    //magnitude is the sqrt of the dotProduct with itself.
    distanceTo(other) {
        // || other - this ||
        return Vector.subtracting(other, this).magnitude();
    }
    // SAME! 
    // distanceTo(other:Vector):number {
    //  // || other - this ||
    //   let first = Vector.subtracted(other, this)
    //    let next = first.dotProduct(first)
    //    return Math.sqrt(next);
    //    //same as first.magnitude?
    // }
    magSquaredTo(other) {
        // || other - this ||
        return Vector.subtracting(other, this).magnitudeSquared();
    }
    //Why does this come back in degrees? 
    angleBetween(other) {
        return (Math.acos(this.dotProduct(other) / (this.length() * other.length())));
    }
    angleToAxis(axis) {
        if (this.isZeroVector()) {
            throw new Error("zero vector");
        }
        //@ts-expect-error
        return this.normalized().angleBetween(Vector.makeAxisVector(this, axis));
    }
    //x axis is 0
    static makeAxisVector(base, axis) {
        let components = Array(base.components.length).fill(0);
        components[axis] = 1;
        return new Vector(...components);
    }
    //If we take the dot product of two normalized vectors and the result is equal to one it means that they have the same direction. 
    //To compare two float numbers, we will use the areEqual function.
    //citation: https://radzion.com/blog/linear-algebra/vectors
    hasSameDirectionWith(other) {
        if (this.isZeroVector() || other.isZeroVector()) {
            throw new Error("zero vector");
        }
        //@ts-expect-error
        const dotProduct = this.normalized().dotProduct(other.normalized());
        return Vector.floatsAreEqual(dotProduct, 1);
    }
    hasOppositeDirectionTo(other) {
        if (this.isZeroVector() || other.isZeroVector()) {
            throw new Error("zero vector");
        }
        //@ts-expect-error
        const dotProduct = this.normalized().dotProduct(other.normalized());
        return Vector.floatsAreEqual(dotProduct, -1);
    }
    isPerpendicularTo(other) {
        if (this.isZeroVector() || other.isZeroVector()) {
            throw new Error("zero vector");
        }
        //@ts-expect-error
        const dotProduct = this.normalized().dotProduct(other.normalized());
        return Vector.floatsAreEqual(dotProduct, 0);
    }
    projectOn(other) {
        if (this.isZeroVector() || other.isZeroVector()) {
            throw new Error("zero vector");
        }
        const normalized = other.normalized();
        //@ts-expect-error
        return normalized.scaledBy(this.dotProduct(normalized));
    }
    withLength(newLength) {
        if (this.isZeroVector()) {
            throw new Error("zero vector");
        }
        //@ts-expect-error
        return this.normalized().scaledBy(newLength);
    }
    limited(newMagnitude) {
        if (this.isZeroVector()) {
            return this;
        }
        //@ts-expect-error
        return this.normalized().scaledBy(Math.min(newMagnitude, this.magnitude()));
    }
    equalTo({ components }) {
        return components.every((component, index) => Vector.floatsAreEqual(component, this.components[index]));
    }
    isZeroVector() { return this.components.every(item => item === 0); }
    static create2DAngleVector(angle, magnitude = 1) {
        if (magnitude < 0) {
            return Vector.create2DEqualAndOpposite(angle, Math.abs(magnitude));
        }
        return new Vector(Math.cos(angle) * magnitude, Math.sin(angle) * magnitude);
    }
    static create2DEqualAndOpposite(angle, magnitude = 1) {
        if (magnitude < 0) {
            return Vector.create2DAngleVector(angle, Math.abs(magnitude));
        }
        let newAngle = angle + Math.PI;
        return new Vector(Math.cos(newAngle) * magnitude, Math.sin(newAngle) * magnitude);
    }
    rotated2D(angle) {
        return Vector.rotated2D(this, angle);
    }
    static rotated2D(lhs, angle) {
        let l = lhs.length();
        let newAngle = lhs.angle2D() + angle;
        return Vector.create2DAngleVector(newAngle, l);
    }
    //Only set up for 2D vectors
    angle2D() { return Math.atan2(this.y, this.x); }
    flippedVAngle2D() { return Math.atan2(-this.y, this.x); }
    flippedHAngle2D() { return Math.atan2(this.y, -this.x); }
    perpendicularAngle2D() { return Math.atan2(this.x, -this.y); } //compare to angle + PI/2
    deflectedIn2D() { return Math.atan2(this.x / 2, -this.y); } //45?
    inverseAngle2D() { return Math.atan2(-this.x, -this.y); } //compare to angle + PI
    normal2D() { Vector.create2DAngleVector(this.perpendicularAngle2D(), this.magnitude()); }
    // ------------------------------------------------------------------------------------
    // 3D Only So Far
    // ------------------------------------------------------------------------------------
    crossProduct({ components }) {
        return new Vector(this.components[1] * components[2] - this.components[2] * components[1], this.components[2] * components[0] - this.components[0] * components[2], this.components[0] * components[1] - this.components[1] * components[0]);
    }
}
//MATH HELPERS
//how small of a difference do we care about when doing comparisons. 
Vector.EPSILON = 0.00000001;
Vector.floatsAreEqual = (lhs, rhs, epsilon = Vector.EPSILON) => Math.abs(lhs - rhs) < epsilon;
Vector.toDegrees = (radians) => (radians * 180) / Math.PI;
Vector.toRadians = (degrees) => (degrees * Math.PI) / 180;
Vector.randomF = (scalar = 1) => { return (Math.random() - 0.5) * 2 * scalar; };
Vector.randomInRange = (min, max) => { return Math.random() * (max - min) + min; };
Vector.scaledBy = (lhs, value) => {
    return new Vector(...lhs.components.map(component => component * value));
};
// ------------------------------------------------------------------------------------
//2D Only So Far
// ------------------------------------------------------------------------------------
Vector.zero2D = () => { return new Vector(0, 0); };
Vector.random2D = (scalar = 1) => { return new Vector(Vector.randomF(scalar), Vector.randomF(scalar)); };
