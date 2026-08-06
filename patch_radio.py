with open('index_backup.html', 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('<div id="radioGlobalPlayer"')
if start_idx != -1:
    brace_count = 0
    in_div = False
    end_idx = start_idx
    
    for i in range(start_idx, len(content) - 5):
        if content[i:i+4] == '<div':
            brace_count += 1
            in_div = True
        elif content[i:i+5] == '</div':
            brace_count -= 1
            
        if in_div and brace_count == 0:
            end_idx = i + 6
            break
            
    radio_html = content[start_idx:end_idx]
    
    with open('index.html', 'r', encoding='utf-8') as f2:
        index_html = f2.read()
        
    index_html = index_html.replace('</body>', radio_html + '\n</body>')
    
    with open('index.html', 'w', encoding='utf-8') as f3:
        f3.write(index_html)
        
    print("Radio player added!")
else:
    print("Radio player not found")
