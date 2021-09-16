#include <Wire.h>        //Biblioteca para manipulação do protocolo I2C
#include <DS3231.h>    //Biblioteca para manipulação do DS3231

DS3231 rtc;

void setup()
{
  Serial.begin(115200);     //Inicialização da comunicação serial
  rtc.begin();            //Inicialização do RTC DS3231
  rtc.setDateTime(__DATE__, __TIME__);   //Configurando valores iniciais 
}

void loop()
{
}
