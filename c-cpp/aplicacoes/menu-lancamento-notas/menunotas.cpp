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
	}while(decisao < 6);
}
