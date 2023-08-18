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

    def calcula_salario(self, mes):
        if (mes not in self.horas) or (mes not in self.salario_hora):
            print('Mês Inexistente')
        else:
            salario = float(self.horas[mes]) * float(self.salario_hora[mes])
            return salario

    def __repr__(self):
        return f"Funcionario: {self.nome} \n email: {self.email} \nhoras/mes: {self.horas} \nsalario/hora: {self.salario_hora}" 