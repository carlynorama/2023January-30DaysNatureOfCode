// This file will add both p5 instanced and global intellisence
//https://github.com/Gaweph/p5-typescript-starter/blob/master/global.d.ts 
import * as p5Global from 'p5/global' 
import module = require('p5');
export = module;
export as namespace p5;