#!/usr/bin/env python3

import generate_sketch_embed
import generate_sketch_index
import generate_sketch_lists
import generate_day_index
import datetime
import sys

def per_sketch(day_num, directory, sketch_list):
    for sketch in sketch_list:
        location = directory + "/" + sketch
        generate_sketch_embed.create_from_directory(location)
        generate_sketch_index.create_from_directory(day_num, location)


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
    
    sketch_list = generate_sketch_lists.get_directory_names(directory)
    per_sketch(day_num, directory, sketch_list)
    generate_day_index.create_from_directory(day_num, directory)
    #generate_day_index.check_and_move_css(["daypage.css", "embed.css"], directory) 
    
    

    