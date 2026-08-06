import re

with open('index_backup.html', 'r', encoding='utf-8') as f:
    content = f.read()

scripts = re.findall(r'<script>(.*?)</script>', content, re.DOTALL)
app_js = scripts[1].strip()

def replace_func(src, func_name, replacement):
    start_str = f'function {func_name}'
    start_idx = src.find(start_str)
    if start_idx == -1: return src
    
    brace_count = 0
    in_func = False
    end_idx = start_idx
    for i in range(start_idx, len(src)):
        if src[i] == '{':
            brace_count += 1
            in_func = True
        elif src[i] == '}':
            brace_count -= 1
        
        if in_func and brace_count == 0:
            end_idx = i + 1
            break
            
    return src[:start_idx] + replacement + src[end_idx:]

app_js = replace_func(app_js, 'renderPodium(currRanks)', 'function renderPodium(currRanks) {}\n')
app_js = replace_func(app_js, 'renderTitan()', 'function renderTitan() {}\n')

new_render_cards = """function renderCards() {
    const tbody = document.getElementById('cardsGrid');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    const prevRanks = calculateRanks(prevDateIdx, currentSortMode);
    const currRanks = calculateRanks(currDateIdx, currentSortMode);
    
    let displayRows = [...db.rows];
    
    displayRows.sort((a, b) => {
        let scoreA = getScore(a, currDateIdx);
        let scoreB = getScore(b, currDateIdx);
        return compareScores(scoreA, scoreB, currentSortMode);
    });

    let query = document.getElementById('searchInput') ? document.getElementById('searchInput').value.trim().toLowerCase() : '';
    displayRows = displayRows.filter(row => {
        let pName = row[0].toLowerCase();
        let matchesSearch = pName.includes(query);
        
        let scoreC = getScore(row, currDateIdx);
        let scoreP = getScore(row, prevDateIdx);
        let matchesTab = true;

        if (currentFilter === 'elite') {
            matchesTab = ['leyenda', 'campeón', 'campeon'].includes((scoreC.ligaRaw||'').toLowerCase());
        } else if (currentFilter === 'platino') {
            matchesTab = (scoreC.ligaRaw||'').toLowerCase() === 'platino';
        } else if (currentFilter === 'oro') {
            matchesTab = ['oro', 'plata', 'cobre'].includes((scoreC.ligaRaw||'').toLowerCase());
        } else if (currentFilter === 'ascenso') {
            matchesTab = scoreP.valid && ((scoreC.tier > scoreP.tier) || (scoreC.reliquias - scoreP.reliquias >= 30));
        } else if (currentFilter === 'nuevos') {
            matchesTab = !scoreP.valid;
        }

        return matchesSearch && matchesTab;
    });

    if (displayRows.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="p-4 text-center text-on-surface-variant font-label-mono">No se encontraron resultados.</td></tr>`;
        return;
    }
    
    displayRows.forEach((row) => {
        let playerName = row[0];
        let cRank = currRanks.get(playerName) || '-';
        let scoreC = getScore(row, currDateIdx);
        let scoreP = getScore(row, prevDateIdx);
        
        let rankColorClass = 'text-on-surface-variant';
        let rankDropShadow = '';
        let borderClass = 'border-outline-variant/30';
        
        if (cRank === 1) {
            rankColorClass = 'text-trophy-gold';
            rankDropShadow = 'drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]';
            borderClass = 'border-trophy-gold/50';
        } else if (cRank === 2) {
            rankColorClass = 'text-text-silver';
            rankDropShadow = 'drop-shadow-[0_0_8px_rgba(226,232,240,0.5)]';
            borderClass = 'border-text-silver/50';
        } else if (cRank === 3) {
            rankColorClass = 'text-[#CD7F32]';
            rankDropShadow = 'drop-shadow-[0_0_8px_rgba(205,127,50,0.5)]';
            borderClass = 'border-[#CD7F32]/50';
        }
        
        let tierLabel = scoreC.ligaRaw || '-';
        let isAscenso = scoreP.valid && scoreC.tier > scoreP.tier;
        let isNuevo = !scoreP.valid;
        
        let trendHtml = '-';
        if (isAscenso) {
            trendHtml = `<span class="inline-flex items-center gap-1 font-label-mono text-[12px] text-streak-red bg-streak-red/10 px-2 py-0.5 rounded"><span class="material-symbols-outlined text-[14px]">local_fire_department</span> En Racha</span>`;
        } else if (isNuevo) {
            trendHtml = `<span class="inline-flex items-center gap-1 font-label-mono text-[12px] text-primary-fixed-dim bg-primary-fixed-dim/10 px-2 py-0.5 rounded"><span class="material-symbols-outlined text-[14px]">arrow_upward</span> Nuevo</span>`;
        }
        
        let tr = document.createElement('tr');
        tr.className = 'table-row-zebra border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors group cursor-pointer';
        tr.onclick = () => openModal(playerName);
        
        tr.innerHTML = `
            <td class="p-4 pl-6 text-center">
                <span class="font-stat-value text-stat-value ${rankColorClass} ${rankDropShadow}">${cRank}</span>
            </td>
            <td class="p-4 font-title-md text-on-surface flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-surface-container-high border ${borderClass}"></div>
                ${playerName}
            </td>
            <td class="p-4"><span class="font-label-mono text-label-mono text-secondary-fixed-dim bg-secondary-fixed-dim/10 px-2 py-0.5 rounded">${tierLabel}</span></td>
            <td class="p-4 pr-6 text-right">
                ${trendHtml}
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}
"""

app_js = replace_func(app_js, 'renderCards()', new_render_cards)

# Also fix the IDs in renderEvolutionChart to use the new font family
app_js = app_js.replace("font: { family: 'Orbitron'", "font: { family: 'JetBrains Mono'")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app_js)
print("app.js patched!")
