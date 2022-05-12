#include <iostream>
#include <stdio.h>
main()
{

int num1 = 0;
int num2 = 0;
int soma = 0;
int multi = 0;
int div = 0;
int sub = 0;
int media = 0;
int escolha;


do
{	
	
	printf("Digite: \n 1 - soma \n 2 - subtração \n 3 - multiplicacao \n 4 - divisao \n e 5 - para sair!");
	scanf("%d", &escolha);
	if(escolha >= 5)
	{
		printf("Codigo encerrando...");
		return 5;	
	}
	
	printf("Digite o primeiro numero = \n");
	scanf("%d", &num1);	
	printf("Digite o segundo numero = \n");
	scanf("%d", &num2);
	if(escolha == 1)
{
	soma = num1 + num2;
	printf("A soma dos numeros %d e %d e igual a %d \n \n", num1, num2, soma );
}	else 
		if(escolha == 2)
		{
			sub = num1 - num2;
			printf("A subtraçao dos numeros %d e %d e igual a %d \n \n", num1, num2, sub);
			
		}else
			if(escolha == 3)
			{
				multi = num1 * num2;
				printf("A multiplicacao dos numeros %d e %d e igual a %d \n \n", num1, num2, multi);
			}
				else
					if(escolha == 4)
					{
						div = num1 / num2;
						printf("A divisao dos numeros %d e %d e igual a %d \n \n", num1, num2, div);
					}


	
	
}while(escolha < 5);



//printf("A soma dos numeros %d e %d e igual a %d \n", num1, num2, soma );
//printf("A subtraçao dos numeros %d e %d e igual a %d \n", num1, num2, sub);
//printf("A divisao dos numeros %d e %d e igual a %d \n", num1, num2, div);
//printf("A multiplicacao dos numeros %d e %d e igual a %d \n", num1, num2, multi);


}

