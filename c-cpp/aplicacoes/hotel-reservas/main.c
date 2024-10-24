#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
#include <string.h>
#include "headers/utils.h"
#include "headers/cliente.h"

int main() {
	
	struct Cliente cliente;
	
	strcpy(cliente.nome, "Guilherme");
    strcpy(cliente.cpf, "47500059833");
    strcpy(cliente.data_nascimento, "02-07-2004");
    cliente.ativo = 1;
    
    
	if(clienteToJson(cliente) !=  1){
		printf("Erro ao escrever o json");
	}
	
	sleep(2);
	readFile("storage/clientes.json");

	return 0;
}
