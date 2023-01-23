//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// vector.ts
// adapted by calynorama 2023 Jan 12 from 
// https://radzion.com/blog/linear-algebra/vectors
// breaking changes 2023 Jan 22

// Resources
// - https://radzion.com/blog/linear-algebra/vectors
// - https://www.robinwieruch.de/linear-algebra-matrix-javascript/
// - https://textbooks.math.gatech.edu/ila/dot-product.html
// - https://www.khanacademy.org/math/linear-algebra/matrix-transformations/lin-trans-examples/v/introduction-to-projections
// -

class Vector {
  components: number[]
  constructor(...components: number[]) {
    this.components = components
  }

  get x(): number { return this.components[0] }  //i-hat
  get y(): number { return this.components[1] }  //j-hat
  get z(): number { return this.components[2] }  //k-hat

  copy() { return new Vector(...this.components) }

  //MATH HELPERS
  //how small of a difference do we care about when doing comparisons. 
  static EPSILON = 0.00000001
  static floatsAreEqual = (lhs: number, rhs: number, epsilon = Vector.EPSILON) =>
    Math.abs(lhs - rhs) < epsilon
  static toDegrees = (radians: number) => (radians * 180) / Math.PI
  static toRadians = (degrees: number) => (degrees * Math.PI) / 180
  static randomF = (scalar = 1) => { return (Math.random() - 0.5) * 2 * scalar }
  static randomInRange = (min: number, max: number) => { return Math.random() * (max - min) + min; }



  //add({ components }) //TypeScript had trouble with this?
  //ahhh this is the fix dotProduct({ components } : { components: number[] })
  //https://bobbyhadz.com/blog/typescript-binding-element-implicitly-has-an-any-type
  addedValues(...values: number[]) {
    return new Vector(
      ...values.map((component, index) => this.components[index] + component)
    )
  }

  addedTo(other: { components: number[] }) {
    return new Vector(
      ...other.components.map((component, index) => this.components[index] + component)
    )
  }

  static addedTo(lhs: { components: number[] }, rhs: { components: number[] }) {
    return new Vector(
      ...rhs.components.map((component, index) => lhs.components[index] + component)
    )
  }

  subtractingValues(...values: number[]) {
    return new Vector(
      ...values.map((component, index) => this.components[index] - component)
    )
  }

  subtracting(other: { components: number[] }) {
    return new Vector(
      ...other.components.map((component, index) => this.components[index] - component)
    )
  }
  static subtracting(lhs: { components: number[] }, rhs: { components: number[] }) {
    return new Vector(
      ...rhs.components.map((component, index) => lhs.components[index] - component)
    )
  }

  scaledBy = (value: number) => {
    return new Vector(
      ...this.components.map(component => component * value)
    )
  }
  static scaledBy = (lhs: { components: number[] }, value: number) => {
    return new Vector(
      ...lhs.components.map(component => component * value)
    )
  }


  normalized(): Vector | undefined { return this.scaledBy(1 / this.length()) }

  negated(): Vector { return this.scaledBy(-1) }
  inverted() { return this.scaledBy(-1); }

  length() { return Math.hypot(...this.components) }
  magnitude() { return Math.hypot(...this.components) }

  //Same as dot*product with self.
  //https://textbooks.math.gatech.edu/ila/dot-product.html
  magnitudeSquared() {
    return this.components.reduce(function (sumSq, value) { return sumSq + (value ** 2); }, 0);
  }
  //
  //The dot product between two vectors is the sum of the products of corresponding components.
  //citation: https://radzion.com/blog/linear-algebra/vectors
  dotProduct({ components }: { components: number[] }) {
    return components.reduce((accumulator, component, index) => accumulator + component * this.components[index], 0)
  }
  //magnitude is the sqrt of the dotProduct with itself.
  distanceTo(other: Vector): number {
    // || other - this ||
    return Vector.subtracting(other, this).magnitude()
  }
  // SAME! 
  // distanceTo(other:Vector):number {
  //  // || other - this ||
  //   let next = Vector.subtract(other, this).dotProduct(Vector.subtract(other, this))
  //   return Math.sqrt(next);
  // }

  magSquaredTo(other: Vector): number {
    // || other - this ||
    return Vector.subtracting(other, this).magnitudeSquared()
  }

  //Why does this come back in degrees? 
  angleBetween(other: Vector) {
    return (Math.acos(this.dotProduct(other) / (this.length() * other.length())))
  }

  angleToAxis(axis: number) {
    if (this.isZeroVector()) { throw new Error("zero vector") }
    //@ts-expect-error
    return Vector.makeAxisVector(this, axis).angleBetween2(this.normalized());
    //return this.normalized().angleBetween(Vector.makeAxisVector(this, axis));
  }

  directionalAngleToAxis(angleAxis: number, directionAxis:number) {
    if (this.isZeroVector()) { throw new Error("zero vector") }
    
    const aAxisVector =  Vector.makeAxisVector(this, angleAxis);
    const dAxisVector = Vector.makeAxisVector(this, directionAxis);
    //@ts-expect-error
    let angle = aAxisVector.angleBetween(this.normalized());
    const isNegative = (dAxisVector.dotProduct(this)) < 0;
    if (isNegative) { angle *= -1 }
    return angle
  }
  //x axis is 0
  static makeAxisVector(base: Vector, axis: number): Vector {
    let components: number[] = Array(base.components.length).fill(0);
    components[axis] = 1;
    return new Vector(...components);
  }


  //If we take the dot product of two normalized vectors and the result is equal to one it means that they have the same direction. 
  //To compare two float numbers, we will use the areEqual function.
  //citation: https://radzion.com/blog/linear-algebra/vectors
  hasSameDirectionWith(other: Vector): boolean | undefined {
    if (this.isZeroVector() || other.isZeroVector()) { throw new Error("zero vector") }
    //@ts-expect-error
    const dotProduct = this.normalized().dotProduct(other.normalized())
    return Vector.floatsAreEqual(dotProduct, 1)
  }

  hasOppositeDirectionTo(other: Vector): boolean | undefined {
    if (this.isZeroVector() || other.isZeroVector()) { throw new Error("zero vector") }
    //@ts-expect-error
    const dotProduct = this.normalized().dotProduct(other.normalized())
    return Vector.floatsAreEqual(dotProduct, -1)
  }

  isPerpendicularTo(other: Vector): boolean | undefined {
    if (this.isZeroVector() || other.isZeroVector()) { throw new Error("zero vector") }
    //@ts-expect-error
    const dotProduct = this.normalized().dotProduct(other.normalized())
    return Vector.floatsAreEqual(dotProduct, 0)
  }


  projectOn(other: Vector) {
    if (this.isZeroVector() || other.isZeroVector()) { throw new Error("zero vector") }
    const normalized = other.normalized()
    //@ts-expect-error
    return normalized.scaledBy(this.dotProduct(normalized))
  }

  withLength(newLength: number) {
    if (this.isZeroVector()) { throw new Error("zero vector") }
    //@ts-expect-error
    return this.normalized().scaledBy(newLength)
  }

  limited(newMagnitude: number) {
    if (this.isZeroVector()) { return this }
    //@ts-expect-error
    return this.normalized().scaledBy(Math.min(newMagnitude, this.magnitude()));
  }

  equalTo({ components }: { components: number[] }) {
    return components.every((component, index) => Vector.floatsAreEqual(component, this.components[index]))
  }

  isZeroVector(): boolean { return this.components.every(item => item === 0); }


  // ------------------------------------------------------------------------------------
  //2D Only So Far
  // ------------------------------------------------------------------------------------

  static zero2D = () => { return new Vector(0, 0); }
  static random2D = (scalar = 1) => { return new Vector(Vector.randomF(scalar), Vector.randomF(scalar)); }


  static create2DAngleVector(angle: number, magnitude = 1): Vector {
    if (magnitude < 0) { return Vector.create2DEqualAndOpposite(angle, Math.abs(magnitude)) }
    return new Vector(Math.cos(angle) * magnitude, Math.sin(angle) * magnitude);
  }

  static create2DEqualAndOpposite(angle: number, magnitude = 1): Vector {
    if (magnitude < 0) { return Vector.create2DAngleVector(angle, Math.abs(magnitude)) }
    let newAngle = angle + Math.PI
    return new Vector(Math.cos(newAngle) * magnitude, Math.sin(newAngle) * magnitude);
  }

  rotated2D(angle: number): Vector {
    return Vector.rotated2D(this, angle);
  }

  static rotated2D(lhs: Vector, angle: number): Vector {
    let l = lhs.length();
    let newAngle = lhs.angle2D() + angle;
    return Vector.create2DAngleVector(newAngle, l);
  }

  //Only set up for 2D vectors
  //The Math.atan2() static method returns the angle in the plane (in radians) between the positive x-axis and the ray from (0, 0) to the point (x, y), for Math.atan2(y, x).
  angle2D() { return Math.atan2(this.y, this.x); }
  flippedVAngle2D() { return Math.atan2(-this.y, this.x); }
  flippedHAngle2D() { return Math.atan2(this.y, -this.x); }
  perpendicularAngle2D() { return Math.atan2(this.x, -this.y); } //compare to angle + PI/2
  deflectedIn2D() { return Math.atan2(this.x / 2, -this.y); } //45?
  inverseAngle2D() { return Math.atan2(-this.x, -this.y); }   //compare to angle + PI
  normal2D() { Vector.create2DAngleVector(this.perpendicularAngle2D(), this.magnitude()) }


  // ------------------------------------------------------------------------------------
  // 3D Only So Far
  // ------------------------------------------------------------------------------------


  crossProduct({ components }: { components: number[] }) {
    return new Vector(
      this.components[1] * components[2] - this.components[2] * components[1],
      this.components[2] * components[0] - this.components[0] * components[2],
      this.components[0] * components[1] - this.components[1] * components[0]
    )
  }



}
