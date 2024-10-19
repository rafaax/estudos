#ifndef QUARTOS.H
#define QUARTOS.H

extern int id_quarto;
extern int numero;
extern char tipo_quarto[15];
extern float preco;
extern int disponibilidade;
extern int capacidade;
extern char data_reserva[10];

void adicionarQuarto();

void atualizarQuarto();

void editarQuarto();

void listarQuarto();

void limparQuarto();

void listarServico();

void listarQuartosDisponiveis();
