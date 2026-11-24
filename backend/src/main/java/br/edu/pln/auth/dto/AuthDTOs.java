package br.edu.pln.auth.dto;

import br.edu.pln.users.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.UUID;

public class AuthDTOs {

    public record LoginRequest(
        @NotBlank(message = "O e-mail é obrigatório.")
        @Email(message = "Formato de e-mail inválido.")
        String email,

        @NotBlank(message = "A senha é obrigatória.")
        String senha
    ) {}

    public record RegisterRequest(
        @NotBlank(message = "O nome completo é obrigatório.")
        @Size(min = 3, max = 150, message = "O nome deve ter entre 3 e 150 caracteres.")
        String nome,

        @NotBlank(message = "O e-mail é obrigatório.")
        @Email(message = "Formato de e-mail inválido.")
        String email,

        @NotBlank(message = "A senha é obrigatória.")
        @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres.")
        String senha,

        boolean consentimentoLgpd
    ) {}

    public record LoginResponse(
        String token,
        String tokenType,
        long expiresIn,
        UserDto usuario
    ) {}

    public record UserDto(
        UUID id,
        String nome,
        String email,
        Role role,
        boolean emailVerificado,
        String biografia,
        String matricula,
        String instituicao
    ) {}

    public record UpdateProfileRequest(
        String nome,
        String biografia,
        String matricula,
        String instituicao
    ) {}

    public record MessageResponse(
        String mensagem,
        boolean sucesso
    ) {}
}
