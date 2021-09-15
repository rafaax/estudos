 #include <WiFi.h>
 #include "secrets.h"

 int LED_BUILTIN = 13;

 void setup()
 {
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(115200);

  WiFi.begin(usuario, senha);

  while (WiFi.status() !=WL_CONNECTED)
  {
    delay(500);
    Serial.println("Conectando ao wifi...");
  }
  Serial.print("Conectado");
 }
void loop()
 {
 }
