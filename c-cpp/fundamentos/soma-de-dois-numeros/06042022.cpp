#include <iostream>
#include <stdio.h>
/*============================================
objetivo: somar dois numeros que o usuario inserir
=====================*/
main()
{
	/*================================///=
	declaração de variaveis
	=========================*/
	int num1 = 0;
	int num2 = 0;
	int soma = 0;
	
	/*=================*/
	printf("Digite o primeiro numero = \n");
	scanf("%d", &num1);	
	printf("Digite o segundo numero = \n");
	scanf("%d", &num2);
	soma = num1 + num2;
	printf("A soma de %d + %d e igual a %d \n", num1, num2, soma);
	
	char nome[0]; 
	printf("Digite seu nome = \n");
	scanf("%s", nome);
	printf("Como vai %s \n", nome);
	
	int idade = 0;
	printf("Digite a sua idade = \n");
	scanf("%d", &idade);
	printf("Como vai %s, a sua idade e %d \n", nome, idade);
	
	
	int nota1, nota2;
	printf("Quanto voce tirou na primeira prova? \n");
	scanf("%d", &nota1);
	printf("Quanto voce tirou na segunda prova? \n");
	scanf("%d", &nota2);
	
	int media = (nota1 + nota2)/2;
	printf("Sua media foi igual a %d \n", media);
	
	if(media > 6)
		printf("vc passou");
	else 
		printf(" \a voce reprovou!");
	
	/*==========================
	06/04/2022
	=======================*/
	
		
			
		
	
	
	
	
	
	
	
	
}

