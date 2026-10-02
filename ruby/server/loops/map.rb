familia = ['Tia','Mãe','Vó', 'Pai']
familia_nome = ['Maria','Rosemeire','Lourdes', 'Beto']

familia_parentesco = familia.map do |parentesco|
  parentesco
end

puts familia_parentesco


familia_completa = familia.map.with_index do |parentesco, index|
  parentesco + ' ' + familia_nome[index]
end

puts familia_completa
