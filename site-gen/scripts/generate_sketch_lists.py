#!/usr/bin/env python3

import markdown
import sys
import os

#one level only. for recursive use os.walk.
def get_directory_names(directory):
    folder_names = []
    for entry_name in os.listdir(directory):
        entry_path = os.path.join(directory, entry_name)
        if os.path.isdir(entry_path):
            if not entry_name.startswith('.'):
                folder_names.append(entry_name)
    folder_names.sort()
    return folder_names

def write_directory_markdown(folder_names, directory):
    markdown_file_name = directory + '/' + 'directory_list.md'
    with open(markdown_file_name, 'bw+') as f:
        for i,item in enumerate(folder_names):
            f.write('{}. [{}]({})\n'.format(i+1,item,item).encode('utf-8'))
        f.close()

def write_embed_links(folder_names, directory):
    html_file_name = directory + '/' + 'sketch-embeds.html'
    #with open(html_file_name, 'ab') as f:  #appends
    with open(html_file_name, 'bw+') as f:  #overwrites
        f.write("\n\n".encode('utf-8'))
        f.write('<div class="grid-container">\n'.encode('utf-8'))
        for item in folder_names:
            f.write('\t<iframe style="visibility:hidden;" onload="this.style.visibility=\'visible\';" src="{}/embed.html"></iframe>\n'.format(item).encode('utf-8'))
        f.write('</div>\n'.encode('utf-8'))
        f.close() 


def write_sketch_nav_from_markdown(directory):
    markdown_file_name = directory + '/' + 'directory_list.md'
    html_file_name = directory + '/' + 'sketch-links.html'
    markdown.markdownFromFile(input=markdown_file_name, output=html_file_name)

def write_sketch_nav(folder_names, directory):
    html_file_name = directory + '/' + 'sketch-links.html'
    #with open(html_file_name, 'ab') as f:  #appends
    with open(html_file_name, 'bw+') as f:  #overwrites
        f.write("\n\n".encode('utf-8'))
        f.write('\t<ol>\n'.encode('utf-8'))
        for item in folder_names:
            f.write('\t\t<li><a href="{}">{}</a></li>\n'.format(item,item).encode('utf-8'))
        f.write('\t</ol>\n'.encode('utf-8'))
        f.close() 

def write_sketch_resource_files(directory):
    folder_names = get_directory_names(directory)
    write_directory_markdown(folder_names, directory)
    write_embed_links(folder_names, directory)
    #write_sketch_nav_from_markdown(directory)
    write_sketch_nav(folder_names, directory)


if __name__ == "__main__":
    if len(sys.argv) == 2:
        directory = sys.argv[1]
    else:
        directory = input ("Directory to Scan: ")
    write_sketch_resource_files(directory)
