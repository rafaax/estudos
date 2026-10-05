# Pokédex

Pokédex em React (Create React App) com Material UI. Ao abrir, consulta a [PokéAPI](https://pokeapi.co/) e mostra os primeiros 199 Pokémon em cartões, com nome e imagem. A barra de busca no topo filtra a lista pelo nome.

## Tecnologias

React 18, Material UI e `axios`. Os componentes e a página principal estão em arquivos `.tsx`.

## Como executar

```bash
npm install
npm start      # abre em http://localhost:3000
```

Outros scripts: `npm run build` (versão de produção) e `npm test`.

> O `package.json` não lista a dependência `typescript`. Se o `npm start` pedir por ela, instale com `npm install --save-dev typescript`. Não executei o projeto ao escrever este README.
