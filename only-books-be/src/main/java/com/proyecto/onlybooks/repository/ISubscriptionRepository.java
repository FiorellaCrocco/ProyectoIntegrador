package com.proyecto.onlybooks.repository;

import com.proyecto.onlybooks.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISubscriptionRepository extends JpaRepository<Subscription,Long>{

}
