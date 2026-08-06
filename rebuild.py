import shutil
import re

shutil.copyfile('index_backup.html', 'index.html')

with open(r'd:\web del gremio\stitch_the_tower_latino_hub\stitch_the_tower_latino_hub\latino_tower_protocol_home\code.html', 'r', encoding='utf-8') as f:
    stitch = f.read()

# Extract Tailwind Config from Stitch safely
stitch_tailwind = re.search(r'<script id="tailwind-config">\s*tailwind\.config = (.*?)</script>', stitch, re.DOTALL)
stitch_tw_config = stitch_tailwind.group(1).strip() if stitch_tailwind else ''

# Extract CSS from Stitch
stitch_css = re.search(r'<style>(.*?)</style>', stitch, re.DOTALL)
stitch_css_content = stitch_css.group(1).strip() if stitch_css else ''

with open('index.html', 'r', encoding='utf-8') as f:
    idx = f.read()

# Replace Tailwind config safely by finding exactly </script> right after it
if stitch_tw_config:
    start_str = 'tailwind.config = {'
    start_pos = idx.find(start_str)
    if start_pos != -1:
        end_pos = idx.find('</script>', start_pos)
        idx = idx[:start_pos] + f'tailwind.config = {stitch_tw_config}\n    ' + idx[end_pos:]

if stitch_css_content:
    idx = idx.replace('</style>', f'\n/* STITCH SKIN */\n{stitch_css_content}\n</style>')

fonts_html = '''
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=JetBrains+Mono:wght@400;700;800&family=Hanken+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
'''
idx = idx.replace('</head>', f'{fonts_html}\n</head>')

# Body class update
idx = idx.replace('bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-200 font-sans selection:bg-neonCyan selection:text-black', 'bg-background text-on-surface font-body-md min-h-screen selection:bg-primary-container selection:text-on-primary')

# Banners update
idx = idx.replace('shadow-[0_0_35px', 'glass-panel neon-underglow shadow-[0_0_35px')

# Cards Grid JS update
idx = idx.replace("card.className = 'player-card';", "card.className = 'player-card glass-panel neon-underglow hover:bg-surface-container/50';")
idx = idx.replace("bg-black/40 border-b", "bg-surface-container-high/50 border-b")

# Podium JS update
idx = idx.replace("pilar.className = `bg-gradient-to-b ${bgGradient}", "pilar.className = `glass-panel neon-underglow bg-gradient-to-b ${bgGradient}")

# Fonts in JS update
idx = idx.replace("'Orbitron'", "'JetBrains Mono'")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(idx)

print('Index rebuilt perfectly!')
