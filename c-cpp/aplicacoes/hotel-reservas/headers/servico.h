#ifndef SERVICO_H
#define SERVICO_H

struct Servico {
    int id;
    char descricao[50];
};

void adicionarServico(struct Servico);

void atualizarServico(struct Servico, int);

void listarServico();

void visualizarServico(int id);

void menuQuarto(int menu_servico);

#endif
