#ifndef QUARTOS.H
#define QUARTOS.H


struct Quarto {
    int id;
    int numero;
    float preco_diaria;
    int servicos_id;
    int disponivel;
};

void adicionarQuarto(struct Quarto quarto);

void atualizarQuarto(struct Quarto quarto, int id);

void listarQuarto(int id);

void listarQuartosDisponiveis();

#endif
