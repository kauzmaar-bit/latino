import re

# Read Stitch home code.html
with open(r'd:\web del gremio\stitch_the_tower_latino_hub\stitch_the_tower_latino_hub\latino_tower_protocol_home\code.html', 'r', encoding='utf-8') as f:
    stitch = f.read()

# Extract Tailwind Config from Stitch
stitch_tailwind = re.search(r'<script id="tailwind-config">\s*tailwind\.config = (.*?)</script>', stitch, re.DOTALL)
if stitch_tailwind:
    stitch_tw_config = stitch_tailwind.group(1).strip()
else:
    print('Tailwind config not found in Stitch')
    stitch_tw_config = None

# Extract CSS from Stitch
stitch_css = re.search(r'<style>(.*?)</style>', stitch, re.DOTALL)
if stitch_css:
    stitch_css_content = stitch_css.group(1).strip()
else:
    print('CSS not found in Stitch')
    stitch_css_content = None

# Read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    idx = f.read()

# Replace Tailwind config in index.html
if stitch_tw_config:
    idx = re.sub(r'tailwind\.config = \{.*?\};', f'tailwind.config = {stitch_tw_config};', idx, flags=re.DOTALL)

# Append CSS to the existing style block in index.html
if stitch_css_content:
    idx = re.sub(r'(</style>)', f'\n/* --- STITCH CSS SKIN --- */\n{stitch_css_content}\n\\1', idx, flags=re.DOTALL)

# Replace Google Fonts in head
fonts_html = """
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=JetBrains+Mono:wght@400;700;800&family=Hanken+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
"""
# Find the end of existing google fonts or just append before </head>
idx = idx.replace('</head>', f'{fonts_html}\n</head>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(idx)

print('Tailwind, CSS, and Fonts merged!')
