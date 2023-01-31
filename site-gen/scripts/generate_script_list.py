import os
import sys
from pathlib import Path

def get_script_list(script_dir, suffix):
    script_names = []
    for entry_name in os.listdir(script_dir):
        split = os.path.splitext(entry_name)
        if split[1] == suffix:
            script_names.append(entry_name)
    script_names.sort()
    #print(script_names)
    return script_names

def script_list_html(script_names, directory):
    script_string = ''
    directory_text = Path(directory).stem + "/"
    for item in script_names:
            script_string += '\n\t\t<a href="{}{}">{}</a>'.format(directory_text, item, item)
    #print(script_string)
    return script_string

def script_list_md(script_names, directory):
    script_string = ''
    directory_text = Path(directory).stem + "/"
    for item in script_names:
            script_string += '\n\t[{}]({}{})'.format(item, directory_text, item)
    #print(script_string)
    return script_string

def write_script_list(directory, suffix):
    names = get_script_list(directory, suffix)
    html = script_list_html(names, directory)
    md = script_list_md(names, directory)
    generated_file_name = "script_list.txt"
    with open(generated_file_name, 'bw+') as f:  #overwrites
        f.write(html.encode('utf-8'))
        f.write(md.encode('utf-8'))
        f.close() 

if __name__ == "__main__":
    if len(sys.argv) == 3:
        directory = sys.argv[1]
        suffix = sys.argv[2]
    else:
        print("invalid number of arguments")
    
    write_script_list(directory, suffix)
