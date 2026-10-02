#include <string.h>
#include <LCDWIKI_GUI.h>
#include <LCDWIKI_KBV.h>
#include <SPI.h>
#include <SD.h>
#include <TouchScreen.h>

LCDWIKI_KBV mylcd(ILI9486, A3,A2,A1,A0,A4); //model,cs,cd,wr,rd,reset
TouchScreen ts = TouchScreen(8, A3, A2, 9, 300); 

#define BLACK   0x0000
#define BLUE    0x001F
#define RED     0xF800
#define GREEN   0x07E0
#define CYAN    0x07FF
#define MAGENTA 0xF81F
#define YELLOW  0xFFE0
#define WHITE   0xFFFF

uint32_t bmp_offset;
bool mensagemRecebida =  false;

uint16_t read_16(File &fp) {
  return fp.read() | (fp.read() << 8);
}

uint32_t read_32(File &fp) {
  return read_16(fp) | ((uint32_t)read_16(fp) << 16);
}

bool analysis_bmp_header(File &fp) {
  if (read_16(fp) != 0x4D42) return false;
  read_32(fp); read_32(fp);
  bmp_offset = read_32(fp);
  read_32(fp);
  if (read_32(fp) != 240 || read_32(fp) != 320) return false;
  if (read_16(fp) != 1) return false;
  read_16(fp);
  return read_32(fp) == 0;
}

void draw_bmp_from_sd(const char *filename, int16_t x_pos, int16_t y_pos) {
  File bmp_file = SD.open(filename);
  if (!bmp_file) return;
  bmp_file.seek(bmp_offset);

  uint8_t bmp_data[180];
  uint16_t bmp_color[60];

  for (uint16_t i = 0; i < 320; i++) {
    for (uint16_t j = 0; j < 4; j++) {
      bmp_file.read(bmp_data, 180);
      for (int k = 0, m = 0; k < 60; k++, m += 3) {
        bmp_color[k] = mylcd.Color_To_565(bmp_data[m + 2], bmp_data[m + 1], bmp_data[m]);
      }
      for (uint16_t l = 0; l < 60; l++) {
        mylcd.Set_Draw_color(bmp_color[l]);
        mylcd.Draw_Pixel(x_pos + j * 60 + l, y_pos + i);
      }
    }
  }
  bmp_file.close();
}

void sendMessageToDisplay(String mensagem) {
  int mensagemLength = mensagem.length();
  int x = 20;
  int y = 40;
  int linha = 0;

  if (mensagemLength > 120) {
    mensagem = mensagem.substring(0, 120);
    mensagemLength = mensagem.length();
  }

  // Apaga somente a área da mensagem
  mylcd.Set_Draw_color(0x0000);
  mylcd.Fill_Rectangle(10, 40, 100, 100);  // Apenas apaga a área da mensagem
  
  mylcd.Set_Text_Size(2.0);  
  mylcd.Set_Text_Back_colour(0x0000);
  mylcd.Set_Text_colour(0xFFFF);

  for (int i = 0; i < mensagemLength; i += 22) {
    if (linha >= 3) break;
      String linhaTexto = mensagem.substring(i, i + 22);
      mylcd.Print_String(linhaTexto.c_str(), x, y + (linha * 30));
      mylcd.Set_Text_colour(0xFFFF);
      linha++;
  }
}


void setup(){
  Serial.begin(9600);
  SD.begin(10);
  mylcd.Init_LCD();
}

void loop(){
  draw_bmp_from_sd("krai.bmp", 0, 0);

  if (Serial.available() > 0) {
    mylcd.Fill_Screen(0x0000);
    mensagemRecebida = true;
    String mensagem = Serial.readStringUntil('\n');
    mylcd.Set_Rotation(1);
    int btnX = (mylcd.Get_Display_Width() - 150) / 1.85; // Centralizado horizontalmente
    int btnY = (mylcd.Get_Display_Height() - 60) / 1; // Centralizado verticalmente
    mylcd.Set_Text_Size(1.75);
    mylcd.Fill_Rect(btnX, btnY, 150, 60, 0xF800);
    mylcd.Set_Text_colour(0xFFFF);
    mylcd.Print_String("Confirmar Mensagem", btnX + 20, btnY + 20);
    

    while(mensagemRecebida == true){
      
      sendMessageToDisplay(mensagem);
      delay(10000);
      mylcd.Fill_Screen(0x0000);
      mylcd.Set_Rotation(0);
      mensagemRecebida = false;
      break;

    }
  }
}