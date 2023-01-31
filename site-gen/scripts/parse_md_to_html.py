import markdown
import sys

def write_html_from_markdown(directory, markdown_file_name):
    markdown_file_name = directory + '/' + markdown_file_name
    html_file_name = directory + '/' + 'generated_from_markdown.html'
    markdown.markdownFromFile(input=markdown_file_name, output=html_file_name)


if __name__ == "__main__":
    if len(sys.argv) == 3:
        directory = sys.argv[1]
        markdown_file_name = sys.argv[2]
    else:
        print("invalid number of arguments")
    
    write_html_from_markdown(directory, markdown_file_name)