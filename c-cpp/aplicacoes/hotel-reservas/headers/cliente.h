#ifndef CLIENTE_H
#define CLIENTE_H

struct Cliente {
    int id;
    char nome[50];
    char cpf[20];
    int ativo;
    char data_nascimento[11];
};

int criarCliente(struct Cliente cliente);

int editaCliente(struct Cliente cliente, int id);

int deletaCliente(struct Cliente cliente, int id);

void listarClientes();

void verCliente();

#endif
