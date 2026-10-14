#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS A5

#define LED_PIN 13 // LED interno do Arduino Nano

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

unsigned long lastSerialSendTime = 0; // Armazena o tempo da última transmissão para a serial
unsigned long lastBlinkTime = 0;     // Armazena o tempo da última mudança do estado do LED
bool ledState = LOW;                 // Estado atual do LED para piscar

void setup(void) {
  sensors.begin();
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT); // Configura o LED interno como saída
  digitalWrite(LED_PIN, LOW); // Garante que o LED começa apagado
}

void loop(void) {
  sensors.requestTemperatures();

  float tempSensor1 = sensors.getTempCByIndex(0);
  float tempSensor2 = sensors.getTempCByIndex(1);

  // Variáveis para verificar o estado de cada sensor
  bool sensor1Invalid = (tempSensor1 == -127.0 || isnan(tempSensor1));
  bool sensor2Invalid = (tempSensor2 == -127.0 || isnan(tempSensor2));

  // Controle do LED
  if (sensor1Invalid && sensor2Invalid) {
    // Ambos os sensores são inválidos: LED aceso
    digitalWrite(LED_PIN, HIGH);
  } else if (sensor1Invalid || sensor2Invalid) {
    // Apenas um sensor é inválido: LED piscando
    if (millis() - lastBlinkTime >= 300) { // Alterna o estado do LED a cada 300 ms
      ledState = !ledState;
      digitalWrite(LED_PIN, ledState);
      lastBlinkTime = millis();
    }
  } else {
    // Ambos os sensores são válidos: LED apagado
    digitalWrite(LED_PIN, LOW);
  }

  // Verifica se é hora de enviar para a serial (a cada 5 minutos)
  if (millis() - lastSerialSendTime >= 300000) { // 300000 ms = 5 minutos
    String message = "1," + String(tempSensor1) +
                     ",2," + String(tempSensor2);

    Serial.println(message);
    lastSerialSendTime = millis(); // Atualiza o tempo da última transmissão
  }

  delay(300); // Delay de 300 ms para a verificação do LED
}