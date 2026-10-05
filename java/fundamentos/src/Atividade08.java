import java.util.Scanner;
public class Atividade08 {
    
    static int somar(int a,int b){
        
        return a+b;
    }
     public static void main(String[] args){
        Scanner entrada = new Scanner(System.in);
        int a,b;
        System.out.println("Digite o primeiro numero! \n");
        a = entrada.nextInt();
        System.out.println("Digite o segundo numero! \n");
        b = entrada.nextInt();
        entrada.close();
        
       // int soma = a + b;
        
        System.out.println("A soma de a + b é igual à "+somar(a,b));
     }
}
