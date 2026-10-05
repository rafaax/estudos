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



// [7,5] proximo i =  1 1 < 0 = true
// [5, 7, 13] i = 2 [2] < [1] = false
// [5,7, 3, 13] i = 3 [3] < [2] = true -> troca 
// [5,3, 7,13] i = 2 [2] < [1] = true -> troca
// [3, 5,7,13] i = 1 [1] < [0] = true -> troca 
// i nao pode ser menor que 0 entao passa pro proximo indice 
// [3,5,7,13,15] i = 4 [4] < [3] = false
 

 
int main(){
	int vet[6] = {7,5,13,3,15,10};
	
	printf("Vetor desordenado \n");
	int i;
	for(i = 0; i<6; i++){
		printf("%d \n", vet[i]);
		
	}
	
	insert_sort(vet,6);
	
	printf("vetor ordenado \n");

	for(i = 0; i < 6; i++){ 
		printf("%d \n", vet[i]);
	}
	
	return 0;
}
