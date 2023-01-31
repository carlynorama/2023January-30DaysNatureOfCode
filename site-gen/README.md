# Small Site Generator

Pulled out the site generator for my [p5js journal](https://carlynorama.github.io/2023January-30DaysNatureOfCode/) project.

Basic HTML file creation from directory structure and markdown. 

## Usage

- `python3 make_sketch_html.py $DAY_NUM $RELATIVE_DIRECTORY_LOCATION` - will produce an embed file and an html file for the sketch in that folder. 
    - Uses a hardcoded location for p5js and css.
    - Overwrites any existing index.html or embed.html files.

- `python3 make_all_for_day.py $DAY_NUM $RELATIVE_DIRECTORY_LOCATION` 

- Scripts assume that the valid date is in the same month, but may not be `today`, hence the `$DAY_NUM` variable, which can be left out to use the current date.  

- Template html files use the `${variable_name}` syntax provided by built in python [Template Strings](https://docs.python.org/3/library/string.html#template-strings). In VSCode the extension `"fabiospampinato.vscode-highlight"` provides highlighting (see `.vscode/settings.json`).

- NOTE: There are a lot of inefficiencies in this code, prioritizing modularity. The purpose is to make one day at a time and leave the earlier pages in their time capsule. 

## Resources

* https://www.digitalocean.com/community/tutorials/
* how-to-use-python-markdown-to-convert-markdown-text-to-html

* https://www.devdungeon.com/content/convert-markdown-html-python
* https://dev.to/nqcm/making-a-static-site-generator-with-python-part-1-3kn3
* https://rahmonov.me/posts/static-site-generator/

* https://docs.python.org/3/library/string.html
* https://docs.python.org/3/library/string.html#format-string-syntax
* https://docs.python.org/3/library/string.html#template-strings

* https://stackoverflow.com/questions/34360603/python-template-safe-substitution-with-the-custom-double-braces-format
* https://stackabuse.com/formatting-strings-with-the-python-template-class/

