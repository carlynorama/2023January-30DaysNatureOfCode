#!/usr/bin/env python3

import sys
import os
from string import Template


# def test_template(file_name):
#     with open(file_name) as f:
#         temp_str = f.read()
#     temp_obj = Template(temp_str)
#     print(temp_obj.substitute(name='John Doe', site='StackAbuse.com'))


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

def load_into_template(file_name, html):
    with open(file_name) as f:
        temp_str = f.read()
    temp_obj = Template(temp_str)
    return temp_obj.substitute(script_list=html)

def write_file(full_html_string, path):
    html_file_name = path + '/' + 'embed.html'
    with open(html_file_name, 'bw+') as f:
        f.write(full_html_string.encode('utf-8'))
        f.close()

def create_from_directory(sketch_folder):
    #sketch_folder = "../content/sketch_example"
    scripts = get_script_list(sketch_folder)
    script_html = make_script_html(scripts)
    full_html = load_into_template("../templates/sketch_embed.html", script_html)
    write_file(full_html, sketch_folder)
    #test_template("../templates/mytextfile.txt")
     
if __name__ == "__main__":
    if len(sys.argv) == 2:
        directory = sys.argv[1]
    else:
        directory = input ("Directory to Scan: ")
    create_from_directory(directory)