package com.repository;

import com.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SessionRepository extends JpaRepository <Session, Long> {
    Optional<Session> findBySessionHash(String sessionToken);
}
