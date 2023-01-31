# 2023 January Project

REPO WEBSITE: <https://carlynorama.github.io/2023January-30DaysNatureOfCode/>

There is an official [Genuary](https://genuary.art) process that involves lots of really cool prompts, etc, but I'm too rusty. What better way to get back into the creative coding groove than follow along with Daniel Shiffman's Nature of Code 2 playlist? 

- Nature of Code 2 Playlist: <https://www.youtube.com/playlist?list=PLRqwX-V7Uu6ZV4yEcW3uDwOgGXKUUsPOM>
- NoC 1: <https://natureofcode.com/>
- <https://editor.p5js.org/codingtrain/>
- <https://www.youtube.com/@TheCodingTrain>
- <https://thecodingtrain.com>
- <https://shiffman.net/>
- <https://github.com/nature-of-code> <- includes syllabus for course taught at NYU/ITP

Other resources are listed on the individual day pages. 

## Take-Aways from the Process

JavaScript remains the lingua franca of the web-front-end, and therefore the most sharable of the languages to do creative coding in. That I really value, so it was worth it to flex those muscles again. 

The limited time frame of a 30 day binge format helped convince me to do this because I don't enjoy JavaScript. TypeScript gave JavaScript some complier like "guard rails", as they say, and that helped me a lot. However that added significant overhead to the setup, so my drop-dead simple little repo now has `node.js` all up in it.  Trade-offs. `¯\_(ツ)_/¯`

A 30 day binge doesn't really give breathing room to the concepts. It's just enough to get a tweak on the examples working but not much further. Would recommend a week at least per chapter as per the course syllabus. 

- Favorite Nature of Code things: using noise to create motion, the quadtree, boids. 
- Favorite Meta: The little static site generator, getting a TypeScript workflow up and running, having a coding journal. 

## About this Repo / Using P5js

Under most circumstances, don't follow my example. Instead use the fabulous online editors:

- <https://editor.p5js.org>
- <https://openprocessing.org/>

That said, I prefer to have my tool chains be functional offline so I made a repo. Originally the whole repo was only what is now in the `docs` folder. On my computer I'd `cd` into the the directory that had the repo, type `python3 -m http.server` and browse away. Since it already was a website, I enabled git-hub pages.

* <https://carlynorama.github.io/2023January-30DaysNatureOfCode/>


### TypeScript

In the beginning weeks (wow, did I say weeks, it was really 10 days & a Quadtree) I really really really was missing working in a strongly typed language so I decided to migrate to TypeScript. The bulk of the files now live in the docs folder, with JUST the `.ts` files living in the `src` folder.

[Steps I took to convert the repo](moving-to-typescript.md).

To avoid typescript complaining about redeclarations of `draw`, `sketch`, etc. my current process is that every time I start a new sketch I point the `include` line at the end of `.tsconfig` to that sketch e.g. 

`"include": ["global","src/28-genetic-algorithms/03-novelty-score"]`

### site-gen (python)
Making the HTML files for every sketch and and every day was getting kind of irritating, so I wrote a small static site generator. 

It has its own repo [small-ssg](https://github.com/carlynorama/small-ssg)

## Full Day List

1. [01-introduction](docs/01-introduction): Introduction, Randomness, Videos 1-9, 16. Summary page has all the sketches from the day running. It can pull a lot of power.
2. [02-vectors](docs/02-vectors): Chapter 1, p5js Vectors, Videos 10-15. On the summary page the sketches only run if the mouse is over it. That is also true on the sketch pages, excpet on the last day I figured out how to tell if it was embedded or not.
3. [03-forces](docs/03-forces): Part 1 of Chapter 2, force basics, Videos 17-19
4. [04-forces](docs/04-forces): Part 2 of Chapter 2, Drag & Gravity, Videos 20-22
5. [05-quadtree](docs/05-quadtree): QuadTree interlude. Mentioned in video 22. From a Coding Challenge.
6. [06-quadtree-and-bounds](docs/06-quadtree-and-bounds): QuadTree clean up, with motion in the demo now. Also some bounds prep to keep going.
7. [07-quadtree-query](docs/07-quadtree-query): QuadTree bounds query success!
8. [08-quadtree-point-query](docs/08-quadtree-point-query): QuadTree query whether a point value is in the quadtree, access all the values within a radius of a point.
9. [09-quadtree-update](docs/09-quadtree-update): Can remove points and regions of points from a quadtree.
10. [10-quadtree-additional-data](docs/10-quadtree-additional-data): Made it to Video 3 look-alike. Found a glitch when I tried to add mover. Last stop on this line for now!
11. [11-first-day-of-typescript](docs/11-first-day-of-typescript): In case I ever take on something like a quadtree again, repo now has a TypeScript staging area. Also a little bit from the Chapter 3 videos.
12. [12-circular-motion](docs/12-circular-motion): Continue with the circular motion studies (first part Ch. 3) combining TypeScript, blobby, a new PolarMover object.
13. [13-more-noise-loops](docs/13-more-noise-loops): More with NoiseLoops, but now making them "recordable"
14. [14-outside-noise](docs/14-outside-noise): Lots of TypeScript meta today to get an outside library for OpenSimplex noise working.
15. [15-oscillation](docs/15-oscillation): Oscillation from Chapter 3 videos 5, 6 and 7
16. [16-swing-time](docs/16-swing-time): Pendulums via Chapter 3 section's reference to Coding Challenge #159
17. [17-springs](docs/17-springs): Simple spring systems referencing Coding Challenge #160
18. [18-simple-particle-system](docs/18-simple-particle-system): Starting Chapter 4 with some simple particle system work, and also some website meta. Check out the new files in `site-gen`
19. [19-recordable-particles](docs/19-recordable-particles): Wrapping up Chapter 4 with refactored particle. Also some improvements to `controller.ts`
20. [20-simple-vehicles](docs/20-simple-vehicles): Start Chapter 5, Autonomous Agents
21. [21-wanderer](docs/21-wanderer): The Wanderer
22. [22-scalar-projection](docs/22-scalar-projection): Scalar projection visualization and some Vector class refactoring. Breaking changes.
23. [23-path-following](docs/23-path-following): Path following and hue table and triangle bounds detection, Oh my!
24. [24-cellular-automata](docs/24-cellular-automata): No more videos in the Nature of Code 2 playlist, start Chapter 7 anyway following V1.
25. [25-intro-fractals](docs/25-intro-fractals): Part one of Chapter 8, basic recursion and start of fractals. Mostly just copying the processing -> p5js / TypeScript.
26. [26-branching-fractals](docs/26-branching-fractals): Simple Trees and an L-System
27. [27-selection](docs/27-selection): Before going elbow deep into chapter 9, understanding Rejection Sampling.
28. [28-genetic-algorithms](docs/28-genetic-algorithms): Getting the "To be or not to be." example working, trying to add a "novelty bonus."
29. [29-no-code-day](docs/29-no-code-day): No coding for me today, but lots of sleeping and watching. Links provided.
30. Days 30 & 31: More sleep and repo clean up. 

## Reusable TypeScript Classes

	- [controller.ts](src/reusable/controller.ts)
	- [datatypes.ts](src/reusable/datatypes.ts)
	- [emitter_simple.ts](src/reusable/emitter_simple.ts)
	- [follower.ts](src/reusable/follower.ts)
	- [mover.ts](src/reusable/mover.ts)
	- [noiseloop.ts](src/reusable/noiseloop.ts)
	- [noisemaker.ts](src/reusable/noisemaker.ts)
	- [particle-template.ts](src/reusable/particle-template.ts)
	- [particle_simple.ts](src/reusable/particle_simple.ts)
	- [particle_with_lifespan.ts](src/reusable/particle_with_lifespan.ts)
	- [path.ts](src/reusable/path.ts)
	- [pendulum.ts](src/reusable/pendulum.ts)
	- [polarmover.ts](src/reusable/polarmover.ts)
	- [spring_simple.ts](src/reusable/spring_simple.ts)
	- [tpmover.ts](src/reusable/tpmover.ts)
	- [vector.ts](src/reusable/vector.ts)
	- [vehicle.ts](src/reusable/vehicle.ts)