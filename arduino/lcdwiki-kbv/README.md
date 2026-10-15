# LCDWIKI KBV

Biblioteca Arduino para displays LCD com barramento paralelo de 8 ou 16 bits, copiada de [lcdwiki/LCDWIKI_KBV](https://github.com/lcdwiki/LCDWIKI_KBV), com licença MIT (ver `LICENSE`).

O histórico desta pasta inclui os commits originais do lcdwiki. As alterações feitas aqui foram:

- suporte ao controlador ST7789V;
- ajustes de configuração relacionados a esse controlador.

Controladores aceitos: ILI9325, ILI9328, ILI9341, HX8357D, HX8347G, HX8347I, ILI9486, ST7735S e ST7789V. O modo de 8 ou 16 bits é escolhido em `lcd_mode.h`.

A biblioteca também precisa da [LCDWIKI_gui](https://github.com/lcdwiki/LCDWIKI_gui).

Os manuais em PDF, as imagens BMP de exemplo e o `.zip` da biblioteca foram removidos do histórico para reduzir o tamanho. Eles continuam no repositório original. O `README.txt` é o original do autor.
