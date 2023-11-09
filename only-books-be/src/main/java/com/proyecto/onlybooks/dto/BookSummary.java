package com.proyecto.onlybooks.dto;


import com.proyecto.onlybooks.entity.Categoria;
import jakarta.persistence.Entity;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookSummary {
    private Long id;
    private String title;
    private Double price;
    private String imgUrl;
    private List<Categoria> categorias;

    public BookSummary(Long id, String title, Double price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
}
