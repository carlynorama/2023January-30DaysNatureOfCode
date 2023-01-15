# Moving Repo To Use TypeScript & p5js

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

### ESLint
- https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- https://eslint.org/docs/latest/user-guide/getting-started
- https://typescript-eslint.io
- https://stackoverflow.com/questions/48087277/eslint-only-target-a-specific-directory-eslintrc-create-react-app


## Steps

* put all exisitng website files into a `./docs` dir. 
* add `node_modules` to .gitignore 
    *if forget can later `git rm -rf node_modules`, followed by `npm install` to refetch, `git check-ignore` if folder stays bright green in VSCode
* get in the right place to run commands on project directory 
    *(cntrl-backtick opens vscode terminal OR cd to the project directory) 
* `npm init`   //use defaults for everything 
* `npm install typescript --save-dev`  //installs local version that isn't need for run time. 
* change `package.json` to have the following block

                "scripts": {
                    "test": "echo \"Error: no test specified\" && exit 1",
                    "tsc": "tsc",
                    "tsc:w": "tsc --watch",
                    "http-server": "npx http-server ./docs -o"
                },

* `npm run tsc -- --init`  //starts up local tsc config. see `tscofig.json` below.
* `npm install p5 @types/p5` //installs p5 type defs maybe? perhaps _just_ the global file below would have been okay? 
    * no, you have to do at least `npm install @types/p5`, but you can leave off installing p5 if you're including it in docs folder by hand. 
* add `global.d.ts` to the src folder or other location included in the `tsconfig.json` 
* `npm run http-server` to confirm old files are still navigable.
* create a proof of concept sketch.ts (src/11-first-day-of-type-script/01)
* ran `npm run tsc` to generate a folder at the same location in docs, copied in the needed html files. 
* New files exist! 

* Note: I will be using the `src` folder as a staging area. Changing the name on the the subfolders will generate a new destination <code>docs</code>directory. That means the TypeScript might not be preserved in stages like the JavaScript, but I think that's okay

I temporarily installed ESLint before I realized that linter lives inside typescript as well? Those steps:
* `npm install --save-dev eslint`,  //On next install see if can just do second line?
* `npm init @eslint/config`
* add `"ignorePatterns": ['/*', '!/src'],` to `.eslintrc.js` (could be .json, .yml, etc.) so it will only look at the src folder. There are other, better?, ways. See link in resources.  
* Ended up adding `"eslint.enable": false,` to `.vscode/settings.json` because it got to be a little much. 
* ended up nuking modules and reinstalling with eslint removed.  (`rm -rf node_modules`, followed by `npm install` to refetch. ) 


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
        "include": ["global","src/todays/location/folder"]
    }


## global.d.ts

        // This file will add both p5 instanced and global intellisence
        //https://github.com/Gaweph/p5-typescript-starter/blob/master/global.d.ts 
        import * as p5Global from 'p5/global' 
        import module = require('p5');
        export = module;
        export as namespace p5;


## package.json Scripts

Nice set to get started. 
* tes -  tests placehode
* tsc - runs typescript once
* tsc:w - keeps typescript running
* http-server - Points webserver at docs page.  -o opens the page. `npx http-server --help` to learn more. 

        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "tsc": "tsc",
            "tsc:w": "tsc --watch",
            "http-server": "npx http-server ./docs -o"
        },

### Other Scripts

Add an auto reloading browser window in repo: 
* `npm install --save-dev browser-sync`
* https://browsersync.io

  "scripts": {
    "start-run": "browser-sync start --server -w"
  },
  "devDependencies": {
    "browser-sync": "^2.26.12",
  }



## Installing Modules Needed For Sketch 

Using npm means that the packages by default assume that they will run in a node.js enviromment. If the module writer has not already provided a web-target, you may have to download and recomplile the module. This mess is why people use things like Webpack. 

See this example: https://github.com/carlynorama/open-simplex-noise-for-web-js

### Step one - try for easy.

    npm install --save module-name
    npm install --save @types/module-name  //<- may not be necessary if module writer included them.

* TRY 
    * going to the  node_modules folder and copy the `.js` files into a folder in `addons`, then add the module's root file like: `<script type="module" src="../../addons/open-simplex-noise/mod.js"></script>` 
    * Call it directly from a cdn like `<script src="https://cdn.jsdelivr.net/npm/open-simplex-noise@2.5.0/lib/mod.min.js"></script>`
    * If they included a "Univeral" version: `https://unpkg.com/:package@:version/` so going to `https://unpkg.com/open-simplex-noise/` will give `https://unpkg.com/browse/open-simplex-noise@2.5.0/`

### If TypeScript, clone the repo and recompile

* https://blog.rendall.dev/posts/2019/1/14/problem-typescript-adds-objectdefinepropertyexports-esmodule-value-true/
* https://medium.com/@salathielgenese/setup-typescript-for-modern-browser-a75d699673f6
    * https://github.com/SalathielGenese/ts-web 
* https://blog.rendall.dev/posts/2019/1/14/problem-typescript-adds-objectdefinepropertyexports-esmodule-value-true/

    "compilerOptions": {
        "moduleResolution": "node", 
        "module": "ES2020",
        "moduleResolution": "node", //may make the next line unnecessary?   
        "lib": ["DOM","ES2020"]     // might not be necessary.
    }

### Misc other module info

* https://www.digitalocean.com/community/tutorials/how-to-use-modules-in-typescript
* https://tutorial.tips/how-to-load-any-npm-module-in-browser/
