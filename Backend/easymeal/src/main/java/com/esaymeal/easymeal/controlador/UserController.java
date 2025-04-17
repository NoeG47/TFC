package com.esaymeal.easymeal.controlador;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/info")
    public String info(org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties.Authentication auth) {
        return "Bienvenido, " + auth.getName();
    }
}
