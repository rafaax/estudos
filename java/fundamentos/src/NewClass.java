import java.util.Scanner;
public class NewClass {
    //metodo 
    
    static String mensagem(){
       return "O %s está falando oi";
  
    }

static String mensagem2(){
       // return "O %s está falando oi";
       return " Oi";
    }    
    
    
    
    //main 
    public static void main(String[] args){
        String nome;
        String nome2;
        Scanner entrada = new Scanner(System.in); 
        
        nome = entrada.nextLine();
        nome2 = entrada.nextLine();
        System.out.printf(mensagem()+"\n", nome);
        System.out.println("O "+nome2+" tambem  está falando"+mensagem2());
        entrada.close();
        
    }
}
