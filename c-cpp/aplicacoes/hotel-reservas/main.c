#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
#include <string.h>
#include "headers/utils.h"
#include "headers/cliente.h"

int main() {
	
	struct Cliente cliente;
	
	strcpy(cliente.nome, "Henry");
    strcpy(cliente.cpf, "123456789");
    strcpy(cliente.data_nascimento, "20-12-2005");
    cliente.ativo = 0;
    
    
    editaCliente(cliente, 2);
    
//	if(criarCliente(cliente) !=  1){
//		printf("Erro ao escrever o json");
//	}
	
	sleep(2);
//	readFile("storage/clientes.json");

	return 0;
}
