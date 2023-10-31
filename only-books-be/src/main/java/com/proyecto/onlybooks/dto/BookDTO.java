package com.proyecto.onlybooks.dto;

import com.proyecto.onlybooks.entity.Caracteristica;
import com.proyecto.onlybooks.entity.Categoria;
import com.proyecto.onlybooks.entity.Gender;
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
    private Integer qualification;
    private Gender gender;
    private List<String> imgUrl;
    private Double price;
    private List<Categoria> categorias;
    private List<Caracteristica> caracteristicas;

}
