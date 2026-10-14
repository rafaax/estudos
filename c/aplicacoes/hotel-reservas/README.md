# Hotel Reservas

Sistema de reservas de hotel em C, executado no terminal (o programa se apresenta como "Cyberia Hotel"). Projeto desenvolvido em grupo; as contribuições de cada pessoa estão no histórico de commits.

## Funcionalidades

O menu principal tem quatro áreas:

- **Quartos**: cadastro e atualização de quartos, com número, preço da diária e disponibilidade.
- **Serviços**: cadastro e atualização dos serviços oferecidos.
- **Clientes**: cadastro e edição de clientes.
- **Reservas**: criação, alteração e remoção de reservas, com datas de check-in e check-out.

Os dados ficam em arquivos JSON na pasta `storage/` (`clientes.json`, `quartos.json`, `servicos.json` e `reservas.json`), lidos e escritos com a biblioteca [cJSON](https://github.com/DaveGamble/cJSON), incluída em `src/cJSON.c` e `headers/cJSON.h`. Os dados de exemplo são fictícios.

## Estrutura

| Pasta ou arquivo | Conteúdo |
|---|---|
| `main.c` | Menu principal. |
| `src/` e `headers/` | Código de cada entidade (`cliente`, `quarto`, `reserva`, `servico`), funções utilitárias e a cJSON. |
| `storage/` | Arquivos JSON com os dados. |
| `docs/` | Diagrama de caso de uso, diagrama de entidade e relacionamento, fluxograma da reserva e documentação das entidades. |
| `project.dev` | Projeto do Dev-C++. |

## Como compilar e executar

O programa foi feito para **Windows**: usa `windows.h` e os comandos `cls` e `pause`. Abra o `project.dev` no Dev-C++ e compile; o Dev-C++ gera os arquivos auxiliares (como o `Makefile.win`) e o executável `project.exe`. Execute a partir da pasta do projeto, porque os caminhos de `storage/` são relativos. Não foi testado em Linux nem em macOS.
