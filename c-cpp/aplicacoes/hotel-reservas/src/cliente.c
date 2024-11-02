#include <stdio.h>
#include <time.h>
#include "../headers/cJSON.h"
#include "../headers/cliente.h"
#include "../headers/utils.h"


int criarCliente(struct Cliente cliente){
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

int editaCliente(struct Cliente cliente, int id_find){
	FILE *fp = fopen("storage/clientes.json", "r");
    
    long file_size = ler_bytes(fp);
    cJSON *json_array = getJsonArray(fp, file_size);

    cJSON *item = NULL;
    cJSON_ArrayForEach(item, json_array) {
        cJSON *id = cJSON_GetObjectItem(item, "id");
        if (cJSON_IsNumber(id) && id->valueint == id_find){
            cJSON *nome = cJSON_GetObjectItem(item, "nome");
            cJSON *cpf = cJSON_GetObjectItem(item, "cpf");
            cJSON *ativo = cJSON_GetObjectItem(item, "ativo");
            cJSON *data_nascimento = cJSON_GetObjectItem(item, "data_nascimento");
            
            cJSON_SetValuestring(nome, cliente.nome);
            cJSON_SetValuestring(cpf, cliente.cpf);
            cJSON_SetNumberValue(ativo, cliente.ativo);
            cJSON_SetValuestring(data_nascimento, cliente.data_nascimento);
			break;
		}
	}
	
	char *updated_content = cJSON_Print(json_array);
	
	if(updated_content){
	    fp = fopen("storage/clientes.json", "w");
	    fputs(updated_content, fp);
	}
	
    fclose(fp);

    cJSON_free(updated_content);
    cJSON_Delete(json_array);
    
    return 1;
}
    
int deletaCliente(struct Cliente cliente, int id_find) {
    FILE *fp = fopen("storage/clientes.json", "r");
    
    long file_size = ler_bytes(fp);
    cJSON *json_array = getJsonArray(fp, file_size);
    fclose(fp);

    int index = 0;
    cJSON *item = NULL;
    cJSON_ArrayForEach(item, json_array) {
        cJSON *id = cJSON_GetObjectItem(item, "id");
        if (cJSON_IsNumber(id) && id->valueint == id_find) {
            cJSON_DeleteItemFromArray(json_array, index);
            break;
        }
        index++;
    }

    char *updated_content = cJSON_Print(json_array);

    fp = fopen("storage/clientes.json", "w");
    fputs(updated_content, fp);
    fclose(fp);

    cJSON_free(updated_content);
    cJSON_Delete(json_array);

    return 1;
}


void listarClientes(){
	
}

void verCliente(){
	
}

