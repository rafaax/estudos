#include <stdio.h>

void bubble_sort(int arr[], int length){
	int i, j;	
	
	for(i = 0; i < length; i++){
		int aux;
		int verifica = 0;
		for(j = 0;j < length-1; j++){
			if(arr[j] > arr[j+1]){
				aux = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = aux;
				verifica = 1;
			}
		}
		if(verifica == 1){
			printf("nao troca \n") ;
			break;
			
		}
	}
}
int main() {
	
	int arr[8];
	int i;
	
	arr[0] = 13;arr[1] = 5; arr[2] = 10; 
	arr[3] =24; arr[4] =7;arr[5] =11;arr[6] =12;
	arr[7] =15; 
	
	printf("vetor desordenado \n");
	for(i = 0; i < 8; i++){
		printf("%d \n", arr[i]);
	}
	 
	printf("vetor ordenado \n");
	
	bubble_sort(arr,8);

	
	for(i = 0; i < 8; i++){
		printf("%d \n", arr[i]);
	}
	
	
		
}
