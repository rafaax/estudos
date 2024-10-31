#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
#include <string.h>
#include "headers/utils.h"
#include "headers/cliente.h"

int main() {
	
	struct Cliente cliente;
	
	strcpy(cliente.nome, "guigui milgras");
    strcpy(cliente.cpf, "2315621123");
    strcpy(cliente.data_nascimento, "20-08-2004");
    cliente.ativo = 0;
    
    
    deletaCliente(cliente, 3);
    
//    editaCliente(cliente, 1);
    
//	if(criarCliente(cliente) !=  1){
//		printf("Erro ao escrever o json");
//	}
	
	sleep(2);
//	readFile("storage/clientes.json");

	return 0;
}
