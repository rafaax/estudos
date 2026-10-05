import java.util.Scanner;
public class Ex4 {
    public static void main(String[] args) {
        try (Scanner entrada = new Scanner(System.in)) {
            System.out.println("Digite um numero para armazenar na variável!");
            int x = entrada.nextInt();
            if(x%3 == 0 && x%7 == 0)
            {
                System.out.println("X é divisivel por 3 e por 7! ");
            }
            entrada.close();
        }
    }          
}
