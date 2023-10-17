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
