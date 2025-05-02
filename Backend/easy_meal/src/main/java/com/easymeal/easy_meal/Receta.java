package com.easymeal.easy_meal;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "recetas")
public class Receta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_receta;

    private String nombre;
    private String descripcion;

    @ManyToMany
    @JoinTable(name = "recetas_ingredientes", joinColumns = @JoinColumn(name = "id_receta"), inverseJoinColumns = @JoinColumn(name = "id_ingrediente"))
    private Set<Ingrediente> ingredientes = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    @JsonBackReference
    private Usuario usuario;

    public Receta() {
    }

    public Receta(String nombre, String descripcion, Set<Ingrediente> ingredientes, Usuario usuario) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.ingredientes = ingredientes;
        this.usuario = usuario;
    }

    public Long getId_receta() {
        return id_receta;
    }

    public void setId_receta(Long id_receta) {
        this.id_receta = id_receta;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Ingrediente> getIngredientes() {
        return ingredientes;
    }

    public void setIngredientes(Set<Ingrediente> ingredientes) {
        this.ingredientes = ingredientes;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
