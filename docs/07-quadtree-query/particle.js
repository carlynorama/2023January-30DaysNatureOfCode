// class Particle {
//   constructor(point, c) {
//     this.position = point;
//     this.diameter = 10;
//     this.color_start = c;
//     this.color_tmp = c;
//   }

//   render() {
//     fill(this.color_tmp);
//     //stroke(153);
//     noStroke();
//     ellipseMode(CENTER);
//     ellipse(this.position.x, this.position.y, this.diameter/2);
//   }
// }


// class ParticleSet {
// 	constructor(set) {
// 		this.particles = new Set(set)
// 	}
// 	particles = [];
// }

// function generateParticleSet(qty, w, h) {
//   let particles = [];
//   let particleStrings = ["<pre>let particles = [\n\t"];
// 	for (let i = 0; i < qty; i++) {
// 		let x = randomGaussian(w / 2, w / 8);
// 		let y = randomGaussian(h / 2, h / 8);
// 		let p = new Point(x, y);
// 		particles[i] = new Particle(x, y, 0, 0, 3, color(204, 50));
// 		let particle = particles[i];
// 		let thisParticle = `new Mover(${particle.position.x},${particle.position.y}, color(204, 50)),\n\t`
// 		particleStrings.push(thisMover)
//   }
//   //remove ',\n\t' from last item in array?
//   particleStrings.push("]</pre>")
//   //why doesn't this output white space?
//   createP(particleStrings.join('')).addClass('code');
//   return particles
// }

// function loadParticleSet() {
//   return [
// 	//... some print out here. 
//   	]
//   }
