package br.edu.pln.users.repository;

import br.edu.pln.users.model.Perfil;
import br.edu.pln.users.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil, UUID> {
    Optional<Perfil> findByUsuario(Usuario usuario);
    Optional<Perfil> findByUsuarioId(UUID usuarioId);
}
