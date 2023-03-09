#include <stdio.h>
#include <stdlib.h>


//criar o registo
struct st_no{
	int info;
	struct st_no *prox;
};


typedef struct st_no no;

void inicia(no *P)
{
	P->info = 0;
	P->prox = NULL;
	
}

no* insereInicio(no *P)
{
	// criando novo ponteiro que aponta pra um no
	no *novo = (no*) malloc(sizeof(no));
	printf("informe o valor que sera armazenado em info:");
	scanf("%d", &novo->info);
	novo->prox = NULL;
	
	if(P->info == 0 && P->prox == NULL)
	{
		P->info = novo->info;
	}else
	{
		novo -> prox = P;
		P = novo;
	}
	//free(novo);
	
	return P;
}

int main() 
{
	//alocar no ponteiro P o registro(no)	
	no *P = (no*) malloc(sizeof(no));
	
	//inicializar
	inicia(P);
	
	int op;
	do
	{
		system("cls");
		printf("Menu de opcoes \n \n");
		printf("1 - Inserir no inicio da lista: \n");
		printf("2 - Inserir no final da lista: \n");
		printf("3 - exibir a lista: \n");
		printf("0 - Sair: \n");
		scanf("%d", &op);
		
		switch(op)
		{
			case 0:
				printf("Finalizando o programa!!");
				break;
			case 1:
				//inserir o inicio
				P = insereInicio(P);
				break;
		}
	}while(op != 0);
	
	free(P);
	P = NULL;
	return 0;
}
