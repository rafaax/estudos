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
}while(decisao==1);
}
