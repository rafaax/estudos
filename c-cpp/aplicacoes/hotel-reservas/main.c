#include <stdio.h>
#include "utils.h"

int main() {
   	readFile("servicos.json");
   	writeFile("servicos.json", "teste \n");
   	readFile("servicos.json");
   return 0;
}
