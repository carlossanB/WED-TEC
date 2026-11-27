import os
from PIL import Image

print("--- Iniciando optimización de imágenes ---")
for archivo in os.listdir('.'):
    if archivo.lower().endswith(('.png', '.jpg', '.jpeg')):
        try:
            img = Image.open(archivo)
            nombre_sin_extension = os.path.splitext(archivo)[0]
            img.save(f"{nombre_sin_extension}.webp", "webp", quality=80)
            print(f"✅ Convertido con éxito: {archivo} -> {nombre_sin_extension}.webp")
        except Exception as e:
            print(f"❌ Error con {archivo}: {e}")
print("--- Proceso terminado ---")
