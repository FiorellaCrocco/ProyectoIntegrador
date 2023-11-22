package com.proyecto.onlybooks.dto;

import com.proyecto.onlybooks.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {

    private Long id;
    private String title;
    private String author;
    private String description;
    private String isbn;
    private Date publication_year;
    private Double qualification;
    private Integer cantResenias;
    private Gender gender;
    private Double price;
    private String imgUrl;
    private List<String> listImgUrl;
    private List<Categoria> categorias;
    private List<Caracteristica> caracteristicas;
    private List<String> imagesBase64;
    private List<Resenia> resenias;
    private List<BookRent> rentedByUsers;

}
