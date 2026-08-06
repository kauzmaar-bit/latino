with open('data.js', 'r', encoding='utf-8') as f:
    data = f.read()

# Replace translations
data = data.replace('Arma Suprema', 'Arma Definitiva')
data = data.replace('ARMA SUPREMA', 'ARMA DEFINITIVA')

# Add Orbital Augment
new_mod = '''
    {
        sigla: "OA",
        en: "Orbital Augment",
        es: "Aumento Orbital",
        desc: "Módulo de armadura (Defensa) que añade 'Electrones' que orbitan tu torre. Cada electrón inflige un daño equivalente al 15% de la salud restante del enemigo (25% de efectividad contra Jefes). Muy útil en builds de Vida (eHP) para limpiar la acumulación de enemigos y dañar Protectores. Da entre 2 y 8 electrones dependiendo de la rareza.",
        cat: "mods"
    },'''
if 'abbreviationsData = [' in data:
    data = data.replace('abbreviationsData = [', 'abbreviationsData = [' + new_mod)

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(data)


with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix text translation
html = html.replace('ARMA SUPREMA', 'ARMA DEFINITIVA')
html = html.replace('Arma Suprema', 'Arma Definitiva')

# Fix modal tab buttons (changing neonPurple text-white to cyan-500 text-black for better readability)
html = html.replace('bg-neonPurple text-white shadow-[0_0_15px_rgba(168,85,247,0.7)]', 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.7)]')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Patched successfully!')
