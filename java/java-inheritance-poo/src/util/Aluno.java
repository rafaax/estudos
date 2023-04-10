package util;

public class Aluno extends Pessoa {

    private String rgm;

    public Aluno(String rgm, String nome, String email, int anoNascimento) {
        super(nome, email, anoNascimento);
        this.rgm = rgm;
    }

    public String getRgm() {
        return rgm;
    }

    public void setRgm(String rgm) {
        this.rgm = rgm;
    }


}

