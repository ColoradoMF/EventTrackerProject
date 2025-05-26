package com.skilldistillery.proxyshop.respositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.proxyshop.entities.Store;

public interface StoreRepository extends JpaRepository<Store, Integer>{

}
