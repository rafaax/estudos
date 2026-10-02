# foreach

puts "Com vetor"
puts
frutas = ['Banana','Uva','Manga', 'Pera']

frutas.each do |frutas|
  puts frutas
end




dict = Hash.new
dict = {produto: "Boné", preco: 30, quantidade: 7}
produtos = dict


puts "Com dicionario"
puts

produtos.each do |k, v|
  puts "#{k} => #{v}"
end
