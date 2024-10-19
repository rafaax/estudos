#include <stdlib.h>
#include <stdio.h>

FILE *fptr;

long tamanho_bytes;


long ler_bytes(FILE *fptr)
{
	long file_size;
    
	fseek(fptr, 0, SEEK_END);
	file_size = ftell(fptr);
	rewind(fptr);
	
	return file_size;
}

void readFile(char fileName[15])
{	
	fptr = fopen(fileName, "r");
	
	if (fptr == NULL) {
		printf("Erro ao abrir o arquivo!\n");
		return;
	}
	
	long tamanho_bytes = ler_bytes(fptr);
	
	char *file_text = (char*) malloc(sizeof(char) * (tamanho_bytes + 1));
	if (file_text == NULL)
	{
		printf("Erro de memoria!\n");
		fclose(fptr);
		return;
	}
	
	fread(file_text, sizeof(char), tamanho_bytes, fptr);
	file_text[tamanho_bytes] = '\0';
	
	printf("%s", file_text);
    
	free(file_text);
    fclose(fptr);
}


void writeFile(char fileName[15], char text[10])
{
	
	fptr = fopen(fileName, "a+");
	fprintf(fptr, text);
	
	fclose(fptr);
}
