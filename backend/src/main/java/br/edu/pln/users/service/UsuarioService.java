package br.edu.pln.users.service;

import br.edu.pln.auth.dto.AuthDTOs.*;
import br.edu.pln.auth.security.JwtService;
import br.edu.pln.users.model.Perfil;
import br.edu.pln.users.model.Role;
import br.edu.pln.users.model.Usuario;
import br.edu.pln.users.repository.PerfilRepository;
import br.edu.pln.users.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.UUID;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PerfilRepository perfilRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UsuarioService(
            UsuarioRepository usuarioRepository,
            PerfilRepository perfilRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.usuarioRepository = usuarioRepository;
        this.perfilRepository = perfilRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public LoginResponse authenticate(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("E-mail institucional ou senha incorretos."));

        if (!usuario.isAtivo()) {
            throw new IllegalStateException("Esta conta institucional encontra-se inativa.");
        }

        if (!passwordEncoder.matches(request.senha(), usuario.getSenhaHash())) {
            throw new IllegalArgumentException("E-mail institucional ou senha incorretos.");
        }

        String token = jwtService.generateToken(usuario);
        Perfil perfil = perfilRepository.findByUsuario(usuario).orElse(null);

        UserDto userDto = toDto(usuario, perfil);
        return new LoginResponse(token, "Bearer", jwtService.getExpirationTime(), userDto);
    }

    @Transactional
    public LoginResponse register(RegisterRequest request) {
        if (usuarioRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Este e-mail institucional já está cadastrado no sistema.");
        }

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(request.nome().trim());
        novoUsuario.setEmail(request.email().toLowerCase().trim());
        novoUsuario.setSenhaHash(passwordEncoder.encode(request.senha()));
        novoUsuario.setRole(Role.ROLE_ESTUDANTE);
        novoUsuario.setConsentimentoLgpd(request.consentimentoLgpd());
        novoUsuario.setEmailVerificado(true); // Auto-verificado em ambiente acadêmico demonstrativo

        Usuario salvo = usuarioRepository.save(novoUsuario);

        Perfil perfil = new Perfil(salvo);
        perfil.setInstituicao("Curso de Engenharia de Software");
        perfilRepository.save(perfil);

        String token = jwtService.generateToken(salvo);
        return new LoginResponse(token, "Bearer", jwtService.getExpirationTime(), toDto(salvo, perfil));
    }

    public UserDto getProfile(UUID userId) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        Perfil perfil = perfilRepository.findByUsuario(usuario).orElse(null);
        return toDto(usuario, perfil);
    }

    @Transactional
    public UserDto updateProfile(UUID userId, UpdateProfileRequest request) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        if (request.nome() != null && !request.nome().isBlank()) {
            usuario.setNome(request.nome().trim());
            usuario.setAtualizadoEm(OffsetDateTime.now());
            usuarioRepository.save(usuario);
        }

        Perfil perfil = perfilRepository.findByUsuario(usuario).orElseGet(() -> new Perfil(usuario));
        if (request.biografia() != null) perfil.setBiografia(request.biografia());
        if (request.matricula() != null) perfil.setMatricula(request.matricula());
        if (request.instituicao() != null) perfil.setInstituicao(request.instituicao());
        perfil.setAtualizadoEm(OffsetDateTime.now());
        perfilRepository.save(perfil);

        return toDto(usuario, perfil);
    }

    private UserDto toDto(Usuario usuario, Perfil perfil) {
        return new UserDto(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getRole(),
                usuario.isEmailVerificado(),
                perfil != null ? perfil.getBiografia() : null,
                perfil != null ? perfil.getMatricula() : null,
                perfil != null ? perfil.getInstituicao() : "Engenharia de Software"
        );
    }
}
