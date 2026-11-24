package br.edu.pln.auth.controller;

import br.edu.pln.auth.dto.AuthDTOs.*;
import br.edu.pln.users.model.Usuario;
import br.edu.pln.users.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = usuarioService.authenticate(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@Valid @RequestBody RegisterRequest request) {
        LoginResponse response = usuarioService.register(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal Usuario usuario) {
        if (usuario == null) {
            return ResponseEntity.status(401).build();
        }
        UserDto profile = usuarioService.getProfile(usuario.getId());
        return ResponseEntity.ok(profile);
    }

    @PostMapping("/recover-password")
    public ResponseEntity<MessageResponse> recoverPassword(@RequestParam String email) {
        // Simulação institucional de envio de token de recuperação
        return ResponseEntity.ok(new MessageResponse(
            "Caso o e-mail '" + email + "' esteja cadastrado, as instruções institucionais de redefinição de senha foram enviadas.",
            true
        ));
    }
}
