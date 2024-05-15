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
