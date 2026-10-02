#include <stdlib.h>
#include <stdio.h>
#include <windows.h>
#include <string.h>
#include "../headers/cJSON.h"
#include "../headers/reserva.h"
#include "../headers/utils.h"

struct Reserva reserva;

void fazerReserva(struct Reserva reserva){
	FILE *fp = fopen("storage/reservas.json", "r+");
    long file_size = ler_bytes(fp);
    cJSON *json_array = getJsonArray(fp, file_size);
    cJSON *new_reserva = cJSON_CreateObject();
    
    cJSON_AddNumberToObject(new_reserva, "id", reserva.id);
    cJSON_AddNumberToObject(new_reserva, "id_quarto", reserva.id_quarto);
    cJSON_AddNumberToObject(new_reserva, "id_cliente", reserva.id_cliente);
    cJSON_AddStringToObject(new_reserva, "data_check_in", reserva.data_check_in);
    cJSON_AddStringToObject(new_reserva, "data_check_out", reserva.data_check_out);
    cJSON_AddItemToArray(json_array, new_reserva);
	
	char *updated_json = appendJson(fp, json_array);

    fclose(fp);
    cJSON_free(updated_json);
    cJSON_Delete(json_array);
}

void listarReservas(){
	char *file_content = readFile("storage/reservas.json");
    
    if(file_content == NULL){
    	return;
	}

    cJSON *json_array = cJSON_Parse(file_content);
    free(file_content);

    cJSON *item = NULL;
    
    cJSON_ArrayForEach(item, json_array) {
    	cJSON *id = cJSON_GetObjectItem(item, "id");
        cJSON *id_quarto = cJSON_GetObjectItem(item, "id_quarto");
        cJSON *id_cliente = cJSON_GetObjectItem(item, "id_cliente");
        cJSON *data_check_in = cJSON_GetObjectItem(item, "data_check_in");
        cJSON *data_check_out = cJSON_GetObjectItem(item, "data_check_out");

        if (cJSON_IsNumber(id) && cJSON_IsNumber(id_quarto) && cJSON_IsNumber(id_cliente) && cJSON_IsString(data_check_in) && cJSON_IsString(data_check_out)) {
            printf("Reserva ID: %d\n", id->valueint);
            printf("ID Quarto: %d\n", id_quarto->valueint);
			printf("ID Cliente: %d\n", id_cliente->valueint);
            printf("Data de check in: %s \n", data_check_in->valuestring);
            printf("Data de check out: %s \n", data_check_out->valuestring);
        }
    }

    cJSON_Delete(json_array);
}

void verReserva(int id_find){
	char *file_content = readFile("storage/reservas.json");
    
    if(file_content == NULL){
    	return;
	}

    cJSON *json_array = cJSON_Parse(file_content);
    free(file_content);

    cJSON *item = NULL;
    
    cJSON_ArrayForEach(item, json_array) {
    	
    	cJSON *id = cJSON_GetObjectItem(item, "id");
        cJSON *id_quarto = cJSON_GetObjectItem(item, "id_quarto");
        cJSON *id_cliente = cJSON_GetObjectItem(item, "id_cliente");
        cJSON *data_check_in = cJSON_GetObjectItem(item, "data_check_in");
        cJSON *data_check_out = cJSON_GetObjectItem(item, "data_check_out");

        if (cJSON_IsNumber(id) && cJSON_IsNumber(id_quarto) && cJSON_IsNumber(id_cliente) && cJSON_IsString(data_check_in) && cJSON_IsString(data_check_out)) {
            printf("Reserva ID: %d\n", id->valueint);
            printf("ID Quarto: %d\n", id_quarto->valueint);
			printf("ID Cliente: %d\n", id_cliente->valueint);
            printf("Data de check in: %s \n", data_check_in->valuestring);
            printf("Data de check out: %s \n", data_check_out->valuestring);
        }
    }

    cJSON_Delete(json_array);
}

void alterarReserva(struct Reserva reserva, int id_find){
	FILE *fp = fopen("storage/reservas.json", "r");
    
    long file_size = ler_bytes(fp);
    cJSON *json_array = getJsonArray(fp, file_size);

    cJSON *item = NULL;
    cJSON_ArrayForEach(item, json_array) {
        cJSON *id = cJSON_GetObjectItem(item, "id");
        if (cJSON_IsNumber(id) && id->valueint == id_find){
		    cJSON *id_quarto = cJSON_GetObjectItem(item, "id_quarto");
            cJSON *id_cliente = cJSON_GetObjectItem(item, "id_cliente");
            cJSON *data_check_in = cJSON_GetObjectItem(item, "data_check_in");
            cJSON *data_check_out = cJSON_GetObjectItem(item, "data_check_out");
		        
            cJSON_SetNumberValue(id_quarto, reserva.id_quarto);
            cJSON_SetNumberValue(id_cliente, reserva.id_cliente);
            cJSON_SetValuestring(data_check_in, reserva.data_check_in);
            cJSON_SetValuestring(data_check_out, reserva.data_check_out);
			break;
		}
	}
	
	char *updated_content = cJSON_Print(json_array);
	
	if(updated_content){
	    fp = fopen("storage/reservas.json", "w");
	    fputs(updated_content, fp);
	}
	
    fclose(fp);

    cJSON_free(updated_content);
    cJSON_Delete(json_array);
    
}

void removerReserva(struct Reserva reserva, int id_find){
	FILE *fp = fopen("storage/reservas.json", "r");
    
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

    fp = fopen("storage/reservas.json", "w");
    fputs(updated_content, fp);
    fclose(fp);

    cJSON_free(updated_content);
    cJSON_Delete(json_array);

}

void menuReservas(int menu_reservas){
	int reserva_editado, reserva_busca, reserva_delete;
	
	while(menu_reservas != 6){
    	system("cls");
    	printf("\n Aqui voce fica a parte de tudo sobre os nossos servicos! \n");
        printf("==================================== \n");
        printf("1. Cadastrar nova reserva \n");
        printf("2. Editar reserva existente \n");
        printf("3. Deletar reserva \n");
        printf("4. Listar todas as reservas \n");
        printf("5. Visualizar reserva especifica \n");
        printf("6. Sair \n");
        printf("Escolha uma opcao para continuar: ");
        scanf("%d", &menu_reservas);
        
        switch(menu_reservas){
        	case 1: 
        		system("cls");
        		
				printf("\n Cadastrando uma reserva \n");
				printf("============================ \n");
				
				reserva.id = gerarIdAleatorio();
				
				printf("Digite o id do quarto da reserva: ");
				scanf("%d", &reserva.id_quarto);
				
				printf("Digite o id do cliente da reserva: ");
				scanf("%d", &reserva.id_cliente);
				
				printf("Digite a data de check in: ");
				fflush(stdin);
				fgets(reserva.data_check_in, sizeof(reserva.data_check_in), stdin);
				
				printf("Digite a data de check out: ");
				fflush(stdin);
				fgets(reserva.data_check_out, sizeof(reserva.data_check_out), stdin);
						
        		fazerReserva(reserva);
        		
        		sleep(2);
        		printf("Reserva cadastrada com sucesso!");
        		system("pause");
        		break;
        	case 2:
        		system("cls");
        		printf("\n Atualizar uma reserva \n");
        		printf("============================ \n");
        		printf("Digite o ID da reserva a ser editada ");
        		scanf("%d", &reserva_editado);
				
				printf("Digite o id do quarto da reserva: ");
				scanf("%d", &reserva.id_quarto);
				
				printf("Digite o id do cliente da reserva: ");
				scanf("%d", &reserva.id_cliente);
				
				printf("Digite a data de check in: ");
				fflush(stdin);
				fgets(reserva.data_check_in, sizeof(reserva.data_check_in), stdin);
				
				printf("Digite a data de check out: ");
				fflush(stdin);
				fgets(reserva.data_check_out, sizeof(reserva.data_check_out), stdin);
				
        		alterarReserva(reserva, reserva_editado);
        		
        		sleep(2);
        		printf("Reserva atualizada com sucesso! \n");
        		system("pause");
        		break;
        	case 3: 
        		system("cls");
        		printf("Digite o ID de uma reserva para deletar seu registro! \n");
        		scanf("%d", &reserva_delete);
        		removerReserva(reserva, reserva_delete);
        		printf("Reserva deletada com sucesso!");
        		system("pause");
        		break;
        	case 4:
        		system("cls");
        		listarReservas();
        		system("pause");
				break;
			case 5:
        		system("cls");
        		printf("Digite o ID de uma reserva para saber mais sobre ela! \n");
        		scanf("%d", &reserva_busca);
        		verReserva(reserva_busca);
        		system("pause");
				break;
			case 6:
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
