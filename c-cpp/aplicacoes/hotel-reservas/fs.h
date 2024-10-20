#ifndef FS_H
#define FS_H

extern cJSON *json = cJSON_CreateObject();

void cliente_to_json();
void quarto_to_json();
void reserva_to_json();
void servico_to_json();

#endif
