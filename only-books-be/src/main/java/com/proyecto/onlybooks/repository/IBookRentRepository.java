package com.proyecto.onlybooks.repository;

import com.proyecto.onlybooks.entity.BookRent;
import com.proyecto.onlybooks.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBookRentRepository  extends JpaRepository<BookRent,Long> {
    @Query("SELECT b FROM BookRent b WHERE b.user.id = :userId")
    List<BookRent> buscarRentaPorUserId(@Param("userId") Long userId);

    @Query("SELECT b FROM BookRent b WHERE b.book.id = :bookId")
    List<BookRent> buscarRentaPorBookId(@Param("bookId") Long bookId);

}
