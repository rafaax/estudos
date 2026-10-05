import java.util.Scanner;
public class Ex5 {
    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);
        
        System.out.println("Digite sua idade > ");
        int idade = entrada.nextInt();
        
        
        if(idade >= 18 && idade < 24)
        {
            System.out.println("Voce tem 18 a 24 anos e pode prestar a prova do ....");
        }
        else if(idade < 18)
        {
            System.out.println("Menor que 18 nao pode fazer a prova! ");
        }
        else
        {
            System.out.println("Maior que 24, nao pode fazer a prova ja perdeu as chances!!");
        }
        entrada.close();
    }  
}