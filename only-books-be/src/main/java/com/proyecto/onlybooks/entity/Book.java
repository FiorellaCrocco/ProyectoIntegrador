package com.proyecto.onlybooks.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@JsonIgnoreProperties({"images"})
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max=50, message="Titulo maximo 30 caracteres.")
    @NotNull
    private String title;

    @Size(max=40, message="Autor maximo 40 caracteres.")
    private String author;

    @Size(max=200, message="Descripcion maximo 200 caracteres.")
    @NotNull
    private String description;

    private String isbn;

    private Date publication_year;

    private Integer qualification;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Double price;

    // Un Book puede tener muchos BookRent, pero cada BookRent tiene un Book.
    @OneToMany( fetch=FetchType.EAGER, mappedBy = "book")
    private List<BookRent> rentedByUsers;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "book")
    private List<Image> images;

    public Book(String title, String author, String description, String isbn, Date publication_year, Integer qualification, Gender gender, Double price) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.isbn = isbn;
        this.publication_year = publication_year;
        this.qualification = qualification;
        this.gender = gender;
        this.price = price;
    }
}
