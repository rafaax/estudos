#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
#include <string.h>
#include "headers/utils.h"
#include "headers/cliente.h"
#include "headers/quarto.h"

int main() {
	
	int menu, menu_quarto, menu_servicos, menu_clientes, menu_reservas  = 0;
	
	
	struct Cliente cliente;
	struct Quarto quarto;

    
    while (menu != 5) {
    	system("cls");
        printf("\n Seja bem-vindo ao Cyberia Hotel! \n");
        printf("\n ==================================== \n");
        printf("1. Quartos \n");
        printf("2. Servicos \n");
        printf("3. Clientes \n");
        printf("4. Reservas \n");
        printf("5. Sair \n");
        printf("Escolha uma opcao para continuar: ");
        scanf("%d", &menu);

        switch (menu) {
            case 1:
            	menuQuarto(menu_quarto);
            	system("cls");
                break;
            case 2:
            	menuServicos(menu_servicos);
            	system("cls");
                break;
            case 3:
            	menuClientes(menu_clientes);
            	system("cls");
            	break;
            case 4:
            	menuReservas(menu_reservas);
            	system("cls");
                break;
            case 5:
            	system("cls");
            	printf("Saindo... \n");
            	break;
            default:
            	system("cls");
                printf("Opcao invalida! Tente novamente.\n");
                system("pause");
        }
    }
    
	return 0;
}
