# PaletteFinder

Aplicação Django para upload de imagens e extração automática das cores predominantes.

## ✨ Funcionalidades

- Upload de imagens diretamente pela interface web.  
- Extração das **5 cores predominantes** da imagem, exibidas em **RGB**, **HEX** e **CSS**.  
- Visualização da imagem enviada junto com sua paleta de cores.  
- Interface responsiva com **Bootstrap**.


## Estrutura do projeto

- core/models.py – Modelo Imagem com referência ao upload.

- core/forms.py – Formulário de upload de imagem.

- core/views.py – Lógica principal: upload, extração de cores e tratamento de erros.

- core/templates/core/upload.html – Interface do usuário.

- core/color_utils.py – Algoritmo para extração das cores predominantes.

## 📦 Dependências

- Django >= 3.2

- Pillow

## Banco de dados

O projeto utiliza SQLite (db.sqlite3) e eu prefiro utilizar o DBeaver para visualizar as informações. 