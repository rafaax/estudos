#include <iostream>
#include <stdio.h>
#include <string.h>

/*==================================================
23/05/22
PROJETO PROFESSORA PATRICIA
RAPHAEL GUSTAVO MEIRELES
GUILHERME HENRIQUE MACHADO RIBEIRO
====================================================*/
main()
{
	setlocale(LC_ALL,"portuguese");
	int qtalunos;
	printf("Digite quantos alunos você deseja cadastrar. \n");
	scanf("%d",&qtalunos);
	char nome[qtalunos][20];
	int i, decisao, busca;
	float nota1[qtalunos];
	float nota2[qtalunos];
	float trab1[qtalunos];
	float trab2[qtalunos];
	float pi[qtalunos];
	float media[qtalunos];
	float mediatotal, mediasala;
	char nomeescolhido[20];
	
	do
	{
		printf("Digite: \n 1 para cadastrar os alunos \n 2 para lançar notas  \n 3 para consultar o boletim de um aluno específico \n 4 para consultar o boletim de todos alunos  \n 5 para calcular média geral da turma \n e 6 para sair! \n");
		scanf("%d", &decisao);
		system("cls");
		if(decisao == 1)
		{
			
			for(i= 1; i<=qtalunos; i++)
			{
				printf("Digite o(s) nome(s) do(s) aluno(s). \n");
				scanf("%s", &nome[i]);
			}			
		}else
			if(decisao == 2)
			{
				for(i = 1; i <= qtalunos; i++)
				{
					printf("Digite a nota 1 do aluno %s ",&nome[i]);
					scanf("%f",&nota1[i]);
					printf("Digite a nota 2 do aluno %s ",&nome[i]);
					scanf("%f",&nota2[i]);
					printf("Digite a trab 1 do aluno %s ",&nome[i]);
					scanf("%f",&trab1[i]);
					printf("Digite a trab 2 do aluno %s ",&nome[i]);
					scanf("%f",&trab2[i]);
					printf("Digite a pi do aluno %s ",&nome[i]);
					scanf("%f",&pi[i]);
					media[i] = ((nota1[i] * 0.15) + (nota2[i] * 0.15) + (trab1[i] * 0.1) + (trab2[i] * 0.1) + (pi[i] * 0.5));
				
				}
			}else
				if(decisao == 3)
				{	
					printf("Qual aluno você deseja consultar o boletim? \n");
					scanf("%s", &nomeescolhido);
					for(i=1; i<=qtalunos; i++)
					{
						if(strcmp(nomeescolhido,nome[i])==0)
					{	
					printf("A boletim do aluno %s é de: ", &nome[i]);
					printf("==========================================\n");
					printf("        BOLETIM ALUNO %s               \n",&nome[i]);
					printf("==========================================\n");
					printf("Prova 1    | Prova 2    | Trab 1    | Trab 2    | PI       | MÉDIA \n");
					printf("%.2f       | %.2f       | %.2f      | %.2f      | %.2f     | %.2f \n ",(nota1[i]),(nota2[i] ),(trab1[i]),(trab2[i]),(pi[i]),(media[i]));								system("pause");
					}	
					}
				}else
					if(decisao == 4)
					{					
						for(i=1; i<=qtalunos; i++)
						{
							printf("================================\n");
							printf("        BOLETIM ALUNO %s               \n",&nome[i]);
							printf("================================\n");
							printf("Prova 1    | Prova 2    | Trab 1    | Trab 2    | PI       | MÉDIA \n");
							printf("%.2f       | %.2f       | %.2f      | %.2f      | %.2f     | %.2f \n ",(nota1[i]),(nota2[i] ),(trab1[i]),(trab2[i]),(pi[i]),(media[i]));																								
						}
					}else 
						if(decisao == 5)
						{
							mediasala == 0;
							for (i=1;i <= qtalunos; i++) 
								{
									mediasala = mediasala + media[i];
									mediatotal = mediasala / qtalunos;
								}
							printf("A média de todos alunos é de %.2f \n", mediatotal);
						}	
							
	}while(decisao < 6);
	
	
	
}
