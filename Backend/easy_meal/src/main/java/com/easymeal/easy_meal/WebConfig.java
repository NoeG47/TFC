package com.easymeal.easy_meal;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Configura el origen de las solicitudes
        registry.addMapping("/api/**") // Se aplica a todas las rutas que empiecen con /api/
                .allowedOrigins("http://localhost:5173") // El origen de tu frontend (puedes agregar más si lo necesitas)
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Los métodos que deseas permitir
                .allowedHeaders("*"); // Puedes especificar los headers si es necesario
    }
}
