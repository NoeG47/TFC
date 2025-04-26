-- Insertar usuarios
INSERT IGNORE INTO usuarios (nombre, correo, contrasena, imagen_perfil) VALUES
('noe', 'noe@gmail.com', '$2b$10$Hd4UOKA//lD7VxKRprKcLOa2MLv8Xgu0SsZNjj2iFmrnzqVhrqecO', ''),
('laila', 'laila@gmail.com', '$2b$10$xyz789xyz789xyz789xyz789xyz789xyz789xyz789xyz789xyz789', '');

-- Insertar recetas para Noe (id_usuario = 1)
INSERT IGNORE INTO recetas (nombre, descripcion, ingredientes, id_usuario) VALUES
('Pizza Margarita', 'Pizza clásica italiana con albahaca.', 'tomate, mozzarella, albahaca, harina, agua, sal', 1),
('Spaghetti Bolognesa', 'Pasta italiana con salsa boloñesa.', 'espaguetis, carne picada, tomate, cebolla, ajo', 1),
('Ensalada César', 'Ensalada con pollo a la parrilla.', 'lechuga romana, pollo, parmesano, croutons, aderezo César', 1);

-- Insertar recetas para Laila (id_usuario = 2)
INSERT IGNORE INTO recetas (nombre, descripcion, ingredientes, id_usuario) VALUES
('Paella Valenciana', 'Arroz tradicional con pollo y conejo.', 'arroz, pollo, conejo, judía verde, garrofón, tomate', 2),
('Tarta de Queso', 'Postre cremoso de queso.', 'queso crema, huevos, azúcar, galletas, mantequilla', 2);
