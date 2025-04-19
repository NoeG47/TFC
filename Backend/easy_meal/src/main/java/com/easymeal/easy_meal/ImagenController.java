package com.easymeal.easy_meal;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
@RequestMapping("/api/imagenes")
public class ImagenController {

    // Ruta donde guardarás las imágenes
    private static final String UPLOAD_DIR = "src/main/resources/static/uploads/";

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) {
        try {
            // Verifica si el archivo no está vacío
            if (file.isEmpty()) {
                return "Por favor, seleccione un archivo.";
            }

            // Crea la ruta de destino donde se guardará el archivo
            File dest = new File(UPLOAD_DIR + file.getOriginalFilename());

            // Guardar el archivo
            file.transferTo(dest);

            return "Archivo subido con éxito: " + file.getOriginalFilename();
        } catch (IOException e) {
            e.printStackTrace();
            return "Error al subir el archivo.";
        }
    }
}
