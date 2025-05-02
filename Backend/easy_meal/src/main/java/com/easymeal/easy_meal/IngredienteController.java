package com.easymeal.easy_meal;

import java.text.Normalizer;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ingredientes")
@CrossOrigin(origins = "*")
public class IngredienteController {

    @Autowired
    private IngredienteRepository repo;

    // Función local para eliminar tildes y pasar a minúsculas
    private String normalizarTexto(String texto) {
        if (texto == null)
            return null;
        String sinTildes = Normalizer.normalize(texto, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        return sinTildes.toLowerCase();
    }

    @GetMapping
    public List<Ingrediente> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public ResponseEntity<String> addIngrediente(@RequestBody Ingrediente nuevo) {
        String nombreNormalizado = normalizarTexto(nuevo.getNombre());
        System.out.println("Recibido: " + nuevo.getNombre() + " → Normalizado: " + nombreNormalizado);

        boolean existe = repo.findByNombreIgnoreCase(nombreNormalizado).isPresent();
        if (existe) {
            return ResponseEntity.status(409).body("Ingrediente ya existe");
        }
        repo.save(new Ingrediente(nombreNormalizado));
        return ResponseEntity.ok("Ingrediente añadido");
    }
}
