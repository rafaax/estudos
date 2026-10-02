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
int nota[5];
int media;
int i;
int decisao;
int pessoas;

//===================//*

do
{
	printf("Digite 1 para iniciar seu calculo e digite 2 para encerrar \n");
	scanf("%d", &decisao);
	if(decisao == 2)
	{
		printf("Codigo encerrando...");
		return 1;	
	}
	if(decisao == 1)
	{
		printf("Quantas pessoas voce ira calcular a media? \n");
		scanf("%d", &pessoas);
		for(i = 1; i <= pessoas; i++)
		{
			printf("Agora iremos calcular sua nota na UNIVERSIDADE BRAZ CUBAS! \n");
			printf("Digite sua primeira nota = \n");
			scanf("%d", &nota[1]);	
			printf("Digite sua segunda nota = \n");
			scanf("%d", &nota[2]);
			printf("Digite sua terceira nota = \n");
			scanf("%d", &nota[3]);
			printf("Digite sua quarta nota = \n");
			scanf("%d", &nota[4]);
			printf("Digite sua quinta nota = \n");
			scanf("%d", &nota[5]);
			media = 1*(nota[1] + nota[2]) + 1.5 * (nota[3] + nota[4]) + 5 * nota[5];
			printf("Sua media foi de %d! \n", media);
		}	
	}
}while(decisao==1);
}

