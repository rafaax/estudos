#include <stdio.h> 
#include "cJSON.h"
#include "cliente.h"

void cliente_to_json(struct Cliente cliente){
	
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
   	FILE *fp = fopen("cliente.json", "a+"); 
   	if (fp == NULL) { 
       printf("Error: Unable to open the file.\n"); 
       return 1; 
   	}
   
   	printf("%s\n", json_str); 
   	fputs(json_str, fp); 
   	fclose;
   // free the JSON string and cJSON object 
   
   	cJSON_free(json_str); 
	cJSON_Delete(json); 
}
