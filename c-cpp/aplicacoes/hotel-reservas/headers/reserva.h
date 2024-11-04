#ifndef RESERVA.H
#define RESERVA.H


struct Reserva {
    int id;
    int id_quarto;
    int id_cliente;
    char data_check_in[11];
    char data_check_out[11];
};

void fazerReserva(struct Reserva);

void listarReservas();

void verReserva(int id);

void alterarReserva(struct Reserva, int id);

void removerReserva(struct Reserva, int id);

void menuReservas (int menu_reservas);

#endif

