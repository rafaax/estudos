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


no* insereFinal(no *P)
{
	no *novo = (no*) malloc(sizeof(no));
	printf("Insira o valor que será armazenado no fim: ");
	scanf("%d", &novo->info);
	novo->prox = NULL;
	
	
	if(P->info == 0 && P->prox == NULL)
	{
		P->info = novo->info;
	}else
	{
		
		no *T = P->prox;
		while(T->prox != NULL){
			T = T->prox;
		}
		
		T->prox = novo;
	}
	
	return P;
}

void exibe(no *P)
{
	no* T = P;
	do{
	
	printf("%d,", T->info);
	T = T->prox;	//O T aponta para o endereco do proximo elem
	}while(T != NULL);
	printf("\n \n");
	system("pause");
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
			case 2: 
				//inserir o final
				insereFinal(P);
				break;
			case 3:
				//exibir
				exibe(P);
				break;	
			default:
				printf("opcao invalida!!\n");
				system("pause");	
		}
	}while(op != 0);
	
	free(P);
	P = NULL;
	return 0;
}
