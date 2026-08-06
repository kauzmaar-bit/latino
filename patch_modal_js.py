import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Make modal updates null-safe
replacements = [
    ("nameEl.className =", "if (nameEl) nameEl.className ="),
    ("nameEl.innerHTML =", "if (nameEl) nameEl.innerHTML ="),
    ("nameEl.innerText =", "if (nameEl) nameEl.innerText ="),
    ("img.src =", "if (img) img.src ="),
    ("document.getElementById('modalAnthemBox').style.display", "if(document.getElementById('modalAnthemBox')) document.getElementById('modalAnthemBox').style.display"),
    ("document.getElementById('modalAnthemTitle').innerText", "if(document.getElementById('modalAnthemTitle')) document.getElementById('modalAnthemTitle').innerText"),
    ("document.getElementById('modalCasterBox').style.display", "if(document.getElementById('modalCasterBox')) document.getElementById('modalCasterBox').style.display"),
    ("document.getElementById('modalCasterTitle').innerText", "if(document.getElementById('modalCasterTitle')) document.getElementById('modalCasterTitle').innerText"),
    ("document.getElementById('modalCasterQuote').innerText", "if(document.getElementById('modalCasterQuote')) document.getElementById('modalCasterQuote').innerText"),
    ("document.getElementById('modalCasterText').innerText", "if(document.getElementById('modalCasterText')) document.getElementById('modalCasterText').innerText"),
    ("document.getElementById('profileModal');", "document.getElementById('profileModal');\n            if(!modal) return;"),
]

for old, new in replacements:
    content = content.replace(old, new)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Modal elements null-safe patched in app.js")
