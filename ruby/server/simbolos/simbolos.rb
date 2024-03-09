puts :id.object_id
puts :nome.object_id
puts :nome.object_id #nao cria outra alocacao de memoria para o mesmo simbolo

hashes = {nome: "Raphael", idade: 19}
puts hashes
