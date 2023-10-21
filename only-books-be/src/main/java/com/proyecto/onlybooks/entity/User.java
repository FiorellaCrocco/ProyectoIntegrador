package com.proyecto.onlybooks.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="users")
public class User {

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

    @Size(max=8, message="DNI maximo 8 caracteres.")
    @NotNull
    @NotBlank
    private Integer dni;

    @Size(max=30, message="Email maximo 30 caracteres.")
    @NotNull
    @NotBlank
    private String email;

    // La contraseña debe tener al menos una letra mayúscula, una minúscula, un número, entre 8 y 30 caracteres.
    @Size(max=30, message="Contraseña maximo 30 caracteres.")
    @NotNull
    @NotBlank
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$", message = "La contraseña no cumple con los requisitos.")
    private String password;

    @NotNull
    @NotBlank
    @Enumerated(EnumType.STRING)
    private Rol rol;

    // Un User puede tener muchos BookRent
    @OneToMany(mappedBy = "user")
    private List<BookRent> bookRents;

    // Un User tienen una Subscripion.
    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="subscription_id")
    private Subscription  subscription;

}
