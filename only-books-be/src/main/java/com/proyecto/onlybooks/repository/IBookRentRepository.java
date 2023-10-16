package com.proyecto.onlybooks.repository;

import com.proyecto.onlybooks.entity.BookRent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IBookRentRepository  extends JpaRepository<BookRent,Long> {
}
