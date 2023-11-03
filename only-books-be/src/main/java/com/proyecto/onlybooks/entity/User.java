package com.proyecto.onlybooks.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;



@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max=30, message="Apellido maximo 30 caracteres.")
    @NotNull
    @NotBlank
    private String lastname;

    @Size(max=30, message="Nombre maximo 30 caracteres.")
    @NotNull
    @NotBlank
    private String name;

    private Integer dni;

    @NotNull
    @NotBlank
    private String email;

    // La contraseña debe tener al menos una letra mayúscula, una minúscula, un número, entre 8 y 30 caracteres.
    @NotNull
    @NotBlank
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$", message = "La contraseña no cumple con los requisitos.")
    private String password;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    // Un User puede tener muchos BookRent
    @OneToMany(mappedBy = "user")
    private List<BookRent> bookRents;

    // Un User tienen una Subscripion.
    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="subscription_id")
    private Subscription  subscription;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority((rol.name())));
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
