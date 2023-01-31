import sys
from pathlib import Path

def get_directory_as_title(file_name):
    string_to_convert = (Path(file_name).stem)
    return convert_to_title(string_to_convert)

def convert_to_title(string_to_convert):
    return make_spaces(strip_leading_numbers(string_to_convert)).title()

def convert_to_sentence(string_to_convert):
    return make_spaces(strip_leading_numbers(string_to_convert)).capitalize()

def strip_leading_numbers(string_to_convert):
    return string_to_convert.lstrip("0123456789 ")

def make_spaces(string_to_convert):
    return string_to_convert.replace("-", " ").replace("_", " ")  

if __name__ == "__main__":
    if len(sys.argv) == 2:
        file_name = sys.argv[1]
    else:
        file_name = input ("name to parse: ")
    
    get_directory_as_title(file_name)
    