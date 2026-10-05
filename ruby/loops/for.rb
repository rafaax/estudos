## definido um array para percorrer

frutas = ['Banana','Uva','Manga', 'Pera']

count = 1
for fruta in frutas do
  puts "Fruta número #{count} => #{fruta}"
  count = count + 1
end

dict = Hash.new
dict = {produto: "Boné", preco: 30, quantidade: 7}
produtos = dict

for key, value in produtos do
  puts "#{key}: #{value}"
end
