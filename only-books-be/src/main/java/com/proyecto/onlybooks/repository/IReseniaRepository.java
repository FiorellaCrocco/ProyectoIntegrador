package com.proyecto.onlybooks.repository;

import com.proyecto.onlybooks.entity.Resenia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IReseniaRepository extends JpaRepository<Resenia,Long> {

    @Query("SELECT r FROM Resenia r WHERE r.book.id = :bookId")
    List<Resenia> buscarReseniaPorBookId(@Param("bookId")Long bookId);

}
