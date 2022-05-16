#include <iostream>
#include <stdio.h>
main()
{

//==================//*
//GUILHERME HENRIQUE MACHADO RIBEIRO //
// RAPHAEL GUSTAVO MEIRELES//
//==================//*
	
//==================//*
//DECLARAÇÃO DE VARIAVEIS//
//==================//*
	
float gasolina = 7.04;
float alcool = 5.09;	
int km = 0;
float milhas = 0;
float metros = 0;
float centimetros = 0;
float consumo = 0;
float consumo2 = 0;
int decisao; 

do
{
	printf("Digite 1 para iniciar seu calculo e digite 2 para encerrar");
	scanf("%d", &decisao);
	if(decisao == 2)
	{
		printf("Codigo encerrando...");
		return 1;	
	}
	if(decisao = 1)
	{
		printf("Quantos km voce rodou com seu carro? = \n");
	scanf("%d", &km);
consumo = (km/10)*gasolina;
consumo2 = (km/8)*alcool;		
printf("Voce gastou %f reais de gasolina ou %f de alcool tendo em vista que a gasolina custa %f e o alcool %f \n", consumo, consumo2, gasolina, alcool);
printf("\n");

milhas = km * 0.62137;
metros = km / 0.001;
centimetros = km / 0.00001;
printf("%d km e igual a %f milhas %f metros e %f centimentros \n ", km, milhas, metros, centimetros);
	}
}while(decisao==1);

	
}
