with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# We need to find the `renderCodex` function and replace `</details>` with `</div>` inside it.
start_str = 'function renderCodex('
start_idx = text.find(start_str)

if start_idx != -1:
    end_idx = text.find('}', start_idx) # finds the first }, wait, renderCodex has nested }
    
    # Let's just find the string in renderCodex
    # Specifically, look for:
    #                     </details>
    #                 `;
    # inside renderCodex
    
    # A safer way is to find the exact text block:
    target = '''                            <p class="text-xs font-sans text-slate-200 leading-relaxed">
                                ${item.desc}
                            </p>
                        </div>
                    </details>
                `;'''
    replacement = '''                            <p class="text-xs font-sans text-slate-200 leading-relaxed">
                                ${item.desc}
                            </p>
                        </div>
                    </div>
                `;'''
    text = text.replace(target, replacement)
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Fixed dictionary nesting issue!")
else:
    print("renderCodex not found")
