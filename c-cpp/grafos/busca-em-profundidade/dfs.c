#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_VERTICES 100

typedef struct {
    int items[MAX_VERTICES];
    int topo;
} Pilha;


void inicializandoPilha(Pilha *p) {
    p->topo = -1;
}

bool pilhaVazia(Pilha *p) {
    return p->topo == -1;
}

bool pilhaCheia(Pilha *p) {
    return p->topo == MAX_VERTICES - 1;
}

void push(Pilha *p, int vertex) {
    if (pilhaCheia(p)) {
        printf("pilha overflow\n");
        exit(EXIT_FAILURE);
    }
    printf("%d",p->topo);
    p->items[++(p->topo)] = vertex;
    printf("\n-- %d",p->topo);
}

int pop(Pilha *p) {
    if (pilhaVazia(p)) {
        printf("pilha underflow\n");
        exit(EXIT_FAILURE);
    }
    return p->items[(p->topo)--];
}

void DFS(int grafo[][MAX_VERTICES], int visitado[], int v_inicio, int vertices) {
	
    Pilha pilha;
    inicializandoPilha(&pilha);
    
    visitado[v_inicio] = 1;
    push(&pilha, v_inicio);
    printf("Resultado da busca em profundidade (DFS):\n");
}
