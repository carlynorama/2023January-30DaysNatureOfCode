# 2023 January Project

There is an official [Genuary](https://genuary.art) process that involves lots of really cool prompts, etc, but I'm too rusty. What better way to get back into the creative coding groove than follow along with Daniel Shiffman's Nature of Code 2 playlist? 

- Nature of Code 2 Playlist: <https://www.youtube.com/playlist?list=PLRqwX-V7Uu6ZV4yEcW3uDwOgGXKUUsPOM>
- NoC 1: <https://natureofcode.com/>

One way to do this would be the use the fabulous editors:
- <https://p5js.org>
- <https://openprocessing.org/>

The meat of much of this code already lives there in Coding Train accounts.

- <https://editor.p5js.org/codingtrain/>

## Misc Other Resources
- <https://www.youtube.com/@TheCodingTrain>
- <https://thecodingtrain.com>
- <https://shiffman.net/>
- <https://github.com/nature-of-code> <- includes syllabus for course taught at NYU/ITP


## What is going on in this repo? 

p5js is web embeddable focused, so why not build this as a website? Originally I served this website from the root of the main branch. I'd `cd` into the the directory that has this repo, type `python3 -m http.server` and browse away. Nice side effect, it was immediate available as a website.

* <https://carlynorama.github.io/2023January-30DaysOfNatureOfCode/>

Over the past weeks I really really really was missing working in a strongly typed language so I decided to migrate to TypeScript. The bulk of the files now live in the docs folder, with JUST the `.ts` files living in the `src` folder. 

[Steps I took to convert the repo](moving-to-typescript.md).

