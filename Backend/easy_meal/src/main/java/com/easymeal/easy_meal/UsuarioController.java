package com.easymeal.easy_meal;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    private UsuarioRepositorio usuarioRepository;

    // Obtener todos los usuarios
    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public Optional<Usuario> getUsuarioById(@PathVariable Long id) {
        return usuarioRepository.findById(id);
    }

    // Crear un nuevo usuario
    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Actualizar un usuario
    @PutMapping("/{id}")
    public Usuario actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioActualizado) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNombre(usuarioActualizado.getNombre());
            usuario.setCorreo(usuarioActualizado.getCorreo());
            usuario.setContrasena(usuarioActualizado.getContrasena());
            usuario.setImagen_perfil(usuarioActualizado.getImagen_perfil());
            return usuarioRepository.save(usuario);
        }).orElseGet(() -> {
            usuarioActualizado.setId_usuario(id);
            return usuarioRepository.save(usuarioActualizado);
        });
    }

    // Eliminar un usuario
    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
        }
    }

    @PutMapping("/{id}/nombre")
    public Usuario actualizarNombre(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String nuevoNombre = body.get("nombre");

        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNombre(nuevoNombre);
            return usuarioRepository.save(usuario);
        }).orElse(null); // Si no se encuentra el usuario, retorna null
    }

    // Actualizar solo la contraseña de un usuario
    @PutMapping("/{id}/contrasena")
    public Usuario actualizarContrasena(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String nuevaContrasena = body.get("contrasena");

        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setContrasena(nuevaContrasena);
            return usuarioRepository.save(usuario);
        }).orElse(null); // Si no se encuentra el usuario, retorna null
    }
}
