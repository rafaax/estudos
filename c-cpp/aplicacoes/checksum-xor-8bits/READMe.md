Motivos de usar o checksum em aplicações: 
 
Prevenção de Comandos Não Autorizados (O checksum age como uma assinatura básica. Sem o checksum correto, o equipamento ignora o comando)
Detecção de Erros na Transmissão (O checksum (como XOR ou CRC) permite identificar se os dados foram corrompidos durante a transmissão. Se o checksum recebido não bater com o cálculo local, o equipamento descarta o pacote)
Otimização de Recursos (Algoritmos como XOR (8 bits) ou soma modular são leves e rápidos, ao contrário de criptografia complexa. Consomem menos energia, crucial para dispositivos movidos a bateria.)


Inicialização: checksum começa em 0.

Loop pela string: Para cada caractere (str[i]), aplica-se a operação XOR (^) com checksum.

Saída formatada: Formato: tamanho;texto;checksum


Como o XOR Funciona?

O XOR (^) é uma operação bit a bit que "toggleia" os bits do resultado conforme os bits dos caracteres.

Se um caractere se repete duas vezes, ele é cancelado (ex: 'a' ^ 'a' = 0).

![image](https://github.com/user-attachments/assets/d25f1109-f544-47c3-a041-e2186ffc2b43)
