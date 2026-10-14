#include <stdlib.h>
#include <stdio.h>
#include <time.h>
#include "../headers/cJSON.h"
#include "../headers/utils.h"

long ler_bytes(FILE *fptr){

	fseek(fptr, 0, SEEK_END);
	file_size = ftell(fptr);
	rewind(fptr);
	
	return file_size;
}

char* readFile(char fileName[15]){	
	fptr = fopen(fileName, "r");
	
	if (fptr == NULL) {
		printf("Erro ao abrir o arquivo %s !\n", fileName );
		return NULL;
	}
	
	tamanho_bytes = ler_bytes(fptr);
	
	char *file_text = (char*) malloc(sizeof(char) * (tamanho_bytes + 1));
	
	if (file_text == NULL){
		printf("Erro de memoria!\n");
		fclose(fptr);
		return NULL ;
	}
	
	fread(file_text, sizeof(char), tamanho_bytes, fptr);
	file_text[tamanho_bytes] = '\0';

    fclose(fptr);
    
    return file_text;
}

cJSON *getJsonArray(FILE *fp, long file_size){
	char *file_content = (char *)malloc(file_size + 1);
    
    fread(file_content, 1, file_size, fp);
    file_content[file_size] = '\0';

    cJSON *json_array = cJSON_Parse(file_content);
    free(file_content);
    
    return json_array;
}

char *appendJson(FILE *fp, cJSON *json_array){
	fseek(fp, 0, SEEK_SET);
    char *updated_json_str = cJSON_Print(json_array);
    fwrite(updated_json_str, sizeof(char), strlen(updated_json_str), fp);
    ftruncate(fileno(fp), strlen(updated_json_str));
    
    return updated_json_str;
}

int gerarIdAleatorio() {
    srand(time(NULL));
    return rand();
}
