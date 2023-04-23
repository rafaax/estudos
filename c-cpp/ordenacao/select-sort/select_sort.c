#include <stdio.h>
#include <stdlib.h>


//subrotina para ordenar 


void select_sort(int vet[], int i){ // retorna void [int vet[], int numero de digitos para ordenar
	
	int x, y, menor, troca; // declara x para o primeiro for, y para o segundo for, 
	//menor para armazenar o valor menor após fazer a verificação do if, troca para armazenar e fazer a troca dos valores 
	
	for(x = 0; x < (i - 1); x++){ // for para percorrer variavel x 
		menor = x;  // declara menor para x e ela muda ao decorrer do for 
		for(y = (x+1); y < i; y++){ // for para percorrer variavel y e fazer a verificacao com os digitos a seguir para fazer a comparacao
			if(vet[y] < vet[menor])	{ // se o vetor[2] = 3 for menor que o vetor[1] = 4 por exemplo, a variavel menor recebe o valor do y, menor = 3; 
				menor = y; // menor recebe 3 no nosso exemplo
			} 
		}
		if(x != menor){ // se o nosso x = valor do primeiro for, menor que a variavel menor fará a condicao da troca
			troca = vet[x]; // variavel troca recebe o vetor maior vet[1] = 4;
			vet[x] = vet[menor]; // vet[1] 4 = vet[2] = 3 // ela vira: vet[2] = 4
			vet[menor] = troca; // vet[1] = 3
		}
	}	
}

int main(){
	int vet[6] = {7,5,13,3,15,10};
	
	printf("Vetor desordenado \n");
	int i;
	for(i = 0; i<6; i++){
		printf("%d \n", vet[i]);
		
	}
	
	select_sort(vet,6);
	
	printf("vetor ordenado \n");

	for(i = 0; i < 6; i++){ 
		printf("%d \n", vet[i]);
	}
	
	return 0;
}

