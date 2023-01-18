#!/usr/bin/env python3

import generate_sketch_embed
import generate_sketch_index
import datetime
import sys

if __name__ == "__main__":
    if len(sys.argv) == 3:
        day_num = sys.argv[1]
        directory = sys.argv[2]
    elif len(sys.argv) == 2:
        directory = sys.argv[1]
        day_num = datetime.datetime.now().strftime("%d")
    else:
        directory = input ("Directory to Scan: ")
        day_num = datetime.datetime.now().strftime("%d")
    
    generate_sketch_embed.create_from_directory(directory)
    generate_sketch_index.create_from_directory(day_num,directory)
    