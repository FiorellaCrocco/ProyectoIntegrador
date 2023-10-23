package com.proyecto.onlybooks.dto;

import com.proyecto.onlybooks.entity.Gender;
import com.proyecto.onlybooks.entity.SubsType;
import com.proyecto.onlybooks.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {

    private Long id;
    private String title;
    private String author;
    private String description;
    private Integer isbn;
    private Date year;
    private Integer qualification;
    private Gender gender;
    private String imgUrl;
    private Double price;

}
