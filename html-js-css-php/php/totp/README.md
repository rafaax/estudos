
Libs necessárias:
composer require spomky-labs/otphp
composer require endroid/qr-code
composer require sergeytsalkov/meekrodb


![alt text](image.png)

## Banco de dados

O exemplo guarda o segredo do TOTP de cada usuário na tabela `users`. Crie o banco e a tabela:

```sql
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `totp_enabled` tinyint(4) NOT NULL DEFAULT 0,
  `temp_totp_secret` longtext DEFAULT NULL,
  `totp_secret` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
);
```

A conexão fica em `db/init.php`.
