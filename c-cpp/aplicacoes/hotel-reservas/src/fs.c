#include <stdio.h> 
#include "cJSON.h"
#include "cliente.h"

int cliente_to_json(struct Cliente cliente){
	
	cJSON *json = cJSON_CreateObject();
	cJSON_AddNumberToObject(json, "id", cliente.id); 
	cJSON_AddStringToObject(json, "nome", cliente.nome); 
	cJSON_AddStringToObject(json, "cpf", cliente.cpf); 
	cJSON_AddNumberToObject(json, "ativo", cliente.ativo); 
	cJSON_AddStringToObject(json, "data_nascimento", cliente.data_nascimento); 
	cJSON_AddStringToObject(json, "data_criacao", cliente.data_criacao );
	
	// convert the cJSON object to a JSON string 
	char *json_str = cJSON_Print(json);
	
	// write the JSON string to a file
	
	FILE *fp = fopen("clientes.json", "a+"); 
	
	// valida se o arquivo foi aberto para escrita
	if (fp == NULL) {
		printf("Error: Unable to open the file.\n"); 
		return 0; 
	}
	
	fputs(json_str, fp); 
	fclose; 
	cJSON_free(json_str);  // free the JSON string and 
	cJSON_Delete(json);  // free the cJSON object 
	
	return 1;
}
