package util;

public class Pessoa {
    private String nome;
    private int anoNascimento;
    private String email;


    public Pessoa(String nome, String email, int anoNascimento){
        // construtor vazio
    }

    public String getNome(){
        return nome;
    }

    public void setNome(String nome){
        this.nome = nome;
    }

    public int getAnoNascimento(){
        return anoNascimento;
    }

    public void setAnoNascimento(int anoNascimento){
        this.anoNascimento = anoNascimento;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }
}
