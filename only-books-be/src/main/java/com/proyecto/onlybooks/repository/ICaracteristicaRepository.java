package com.proyecto.onlybooks.repository;

import com.proyecto.onlybooks.entity.Caracteristica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICaracteristicaRepository extends JpaRepository<Caracteristica,Long> {
}
