import java.util.Scanner;
public class Atividade10 {
    
    static int maiormetodo(int a, int b){
        int maior = 0;
        if(a < b ){
            maior = b;
            
        }else{
            maior = a;
        }
        return maior;
    }
    
    
    public static void main(String[] args){
        Scanner entrada = new Scanner(System.in);
        int a,b,c;
        int resultado = 0;
        a = entrada.nextInt();
        b = entrada.nextInt();
        c = entrada.nextInt();
        
        maiormetodo(a,b);
        
        resultado = maiormetodo(a,b);
        resultado = maiormetodo(resultado,c);
        System.out.printf("O maior numero entre esses 3 é: %d", resultado);
        
        
    }
}
