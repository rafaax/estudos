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
	return 0;
}
