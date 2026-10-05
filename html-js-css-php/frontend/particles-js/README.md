# particles-js

![Screenshot_1](https://github.com/rafaax/particles-js/assets/37984884/dd2b6f39-bd11-4b5e-828e-22215904b4ab)

<h1>
  Tela de Login 
</h1>

## Banco de dados

O exemplo usa o banco MySQL `particles` (conexão em `php/login.php`). Crie a tabela de usuários:

```sql
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) NOT NULL,
  `sobrenome` varchar(90) NOT NULL,
  `login` varchar(200) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(256) NOT NULL,
  `nivel` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
);
```

Depois insira um usuário de teste com `status` igual a `Ativo`. O exemplo compara a senha em texto puro, o que serve apenas para estudo e não deve ser usado em produção.
