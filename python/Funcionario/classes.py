class Funcionario:
    def __init__(self, nome, email, idade ):
        self.nome = nome
        self.email = email
        self.idade = idade
        self.horas = {}
        self.salario_hora = {}

    def cadastro_hora(self, horas, mes):
        if(mes not in self.horas):
            self.horas[mes] = horas

    def cadastro_salario_hora(self, mes, valor):
        if(mes not in self.salario_hora):
            self.salario_hora[mes] = valor
