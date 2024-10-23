#ifndef QUARTOS.H
#define QUARTOS.H


struct Quarto {
    int id;
    int numero;
    char nivel_quarto[100];
    float preco;
};

void adicionarQuarto();

void atualizarQuarto();

void editarQuarto();

void listarQuarto();

void limparQuarto();

void listarServico();

void listarQuartosDisponiveis();

#endif
