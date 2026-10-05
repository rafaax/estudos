import java.util.Scanner;
public class Atividade09 {
    //metodo
    static int potencia(int base, int expoente){
    
     int resultado = 1;   
    
    for(int i = 1; i <= expoente; i++){
          resultado = resultado*base;
        }
    
    return resultado;
    }
    
    //main
    public static void main(String[] args){
    Scanner entrada = new Scanner(System.in);
    int base, expoente;
    System.out.println("Digite a base \n"); base = entrada.nextInt();
    System.out.println("Digite o expoente \n"); expoente = entrada.nextInt();
    potencia(base,expoente);
    System.out.println("A potencia de base"+base+" e expoente"+expoente+"  é igual à "+potencia(base,expoente));
        
        
        
        
        
}}
