#include <stdio.h> 
#include "cJSON.h"
#include "cliente.h"
#include "servico.h"
#include "quarto.h"
#include "reserva.h"

int clienteToJson(struct Cliente cliente){
	
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

int servicoToJson(struct Servico servico){
	
	cJSON *json_array = cJSON_CreateArray();
	
	int i = 0;
	
	for(i;i <= 5; i++){
	   cJSON_AddItemToArray(json_array, cJSON_CreateString(servico.nivel_servico[i]));
	}
	
	cJSON *json = cJSON_CreateObject();
	cJSON_AddNumberToObject(json, "id", servico.id); 
	cJSON_AddStringToObject(json, "descricao", servico.descricao); 
	cJSON_AddItemToObject(json, "nivel_servico", json_array);
	
	// convert the cJSON object to a JSON string 
	char *json_str = cJSON_Print(json);
	
	// write the JSON string to a file
	
	FILE *fp = fopen("servico.json", "a+"); 
	
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

int quartoToJson(struct Quarto quarto){
	
	cJSON *json = cJSON_CreateObject();
	cJSON_AddNumberToObject(json, "id", quarto.id); 
	cJSON_AddNumberToObject(json, "numero", quarto.numero); 
	cJSON_AddStringToObject(json, "nivel_quarto", quarto.nivel_quarto); 
	cJSON_AddNumberToObject(json, "valor_diaria", quarto.preco); 
	
	// convert the cJSON object to a JSON string 
	char *json_str = cJSON_Print(json);
	
	// write the JSON string to a file
	
	FILE *fp = fopen("quarto.json", "a+"); 
	
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

int reservaToJson(struct Reserva reserva){
		
	cJSON *json = cJSON_CreateObject();
	cJSON_AddNumberToObject(json, "id", reserva.id); 
	cJSON_AddNumberToObject(json, "id_quarto", reserva.id_quarto);
	cJSON_AddNumberToObject(json, "id_cliente", reserva.id_cliente);  
	cJSON_AddStringToObject(json, "data_check_in", reserva.data_check_in);
	cJSON_AddStringToObject(json, "data_check_out", reserva.data_check_out); 
	
	// convert the cJSON object to a JSON string 
	char *json_str = cJSON_Print(json);
	
	// write the JSON string to a file
	
	FILE *fp = fopen("reserva.json", "a+"); 
	
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
