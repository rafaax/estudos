#include <stdio.h>
#include <string.h>
#include "utils.h"
#include "cliente.h"

int main() {
	
	struct Cliente cliente;
	
	strcpy(cliente.nome, "Guilherme");
    strcpy(cliente.cpf, "47500059833");
    strcpy(cliente.data_nascimento, "02-07-2004");
    cliente.ativo = 1;
    
    
	if(cliente_to_json(cliente) !=  1){
		printf("Erro ao escrever o json");
	}
	
	readFile("clientes.json");

	return 0;
}
