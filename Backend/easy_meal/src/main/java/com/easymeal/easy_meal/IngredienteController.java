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
            "Tomate", "Cebolla", "Ajo", "Pimiento rojo", "Pimiento verde", "Pepino",
            "Zanahoria", "Lechuga", "Espinaca", "Brócoli", "Coliflor", "Patata",
            "Calabacín", "Berenjena", "Champiñón", "Setas", "Puerro", "Apio",
            "Guisantes", "Maíz", "Lentejas", "Garbanzos", "Arroz", "Quinoa",
            "Cuscús", "Trigo", "Avena", "Pollo", "Carne de ternera", "Cerdo",
            "Cordero", "Pavo", "Salmón", "Atún", "Gamba", "Pulpo", "Calamar",
            "Huevo", "Leche", "Yogur", "Queso", "Mantequilla", "Crema ágria",
            "Aceite de oliva", "Aceite de girasol", "Vinagre", "Sal", "Pimienta negra",
            "Pimentón dulce", "Pimentón picante", "Orégano", "Albahaca", "Romero",
            "Tomillo", "Laurel", "Canela", "Clavo", "Nuez moscada", "Jengibre",
            "Cúrcuma", "Comino", "Cilantro", "Perejil", "Anís", "Cardamomo",
            "Mostaza", "Miel", "Azúcar", "Chocolate puro", "Chocolate blanco",
            "Chocolate negro", "Cacao en polvo", "Harina de trigo", "Harina de maíz",
            "Pan", "Agua", "Salsa de soja", "Salsa de tomate", "Mayonesa", "Ketchup"
        );
    }
}