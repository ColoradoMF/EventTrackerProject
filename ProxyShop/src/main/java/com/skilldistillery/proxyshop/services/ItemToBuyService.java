package com.skilldistillery.proxyshop.services;

import com.skilldistillery.proxyshop.entities.ItemToBuy;

public interface ItemToBuyService {
	
	ItemToBuy findById(int id);
	
	ItemToBuy createItem(String username, int storeId, ItemToBuy newItem);

}
