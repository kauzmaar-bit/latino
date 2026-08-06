import re
import hashlib

# 1. Update data.js
with open('data.js', 'r', encoding='utf-8') as f:
    data = f.read()

# Extract player names from db.rows
rows_match = re.search(r'"rows":\s*\[(.*?)\]\s*\}', data, re.DOTALL)
player_ids_dict = {}
if rows_match:
    rows_text = rows_match.group(1)
    # find all ["Name", ...]
    names = re.findall(r'\[\s*"([^"]+)"', rows_text)
    for name in names:
        # Generate stable ID: TOWER-XXXXXX
        h = hashlib.md5(name.encode('utf-8')).hexdigest()[:6].upper()
        player_ids_dict[name] = f"TOWER-{h}"

# Generate JS code for playerIDs
js_ids = "const playerIDs = {\n"
for name, pid in player_ids_dict.items():
    js_ids += f'    "{name}": "{pid}",\n'
js_ids += "};\n"

# Insert playerIDs right after db = { ... };
data = re.sub(r'(const db = \{.*?\};\n)', r'\1\n' + js_ids, data, flags=re.DOTALL)

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(data)


# 2. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Insert the modalPlayerId HTML element
html = html.replace(
    '<h2 id="modalPlayerName" class="text-xl sm:text-3xl md:text-4xl font-mono font-black uppercase text-white tracking-wider truncate"></h2>',
    '<h2 id="modalPlayerName" class="text-xl sm:text-3xl md:text-4xl font-mono font-black uppercase text-white tracking-wider truncate"></h2>\n                    <div id="modalPlayerId" class="text-[10px] sm:text-[11px] font-mono font-bold text-slate-500 tracking-[0.2em] mt-0.5 select-all" title="ID Único de Jugador"></div>'
)

# Insert the logic to update modalPlayerId in openModal
open_modal_js = '''            if (sObj && sObj.ligaRaw && sObj.ligaRaw.toLowerCase() === 'leyenda') {
                nameEl.className = "text-xl sm:text-3xl md:text-4xl font-mono font-black uppercase tracking-wider truncate text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]";
                nameEl.innerHTML = `🌟 ${playerName} <span class="text-xs sm:text-sm text-yellow-300 font-mono tracking-widest block sm:inline">[TITÁN DE LEYENDA]</span>`;
            } else {
                nameEl.className = "text-xl sm:text-3xl md:text-4xl font-mono font-black uppercase text-white tracking-wider truncate";
                nameEl.innerText = playerName;
            }'''

new_open_modal_js = open_modal_js + '''\n
            const idEl = document.getElementById('modalPlayerId');
            if(idEl) {
                idEl.innerText = 'ID: ' + (typeof playerIDs !== 'undefined' ? (playerIDs[playerName] || 'TOWER-000000') : 'TOWER-000000');
            }'''

html = html.replace(open_modal_js, new_open_modal_js)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("IDs generated and injected successfully.")
