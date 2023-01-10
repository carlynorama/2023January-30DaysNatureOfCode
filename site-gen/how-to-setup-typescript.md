# How To Set Up Repo To Use TypeScript & p5js

## Resources

### TypeScript
- https://www.youtube.com/watch?v=vtpM7ght-7s Microsoft 365 Developer | TypeScript Core Concepts - Adding TypeScript to a VS Code project
- https://code.visualstudio.com/Docs/languages/typescript
- https://learn.microsoft.com/en-us/training/paths/build-javascript-applications-typescript/
- https://github.com/DanWahlin/Getting-Started-With-TypeScript
- https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
- https://www.youtube.com/watch?v=Y4IiQY9dNRA The Net Ninja | TypeScript Tutorial #7 - Better Workflow & tsconfig

### TypeScript + p5js
- https://github.com/Gaweph/p5-typescript-starter
- https://stackoverflow.com/questions/63195453/how-can-i-import-p5-js-into-typescript 


## Steps

* (cntrl-backtick, the key press, opens vscode terminal OR cd to the project directory)  
* `npn init`   //use defaults for everything
* `npm install typescript --save-dev`  //installs local version that isn't need for run time. 
* change `package.json` to have the following block

                "scripts": {
                    "test": "echo \"Error: no test specified\" && exit 1",
                    "tsc": "tsc",
                    "tsc:w": "tsc --watch",
                    "http-server": "npx http-server ./ -o"
                },

* `npm run tsc -- --init`  //starts up local tsc config see below 
* `npm install p5 @types/p5` //installs p5 type defs maybe? perhaps _just_ the global file below would have been okay? 
* add `global.d.ts` to the src folder. //Will not be seen in root with the config set the way I have it. 


## tsconfig.json

    {
        "compilerOptions": {
            /* Visit https://aka.ms/tsconfig to read more about this file */

            /* Projects */
            "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */

            /* Language and Environment */
            "target": "es2017",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */


            /* Modules */
            "module": "ES2020",                                /* Specify what module code is generated. */
            "rootDir": "./src",                                  /* Specify the root folder within your source files. */

            /* Emit */
            "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
            "outDir": "./docs",                                   /* Specify an output folder for all emitted files. */
            "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
            "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

            /* Type Checking */
            "strict": true,                                      /* Enable all strict type-checking options. */
        },
        "include": ["src"]
    }


## global.d.ts

        // This file will add both p5 instanced and global intellisence
        //https://github.com/Gaweph/p5-typescript-starter/blob/master/global.d.ts 
        import * as p5Global from 'p5/global' 
        import module = require('p5');
        export = module;
        export as namespace p5;

