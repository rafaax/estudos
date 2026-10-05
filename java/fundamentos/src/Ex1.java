import java.util.Scanner;
public class Ex1 {
    public static void main(String[] args) {
        try (Scanner entrada = new Scanner(System.in)) {
            System.out.println("Digite F para Feminino ");
            String sexo = entrada.next();
            
            
            if("F".equals(sexo))
            {
                System.out.println("Feminimo");
            }
            entrada.close();
        }
    }  
}
