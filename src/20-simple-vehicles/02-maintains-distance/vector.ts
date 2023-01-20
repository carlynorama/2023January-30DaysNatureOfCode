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
    components: number[]
    constructor(...components: number[]) {
      this.components = components
    }

    static createAngleVector(angle:number, magnitude = 1):Vector {
        if (magnitude < 0) { return Vector.createEqualAndOpposite(angle, Math.abs(magnitude)) }
        return new Vector(Math.cos(angle)* magnitude, Math.sin(angle)*magnitude);
    }

    static createEqualAndOpposite(angle:number, magnitude = 1):Vector {
      if (magnitude < 0) { return Vector.createAngleVector(angle, Math.abs(magnitude)) }
      let newAngle = angle + Math.PI
      return new Vector(Math.cos(newAngle)* magnitude, Math.sin(newAngle)*magnitude);
  }

    get x():number { return this.components[0] }  //i-hat
    get y():number { return this.components[1] }  //j-hat
    get z():number { return this.components[2] }  //k-hat

    copy() { return new Vector(...this.components) }

    //MATH HELPERS
    //how small of a difference do we care about when doing comparisons. 
    static EPSILON = 0.00000001 
    static floatsAreEqual = (lhs:number, rhs:number, epsilon = Vector.EPSILON) =>
  Math.abs(lhs - rhs) < epsilon
    static toDegrees = (radians: number ) => (radians * 180) / Math.PI
    static toRadians = (degrees: number) => (degrees * Math.PI) / 180
    static randomF = (scalar = 1) => { return (Math.random() - 0.5) * 2 * scalar }
    static randomInRange = (min:number, max:number) => { return Math.random() * (max - min) + min; } 


    static zero2D = () => {return new Vector(0,0);}
    static random2D = (scalar = 1) => { return new Vector(Vector.randomF(scalar), Vector.randomF(scalar));}
  
    //add({ components }) //TypeScript had trouble with this?
    //ahhh this is the fix dotProduct({ components } : { components: number[] })
    //https://bobbyhadz.com/blog/typescript-binding-element-implicitly-has-an-any-type
    addedValues(...values: number[]) {
      return new Vector(
        ...values.map((component, index) => this.components[index] + component)
      )
    }

    added(other: { components: number[] }) {
        return new Vector(
          ...other.components.map((component, index) => this.components[index] + component)
        )
      }
    
    static added(lhs: { components: number[] }, rhs:{ components: number[] }) {
        return new Vector(
            ...rhs.components.map((component, index) => lhs.components[index] + component)
          )
    }
    // add(...otherValues: number[]) {
    //     const oa = otherValues;
    //     if (this.values.length === oa.length) {
    //       let result: number[] = [];
    //       for(let key in this.values) {
    //         result[key] = this.values[key] + oa[key]
    //       }
    //       return new Vector(...result)
    //     }
    //   }

    subtractedValues(...values: number[]) {
      return new Vector(
        ...values.map((component, index) => this.components[index] - component)
      )
    }
    subtracted(other: { components: number[] }) {
        return new Vector(
          ...other.components.map((component, index) => this.components[index] - component)
        )
      }
    static subtracted(lhs: { components: number[] }, rhs:{ components: number[] }) {
        return new Vector(
            ...rhs.components.map((component, index) => lhs.components[index] - component)
          )
    }

    scaledBy = (value:number) => {
        return new Vector(
          ...this.components.map(component => component * value)
        )
    }
    static scaledBy = (lhs: { components: number[] }, value:number) => {
        return new Vector(
            ...lhs.components.map(component => component * value)
          )
    }
    

    normalized() { return this.scaledBy(1 / this.length()) }
    negated() { return this.scaledBy(-1) }

    length() { return Math.hypot(...this.components) }
    magnitude() { return Math.hypot(...this.components) }

    //Same as dot*product with self.
    //https://textbooks.math.gatech.edu/ila/dot-product.html
    magnitudeSquared() { 
        return this.components.reduce(function(sumSq, value) { return sumSq + (value**2); }, 0);
    }

    rotated(angle:number):Vector {
        return Vector.rotated(this, angle);
    }

    static rotated(lhs:Vector, angle:number):Vector {
        let l = lhs.length();
        let newAngle =  lhs.angle() + angle;
        return Vector.createAngleVector(newAngle,l);
    }

    inverted() {
      return this.scaledBy(-1);
    }

    //Only set up for 2D vectors
    angle() { return Math.atan2(this.y, this.x); }
    flippedVAngle() { return Math.atan2(-this.y, this.x); }
    flippedHAngle() { return Math.atan2(this.y, -this.x); }
    perpendicularAngle() { return Math.atan2(this.x, -this.y); } //compare to angle + PI/2
    deflectedIn() { return Math.atan2(this.x/2, -this.y); } //45?
    inverseAngle() { return Math.atan2(-this.x, -this.y); }   //compare to angle + PI

  
  //The dot product between two vectors is the sum of the products of corresponding components.
    //citation: https://radzion.com/blog/linear-algebra/vectors
    dotProduct({ components } : { components: number[] }) {
        return components.reduce((acc, component, index) => acc + component * this.components[index], 0)
    }
    //magnitude is the sqrt of the dotProduct with itself.
    distanceTo(other:Vector):number {
      // || other - this ||
       return Vector.subtracted(other, this).magnitude()
     }

     magSquaredTo(other:Vector):number {
      // || other - this ||
       return Vector.subtracted(other, this).magnitudeSquared()
     }

    // SAME! 
    // distanceTo(other:Vector):number {
    //  // || other - this ||
    //   let first = Vector.subtracted(other, this)
    //    let next = first.dotProduct(first)
    //    return Math.sqrt(next);
    //    //same as first.magnitude?
    // }

    //If we take the dot product of two normalized vectors and the result is equal to one it means that they have the same direction. 
    //To compare two float numbers, we will use the areEqual function.
    //citation: https://radzion.com/blog/linear-algebra/vectors
    hasSameDirectionWith(other:Vector) {
        const dotProduct = this.normalized().dotProduct(other.normalized())
        return Vector.floatsAreEqual(dotProduct, 1)
    }

    hasOppositeDirectionTo(other:Vector) {
        const dotProduct = this.normalized().dotProduct(other.normalized())
        return Vector.floatsAreEqual(dotProduct, -1)
    }

    isPerpendicularTo(other:Vector) {
        const dotProduct = this.normalized().dotProduct(other.normalized())
        return Vector.floatsAreEqual(dotProduct, 0)
    }

// 3D vectors only
  crossProduct({ components } : { components: number[] }) {
    return new Vector(
      this.components[1] * components[2] - this.components[2] * components[1],
      this.components[2] * components[0] - this.components[0] * components[2],
      this.components[0] * components[1] - this.components[1] * components[0]
    )
  }

  angleBetween(other:Vector) {
    return Vector.toDegrees(Math.acos(this.dotProduct(other) / (this.length() * other.length())))
  }

  projectOn(other:Vector) {
    const normalized = other.normalized()
    return normalized.scaledBy(this.dotProduct(normalized))
  }

  withLength(newLength:number) {
    return this.normalized().scaledBy(newLength)
  }

  limited(newMagnitude:number) {
    return this.normalized().scaledBy(Math.min(newMagnitude, this.magnitude()))
  }

  equalTo({ components } : { components: number[] }) {
    return components.every((component, index) => Vector.floatsAreEqual(component, this.components[index]))
  }



  }
