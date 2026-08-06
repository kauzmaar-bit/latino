import os
import re

STITCH_DIR = r"d:\web del gremio\stitch_the_tower_latino_hub\stitch_the_tower_latino_hub"

def extract_tag(content, tag):
    pattern = f"<{tag}.*?>(.*?)</{tag}>"
    match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
    return match.group(0) if match else ""

def extract_main_content(content):
    # Extracts everything inside <main>...</main>
    pattern = r"<main.*?>\s*(.*?)\s*</main>"
    match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
    return match.group(1) if match else ""

def read_stitch_file(folder_name):
    path = os.path.join(STITCH_DIR, folder_name, "code.html")
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

# 1. Read Home for base layout
home_content = read_stitch_file("latino_tower_protocol_home")

# Extract head, nav, footer, etc.
head = extract_tag(home_content, "head")
# Clean up head to use our separated CSS/JS
head = re.sub(r'<script id="tailwind-config">.*?</script>', '<script src="js/tailwind-config.js"></script>', head, flags=re.DOTALL)
head = re.sub(r'<style>.*?</style>', '<link rel="stylesheet" href="css/style.css">', head, flags=re.DOTALL)

# Add Chart.js and our data.js/app.js to the end of body
scripts = """
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="data.js?v=2.3"></script>
<script src="js/app.js"></script>
<script>
    // Router simple para la SPA
    function navigateTo(viewId) {
        document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
        document.getElementById(viewId).classList.remove('hidden');
        window.scrollTo(0, 0);
    }
    
    // Configurar enlaces de navegación
    document.addEventListener('DOMContentLoaded', () => {
        const links = document.querySelectorAll('nav a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const text = link.innerText.toLowerCase();
                if (text.includes('ranking')) navigateTo('view-home');
                else if (text.includes('academia')) navigateTo('view-academia');
                else if (text.includes('códice') || text.includes('codice')) navigateTo('view-codice');
                else if (text.includes('radio')) navigateTo('view-radio');
                
                // Actualizar estilos activos en nav
                links.forEach(l => {
                    l.classList.remove('text-primary-fixed-dim', 'border-b-2', 'border-primary-fixed-dim', 'pb-1');
                    l.classList.add('text-on-surface-variant');
                });
                link.classList.remove('text-on-surface-variant');
                link.classList.add('text-primary-fixed-dim', 'border-b-2', 'border-primary-fixed-dim', 'pb-1');
            });
        });
    });
</script>
"""

nav = extract_tag(home_content, "nav")
footer = extract_tag(home_content, "footer")

# Floating battle widget (it's right after main in home)
battle_widget = re.search(r'(<div class="fixed bottom-24 right-4 md:right-8 z-40">.*?</div>)', home_content, re.DOTALL)
battle_widget_html = battle_widget.group(1) if battle_widget else ""

# Views
home_main = extract_main_content(home_content)
academia_main = extract_main_content(read_stitch_file("latino_tower_protocol_academia_unified"))
codice_main = extract_main_content(read_stitch_file("latino_tower_protocol_c_dice_unified"))
radio_main = extract_main_content(read_stitch_file("latino_tower_protocol_radio_unified"))
# Expediente will be a modal or hidden view
expediente_main = extract_main_content(read_stitch_file("latino_tower_protocol_expediente_unified"))

# Assemble new index.html
html = f"""<!DOCTYPE html>
<html class="dark" lang="es">
{head}
<body class="text-on-surface font-body-md min-h-screen flex flex-col pt-[88px]">
{nav}

<main id="app-container" class="flex-grow w-full max-w-container-max mx-auto px-gutter md:px-margin-desktop py-8 flex flex-col gap-12 relative z-10">
    <div id="view-home" class="view-section">
        {home_main}
    </div>
    <div id="view-academia" class="view-section hidden">
        {academia_main}
    </div>
    <div id="view-codice" class="view-section hidden">
        {codice_main}
    </div>
    <div id="view-radio" class="view-section hidden">
        {radio_main}
    </div>
</main>

<!-- Modal de Expediente (Oculto por defecto) -->
<div id="profileModal" class="fixed inset-0 bg-background/95 backdrop-blur-md z-[1000] hidden items-center justify-center p-4 opacity-0 transition-opacity duration-300">
    <div class="relative w-full max-w-4xl mx-auto transform scale-95 transition-transform duration-300">
        <button onclick="document.getElementById('profileModal').classList.add('hidden')" class="absolute -top-12 right-0 text-on-surface-variant hover:text-error transition-colors">
            <span class="material-symbols-outlined text-3xl">close</span>
        </button>
        {expediente_main}
    </div>
</div>

{battle_widget_html}
{footer}
{scripts}
</body>
</html>
"""

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("index.html successfully built!")
