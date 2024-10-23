#ifndef SERVICO_H
#define SERVICO_H

struct Servico {
    int id;
    char descricao[50];
    char nivel_servico[5][100];
};

int cliente_to_servico(struct Cliente cliente);

#endif
