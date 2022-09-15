
import java.util.Scanner;


public class Ex2 {
    public static void main(String[] args) {
        try (Scanner entrada = new Scanner(System.in)) {
            System.out.println("Digite o valor de N ");
            int N = entrada.nextInt();
            
            
            if(N > 20)
            {
                System.out.println("Maior que 20! ");
            }
            entrada.close();
        }
    }  
}
