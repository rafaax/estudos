import java.util.Scanner;
public class Ex3 {
    public static void main(String[] args) {
        try (Scanner entrada = new Scanner(System.in)) {
            System.out.println("Digite o valor A e depois de B para soma-los! ");
            int a = entrada.nextInt();
            int b = entrada.nextInt();
            int soma;
            soma = a + b;
            if(soma > 10)
            {
                System.out.println("A soma é maior que 10! ");
            }
            entrada.close();
        }
    }      
}
