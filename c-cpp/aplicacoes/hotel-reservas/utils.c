#include <stdlib.h>
#include <stdio.h>

FILE *fptr;

long tamanho_bytes;


long ler_bytes(FILE *fptr)
{
	long file_size;
	char *buffer;
	
    
	fseek(fptr, 0, SEEK_END);
	file_size = ftell(fptr);
	rewind(fptr);
	
	return file_size;
}

void readFile(char fileName[15])
{	
	fptr = fopen(fileName, "r");
	tamanho_bytes = ler_bytes(fptr);
	char file_text[tamanho_bytes];
	
	buffer = (char*) malloc(sizeof(char) * file_size);
		if (buffer == NULL)
		{
			printf("Erro de memoria! \n");
			fclose(fptr);
		return 1;
	}
	
	rewind(fptr);
	
	fread(file_text, sizeof(char), tamanho_bytes, fptr);
    file_text[tamanho_bytes] = '\0';
	
	printf("%s", file_text);
    printf("Tamanho do arquivo: %ld\n", tamanho_bytes);
    
	free(file_text);
    fclose(fptr);
}

void writeFile(char fileName[15], char text[10])
{
	
	fptr = fopen(fileName, "a+");
	fprintf(fptr, text);
	
	fclose(fptr);
}
