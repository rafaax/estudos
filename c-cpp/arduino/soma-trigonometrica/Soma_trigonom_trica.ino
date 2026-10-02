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

  soma = cos(trigonometria[0]) + sin(trigonometria[1]) + tan(trigonometria[2]);

  Serial.print("Para: COS("); //Comunicar ("")
  Serial.print(trigonometria[0]); //Comunicar ("")
  Serial.print("):"); //Comunicar ("")
  Serial.println(cos(trigonometria[0]));//Comunicar de volta("")

  Serial.print("SEN(");//Comunicar ("")
  Serial.print(trigonometria[1]);//Comunicar ("")
  Serial.print("):");//Comunicar ("")
  Serial.println(cos(trigonometria[1]));//Comunicar de volta("")

  Serial.print("TG(");//Comunicar ("")
  Serial.print(trigonometria[2]);//Comunicar ("")
  Serial.print("):");//Comunicar ("")
  Serial.println(cos(trigonometria[2]));//Comunicar de volta("")

  Serial.print("SOMA =");//Comunicar ("")
  Serial.println(soma);//Comunicar de volta("")
  Serial.println("");//Comunicar de volta ("")
  Serial.println("");//Comunicar de volta("")
  delay(5000); //Espera de 5 segundos
}

