#include <WiFi.h> 
#include "secrets.h"

void setup() {

  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("conectando");
  while (WiFi.status() !=WL_CONNECTED) 
  Serial.println();
  Serial.print("conectado");
  Serial.println(WiFi.localIP());
}

void loop() { 
}
