import util.Funcionario;

public class Main {
        public static void main(String[] args){

            Funcionario funcionario01;
            //int remove, adiciona, option;


            funcionario01 = new Funcionario("Oi", 1500);

            System.out.printf("O funcionário %s ganha %f \n", funcionario01.getNome(), funcionario01.getSalario());

            funcionario01.setSalario(2000);

            System.out.printf("O funcionário %s agora ganha %f \n", funcionario01.getNome(), funcionario01.getSalario());

            funcionario01.aplicarBonus(200);

            System.out.printf("O bonus agora é %f \n", funcionario01.getBonus());


            funcionario01.atualizarSalario();
        }
    }
