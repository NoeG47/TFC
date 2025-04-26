package com.easymeal.easy_meal;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ingredientes")
@CrossOrigin(origins = "*") // Para permitir que el frontend pueda pedirlo
public class IngredienteController {

    @GetMapping
    public List<String> getIngredientes() {
        return Arrays.asList(
            "Aceite de girasol", "Aceite de oliva", "Acelga", "Agua", "Albahaca",
            "Alcachofa", "Alioli", "Almeja", "Anís", "Arándanos", "Arroz",
            "Avena", "Bacalao", "Berza", "Brócoli", "Brotes de soja",
            "Cacao en polvo", "Calabacín", "Calamar", "Canela", "Cardamomo",
            "Carne de ternera", "Cebada", "Cebolla", "Champiñón", "Chocolate blanco",
            "Chocolate negro", "Chocolate puro", "Cilantro", "Clavo", "Col rizada",
            "Coles de Bruselas", "Comino", "Cordero", "Cuscús", "Cúrcuma",
            "Endibia", "Escarola", "Espinaca", "Fideos", "Frambuesas",
            "Gamba", "Garbanzos", "Grano de café", "Guisantes", "Harina de maíz",
            "Harina de trigo", "Hinojo", "Huevo", "Jengibre", "Judía verde",
            "Ketchup", "Laurel", "Lechuga", "Leche", "Lentejas",
            "Macarrones", "Maíz", "Mantequilla", "Mayonesa", "Merluza",
            "Miel", "Mostaza", "Nabo", "Nuez moscada", "Orégano",
            "Pan", "Pavo", "Pepinillo", "Pepino", "Perejil",
            "Pimiento rojo", "Pimiento verde", "Pimentón dulce", "Pimentón picante", "Plátano",
            "Pollo", "Pulpo", "Queso", "Queso rallado", "Rábano",
            "Ravioli", "Remolacha", "Repollo", "Romero", "Rúcula",
            "Sal", "Salsa de soja", "Salsa de tomate", "Salmón", "Setas",
            "Spaguetti", "Tomate", "Tomate Concentrado", "Tomate Frito", "Tomillo",
            "Trigo", "Vinagre", "Yogur"
        );
    }
}