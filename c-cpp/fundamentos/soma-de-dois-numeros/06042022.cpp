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
}
