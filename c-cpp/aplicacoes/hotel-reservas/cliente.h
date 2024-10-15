
#ifndef CLIENTE_H
#define CLIENTE_H

extern int id_cliente;
extern char nome_cliente[];
extern char cpf_cliente[];
extern int ativo;
extern char data_nascimento_cliente[];
extern char criado_em_cliente[];

void criaCliente();

void editaCliente();

void deletaCliente();

void listarClientes();

void verCliente();

#endif
