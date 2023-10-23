package com.proyecto.onlybooks.repository;

import com.proyecto.onlybooks.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IBookRepository extends JpaRepository<Book,Long> {
    @Query("SELECT i.url FROM Image i WHERE i.book.id = ?1")
    List<String> buscarImages (Long id);
}
