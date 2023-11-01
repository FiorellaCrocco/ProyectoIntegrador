package com.proyecto.onlybooks.repository;

import com.proyecto.onlybooks.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IImageRepository extends JpaRepository<Image,Long>{
}
