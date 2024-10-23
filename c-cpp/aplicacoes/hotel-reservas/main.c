#include <stdio.h>
#include <string.h>
#include "utils.h"
#include "cliente.h"

int main() {
	/*
	int i = 0;
	
	printf("arquivo inicial \n");
	
	readFile("servicos.json");
	
	while(i < 10){
		writeFile("servicos.json", "teste \n");
		printf("%d ", i);
		i++;
	}
	
	printf("arquivo final \n");
	readFile("servicos.json");
	*/
	
	
	struct Cliente cliente;
	
	strcpy(cliente.nome, "Guilherme");
    strcpy(cliente.cpf, "47500059833");
    strcpy(cliente.data_nascimento, "02-07-2004");
    cliente.ativo = 1;
    
    
	cliente_to_json(cliente);
	
	
	
	
	return 0;
}
