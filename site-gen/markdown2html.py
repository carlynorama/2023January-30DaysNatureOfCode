#!/usr/bin/env python3

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
