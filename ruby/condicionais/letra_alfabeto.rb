##### codigo experimental #####

numero = gets.to_i
letra = nil  # nil = NULL

if numero > 25
  raise "Alfabeto só vai até o 25" # raise retorna erro e exita o codigo
elsif numero < 0 || numero == 0 # usando operador ou porem poderia usar o <= faria a mesma coisa
  raise "Numero nao pode ser inferior ou igual a 0"
else
  case numero
  when 1
    letra = 'A'
  when 2
    letra = 'B'
  when 3
    letra =  'C'
  when 4
    letra =  'D'
  when 5
    letra =  'E'
  when 6
    letra =  'F'
  when 7
    letra =  'G'
  when 8
    letra =  'H'
  when 9
    letra =  'I'
  when 10
    letra =  'J'
  when 11
    letra =  'K'
  when 12
    letra =  'L'
  when 13
    letra =  'M'
  when 14
    letra =  'N'
  when 15
    letra =  'O'
  when 16
    letra =  'P'
  when 17
    letra =  'Q'
  when 18
    letra =  'R'
  when 19
    letra =  'S'
  when 20
    letra =  'T'
  when 21
    letra =  'U'
  when 22
    letra =  'V'
  when 23
    letra =  'W'
  when 24
    letra =  'Y'
  when 25
    letra =  'Z'
  end
  puts letra
end
