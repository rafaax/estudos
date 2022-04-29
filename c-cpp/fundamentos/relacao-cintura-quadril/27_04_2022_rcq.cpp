#include <stdio.h>
#include <locale.h>
main()
{
/*===================================================================
 RAPHAEL GUSTAVO MEIRELES & GUILHERME HENRIQUE MACHADO RIBEIRO
RGM : 12345678
RGM : 
=====================================================================*/ 
setlocale (LC_ALL, "portuguese");
float quadril; // declaraçao de variaveis0- 
float cintura;   
float rcq;
int sexo; 
int idade;

printf("Iremos calcular seu RCQ! \n");
printf("Você é homem ou mulher? digite 1 para homem 2 para mulher \n");
scanf("%d", &sexo);
printf("Digite sua idade \n");
scanf("%d", &idade);

if(sexo == 1) { 
        printf("Qual é o tamanho da  sua cintura?(em cm) \n");
        scanf("%f", &cintura);
        printf("Qual é o tamanho do seu quadril? \n");
        scanf("%f", &quadril);
        rcq = cintura / quadril;
        printf("Seu Rcq é de = %f \n", rcq);
        if((idade >= 0)&&(idade <= 29)){
        	if((rcq >= 0)&&(rcq <= 0.83)){
        		printf("Seu risco de saúde é baixo \n");
			}
				else if((rcq >= 0.83)&&(rcq <= 0.88)){
					printf("Seu risco de saúde é mediano \n");
				}
					else if((rcq >= 0.89)&&(rcq <= 0.94)){
					printf("Seu risco de saúde é alto \n");
					}
						else{
						printf("Seu risco de saúde é muito alto \n");
						}	
							
		}
}
}
