package com.skilldistillery.proxyshop.respositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.proxyshop.entities.ItemToBuy;

public interface ItemToBuyRepository extends JpaRepository<ItemToBuy, Integer>{

}
