package com.proyecto.onlybooks.repository;

import com.proyecto.onlybooks.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository extends JpaRepository<User,Long> {
}
