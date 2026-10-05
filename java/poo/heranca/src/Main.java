import util.Pessoa;
import util.Aluno;
public class Main {

    public static void main(String[] args) {
        Pessoa p1 = new Pessoa("Ana", "ana@mail.com", 1990);
        Aluno p2 = new Aluno( "12345678","Maria", "maria@exemplo.com", 2000);
        System.out.println(p1.getNome());
    }
}
