#include <stdio.h> 
#include "../headers/cJSON.h"
#include "../headers/cliente.h"
#include "../headers/servico.h"
#include "../headers/quarto.h"
#include "../headers/reserva.h"
#include "../headers/utils.h"

int clienteToJson(struct Cliente cliente) {
	
    FILE *fp = fopen("storage/clientes.json", "r+");
    
    long file_size = ler_bytes(fp);
    cJSON *json_array = getJsonArray(fp, file_size);
    
    cJSON *new_cliente = cJSON_CreateObject();
    
    cJSON_AddNumberToObject(new_cliente, "id", cliente.id);
    cJSON_AddStringToObject(new_cliente, "nome", cliente.nome);
    cJSON_AddStringToObject(new_cliente, "cpf", cliente.cpf);
    cJSON_AddNumberToObject(new_cliente, "ativo", cliente.ativo);
    cJSON_AddStringToObject(new_cliente, "data_nascimento", cliente.data_nascimento);
    cJSON_AddItemToArray(json_array, new_cliente);
	
	char *updated_json = appendJson(fp, json_array);

    fclose(fp);
    cJSON_free(updated_json);
    cJSON_Delete(json_array);

    return 1;
}

int servicoToJson(struct Servico servico){
	
	
	FILE *fp = fopen("storage/servicos.json", "r+");
    
    long file_size = ler_bytes(fp);
    cJSON *json_array = getJsonArray(fp, file_size);
	
	cJSON *json_services_array = cJSON_CreateArray();
	
	int i = 0;
	
	for(i;i <= 5; i++){
	   cJSON_AddItemToArray(json_array, cJSON_CreateString(servico.nivel_servico[i]));
	}
	
	cJSON *new_servico = cJSON_CreateObject();
	cJSON_AddNumberToObject(new_servico, "id", servico.id); 
	cJSON_AddStringToObject(new_servico, "descricao", servico.descricao); 
	cJSON_AddItemToObject(new_servico, "nivel_servico", json_service_array);
	
	cJSON_AddItemToArray(json_array, new_servico);
	
	char *updated_json = appendJson(fp, json_array);


	fclose; 
	cJSON_free(updated_json);
	cJSON_Delete(json_service_array); 
	cJSON_Delete(json);  
	
	return 1;
}

int quartoToJson(struct Quarto quarto){
	
	FILE *fp = fopen("storage/quartos.json", "r+");
    
    long file_size = ler_bytes(fp);
    cJSON *json_array = getJsonArray(fp, file_size);
    
    cJSON *new_quarto = cJSON_CreateObject();
	
	cJSON_AddNumberToObject(new_quarto, "id", quarto.id); 
	cJSON_AddNumberToObject(new_quarto, "numero", quarto.numero); 
	cJSON_AddStringToObject(new_quarto, "nivel_quarto", quarto.nivel_quarto); 
	cJSON_AddNumberToObject(new_quarto, "valor_diaria", quarto.preco); 
	
	cJSON_AddItemToArray(json_array, new_quarto);
	
	char *updated_json = appendJson(fp, json_array);


	fclose; 
	cJSON_free(updated_json);  
	cJSON_Delete(json); 
	
	return 1;
}

int reservaToJson(struct Reserva reserva){
		
	FILE *fp = fopen("storage/reservas.json", "r+");
    
    long file_size = ler_bytes(fp);
    cJSON *json_array = getJsonArray(fp, file_size);
    
    cJSON *new_reserva = cJSON_CreateObject();
	
	cJSON_AddNumberToObject(new_reserva, "id", reserva.id); 
	cJSON_AddNumberToObject(new_reserva, "id_quarto", reserva.id_quarto);
	cJSON_AddNumberToObject(new_reserva, "id_cliente", reserva.id_cliente);  
	cJSON_AddStringToObject(new_reserva, "data_check_in", reserva.data_check_in);
	cJSON_AddStringToObject(new_reserva, "data_check_out", reserva.data_check_out); 

	cJSON_AddItemToArray(json_array, new_quarto);
	
	char *updated_json = appendJson(fp, json_array);


	fclose; 
	cJSON_free(updated_json);  
	cJSON_Delete(json); 
	
	return 1;
}
