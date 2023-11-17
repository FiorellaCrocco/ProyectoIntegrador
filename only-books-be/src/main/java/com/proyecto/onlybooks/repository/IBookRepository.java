package com.proyecto.onlybooks.repository;

import com.proyecto.onlybooks.dto.BookSummary;
import com.proyecto.onlybooks.entity.Book;
import com.proyecto.onlybooks.entity.Caracteristica;
import com.proyecto.onlybooks.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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

    //@Query("SELECT b.id, b.price, b.title, c.titulo, i.url FROM Book b JOIN (SELECT i1.book.id, i1.url FROM Image i1 WHERE i1.id = (SELECT MIN(i2.id) FROM Image i2 WHERE i2.book.id = i1.book.id ORDER BY i2.id) ) AS i ON b.id = i.book.id JOIN b.categorias c")
    @Query("SELECT new com.proyecto.onlybooks.dto.BookSummary(b.id, b.title, b.price) FROM Book b ")
    List<BookSummary> findLibroSummary();
/*
    @Modifying
    @Query("DELETE FROM booksFavs b WHERE b.book.id=bookId")
    void eliminarFavoritosByBookId(@Param("bookId") Long bookId);
*/


}
