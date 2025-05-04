SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) CHARACTER SET utf8mb4,
    correo VARCHAR(100) CHARACTER SET utf8mb4 UNIQUE,
    contrasena VARCHAR(255) CHARACTER SET utf8mb4,
    imagen_perfil VARCHAR(255) CHARACTER SET utf8mb4,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS recetas (
    id_receta BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) CHARACTER SET utf8mb4,
    descripcion TEXT CHARACTER SET utf8mb4,
    id_usuario BIGINT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
) CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS ingredientes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) CHARACTER SET utf8mb4 UNIQUE NOT NULL
) CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS recetas_ingredientes (
    id_receta BIGINT,
    id_ingrediente BIGINT,
    PRIMARY KEY (id_receta, id_ingrediente),
    FOREIGN KEY (id_receta) REFERENCES recetas(id_receta) ON DELETE CASCADE,
    FOREIGN KEY (id_ingrediente) REFERENCES ingredientes(id) ON DELETE CASCADE
) CHARACTER SET = utf8mb4;
