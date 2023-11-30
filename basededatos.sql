delete from mysql.user where user = 'ferfong';
select * from mysql.user;
create database ing_soft;

use ing_soft;
create user 'ferfong'@'localhost' identified by 'Developer123!';
grant all privileges on ing_soft.* to 'ferfong'@'localhost';
CREATE TABLE `peliculas` (
  `idPelicula` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `genero` varchar(45) DEFAULT NULL,
  `duracion` int DEFAULT NULL,
  `inventario` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`idPelicula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(500) DEFAULT NULL,
  `permiso` int NOT NULL,
  `profilePicture` longblob,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `rentar` (
  `idRentar` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idPelicula` int NOT NULL,
  `fecha_renta` datetime NOT NULL,
  `dias_de_renta` int DEFAULT '5',
  `estatus` tinyint DEFAULT '0',
  PRIMARY KEY (`idRentar`),
  KEY `idUsuario_idx` (`idUsuario`),
  KEY `idPelicula_idx` (`idPelicula`),
  CONSTRAINT `idPelicula` FOREIGN KEY (`idPelicula`) REFERENCES `peliculas` (`idPelicula`),
  CONSTRAINT `idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `torneos` (
    idTorneo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200),
    juego VARCHAR(200),
    consola VARCHAR(200),
    numParticipantes INT,
    fechaInicio DATE,
    fechaFin DATE,
    imagen VARCHAR(500)
);
select * from usuarios;
INSERT INTO usuarios (nombre, password, email, permiso) VALUES ('admin', '25d93efd1f9e923a62ab2bf4f0476ebe638e028210111d93c5106ddee0bb458c', '123@admin.com', 3);
