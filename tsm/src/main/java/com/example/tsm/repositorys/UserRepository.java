package com.example.tsm.repositorys;

import com.example.tsm.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findFirstByEmail(String email);

    User findByEmail(String email);

    User findByName(String name);

    User findByUsername(String username);
}
