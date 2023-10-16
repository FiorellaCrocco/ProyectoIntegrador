package com.proyecto.onlybooks.repository;

import com.proyecto.onlybooks.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IBookRepository extends JpaRepository<Book,Long> {
}
