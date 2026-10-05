# CS2 Market Watch

Interface para acompanhar o mercado de skins do CS2. Busca skins, mostra o preço em BitSkins, CSFloat e Steam (convertido para reais) e exibe o histórico de preço em um gráfico, que pode alternar entre os dados da Steam e do BitSkins. As skins acompanhadas ficam salvas no navegador (`localStorage`).

## Estrutura

| Pasta | Conteúdo |
|---|---|
| `client/` | Interface em React 19, Vite e TypeScript, com gráficos do Recharts. |
| `server/` | Servidor Node.js com Express 5 que consulta as APIs externas. |

## Como executar

Servidor (porta 3001):

```bash
cd server
npm install
cp .env.example .env     # preencha as variáveis abaixo
npm run dev              # ou: npm start
```

Interface:

```bash
cd client
npm install
npm run dev
```

A interface chama o servidor diretamente em `http://localhost:3001`, então o servidor precisa estar rodando.

## Variáveis de ambiente (`server/.env`)

| Variável | Uso |
|---|---|
| `BITSKINS_API_KEY` | Chave da API do BitSkins. Obrigatória: sem ela o servidor exibe um erro e encerra ao iniciar. |
| `BITSKINS_SECRET` | Segredo de 2FA (TOTP) da conta do BitSkins, usado para gerar o código de autenticação das requisições. Obrigatório, como a chave acima. |
| `CSFLOAT_API_KEY` | Chave da API do CSFloat, usada para buscar os preços de anúncios. |
| `STEAM_LOGIN_SECURE` | Cookie `steamLoginSecure` da sessão da Steam, usado para ler o histórico de preços do Steam Market. |
| `PORT` | Porta do servidor (padrão `3001`). |

`BITSKINS_SECRET` e `STEAM_LOGIN_SECURE` são credenciais sensíveis: nunca as versione. O `.gitignore` já ignora o `server/.env`.

## Rotas do servidor

- `GET /api/skins/search`: busca skins e seus preços.
- `GET /api/skins/history/:skinId`: histórico de preço de uma skin.
- `GET /api/skins/price/steam`: preço de uma skin na Steam.

## Fontes de dados

BitSkins, CSFloat, Steam Community Market, [AwesomeAPI](https://docs.awesomeapi.com.br/) (cotação do dólar) e o banco de skins do projeto [ByMykel/CSGO-API](https://github.com/ByMykel/CSGO-API).
