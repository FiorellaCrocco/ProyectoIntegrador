package com.proyecto.onlybooks.repository;

import com.proyecto.onlybooks.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategoriaRepository extends JpaRepository<Categoria,Long> {
}
