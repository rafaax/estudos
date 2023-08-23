from classes import *
from functions import *

funcionario = Funcionario('Raphael', 'raphael.meireles@vetorian.com', 19)

# cadastrando horas nos meses do ano e seus valores hora 
funcionario.cadastro_hora('120', 'Janeiro')
funcionario.cadastro_salario_hora('Janeiro', 14)
funcionario.cadastro_hora('97', 'Fevereiro')
funcionario.cadastro_salario_hora('Fevereiro', 14)
funcionario.cadastro_hora('115', 'Março')
funcionario.cadastro_salario_hora('Março', 15)
funcionario.cadastro_hora('116', 'Abril')
funcionario.cadastro_salario_hora('Abril', 15)
funcionario.cadastro_hora('130', 'Maio')
funcionario.cadastro_salario_hora('Maio', 15)
funcionario.cadastro_hora('135', 'Junho')
funcionario.cadastro_salario_hora('Junho', 15)
funcionario.cadastro_hora('126', 'Julho') 
funcionario.cadastro_salario_hora('Julho', 16)
funcionario.cadastro_hora('120', 'Agosto')
funcionario.cadastro_salario_hora('Agosto', 16)
funcionario.cadastro_hora('126', 'Setembro')
funcionario.cadastro_salario_hora('Setembro', 16)
funcionario.cadastro_hora('115', 'Outubro')
funcionario.cadastro_salario_hora('Outubro', 15)
funcionario.cadastro_hora('123', 'Novembro')
funcionario.cadastro_salario_hora('Novembro', 17)
funcionario.cadastro_hora('103', 'Dezembro')
funcionario.cadastro_salario_hora('Dezembro', 17)

infoFuncionario(funcionario)
mes = input('Digite o mês que você deseja consultar o seu salário: ')

calculaSalario(funcionario, mes)