#include <stdio.h>
#include <locale.h>
main()
{
/*===================================================================
 RAPHAEL GUSTAVO MEIRELES & GUILHERME HENRIQUE MACHADO RIBEIRO
RGM : 28994892
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
		if((idade >= 30)&&(idade <= 39)){
		 	if((rcq >= 0)&&(rcq <= 0.84)){
        		printf("Seu risco de saúde é baixo \n");
			}
				else if((rcq >= 0.85)&&(rcq <= 0.91)){
					printf("Seu risco de saúde é mediano \n");
				}
					else if((rcq >= 0.92)&&(rcq <= 0.96)){
					printf("Seu risco de saúde é alto \n");
					}
						else{
						printf("Seu risco de saúde é muito alto \n");
						}}
			
		if((idade >= 40)&&(idade <= 49)){
		 	if((rcq >= 0)&&(rcq <= 0.88)){
        		printf("Seu risco de saúde é baixo \n");
				}
				else if((rcq >= 0.89)&&(rcq <= 0.95)){
					printf("Seu risco de saúde é mediano \n");
						}
						else if((rcq >= 0.96)&&(rcq <= 1.0)){
						printf("Seu risco de saúde é alto \n");
						}
							else{
							printf("Seu risco de saúde é muito alto \n");
							}}
							
		if((idade >= 50)&&(idade <= 59)){
		 	if((rcq >= 0)&&(rcq <= 0.90)){
        		printf("Seu risco de saúde é baixo \n");
			}
				else if((rcq >= 0.91)&&(rcq <= 0.96)){
					printf("Seu risco de saúde é mediano \n");
				}
					else if((rcq >= 0.97)&&(rcq <= 1.02)){
					printf("Seu risco de saúde é alto \n");
					}
						else{
						printf("Seu risco de saúde é muito alto \n");
						}}	
						
		if((idade >= 59)){
		 	if((rcq >= 0)&&(rcq <= 0.91)){
        		printf("Seu risco de saúde é baixo \n");
			}
				else if((rcq >= 0.92)&&(rcq <= 0.98)){
					printf("Seu risco de saúde é mediano \n");
				}
					else if((rcq >= 0.99)&&(rcq <= 1.03)){
					printf("Seu risco de saúde é alto \n");
					}
						else{
						printf("Seu risco de saúde é muito alto \n");
						}}
}

if(sexo == 2) { 
        printf("Qual é o tamanho da  sua cintura?(em cm) \n");
        scanf("%f", &cintura);
        printf("Qual é o tamanho do seu quadril? \n");
        scanf("%f", &quadril);
        rcq = cintura / quadril;
        printf("Seu Rcq é de = %f \n", rcq);
        if((idade >= 0)&&(idade <= 29)){
        	if((rcq >= 0)&&(rcq <= 0.71)){
        		printf("Seu risco de saúde é baixo \n");
			}
				else if((rcq >= 0.72)&&(rcq <= 0.77)){
					printf("Seu risco de saúde é mediano \n");
				}
					else if((rcq >= 0.78)&&(rcq <= 0.82)){
					printf("Seu risco de saúde é alto \n");
					}
						else{
						printf("Seu risco de saúde é muito alto \n");
						}	
							
		}
		if((idade >= 30)&&(idade <= 39)){
		 	if((rcq >= 0)&&(rcq <= 0.72)){
        		printf("Seu risco de saúde é baixo \n");
			}
				else if((rcq >= 0.73)&&(rcq <= 0.78)){
					printf("Seu risco de saúde é mediano \n");
				}
					else if((rcq >= 0.79)&&(rcq <= 0.84)){
					printf("Seu risco de saúde é alto \n");
					}
						else{
						printf("Seu risco de saúde é muito alto \n");
						}}
			
		if((idade >= 40)&&(idade <= 49)){
		 	if((rcq >= 0)&&(rcq <= 0.73)){
        		printf("Seu risco de saúde é baixo \n");
				}
				else if((rcq >= 0.74)&&(rcq <= 0.79)){
					printf("Seu risco de saúde é mediano \n");
						}
						else if((rcq >= 0.80)&&(rcq <= 0.87)){
						printf("Seu risco de saúde é alto \n");
						}
							else{
							printf("Seu risco de saúde é muito alto \n");
							}}
							
		if((idade >= 50)&&(idade <= 59)){
		 	if((rcq >= 0)&&(rcq <= 0.74)){
        		printf("Seu risco de saúde é baixo \n");
			}
				else if((rcq >= 0.75)&&(rcq <= 0.81)){
					printf("Seu risco de saúde é mediano \n");
				}
					else if((rcq >= 0.82)&&(rcq <= 0.88)){
					printf("Seu risco de saúde é alto \n");
					}
						else{
						printf("Seu risco de saúde é muito alto \n");
						}}	
						
		if((idade >= 59)){
		 	if((rcq >= 0)&&(rcq <= 0.76)){
        		printf("Seu risco de saúde é baixo \n");
			}
				else if((rcq >= 0.77)&&(rcq <= 0.83)){
					printf("Seu risco de saúde é mediano \n");
				}
					else if((rcq >= 0.84)&&(rcq <= 0.90)){
					printf("Seu risco de saúde é alto \n");
					}
						else{
						printf("Seu risco de saúde é muito alto \n");
						}}
}

}


