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
    cJSON_AddNumberToObject(new_quarto, "nome", quarto.numero);
    cJSON_AddNumberToObject(new_quarto, "servicos_id", quarto.servicos_id);
    cJSON_AddNumberToObject(new_quarto, "preco_diaria", quarto.preco_diaria);
    cJSON_AddNumberToObject(new_quarto, "disponivel", quarto.disponivel);
    cJSON_AddItemToArray(json_array, new_quarto);
	
	char *updated_json = appendJson(fp, json_array);

    fclose(fp);
    cJSON_free(updated_json);
    cJSON_Delete(json_array);
}

void atualizarQuarto(struct Quarto quarto, int id){
//	int numero_atualizar;
//	
//	printf("Atualizando o quarto \n");
//	
//	printf("Digite o numero do quarto que deseja atualizar: \n");
//	scanf("%d", &numero_atualizar);
//	
//	if (numero_atualizar == numero)
//	{
//		printf("Digite o numero do quarto: \n");
//		scanf("%d", &numero);
//		printf("Digite o tipo do quarto: \n");
//		scanf("%c", &tipo_quarto);
//		printf("Digite o preco da diaria: \n");
//		scanf("%f", &preco);
//		printf("Digite a capacidade do quarto: \n");
//	
//	printf("Quarto atualizado com sucesso! \n");
//	}else{
//		printf("Numero do quarto não encontrado. \n");
//	}
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
