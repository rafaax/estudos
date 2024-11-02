#include <stdlib.h>
#include <stdio.h>
#include "../headers/cJSON.h"
#include "../headers/quarto.h"
#include "../headers/utils.h"

void adicionarQuarto(struct Quarto quarto){
	FILE *fp = fopen("storage/quartos.json", "r+");
    long file_size = ler_bytes(fp);
    cJSON *json_array = getJsonArray(fp, file_size);
    cJSON *new_quarto = cJSON_CreateObject();
    
    cJSON_AddNumberToObject(new_quarto, "id", quarto.id);
    cJSON_AddNumberToObject(new_quarto, "numero", quarto.numero);
    cJSON_AddNumberToObject(new_quarto, "servicos_id", quarto.servicos_id);
    cJSON_AddNumberToObject(new_quarto, "preco_diaria", quarto.preco_diaria);
    cJSON_AddNumberToObject(new_quarto, "disponivel", quarto.disponivel);
    cJSON_AddItemToArray(json_array, new_quarto);
	
	char *updated_json = appendJson(fp, json_array);

    fclose(fp);
    cJSON_free(updated_json);
    cJSON_Delete(json_array);
}

void atualizarQuarto(struct Quarto quarto, int id_find){
	FILE *fp = fopen("storage/quartos.json", "r");
    
    long file_size = ler_bytes(fp);
    cJSON *json_array = getJsonArray(fp, file_size);

    cJSON *item = NULL;
    
    cJSON_ArrayForEach(item, json_array) {
        cJSON *id = cJSON_GetObjectItem(item, "id");
        if (cJSON_IsNumber(id) && id->valueint == id_find){
            cJSON *numero = cJSON_GetObjectItem(item, "numero");
            cJSON *servicos = cJSON_GetObjectItem(item, "servicos_id");
            cJSON *diaria = cJSON_GetObjectItem(item, "preco_diaria");
            
            cJSON_SetNumberValue(numero, quarto.numero);
            cJSON_SetNumberValue(servicos, quarto.servicos_id);
            cJSON_SetNumberValue(diaria, quarto.preco_diaria);
			break;   
		}
	}
	
	char *updated_content = cJSON_Print(json_array);
	
	if(updated_content){
	    fp = fopen("storage/quartos.json", "w");
	    fputs(updated_content, fp);
	}
	
    fclose(fp);

    cJSON_free(updated_content);
    cJSON_Delete(json_array);
}

//void listarQuarto(){
//}
//
//void limparQuarto(){
//}
//
//void listarServico(){
//}
//
//void listarQuartosDisponiveis()
//{
//	if (disponibilidade){
//		listarQuarto();
//	}
//}
