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

int main() 
{
	//alocar no ponteiro P o registro(no)	
	no *P = (no*) malloc(sizeof(no));
	
	//inicializar
	inicia(P);
	return 0;
}
