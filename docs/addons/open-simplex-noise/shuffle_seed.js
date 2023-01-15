//https://github.com/joshforisha/open-simplex-noise-js
export default function shuffleSeed(seed) {
    const newSeed = new Uint32Array(1);
    newSeed[0] = seed[0] * 1664525 + 1013904223;
    return newSeed;
}
