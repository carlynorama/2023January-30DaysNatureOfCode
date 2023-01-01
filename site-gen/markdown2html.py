#!/usr/bin/env python3

#https://www.digitalocean.com/community/tutorials/how-to-use-python-markdown-to-convert-markdown-text-to-html
# python --version     <-- if not 3 add the three
# python3 --version
# python3 -m pip --version
# python3 -m pip install markdown

import markdown
import sys

def convert(mdFileInput, htmlFileOutput):
    markdown.markdownFromFile(input=mdFileInput, output=htmlFileOutput)

if __name__ == "__main__":
    if len(sys.argv) == 3:
        mdFileInput = sys.argv[1]
        htmlFileOutput = sys.argv[2]
    if len(sys.argv) == 2:
        fileNameRoot = sys.argv[1]
        mdFileInput = fileNameRoot + ".md"
        htmlFileOutput = fileNameRoot + ".html"
    else:
        mdFileInput = input ("Source file: ")
        htmlFileOutput = input ("Destination file: ")
    convert(mdFileInput, htmlFileOutput)
