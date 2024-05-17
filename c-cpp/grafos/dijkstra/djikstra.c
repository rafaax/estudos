#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define INT_MAX 2147483647

void informacoes_sistema(){
	printf("====================== \n");
	printf("O sistema consiste em um algoritmo em Dijkstra \n");
	printf("para analisar o melhor caminho para o motorista de onibus chegar de um ponto inicial ao ponto final \n");
	printf("utilizando o menor tempo possivel! \n");
	printf("Temos as funcoes de registrar o tempo medio de ponto a ponto que seria o peso das arestas do grafo \n");
	printf("a funcao de visualizar todos os pontos da rota do motorista \n");
	printf("e a funcao de gerar a rota menos custosa para o motorista, a rota mais rapida, usando como base o algoritmo dijkstra \n");
	printf("======================\n");
}

void representacao_grafo(){
	system("cls");
	printf("                   |------e----| \n");
	printf("      |--------d---|           |----| \n");
	printf("      |            |---------|      | \n");
	printf("      |                      |------f \n");
	printf("A ----|                             |\n");
	printf("      |                             |\n");
	printf("      |-----b----------------c------|\n");
	printf("\n");
}

int inserirPeso(int linha, int coluna,int grafo[linha][coluna]){
	int i, k;
	
	for(i = 0; i <= linha; i++){
		for(k = 0; k <= coluna; k ++){
 			if(i == 0 && k == 1){ // A - B
				printf("Digite o tempo em minutos que o motorista demora para ir do ponto a -> b \n ");
				scanf("%d", &grafo[i][k]);
			}
			if(i == 0 && k == 3){ // A - D
				printf("Digite o tempo em minutos que o motorista demora para ir do ponto a -> d \n");
				scanf("%d", &grafo[i][k]);
			}
			if(i == 1 && k == 2){ // B - C 
				printf("Digite o tempo em minutos que o motorista demora para ir do ponto b -> c \n");
				scanf("%d", &grafo[i][k]);
			}
			if(i == 2 && k == 5){ // C - F
				printf("Digite o tempo em minutos que o motorista demora para ir do ponto c -> f \n");
				scanf("%d", &grafo[i][k]);
			}
			if( i == 3  && k == 4 ){ // D - E 
				printf("Digite o tempo em minutos que o motorista demora para ir do ponto d -> e \n");
				scanf("%d", &grafo[i][k]);
			}
			if( i == 3 && k == 5){ // D - F
				printf("Digite o tempo em minutos que o motorista demora para ir do ponto d -> f \n "); 
				scanf("%d", &grafo[i][k]);
			}
			if( i == 4 && k == 5){ // E - F
				printf("Digite o tempo em minutos que o motorista demora para ir do ponto e -> f \n");
				scanf("%d", &grafo[i][k]);
			}
		}
		printf("\n");
	}
	
	return grafo;
	
}

void representarGrafoPesos(int grafo[6][6]){
	system("cls");
	printf("                   |----%d-e----| \n", grafo[3][4]);
	printf("      |---%d---d---|            |--%d---| \n", grafo[0][3], grafo[4][5]);
	printf("      |            |------%d----|       | \n", grafo[3][5]);
	printf("      |                         |-------------f \n");
	printf("A ----|                                 |\n");
	printf("      |                                 |\n");
	printf("      |---%d----b------%d-----c---%d----|\n", grafo[0][1], grafo[1][2], grafo[2][5]);
	printf("\n");
}


int main(){
	int op;
	
	system("cls");
	printf("================ \n");
	printf("SISTEMA DE ITINERARIO DE ONIBUS DE MOGI DAS CRUZES \n");
	printf("DESENVOLVEDORES \n");
	printf("HENRY MURILO LAMPOGLIO \n");
	printf("RAPHAEL GUSTAVO MEIRELES \n");
	printf("================ \n\n");
	sleep(1);
	
	return 0;	
}
