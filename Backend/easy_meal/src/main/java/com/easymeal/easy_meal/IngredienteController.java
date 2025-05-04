package com.easymeal.easy_meal;

import java.text.Normalizer;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ingredientes")
@CrossOrigin(origins = "*")
public class IngredienteController {

    @Autowired
    private IngredienteRepository repo;

    // Eliminar tildes y convertir a minúsculas
    private String normalizarTexto(String texto) {
        if (texto == null)
            return null;
        return Normalizer.normalize(texto, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                .toLowerCase();
    }

    // Obtener todos los ingredientes
    @GetMapping
    public List<Ingrediente> getAll() {
        return repo.findAll();
    }

    // Añadir nuevo ingrediente
    @PostMapping
    public ResponseEntity<String> addIngrediente(@RequestBody Ingrediente nuevo) {
        String nombreNormalizado = normalizarTexto(nuevo.getNombre());
        boolean existe = repo.findByNombreIgnoreCase(nombreNormalizado).isPresent();
        if (existe) {
            return ResponseEntity.status(409).body("Ingrediente ya existe");
        }
        repo.save(new Ingrediente(nombreNormalizado));
        return ResponseEntity.ok("Ingrediente añadido");
    }

    // Actualizar un ingrediente por ID
    @PutMapping("/{id}")
    public ResponseEntity<String> updateIngrediente(@PathVariable Long id, @RequestBody Ingrediente actualizado) {
        Optional<Ingrediente> existente = repo.findById(id);
        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        String nombreNormalizado = normalizarTexto(actualizado.getNombre());
        existente.get().setNombre(nombreNormalizado);
        repo.save(existente.get());

        return ResponseEntity.ok("Ingrediente actualizado");
    }

    // Eliminar ingrediente por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteIngrediente(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repo.deleteById(id);
        return ResponseEntity.ok("Ingrediente eliminado");
    }
}
