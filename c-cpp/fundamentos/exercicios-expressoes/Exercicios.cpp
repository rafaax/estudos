#include <iostream>
#include <stdio.h>
main()
{
	
	
//==================//*
//DECLARAÇÃO DE VARIAVEIS//
//==================//*
float resultado = 0;
float resultado2 = 0;
float resultado3 = 0;
float resultado4 = 0;
float contarandom1 = 0;
float p = 2;
float q = 3;
int r = 12;
float s = 4.5;
float resto = 0;

//===============================

resultado = 100 * q / p + r;
printf ("1) 100 * q / p + r = %f \n", resultado);
resto = r % 5;
resultado2 = p * resto - q / 2;
printf ("2) p * r % 5  - q / 2 = %f  \n", resultado2);
resultado3 = q * q - r / 4 * p - 3;
printf ("3) q * q - r/4 * p - 3 = %f \n", resultado3);
resultado4 = s + r * (3 - 2 * p) / 5 + 5 * q;
printf ("5) s + r * (3 - 2 * p) / 5 = 5 * q = %f \n", resultado4);


//=============================//

// contas aleatorias 

//=====================// 

printf("Contas que nao fazem parte das questoes: \n");
printf("O resultado de sua conta aleatoria(27 * p / 6 - r + 4 * 12) é igual a = %f \n", contarandom1);








}
