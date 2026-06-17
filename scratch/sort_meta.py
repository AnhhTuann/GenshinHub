import re

path = '/home/anhhtuann/document/GenshinHub/meta_build_progress.md'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.read().split('\n')

header = []
elements = []
current_element = None
footer = []
in_footer = False

for line in lines:
    if line.startswith('---'):
        in_footer = True
    
    if in_footer:
        footer.append(line)
        continue
    
    if line.startswith('### '):
        current_element = {'title': line, 'items': []}
        elements.append(current_element)
    elif current_element is not None:
        if line.strip():
            current_element['items'].append(line)
    else:
        header.append(line)

def get_char_name(item):
    m = re.search(r'\*\*([^*]+)\*\*', item)
    return m.group(1).strip() if m else item.strip()

def get_element_name(el):
    m = re.search(r'### [^\s]+ (.+) \(', el['title'])
    return m.group(1).strip() if m else el['title'].strip()

for el in elements:
    el['items'].sort(key=get_char_name)

elements.sort(key=get_element_name)

out = []
# Strip trailing empty lines from header
while header and not header[-1].strip():
    header.pop()
out.extend(header)
out.append('')

for el in elements:
    out.append(el['title'])
    out.append('')
    out.extend(el['items'])
    out.append('')

out.extend(footer)

# Write back
with open(path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))

print('Sorted successfully.')
