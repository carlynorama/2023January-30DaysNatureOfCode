#!/usr/bin/env python3

import sys
from pathlib import Path
import shutil
from string import Template
import datetime
import markdown
import generate_sketch_list


# ${ year_month } ${ day_num }
# ${ day_dir_name }
# ${ sketch_links_and_embeds }
# ${ notes }
# ${ instructions }


#one level only. for recursive use os.walk.
def get_sketch_list(directory):
    generate_sketch_list.write_list_to_files(directory)
    html_file_name = directory + '/' + 'directory-list.html'
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
    sketch_links_and_embeds = get_sketch_list(day_folder)
    folder_name = Path(day_folder).stem
    year_month = date_string()
    day_num = day
    notes = make_notes_html(day_folder)
    instructions = make_instructions_html()
    dictionary = {'year_month': year_month,
                'day_num': day_num,
                'day_dir_name': folder_name,
                'notes': notes,
                'sketch_links_and_embeds': sketch_links_and_embeds,
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