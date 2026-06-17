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

# Clean up header
while header and not header[-1].strip():
    header.pop()

def parse_item(item):
    # - [x] **Hu Tao** (`hu-tao`) — ✅ _Hoàn thiện (13 Vũ khí, Tinh chỉnh giao diện TDV Mix, Substats, Talents, Teams)_
    m = re.search(r'- \[(.*?)\] \*\*(.*?)\*\* \(`(.*?)`\) — (.*?) _(.*?)_', item)
    if m:
        checked = m.group(1).strip()
        name = m.group(2).strip()
        id_str = m.group(3).strip()
        icon = m.group(4).strip()
        details = m.group(5).strip()
        
        # Clean details
        if "Chưa làm" in details:
            details = "-"
            icon = "❌"
            status = "Chưa làm"
        else:
            status = "Hoàn thành"
            icon = "✅"
            if details.startswith("Hoàn thiện ("):
                details = details[len("Hoàn thiện ("):-1]
            elif details.startswith("Hoàn thiện"):
                details = details[len("Hoàn thiện"):]
                
        return {
            'name': name,
            'id': id_str,
            'icon': icon,
            'status': status,
            'details': details.strip('() ')
        }
    return None

def get_element_name(el):
    m = re.search(r'### [^\s]+ (.+) \(', el['title'])
    return m.group(1).strip() if m else el['title'].strip()

out = []
out.extend(header)
out.append('')

# Sort elements alphabetically
elements.sort(key=get_element_name)

for el in elements:
    out.append(el['title'])
    out.append('')
    
    # Sort items alphabetically by name
    parsed_items = []
    unparsed_items = []
    for item in el['items']:
        p = parse_item(item)
        if p:
            parsed_items.append(p)
        else:
            unparsed_items.append(item)
            
    parsed_items.sort(key=lambda x: x['name'])
    
    # Build Table
    if parsed_items:
        out.append('| Nhân vật | ID | Trạng thái | Tiến độ chi tiết |')
        out.append('| :--- | :---: | :---: | :--- |')
        for p in parsed_items:
            row = f"| **{p['name']}** | `{p['id']}` | {p['icon']} {p['status']} | {p['details']} |"
            out.append(row)
            
    # Add any unparsed items below the table just in case
    for item in unparsed_items:
        out.append(item)
        
    out.append('')

out.extend(footer)

# Write back
with open(path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))

print('Sorted and transformed to table successfully.')
