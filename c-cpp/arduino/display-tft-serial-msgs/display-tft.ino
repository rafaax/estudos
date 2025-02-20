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

  if (Serial.available() > 0) {
    mylcd.Fill_Screen(0x0000);
    mensagemRecebida = true;
    String mensagem = Serial.readStringUntil('\n');
  }
}