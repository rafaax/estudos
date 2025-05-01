from PIL import Image
import numpy as np
from sklearn.cluster import KMeans

def get_cores_predominantes(filepath, n_cores=5, resize=100):
    """
    filepath: caminho para a imagem
    n_cores: número de cores predominantes a mostrar
    resize: tamanho da imagem para acelerar o processamento
    """
    
    img = Image.open(filepath).convert('RGB')
    
    if resize: 
        img = img.resize((resize, resize)) # reduz tamanho para acelerar processamento
    arr = np.array(img).reshape(-1, 3)
    
    kmeans = KMeans(n_clusters=n_cores, random_state=42, n_init=10) # Usa KMeans para encontrar as cores principais

    kmeans.fit(arr)
    cores = kmeans.cluster_centers_.astype(int)
    
    resultado = [tuple(cor) for cor in cores] # Transforma para lista de tuplas [(R,G,B), ...]

    return resultado 