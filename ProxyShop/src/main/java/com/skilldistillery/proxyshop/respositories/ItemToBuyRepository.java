package com.skilldistillery.proxyshop.respositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.proxyshop.entities.ItemToBuy;

public interface ItemToBuyRepository extends JpaRepository<ItemToBuy, Integer>{

}

// Here do I need a List of Items so Item has a user and user has a username? 
// need to get a user and assign it to the item to satisfy the foreign key constraint.