package com.skilldistillery.proxyshop.services;

import java.util.List;

import com.skilldistillery.proxyshop.entities.ItemToBuy;

public interface ItemToBuyService {
	
	ItemToBuy findById(int id);
	
	List<ItemToBuy> findAll();

	ItemToBuy createItem(String username, int storeId, ItemToBuy newItem);
	
	ItemToBuy updateItem(String username, int storeId, ItemToBuy updateItem);
	
	boolean deleteItemById(int itemId);

}
