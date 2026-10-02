import java.io.PrintStream;
import java.util.Scanner;

public class Ex6 {
    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);
        System.out.println("Digite um valor para a e para b respectivamente > ");
        int a = entrada.nextInt();
        int b = entrada.nextInt();
        
        if(a < b)
        {
            PrintStream printf = System.out.printf("%d %d", a, b);
        }
        else
        {
            PrintStream printf = System.out.printf("%d %d ", b, a);
        }

   
}}
