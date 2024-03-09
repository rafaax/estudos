## dicionarios

hash = {}
hash_via_object = Hash.new ## outra forma de inicializar uma hashe

puts hash


hash = {nome: "Rapha", peso: 66.1, idade: 19}
hash[:altura] = 1.71

puts hash

hash_via_object = {nome: "Guilherme", peso: 78, idade: 20}
hash_via_object[:altura] = 1.80

puts hash_via_object

puts hash == hash_via_object  # comparando se as hashes sao iguais
