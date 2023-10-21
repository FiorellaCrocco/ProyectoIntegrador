package com.proyecto.onlybooks.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max=30, message="Titulo maximo 30 caracteres.")
    @NotNull
    @NotBlank
    private String title;

    @Size(max=40, message="Autor maximo 40 caracteres.")
    @NotNull
    @NotBlank
    private String author;

    @Size(max=200, message="Descripcion maximo 200 caracteres.")
    @NotNull
    @NotBlank
    private String description;

    @Size(max=13, message="ISBN no valido")
    @NotNull
    @NotBlank
    private Integer isbn;

    @NotNull
    @NotBlank
    private Date publication_year;

    @NotNull
    @NotBlank
    private Integer qualification;

    @NotNull
    @NotBlank
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @NotNull
    @NotBlank
    private String imgUrl;

    @NotNull
    @NotBlank
    private Double price;

    // Un Book puede tener muchos BookRent, pero cada BookRent tiene un Book.
    @OneToMany(mappedBy = "book")
    private List<BookRent> rentedByUsers;

}
