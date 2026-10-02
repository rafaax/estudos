
import java.util.Scanner;

public class matrizes {
    public static void main(String[] args){
        
        Scanner entrada = new Scanner(System.in);
        int A[][] = new int [10][3];
        int col1 = 0, col2 = 0, col3 = 0;
        int soma = 0;             
        int[] vetorlinha = new int[10];
        int B[][] = new int [10][3];
         
        // ex 1
        System.out.println("CADASTRANDO DADOS NA MATRIZ!!");
        for(int linha = 0; linha < 10; linha++)
        {
            for(int coluna = 0; coluna <3; coluna++){
                System.out.printf("A[%d][%d] = ", linha, coluna);
                A[linha][coluna] = entrada.nextInt();
            }
        }
    // ex 2 
    	for(int linha = 0; linha < 10; linha++)
	{
                col1 = col1 + A[linha][0];
		col2 = col2 + A[linha][1];
                col3 = col3 + A[linha][2];
                
	}
	System.out.printf("SOMA DA COLUNA 1 = %d \n", col1);
        System.out.printf("SOMA DA COLUNA 2 = %d \n", col2);
        System.out.printf("SOMA DA COLUNA 3 = %d \n", col3);
 
    // ex 3
    
    for(int linha = 0; linha < 10; linha++)
        {
            soma = 0;
            for(int coluna = 0; coluna <3; coluna++){
            soma = soma + A[linha][coluna];         
            }
            vetorlinha[linha] = soma;
        }
    for(int linha = 0; linha < 10; linha++){
        
    
    System.out.printf("LINHA 1 = %d \n", vetorlinha[linha]);
    }
    // ex 4 
    
    
    for(int linha = 0; linha < 10; linha++)
        {
            for(int coluna = 0; coluna <3; coluna++)
            {

                B[linha][coluna] = A[linha][coluna];
                if(linha % 2 != 0){
                    B[linha][coluna] = 0;   
                }
            }
        }
    for(int linha = 0; linha < 10; linha++)
    {
        for(int coluna = 0; coluna < 3; coluna++){
            System.out.printf("B[%d][%d] = %d \n", linha, coluna, B[linha][coluna]);
        }
    }
}
}