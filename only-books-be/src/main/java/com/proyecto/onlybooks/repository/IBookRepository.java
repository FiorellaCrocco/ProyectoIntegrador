package com.proyecto.onlybooks.repository;

import com.proyecto.onlybooks.entity.Book;
import com.proyecto.onlybooks.entity.Caracteristica;
import com.proyecto.onlybooks.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IBookRepository extends JpaRepository<Book,Long> {
    @Query("SELECT i.url FROM Image i WHERE i.book.id = ?1")
    List<String> buscarImages (Long id);

    @Query("SELECT b.categorias FROM Book b WHERE b.id = :bookId")
    List<Categoria> buscarCategoriaByBookId(@Param("bookId") Long bookId);

    @Query("SELECT b.caracteristicas FROM Book b WHERE b.id = :bookId")
    List<Caracteristica> buscarCaracteristicaByBookId(@Param("bookId") Long bookId);

}
