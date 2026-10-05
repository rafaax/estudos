#similar - do while

count = 1

loop do
  puts "Teste 1"
  break if count == 5
  count = count + 1
end

count = 1

loop do
  puts "Teste 2 "
  if count == 5
    break
  else
    count = count + 1
  end
end
