// bibliotecas
#include <stdio.h>
#include <stdlib.h>
//

// definição da struct arvore
struct st_arvore{
    int valor;
    struct st_arvore* esq;
    struct st_arvore* dir;
};
//

// abreviacao da struct
typedef struct st_arvore arvore;
//

arvore* criarArvore(){
    return NULL;
}

arvore* insereNoArvore(int value, arvore* no){
    if(no == NULL){
        no = (arvore*)malloc(sizeof(arvore));
        no->valor = value;
        no->esq = NULL;
        no->dir = NULL;
        
        return no;
    }else{
        
        if(value <= no->valor){
            no->esq = insereNoArvore(value, no->esq);
        }else if(value > no->valor){
            no->dir = insereNoArvore(value, no->dir);
        }
        
        return no;
    }
}


void imprimirArvore(arvore* no){

    if(no->esq == NULL){
        printf(" NULL ");
    }else{
        imprimirArvore(no->esq);
    }
        printf("%d",no->valor);
    if(no->dir == NULL){
        printf(" NULL ");
    }else{
        imprimirArvore(no->dir);
    }
}
