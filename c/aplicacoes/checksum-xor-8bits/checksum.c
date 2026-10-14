#include <stdio.h>
#include <string.h>

unsigned char checksumCalc(const char *str) {
    unsigned char checksum = 0;  // Inicializa com 0 (8 bits)
    for (int i = 0; str[i] != '\0'; i++) {
        checksum ^= (unsigned char)str[i];  // XOR byte a byte
    }
    return checksum;
}

int main() {
    char texto[100];
    printf("Digite uma string (max. 99 caracteres): ");
    fgets(texto, sizeof(texto), stdin); 
    texto[strcspn(texto, "\n")] = '\0';
    
    int tamanho = strlen(texto);
    unsigned char checksum = checksumCalc(texto);

    printf("%d;%s;%d\n", tamanho, texto, checksum); // "tamanho;texto;checksum"

    return 0;
}