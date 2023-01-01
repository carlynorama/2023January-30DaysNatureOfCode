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

def list(directory):
    folder_names = get_directory_names(directory)
    markdown_file_name = directory + '/' + 'directory_list.md'
    html_file_name = directory + '/' + 'directory-list.html'
    with open(markdown_file_name, 'bw+') as f:
        for i,item in enumerate(folder_names):
            f.write('{}. [{}]({})\n'.format(i+1,item,item).encode('utf-8'))
        f.seek(0)
        markdown.markdownFromFile(input=f, output=html_file_name)
    with open(html_file_name, 'ab') as f:
        f.write("\n\n".encode('utf-8'))
        f.write('<div class="grid-container">\n'.encode('utf-8'))
        for item in folder_names:
            f.write('\t<iframe style="visibility:hidden;" onload="this.style.visibility=\'visible\';" src="{}/embed.html"></iframe>\n'.format(item).encode('utf-8'))
        f.write('</div>\n'.encode('utf-8'))
        f.close()

if __name__ == "__main__":
    if len(sys.argv) == 2:
        directory = sys.argv[1]
    else:
        directory = input ("Directory to Scan: ")
    list(directory)
