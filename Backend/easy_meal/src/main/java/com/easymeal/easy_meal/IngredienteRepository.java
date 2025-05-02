package com.easymeal.easy_meal;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredienteRepository extends JpaRepository<Ingrediente, Long> {
    Optional<Ingrediente> findByNombreIgnoreCase(String nombre);
}