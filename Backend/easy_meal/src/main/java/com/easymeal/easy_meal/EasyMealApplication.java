package com.easymeal.easy_meal;

import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EasyMealApplication {

	public static void main(String[] args) {
		SpringApplication.run(EasyMealApplication.class, args);
	}
	/*
	 * @Bean
	public CommandLineRunner demo(UsuarioRepositorio usuarioRepository,RecetaRepositorio recetaRepo) {
		return args -> {

			Usuario usuario = new Usuario();
			usuario.setNombre("Lorena");
			usuario.setCorreo("lorena.perez@example.com");
			usuario.setContraseña("123456");
			usuario.setImagen_perfil("perfil.jpg");
			usuario.setFechaCreacion(LocalDateTime.now());

			usuarioRepository.save(usuario);

			Receta receta1 = new Receta();
			receta1.setNombre("Spaghetti Boloñesa");
			receta1.setDescripcion("Un clásico italiano con carne molida y tomate.");
			receta1.setIngredientes("Pasta, carne molida, tomate, ajo, cebolla");
			receta1.setUsuario(usuario);

			// Crear segunda receta
			Receta receta2 = new Receta();
			receta2.setNombre("Tacos de Pollo");
			receta2.setDescripcion("Tacos rellenos de pollo desmenuzado con salsa.");
			receta2.setIngredientes("Tortillas, pollo, cebolla, cilantro, salsa");
			receta2.setUsuario(usuario);

			// Guardar recetas
			recetaRepo.save(receta1);
			recetaRepo.save(receta2);

			System.out.println("✅ Usuario creado exitosamente");
		};
}
	 */
	
	

}
