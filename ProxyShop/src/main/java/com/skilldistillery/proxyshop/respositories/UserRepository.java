package com.skilldistillery.proxyshop.respositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.proxyshop.entities.User;

public interface UserRepository extends JpaRepository<User, Integer>{

	User findByUsername(String username);

}
