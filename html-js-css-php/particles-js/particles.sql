-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.24-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para particles
CREATE DATABASE IF NOT EXISTS `particles` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `particles`;

-- Copiando estrutura para tabela particles.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) NOT NULL,
  `sobrenome` varchar(90) NOT NULL,
  `login` varchar(200) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(256) NOT NULL,
  `nivel` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela particles.usuario: 4 rows
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `nome`, `sobrenome`, `login`, `email`, `senha`, `nivel`, `status`) VALUES
	(1, 'Raphael', 'Gustav', 'rapha', 'raphael.meireles@vetorian.com', 'rapha', 2, 'Ativo'),
	(2, 'Lucas ', 'Lopes', 'lucas.lopes', 'lucas.lopes@vetorian.com', 'lucas.lopes', 2, 'Inativo'),
	(3, 'Vinicius', 'Monteiro de Olivera Barbosa', 'vinicius.barbosa', 'vinicius.barbosa@vetorian.com', 'mudar123', 2, 'Ativo'),
	(4, 'Adams', 'Rodrigues', 'adams.rodrigues', 'adams.rodrigues@vetorian.com', '701690', 1, 'Ativo');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
