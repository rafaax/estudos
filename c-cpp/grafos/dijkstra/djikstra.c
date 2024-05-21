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

void teoria_grafos(){
	int opcao;

	do{
		
		system("cls");
		printf("[1] - Saiba mais sobre o algoritmo de Dijkstra \n");
		printf("[2] - Saiba sobre as características do grafo para aplicar o algoritmo \n");
		printf("[3] - Saiba sobre a estrutura para o algoritmo  \n");
		printf("[4] - Voltar \n");
		scanf("%d", &opcao);
		// 
		switch(opcao){
			case 1:
				// explicando algoritmo djikstra
				printf("A funcao do algoritmo de Dijkstra eh encontrar o caminho de um vertice de origem para todos demais vertices em grafos com custos positivos nas arestas \n em outras palavras o algoritmo consiste em encontrar um caminho inimo de um vertice fonte para todos os outros vertices \n");
				break;
			case 2:
				printf("O grafo para aplicacao de Dijkstra deve ser: \n ");
				printf(" 	- Conexo \n ");
				printf(" 	- Direcionado \n ");
				printf(" 	- Ponderado \n ");
				printf(" 	- Aciclico \n ");
				break;
			case 3:
				printf("Para a aplicação de um algoritmo de Dijkstra utilizamos a estrutura de dados em heap");
				break;
			case 4: 
				return;
				break;
			default:
				printf("Opcao invalida!!");
				break;
		
		}
		system("pause");
	}while(opcao != 0 );
	
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


int indiceMinimo(int peso[], int visitados[], int total_vertices){
	int min = INT_MAX;
	int i; 
	int indice_minimo = -1;
	
	for(i = 0; i < total_vertices; i++){
		if(visitados[i] == 0 && peso[i] <= min){
			min = peso[i];
			indice_minimo = i;
		}
	}
	
	return indice_minimo;
}


void dijkstra(int grafo[6][6]){
	
	int total_vertices = 6;
	int ponto_inicial = 0;
	int destino = 5;
	int soma_trajeto; 
	int vertices_visitados[total_vertices];
	int peso[total_vertices];
	int caminho_anterior[total_vertices];
	int i,k,y,x;
	
	for(i = 0; i < total_vertices; i++ ){
		peso[i] = INT_MAX;
		vertices_visitados[i] = 0;
		caminho_anterior[i] = -1;
	}
	
	
	peso[ponto_inicial] = 0;
	
	for(k = 0; k < total_vertices; k++){
		int indice_encontrado = indiceMinimo(peso, vertices_visitados, total_vertices);
		
		vertices_visitados[indice_encontrado] = 1;
		
		int z; 
		
		for(z = 0; z < total_vertices; z++){
			if(vertices_visitados[z] == 0 && grafo[indice_encontrado][z] && peso[indice_encontrado] != INT_MAX && peso[indice_encontrado] + grafo[indice_encontrado][z] < peso[z]){
				peso[z] = peso[indice_encontrado] + grafo[indice_encontrado][z];
				caminho_anterior[z] = indice_encontrado;
			}
		}
	}
	
	printf("Caminho minimo de A para F: ");
	
	int caminho[total_vertices];
	int contador = 0;
	
    while (destino != -1) {
        caminho[contador++] = destino;
        destino = caminho_anterior[destino];
    }

    for (i = contador - 1; i >= 0; i--) {
        printf("%c", 'A' + caminho[i]);
        if (i != 0){
        	printf(" - ");	
		} 
    }
    printf("\n");
	
	printf("Sendo o valor: %d \n", peso[5]);
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
	
	int grafo[6][6];

//		# A B C D E F
//	# A  0 4 0 5 0 0 
//	# B 0 0 4 0 0 0 
//	# C 0 0 0 0 0 3
//	# D 0 0 0 0 2 4 
//	# E 0 0 0 0 0 3
//	# F 0 0 0 0 0 0 
	
	
	
	
	do{
		system("cls");
		printf("[1] - Registre o tempo em media do motorista entre os pontos \n");
		printf("[2] - Visualize os pontos e seu tempo medio \n");
		printf("[3] - Saiba a rota mais rapida para o motorista \n");
		printf("[4] - INFORMACOES DO SISTEMA \n");
		printf("[5] - Saiba mais sobre TEORIA DOS GRAFOS \n");
		printf("[0] - Sair: \n");
		printf("Opcao: ");
		scanf("%d", &op);
		
		switch(op){
			case 1:
				representacao_grafo();
				grafo[6][6] = inserirPeso(6,6, grafo);
				break;
			case 2:
				representarGrafoPesos(grafo);
				break;
			case 3:
				dijkstra(grafo);
				break;
			case 4:
				informacoes_sistema();
				break;
			case 5:
				teoria_grafos();
				break;
			default:
				printf("Opcao invalida!! \n");
				break;
		}
		system("pause");
	}while(op != 0);
	return 0;	
}
