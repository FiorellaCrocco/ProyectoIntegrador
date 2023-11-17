package com.proyecto.onlybooks.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
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
@Table(name = "books", indexes = {
        @Index(name = "idx_title", columnList = "title"),
        @Index(name = "idx_author", columnList = "author"),
        @Index(name = "idx_isbn", columnList = "isbn"),
        @Index(name = "idx_qualification", columnList = "qualification")
})
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

    private Double price;
    private String imgUrl;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @JoinTable(name = "users_booksFavorite",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id"))
    @JsonIgnore
    private List<Book> booksFavs;

    //Un libro puede tener muchas Categorias
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "books_categorias",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "categorias_id"))
    private List<Categoria> categorias;

    //Un libro puede tener muchas Caracteristicas
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "books_caracteristicas",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "caracteristica_id"))
    private List<Caracteristica> caracteristicas;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "books_resenias",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "resenia_id"))
    private List<Resenia> resenias;

    // Un Book puede tener muchos BookRent, pero cada BookRent tiene un Book.
    @OneToMany( fetch=FetchType.LAZY, mappedBy = "book")
    @JsonIgnore
    private List<BookRent> rentedByUsers;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "book", cascade = CascadeType.ALL)
    private List<Image> images;

    private List<String> imagesBase64;

    public Book(String title, String author, String description, String isbn, Date publication_year, Integer qualification, Double price) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.isbn = isbn;
        this.publication_year = publication_year;
        this.qualification = qualification;
        this.price = price;
    }
}
