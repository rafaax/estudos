#include <stdio.h>
#include <time.h>
#include "../headers/cJSON.h"
#include "../headers/cliente.h"
#include "../headers/utils.h"

struct Cliente cliente;

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
	
    char *file_content = readFile("storage/clientes.json");
    
    if(file_content == NULL){
    	return;
	}

    cJSON *json_array = cJSON_Parse(file_content);
    free(file_content);

    cJSON *item = NULL;
    
    cJSON_ArrayForEach(item, json_array) {
    	cJSON *id = cJSON_GetObjectItem(item, "id");
        cJSON *nome = cJSON_GetObjectItem(item, "nome");
        cJSON *cpf = cJSON_GetObjectItem(item, "cpf");
        cJSON *ativo = cJSON_GetObjectItem(item, "ativo");
        cJSON *data_nascimento = cJSON_GetObjectItem(item, "data_nascimento");

        if (cJSON_IsNumber(id) && cJSON_IsString(nome) && cJSON_IsString(cpf) && cJSON_IsNumber(ativo) && cJSON_IsString(data_nascimento)) {
            printf("Cliente ID: %d\n", id->valueint);
            printf("nome: %s\n", nome->valuestring);
            printf("CPF: %s \n", cpf->valuestring);
            printf("Ativo: %d \n", ativo->valuestring);
            printf("Data de nascimento: %s \n", data_nascimento->valuestring);
        }
    }

    cJSON_Delete(json_array);
}


void visualizarClientes(int id_find){
	char *file_content = readFile("storage/clientes.json");
    
    if(file_content == NULL){
    	return;
	}

    cJSON *json_array = cJSON_Parse(file_content);
    free(file_content);

    cJSON *item = NULL;
    
    cJSON_ArrayForEach(item, json_array) {
    	
    	cJSON *id = cJSON_GetObjectItem(item, "id");
        cJSON *nome = cJSON_GetObjectItem(item, "nome");
        cJSON *cpf = cJSON_GetObjectItem(item, "cpf");
        cJSON *ativo = cJSON_GetObjectItem(item, "ativo");
        cJSON *data_nascimento = cJSON_GetObjectItem(item, "data_nascimento");

        if (cJSON_IsNumber(id) && cJSON_IsString(nome) && cJSON_IsString(cpf) && cJSON_IsNumber(ativo) && cJSON_IsString(data_nascimento)) {
            printf("Cliente ID: %d\n", id->valueint);
            printf("nome: %s\n", nome->valuestring);
            printf("CPF: %s \n", cpf->valuestring);
            printf("Ativo: %d \n", ativo->valuestring);
            printf("Data de nascimento: %s \n", data_nascimento->valuestring);
        }
    }

    cJSON_Delete(json_array);
}

void menuClientes(int menu_clientes){
	
	int cliente_editado, cliente_busca, cliente_delete;
	
	while(menu_clientes != 6){
    	system("cls");
    	printf("\n Aqui voce fica a parte de tudo sobre os nossos servicos! \n");
        printf("==================================== \n");
        printf("1. Cadastrar novo cliente \n");
        printf("2. Editar cliente existente \n");
        printf("3. Deletar cliente \n");
        printf("4. Listar todos os clientes \n");
        printf("5. Visualizar cliente especifico \n");
        printf("6. Sair \n");
        printf("Escolha uma opcao para continuar: ");
        scanf("%d", &menu_clientes);
        
        switch(menu_clientes){
        	case 1: 
        		system("cls");
        		
				printf("\n Cadastrando um cliente \n");
				printf("============================ \n");
				
				cliente.id = gerarIdAleatorio();
				
				printf("Digite o nome do cliente: ");
				fflush(stdin);
				fgets(cliente.nome, sizeof(cliente.nome), stdin);
				
				printf("Digite o CPF do cliente: ");
				fflush(stdin);
				fgets(cliente.cpf, sizeof(cliente.cpf), stdin);
				
				printf("Digite a data de nascimento do cliente: ");
				fflush(stdin);
				fgets(cliente.data_nascimento, sizeof(cliente.data_nascimento), stdin);
						
        		criarCliente(cliente);
        		
        		sleep(2);
        		printf("Cliente cadastrado com sucesso!");
        		system("pause");
        		break;
        	case 2:
        		system("cls");
        		printf("\n Atualizar um cliente \n");
        		printf("============================ \n");
        		printf("Digite o ID do servico a ser editado ");
        		scanf("%d", &cliente_editado);
        		
        		printf("\n Cadastrando um cliente \n");
				printf("============================ \n");
				
				cliente.id = gerarIdAleatorio();
				
				printf("Digite o nome do cliente: ");
				fflush(stdin);
				fgets(cliente.nome, sizeof(cliente.nome), stdin);
				
				printf("Digite o CPF do cliente: ");
				fflush(stdin);
				fgets(cliente.cpf, sizeof(cliente.cpf), stdin);
				
				printf("Digite a data de nascimento do cliente: ");
				fflush(stdin);
				fgets(cliente.data_nascimento, sizeof(cliente.data_nascimento), stdin);
				
        		editaCliente(cliente, cliente_editado);
        		
        		sleep(2);
        		printf("Cliente atualizado com sucesso! \n");
        		system("pause");
        		break;
        	case 3: 
        		system("cls");
        		printf("Digite o ID de um cliente para deletar seu registro! \n");
        		scanf("%d", &cliente_delete);
        		deletaCliente(cliente, cliente_delete);
        		printf("Cliente deletado com sucesso!")
        		system("pause");
        		break;
        	case 4:
        		system("cls");
        		listarClientes();
        		system("pause");
				break;
			case 5:
        		system("cls");
        		printf("Digite o ID de um cliente para saber mais sobre ele! \n");
        		scanf("%d", &cliente_busca);
        		visualizarServico(cliente_busca);
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
