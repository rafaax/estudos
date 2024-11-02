#ifndef QUARTOS_H
#define QUARTOS_H


struct Quarto {
    int id;
    int numero;
    float preco_diaria;
    int servicos_id;
    int disponivel;
};

void adicionarQuarto(struct Quarto);

void atualizarQuarto(struct Quarto, int);

void listarQuartos();

void visualizarQuarto(int id);

void listarQuartosDisponiveis();

#endif
