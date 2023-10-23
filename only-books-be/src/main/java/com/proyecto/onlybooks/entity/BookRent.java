package com.proyecto.onlybooks.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="bookRents")
public class BookRent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Muchos BookRent puede tener un User.
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Muchos BookRent puede tener un Book.
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @NotNull
    @NotBlank
    private Date startDate;

    @NotNull
    @NotBlank
    private Date returnDate;

}
