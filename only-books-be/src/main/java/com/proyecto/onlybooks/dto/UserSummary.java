package com.proyecto.onlybooks.dto;


import com.proyecto.onlybooks.entity.Rol;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserSummary {
    private Long id;
    private String name;
    private String lastname;
    private String password;
    private String email;
    private Integer dni;
    @Enumerated(EnumType.STRING)
    private Rol rol;

    public UserSummary(Long id, String name, String lastname, String password, Integer dni, String email, Rol rol) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.password = password;
        this.dni = dni;
        this.email = email;
        this.rol = rol;
    }
}
