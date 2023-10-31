package com.proyecto.onlybooks.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="categorias")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max=30, message="Titulo maximo 30 caracteres.")
    @NotNull
    private String titulo;

    @Size(max=255, message="Descripcion maximo 255 caracteres.")
    @NotNull
    private String descripcion;

    private String imagen;

}
