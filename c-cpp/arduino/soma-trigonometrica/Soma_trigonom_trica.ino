float trigonometria[2]; //Definir Numero decimal
float soma = 0; //Definir soma
void setup()
{
  Serial.begin(115200); //Velocidade
  Serial.println("Equação Trigonométrica"); //Comunicar ("")
}

void loop()
{
  for(int i = 0; i < 3; i++) //Um numero inteiro = 0 ou < 3
  {
    trigonometria[i] = random(0,628); //Numero aleatório de 0 até 628
    trigonometria[i] = (trigonometria[i])/100; //Dividir numero anterior por 100
  }
}
