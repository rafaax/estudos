# Arduino

Sketches para Arduino e ESP32.

| Pasta | Conteúdo |
|---|---|
| [`sensor-temperatura`](sensor-temperatura) | Leitura de temperatura com um sensor DS18B20. |
| [`display-tft-serial-msgs`](display-tft-serial-msgs) | Display TFT com touch que exibe mensagens recebidas pela serial. |
| [`led-firebase`](led-firebase) | Controle de um LED pelo Firebase, com ESP32. |
| [`reset-esp32`](reset-esp32) | Reinício de um ESP32 por comando no Firebase. |
| [`soma-trigonometrica`](soma-trigonometrica) | Soma de cosseno, seno e tangente, com saída na serial. |
| [`tcc-senai`](tcc-senai) | Projeto Morpheus, TCC do SENAI: ESP32 com sensores capacitivos que contam peças numa esteira e enviam os dados ao Firebase. |
| [`lcdwiki-kbv`](lcdwiki-kbv) | Biblioteca de terceiros para displays LCD paralelos, com suporte ao ST7789V adicionado. |

Os projetos que usam Wi-Fi e Firebase esperam um arquivo `secrets.h` local, que não é versionado. Use o `secrets.example.h` de cada pasta como modelo.
