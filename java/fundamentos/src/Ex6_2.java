import java.io.PrintStream;
import java.util.Scanner;

public class Ex6_2 {
  public static void main(String[] args) {
        try (Scanner entrada = new Scanner(System.in)) {
            System.out.println("Digite valor para a e depois para b respectivamente: ");
            int a = entrada.nextInt();
            int b = entrada.nextInt();
            int aux;
            
            if(a > b)
            {
                aux = a;
                a = b; 
                b = aux;
            }
            PrintStream printf = System.out.printf("%d %d ", a, b);
            entrada.close();
    } }}

