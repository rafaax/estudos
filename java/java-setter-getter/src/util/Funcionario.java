
package util;
public class Funcionario {
    private String nome;
    private double salario;
    private double bonus;

    public Funcionario(String nome, double salario){

        this.salario = salario;
        this.nome = nome;

    }

    public String getNome() {
        return nome;
    }

    public double getSalario() {
        return salario;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setSalario(double salario) {
        this.salario = salario;
    }
}
