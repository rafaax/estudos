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

arvore* buscaNaArvore(int value, arvore* no){
    if (no == NULL) {
        // printf("Valor %d nao encontrado na árvore.\n", value);
        return NULL; 
    }
    if(value < no->valor){
        no = buscaNaArvore(value, no->esq );
        return no;
    }else if(value > no->valor){
        no = buscaNaArvore(value, no->dir);
        return no;
    }
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


int main(){
    
    arvore* arvore;
    arvore = criarArvore(); // == NULL
    printf("Digite o valor do no a ser inserido 1 \n");
    int valor;
    scanf("%d", &valor);
    arvore = insereNoArvore(valor, arvore);
    
    printf("Digite o valor do no a ser inserido 2 \n");
    scanf("%d", &valor);
    arvore = insereNoArvore(valor, arvore);
    printf("Digite o valor do no a ser inserido 3 \n");
    scanf("%d", &valor);
    arvore = insereNoArvore(valor, arvore);
    printf("Digite o valor do no a ser inserido 4 \n");
    scanf("%d", &valor);
    arvore = insereNoArvore(valor, arvore);
    printf("Digite o valor do no a ser inserido 5 \n");
    scanf("%d", &valor);
    arvore = insereNoArvore(valor, arvore);
    printf("Digite o valor do no a ser inserido 6 \n");
    scanf("%d", &valor);
    arvore = insereNoArvore(valor, arvore);
    printf("Digite o valor do no a ser inserido 7 \n");
    scanf("%d", &valor);
    arvore = insereNoArvore(valor, arvore);
    printf("Digite o valor do no a ser inserido 8 \n");
    scanf("%d", &valor);
    arvore = insereNoArvore(valor, arvore);
    printf("Digite o valor do no a ser inserido 9 \n");
    scanf("%d", &valor);
    arvore = insereNoArvore(valor, arvore);
    
    
    printf("Digite o valor que deseja procurar \n");
    int valor_procurar;
    scanf("%d", &valor_procurar);
    
    // arvore* valorEncontrado;
    // valorEncontrado = criarArvore(); // == NULL
    
    
    if (buscaNaArvore(valor_procurar, arvore) == NULL) {
        printf("Valor %d não foi encontrado na árvore.\n", valor_procurar);
    } else {
        printf("Valor %d foi encontrado na arvore no endereço de memoria %p \n", valor_procurar, buscaNaArvore(valor_procurar, arvore));
    }
    
    imprimirArvore(arvore);
    
    
    return 0;
};
