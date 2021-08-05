#include <IOXhop_FirebaseESP32.h>
#include <WiFi.h> 
#include "secrets.h"
String fireStatus = "";  
void setup() {

  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("conectando");
  while (WiFi.status() !=WL_CONNECTED) 
  Serial.println();
  Serial.print("conectado");
  Serial.println(WiFi.localIP());

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.setString("Morpheuzada/RESET", "OFF");
}

  
void loop() { 
  fireStatus = Firebase.getString("Morpheuzada/RESET");
  if (fireStatus == "true") {
    Serial.println("REINICIANDO");
    ESP.restart();
}}
