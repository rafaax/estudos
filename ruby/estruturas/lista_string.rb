lista = [] # definindo ela vazia

lista.push(
  "Arroz",
  "Feijao",
  "Macarrão",
  "Óleo",
  "Queijo",
  "Presunto",
  "Frango",
  "Carne",
  "Cebola",
  "Salsa"
)

lista_sort = lista.sort

puts  "Lista nao organizada com sort"
puts lista
puts "Lista organizada com sort"
puts lista_sort

puts "Primeiro valor do array organizado ordem alfabética"

puts lista_sort.first # traz o primeiro elemento da lista que foi organizada

puts "Último valor do array organizado ordem alfabética"

puts lista_sort.last # traz o ultimo elemento da lista que foi organizada


puts "Array organizado ordem alfabética decrescente"

puts lista.sort.reverse # reverse faz o sort(-1), desc
