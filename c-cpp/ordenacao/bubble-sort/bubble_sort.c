#include <stdio.h>

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
}
