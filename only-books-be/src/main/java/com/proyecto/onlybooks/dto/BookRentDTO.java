package com.proyecto.onlybooks.dto;

import com.proyecto.onlybooks.entity.Book;
import com.proyecto.onlybooks.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookRentDTO {

    private Long id;
    private User user;
    private Book book;
    private Date startDate;
    private Date returnDate;

}
