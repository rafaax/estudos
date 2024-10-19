#include <stdlib.h>
#include <stdio.h>

int id_quarto;
int numero;
char tipo_quarto[15];
float preco;
int disponibilidade;
int capacidade;
char data_reserva[10];

void adicionarQuarto()
{
	printf("Adicionando um quarto \n");
	id_quarto++;
	
	printf("Digite o numero do quarto: \n");
	scanf("%d", &numero);
	printf("Digite o tipo do quarto: \n");
	scanf("%c", &tipo_quarto);
	printf("Digite o preco da diaria: \n");
	scanf("%f", &preco);
	printf("Digite a capacidade do quarto: \n");
	
	printf("Quarto adicionado com sucesso!");
}

void atualizarQuarto()
{
	int numero_atualizar;
	
	printf("Atualizando o quarto \n");
	
	printf("Digite o numero do quarto que deseja atualizar: \n");
	scanf("%d", &numero_atualizar);
	
	if (numero_atualizar == numero)
	{
		printf("Digite o numero do quarto: \n");
		scanf("%d", &numero);
		printf("Digite o tipo do quarto: \n");
		scanf("%c", &tipo_quarto);
		printf("Digite o preco da diaria: \n");
		scanf("%f", &preco);
		printf("Digite a capacidade do quarto: \n");
	
	printf("Quarto atualizado com sucesso! \n");
	}else{
		printf("Numero do quarto não encontrado. \n");
	}
}

void listarQuarto()
{
}

void limparQuarto()
{
}

void listarServico()
{
}

void listarQuartosDisponiveis()
{
	if (disponibilidade)
	{
		listarQuarto();
	}
}
