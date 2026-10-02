from classes import *

def infoFuncionario(funcionario):
    idade = funcionario.idade
    nome = funcionario.nome
    email = funcionario.email
    print(f'O funcionario {nome} tem {idade} anos e seu email é: {email} ')

def calculaSalario(funcionario, mes):
    mes = (mes)
    salario = funcionario.calcula_salario(mes)
    print(f'O salario do {funcionario.nome} deste mes foi de R${salario}') 