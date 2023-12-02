package com.proyecto.onlybooks.repository;

import com.proyecto.onlybooks.dto.BookSummary;
import com.proyecto.onlybooks.dto.UserSummary;
import com.proyecto.onlybooks.entity.Book;
import com.proyecto.onlybooks.entity.Categoria;
import com.proyecto.onlybooks.entity.Resenia;
import com.proyecto.onlybooks.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);

    @Query("SELECT u.booksFavs FROM User u WHERE u.id = :userId")
    List<Book> buscarFavoritos(@Param("userId") Long userId);

    @Query("SELECT u FROM User u JOIN u.booksFavs b WHERE b.id = :bookId")
    List<User> buscarBooksFavoritos(@Param("bookId") Long bookId);

    @Query("SELECT new com.proyecto.onlybooks.dto.UserSummary(u.id, u.name, u.lastname, u.dni, u.email, u.rol) FROM User u ")
    List<UserSummary> findUserSummary();

}
