#include <stdio.h>
#include <stdlib.h>

void insert_sort(int vetor[], int tamanho){
	int i, troca;
	
	for(i = 1; i< tamanho; i++){
		int proximo = i;
		
		while((proximo != 0) && (vetor[proximo] < vetor[proximo - 1])){
			 
			vetor[proximo] = vetor[proximo - 1];
			vetor[proximo - 1] = troca;
			proximo--;
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
}
