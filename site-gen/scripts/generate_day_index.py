#!/usr/bin/env python3

import sys
from pathlib import Path
import shutil
from string import Template
import datetime
import markdown
import generate_sketch_lists
import parse_name


# ${ year_month } ${ day_num }
# ${ day_dir_name }
# ${ sketch_links_and_embeds }
# ${ notes }
# ${ instructions }


#one level only. for recursive use os.walk.
def get_sketch_nav(directory):
    html_file_name = directory + '/' + 'sketch-links.html'
    with open(html_file_name) as f:
        temp_str = f.read()
    return temp_str

def get_sketch_embeds(directory):
    html_file_name = directory + '/' + 'sketch-embeds.html'
    with open(html_file_name) as f:
        temp_str = f.read()
    return temp_str

def make_notes_html(directory):
    markdown_file_name = directory + '/' + 'notes.md'
    if Path(markdown_file_name).is_file():
        with open(markdown_file_name, 'r') as f:
            text = f.read()
            html = markdown.markdown(text)
        return html
    else:
        return "<p>no note</p>"
    
def make_instructions_html():
    instructions_file_name = '../templates/instructions.md'
    if Path(instructions_file_name).is_file():
        with open(instructions_file_name, 'r') as f:
            text = f.read()
            html = markdown.markdown(text)
        return html
    else:
        return "<p>no instructions</p>"

def load_into_template(file_name, dictionary):
    with open(file_name) as f:
        temp_str = f.read()
    temp_obj = Template(temp_str)
    return temp_obj.substitute(dictionary)

def write_file(full_html_string, path):
    html_file_name = path + '/' + 'index.html'
    with open(html_file_name, 'bw+') as f:
        f.write(full_html_string.encode('utf-8'))
        f.close()

def check_and_move_css(css_list, directory):
    for item in css_list:
        css_source_file = "../static_resources/" + '/' + item
        css_destination_file = directory + '/' + item
        if not Path(css_destination_file).exists():
            shutil.copy2(css_source_file, css_destination_file)

def date_string():
    x = datetime.datetime.now()
    return x.strftime("%Y %b")

def create_from_directory(day, day_folder):
    #sketch_folder = "../content/sketch_example"
    generate_sketch_lists.write_sketch_resource_files(day_folder)
    sketch_links =  get_sketch_nav(day_folder)
    sketch_embeds = get_sketch_embeds(day_folder)
    folder_name = Path(day_folder).stem
    year_month = date_string()
    day_num = day
    day_title = parse_name.get_directory_as_title(day_folder)
    notes = make_notes_html(day_folder)
    instructions = make_instructions_html()
    dictionary = {'year_month': year_month,
                'day_num': day_num,
                'day_title': day_title,
                'day_dir_name': folder_name,
                'sketch_nav': sketch_links,
                'notes': notes,
                'sketch_embeds': sketch_embeds,
                'instructions': instructions,
                }
    full_html = load_into_template("../templates/day_index.html", dictionary)
    write_file(full_html, day_folder)
     
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
    create_from_directory(day_num, directory)