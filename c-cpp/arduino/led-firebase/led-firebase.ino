 #include <ArduinoJson.h> 
 #include <IOXhop_FirebaseESP32.h> 
 #include <WiFi.h>
 #include "secrets.h"

 String fireStatus = "";

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
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH); 
 }
void loop()
 {
  fireStatus = (Firebase.getString("/Morpheuszada/LED"));
  Serial.print(Firebase.getString("/Morpheuszada/LED"));
  Serial.println();
 }
