#include <stdlib.h>
#include <stdio.h>
#include <windows.h>
#include <string.h>
#include "../headers/cJSON.h"
#include "../headers/servico.h"
#include "../headers/utils.h"

struct Servico servico;

void adicionarServico(struct Servico servico){
	FILE *fp = fopen("storage/servicos.json", "r+");
    long file_size = ler_bytes(fp);
    cJSON *json_array = getJsonArray(fp, file_size);
    cJSON *new_servico = cJSON_CreateObject();
    
    cJSON_AddNumberToObject(new_servico, "id", servico.id);
    cJSON_AddStringToObject(new_servico, "descricao", servico.descricao);
    cJSON_AddItemToArray(json_array, new_servico);
	
	char *updated_json = appendJson(fp, json_array);

    fclose(fp);
    cJSON_free(updated_json);
    cJSON_Delete(json_array);
}

void atualizarServico(struct Servico servico, int id_find){
	FILE *fp = fopen("storage/servicos.json", "r");
    
    long file_size = ler_bytes(fp);
    cJSON *json_array = getJsonArray(fp, file_size);

    cJSON *item = NULL;
    
    cJSON_ArrayForEach(item, json_array) {
        cJSON *id = cJSON_GetObjectItem(item, "id");
        if (cJSON_IsNumber(id) && id->valueint == id_find){
            cJSON *descricao = cJSON_GetObjectItem(item, "descricao");
            
            cJSON_SetValuestring(descricao, servico.descricao);
			break;
		}
	}
	
	char *updated_content = cJSON_Print(json_array);
	
	if(updated_content){
	    fp = fopen("storage/servicos.json", "w");
	    fputs(updated_content, fp);
	}
	
    fclose(fp);

    cJSON_free(updated_content);
    cJSON_Delete(json_array);
}

void listarServico(){
	
    char *file_content = readFile("storage/servicos.json");
    
    if(file_content == NULL){
    	return;
	}

    cJSON *json_array = cJSON_Parse(file_content);
    free(file_content);

    cJSON *item = NULL;
    
    cJSON_ArrayForEach(item, json_array) {
        cJSON *id = cJSON_GetObjectItem(item, "id");
        cJSON *descricao = cJSON_GetObjectItem(item, "descricao");

        if (cJSON_IsNumber(id) && cJSON_IsString(descricao)) {
            printf("Quarto ID: %d\n", id->valueint);
            printf("Descricao: %s\n", descricao->valuestring);
        }
    }

    cJSON_Delete(json_array);
}


void visualizarServico(int id_find){
	char *file_content = readFile("storage/servicos.json");
    
    if(file_content == NULL){
    	return;
	}

    cJSON *json_array = cJSON_Parse(file_content);
    free(file_content);

    cJSON *item = NULL;
    
    cJSON_ArrayForEach(item, json_array) {
    	
    	cJSON *id = cJSON_GetObjectItem(item, "id");
    	
    	if (cJSON_IsNumber(id) && id->valueint == id_find) {
    			
	        cJSON *descricao = cJSON_GetObjectItem(item, "descricao");
	        
        	if (cJSON_IsNumber(id) && cJSON_IsString(descricao)) {
	            printf("Quarto ID: %d\n", id->valueint);
	            printf("Descricao: %s\n", descricao->valuestring);
        	}
        }
    }

    cJSON_Delete(json_array);
}

void menuServicos(int menu_servico){
	
	int servico_editado, servico_busca;
	
	while(menu_servico != 6){
    	system("cls");
    	printf("\n Aqui voce fica a parte de tudo sobre os nossos servicos! \n");
        printf("==================================== \n");
        printf("1. Cadastrar novo servico \n");
        printf("2. Editar servico existente \n");
        printf("3. Listar todos os servicos \n");
        printf("4. Visualizar servico especifico \n");
        printf("5. Sair \n");
        printf("Escolha uma opcao para continuar: ");
        scanf("%d", &menu_servico);
        
        switch(menu_servico){
        	case 1: 
        		system("cls");
        		
				printf("\n Adicionando um servico \n");
				printf("============================ \n");
				
				servico.id = gerarIdAleatorio();
				
				printf("Digite a descricao do servico: ");
				fflush(stdin);
				fgets(servico.descricao, sizeof(servico.descricao), stdin);
						
        		adicionarServico(servico);
        		
        		sleep(2);
        		printf("Servico cadastrado com sucesso!");
        		system("pause");
        		break;
        	case 2:
        		system("cls");
        		printf("\n Atualizar um servico \n");
        		printf("============================ \n");
        		printf("Digite o ID do servico a ser editado ");
        		scanf("%d", &servico_editado);
        		
        		printf("Digite a descricao do servico: \n");
        		fflush(stdin);
				fgets(servico.descricao, sizeof(servico.descricao), stdin);
				
        		atualizarServico(servico, servico_editado);
        		
        		sleep(2);
        		printf("Servico atualizado com sucesso! \n");
        		system("pause");
        		break;
        	case 3: 
        		system("cls");
        		listarServico();
        		system("pause");
        		break;
        	case 4:
        		system("cls");
        		printf("Digite o ID de um servico para saber mais sobre ele! \n");
        		scanf("%d", &servico_busca);
        		visualizarServico(servico_busca);
        		system("pause");
				break;
			case 5:
        		system("cls");
        		printf("Saindo... \n");
        		system("pause");
				break; 
			default:
				system("cls");
    			printf("Opcao invalida! Tente novamente.\n");
    			system("pause");
		}
	}
}
