
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

    public void setBonus(double bonus) {
        this.bonus = bonus;
    }

    public double getBonus() {
        return bonus;
    }


    public double aplicarBonus(double bonus){
        setBonus(bonus);
        return bonus;
    }

    public void atualizarSalario(){
        getSalario();
        getBonus();
        double salarioFinal = getSalario() + getBonus();
        System.out.printf("O salário com bonus é %f", salarioFinal);
    }
}
