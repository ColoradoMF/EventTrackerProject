package com.skilldistillery.proxyshop.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.proxyshop.entities.ItemToBuy;
import com.skilldistillery.proxyshop.respositories.ItemToBuyRepository;

@Service
public class ItemToBuyServiceImpl implements ItemToBuyService {

	@Autowired
	private ItemToBuyRepository itemToBuyRepo;
	
	@Override
	public ItemToBuy findById(int id) {
		return itemToBuyRepo.findById(id).orElse(null);
	}

	@Override
	public ItemToBuy createItem(String username, int storeId, ItemToBuy newItem) {
		return null;
	}

}
