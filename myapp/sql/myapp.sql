CREATE DATABASE `myapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `usuario` varchar(100) DEFAULT NULL,
  `clave` varchar(100) DEFAULT NULL,
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `modulos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `submenus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `formularios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  `id_modulo` int(11) NOT NULL,
  `id_submenu` int(11) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `formularios_un` (`nombre`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `permisos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_rol` int(11) NOT NULL,
  `id_formulario` int(11) NOT NULL,
  `habilitar` tinyint(1) DEFAULT NULL,
  `consultar` tinyint(1) DEFAULT NULL,
  `agregar` tinyint(1) DEFAULT NULL,
  `modificar` tinyint(1) DEFAULT NULL,
  `eliminar` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO myapp.roles
(id, nombre)
VALUES(1, 'Administrador');
INSERT INTO myapp.roles
(id, nombre)
VALUES(2, 'Contabilidad');

INSERT INTO myapp.modulos
(id, nombre)
VALUES(1, 'Configuraciones');
INSERT INTO myapp.modulos
(id, nombre)
VALUES(2, 'Compras');
INSERT INTO myapp.modulos
(id, nombre)
VALUES(3, 'Ventas');

INSERT INTO myapp.submenus
(id, nombre)
VALUES(1, 'Archivos');
INSERT INTO myapp.submenus
(id, nombre)
VALUES(2, 'Procesos');
INSERT INTO myapp.submenus
(id, nombre)
VALUES(3, 'Consultas');
INSERT INTO myapp.submenus
(id, nombre)
VALUES(4, 'Listados');
INSERT INTO myapp.submenus
(id, nombre)
VALUES(5, 'Informes');

INSERT INTO myapp.formularios
(id, nombre, url, id_modulo, id_submenu)
VALUES(1, 'Roles', 'url', 1, 1);
INSERT INTO myapp.formularios
(id, nombre, url, id_modulo, id_submenu)
VALUES(2, 'Módulos', 'url', 1, 1);
INSERT INTO myapp.formularios
(id, nombre, url, id_modulo, id_submenu)
VALUES(3, 'Submenú', 'url', 1, 1);

INSERT INTO myapp.permisos
(id, id_rol, id_formulario, habilitar, consultar, agregar, modificar, eliminar)
VALUES(1, 1, 1, 1, 1, 1, 1, 1);
INSERT INTO myapp.permisos
(id, id_rol, id_formulario, habilitar, consultar, agregar, modificar, eliminar)
VALUES(2, 1, 2, 1, 1, 1, 1, 1);
INSERT INTO myapp.permisos
(id, id_rol, id_formulario, habilitar, consultar, agregar, modificar, eliminar)
VALUES(3, 1, 3, 1, 1, 1, 1, 1);

INSERT INTO myapp.usuarios
(id, nombre, usuario, clave, id_rol)
VALUES(1, 'Administrador', 'admin', '1', 1);
INSERT INTO myapp.usuarios
(id, nombre, usuario, clave, id_rol)
VALUES(2, 'Jose', 'jose', '2', 1);
