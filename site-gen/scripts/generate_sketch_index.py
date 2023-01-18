#!/usr/bin/env python3

import sys
import os
from pathlib import Path
from string import Template
import datetime
import markdown


# ${year_month} ${day_num}
# ${sketch_dir_name}
# ${script_list}
# ${notes}

#one level only. for recursive use os.walk.
def get_script_list(script_dir):
    script_names = []
    for entry_name in os.listdir(script_dir):
        split = os.path.splitext(entry_name)
        if split[1] == ".js":
            script_names.append(entry_name)
    script_names.sort()
    #print(script_names)
    return script_names

def make_script_html(script_list):
    script_string = '<script src="../../p5.min.js\"></script>'
    for item in script_list:
            script_string += '\n\t\t<script src="{}"></script>'.format(item)
    #print(script_string)
    return script_string

def make_notes_html(directory):
    markdown_file_name = directory + '/' + 'notes.md'
    if Path(markdown_file_name).is_file():
        with open(markdown_file_name, 'r') as f:
            text = f.read()
            html = markdown.markdown(text)
        return html
    else:
        return "<p>no note</p>"

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

def date_string():
    x = datetime.datetime.now()
    return x.strftime("%Y %b")

def create_from_directory(day, sketch_folder):
    #sketch_folder = "../content/sketch_example"
    scripts = get_script_list(sketch_folder)
    directory = Path(sketch_folder).stem
    script_html = make_script_html(scripts)
    year_month = date_string()
    day_num = day
    notes = make_notes_html(sketch_folder)
    dictionary = {'year_month': year_month,
                'day_num': day_num,
                'sketch_dir_name': directory,
                'script_list': script_html,
                'notes': notes
                }
    full_html = load_into_template("../templates/sketch_index.html", dictionary)
    write_file(full_html, sketch_folder)
    #test_template("../templates/mytextfile.txt")
     
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