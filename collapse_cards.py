import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# The stats container starts here:
# <div class="flex flex-col flex-1 py-1">
# We want to replace it with a details/summary approach.
# We also need to close it where the div closes. The div closes after `</div>\n                    </div>\n                `;`

target_start = '<div class="flex flex-col flex-1 py-1">'

replacement_start = '''<details class="w-full border-t border-slate-800/80 group">
                        <summary class="cursor-pointer bg-surface-container-high/30 hover:bg-surface-container/80 text-center py-2 text-xs font-mono font-bold text-slate-400 hover:text-white transition-colors list-none select-none">
                            <span class="group-open:hidden">▼ VER ESTADÍSTICAS</span>
                            <span class="hidden group-open:inline">▲ OCULTAR ESTADÍSTICAS</span>
                        </summary>
                        <div class="flex flex-col flex-1 py-1 bg-black/20 pb-2">'''

# Since we opened <details>, we need to close it instead of the </div> that closes the old flex-col.
# The end of the card is:
#                         </div>
#                     </div>
#                 `;
# We change the last `</div>` to `</details>`

html = html.replace(target_start, replacement_start)

target_end = '''                        </div>
                    </div>
                `;'''

replacement_end = '''                        </div>
                    </details>
                `;'''

html = html.replace(target_end, replacement_end)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Cards collapsed successfully!")
