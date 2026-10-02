#include <iostream>
#include <stdio.h>
main()
{	
float gasolina = 7.04;
float alcool = 5.09;	
int km = 0;
float milhas = 0;
float metros = 0;
float centimetros = 0;
float consumo = 0;
float consumo2 = 0;
printf("Quantos km voce rodou com seu carro? = \n");
	scanf("%d", &km);
consumo = (km/10)*gasolina;
consumo2 = (km/8)*alcool;		
printf("Voce gastou %f reais de gasolina ou %f de alcool tendo em vista que a gasolina custa %f e o alcool %f \n", consumo, consumo2, gasolina, alcool);
printf("\n");

milhas = km * 0.62137;
metros = km / 0.001;
centimetros = km / 0.00001;
printf("%d km e igual a %f milhas %f metros e %f centimentros", km, milhas, metros, centimetros);
}
