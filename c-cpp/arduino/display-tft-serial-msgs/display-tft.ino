#include <string.h>
#include <LCDWIKI_GUI.h>
#include <LCDWIKI_KBV.h>
#include <SPI.h>
#include <SD.h>
#include <TouchScreen.h>

LCDWIKI_KBV mylcd(ILI9486, A3,A2,A1,A0,A4); //model,cs,cd,wr,rd,reset
TouchScreen ts = TouchScreen(8, A3, A2, 9, 300); 
