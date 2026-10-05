import java.util.Scanner;

public class Ex7 {
    public static void main(String[] args) {
    try (Scanner entrada = new Scanner(System.in)) {
            System.out.println("Digite seu salário: ");
            float salario = entrada.nextFloat();
            float novosalario;
            if(salario <= 300)
            {
                novosalario = (float) (salario*1.35);
            }
            else
            {
                novosalario = (float) (salario*1.15);
            }
            System.out.printf("%f", novosalario);
            entrada.close();
}}}
