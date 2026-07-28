import asyncio
import os
import re
import subprocess
import json
import edge_tts

VOICE = "es-MX-DaliaNeural"  # Voz femenina neuronal latinoamericana (cálida, carismática y expresiva)
RATE = "+5%"               # Ritmo ligeramente ágil como narradora de esports en vivo
AUDIO_DIR = "audios-caster"

def clean_text_for_speech(text):
    # Reemplazar abreviaturas comunes del gremio por palabras completas
    text = re.sub(r'\bwsp\b', 'WhatsApp', text, flags=re.IGNORECASE)
    text = re.sub(r'\bx+d+\b', '', text, flags=re.IGNORECASE) # Quitar xd / xD para que no deletere "equis de"
    text = re.sub(r'\bvs\b', 'versus', text, flags=re.IGNORECASE)
    text = re.sub(r'2\.0', 'dos punto cero', text)
    
    # Remover emojis para evitar que el sintetizador lea la descripción literal del emoji
    text = re.sub(r'[^\w\s.,¡!¿?"«»\'-–áéíóúüñÁÉÍÓÚÜÑ]', ' ', text)
    
    # Reducir espacios múltiples
    text = re.sub(r'\s+', ' ', text).strip()
    return text

async def generate_player_audio(player_name, note):
    title_clean = clean_text_for_speech(note.get('title', ''))
    quote_clean = clean_text_for_speech(note.get('quote', ''))
    text_clean = clean_text_for_speech(note.get('text', ''))
    
    # Construcción de la narración radial
    full_speech = f"¡Expediente del caster para {player_name}! Su título oficial en La Cantina es: {title_clean}. Su cita célebre: «{quote_clean}». Y aquí el resumen: {text_clean}"
    
    file_path = os.path.join(AUDIO_DIR, f"{player_name}.mp3")
    
    communicate = edge_tts.Communicate(full_speech, VOICE, rate=RATE)
    await communicate.save(file_path)
    print(f"[OK] Audio generado para: {player_name} -> {file_path}")

async def main():
    if not os.path.exists(AUDIO_DIR):
        os.makedirs(AUDIO_DIR)
        print(f"[INFO] Carpeta creada: {AUDIO_DIR}")
        
    # Usar node para extraer el objeto casterNotes como JSON puro
    node_cmd = ["node", "-e", "const fs = require('fs'); eval(fs.readFileSync('data.js', 'utf8').replace(/const /g, 'global.')); console.log(JSON.stringify(global.casterNotes));"]
    try:
        result = subprocess.run(node_cmd, capture_output=True, text=True, check=True, encoding='utf-8', errors='replace')
        caster_notes = json.loads(result.stdout)
    except Exception as e:
        print(f"[ERROR] Error cargando casterNotes de data.js: {e}")
        return

    print(f"[START] Generando audios neuronales con voz de chica para {len(caster_notes)} guerreros...")
    
    tasks = [generate_player_audio(name, note) for name, note in caster_notes.items()]
    await asyncio.gather(*tasks)
    
    print("[SUCCESS] ¡LOS 28 AUDIOS HAN SIDO GENERADOS CORRECTAMENTE CON CALIDAD ESTUDIO!")

if __name__ == "__main__":
    asyncio.run(main())
