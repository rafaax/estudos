Aplicação Django para upload de imagens e extração automática das cores predominantes e suas porcentagens.

> para execução do codigo, recomendo utilizaçao de um venv e rodar no terminal $ python manage.py runserver

## Funcionalidades

- Upload de imagens diretamente pela interface web.  
- Extração das **5 cores predominantes** da imagem, exibidas em **RGB**, **HEX** e **CSS**.  
- Visualização da imagem enviada junto com sua paleta de cores.  
- Interface responsiva com **Bootstrap**.
- Identificação de qual cor é mais predominante dentre 5, tendo a informação de porcentagem do valor Hexadecimal presente na imagem. 


## Estrutura do projeto

- core/models.py – Modelo Imagem com referência ao upload.

- core/forms.py – Formulário de upload de imagem.

- core/views.py – Lógica principal: upload, extração de cores e tratamento de erros.

- core/templates/core/upload.html – Interface do usuário.

- core/color_utils.py – Algoritmo para extração das cores predominantes.

## Dependências

- Django >= 3.2

- Pillow

## DB

O projeto utiliza SQLite (db.sqlite3) e eu prefiro utilizar o DBeaver para visualizar as informações. 

![image](https://github.com/user-attachments/assets/230933c6-f9ce-4122-9368-3f791677997b)

## Demonstração de resultado

Exemplo: O usuario sobe uma imagem qualquer pelo input file, e no momento que clica no botão de submitar, ele já retorna o resultado em poucos segundos. 

![image](https://github.com/user-attachments/assets/79376d33-7036-407f-b84a-8858d7c1a148)

## Explicação do algoritmo 

Dentro do arquivo color_utils.py dentro da pasta core, tem a função que faz a lógica para captar essas cores predominantes
> get_cores_predominantes

### 1. Entrada e Pré-processamento

```bash
img = Image.open(filepath).convert('RGB')
if resize: 
    img = img.resize((resize, resize)) # reduz tamanho para acelerar processamento
```
Esse trecho faz o pré processamento da imagem, ela recebe o caminho do arquivo e converte para RGB (Red, Green, Blue) descartando o canal alpha.
Se o argumento resize é especificado, a imagem é reduzida para um tamanho menor, para acelerar as operações (pois menos pixels serão processados).


### 2. Transformação para Array Numérico

```bash
arr = np.array(img).reshape(-1, 3)
```
A imagem é transformada em um array bidimensional usando o NumPy (np.array).
Cada pixel é representado por uma tupla (R, G, B).
Exemplo: Para um pixel vermelho, o formato será (255, 0, 0).
O método .reshape(-1, 3) transforma o array 3D da forma (altura, largura, 3) em uma lista 2D com shape (n_px, 3), onde n_px é o número total de pixels.
Essa transformação é necessária para treinar o algoritmo de agrupamento


### 3. KMeans para Agrupamento de Cores



```bash
kmeans = KMeans(n_clusters=n_cores, random_state=42, n_init=10)
kmeans.fit(arr)
```

KMeans: Um algoritmo de clusterização que agrupa os pixels em n_cores grupos ou clusters de cores semelhantes (grupos de pontos). 

Cada cluster terá:
- Centroide: Representa a "cor média" do cluster - essa será uma das cores predominantes.
- Labels: Cada pixel recebe um rótulo que indica o cluster ao qual pertence.

Configurações no KMeans:
n_clusters: Indica o número de agrupamentos correspondentes às cores principais.
random_state=42: Para garantir resultados reprodutíveis.
n_init=10: Treina o modelo 10 vezes e escolhe o melhor resultado.

Os clusters ajudam a resumir a imagem encontrando as cores predominantes sendo extremamente útil porque ao inves de trabalhar com milhões de pixéis, já resume a imagem em 5 cores principais.

### 4. Extração das Cores Predominantes

```bash
cores = kmeans.cluster_centers_.astype(int)
```

cluster_centers_: Após o treinamento, o modelo KMeans fornece as coordenadas RGB de cada centroide.
astype(int): Os valores RGB são convertidos para inteiros, já que cores não podem ter valores decimais, o padr~ao RGB funciona desta forma, isso já poupa um trabalho no momento em que passo os dados para o frontend apresentar. 

### 5. Frequência de cada cor

```bash
labels = kmeans.labels_
counts = np.bincount(labels)  # Frequência de cada cluster
total = counts.sum()
porcentagens = counts / total * 100
```

kmeans.labels_: Retorna um array em que cada pixel é associado a um dos clusters. Cada número no array corresponde a um cluster (0 = cluster 1, 1 = cluster 2, e etc).
np.bincount(labels): Conta quantos pixels pertencem a cada cluster.
counts / total * 100: Calcula a proporção de cada cluster (em relação ao total de pixels)


## Complexidade 

-Redimensionamento da imagem: Reduz o tempo de processamento exponencialmente ao trabalhar com menos pixels.
    
- KMeans (O(n * k * i)):
        n: Número de pixels.
        k: Número de clusters (ou cores predominantes).
        i: Número de iterações do algoritmo KMeans.

Em geral, o resize deixa o fluxo bem mais rapido e torna o algoritmo aplicavel para imagens grandes.
