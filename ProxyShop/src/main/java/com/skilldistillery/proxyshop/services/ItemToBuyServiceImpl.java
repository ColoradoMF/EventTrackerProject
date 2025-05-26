package com.skilldistillery.proxyshop.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.proxyshop.entities.ItemToBuy;
import com.skilldistillery.proxyshop.entities.Store;
import com.skilldistillery.proxyshop.entities.User;
import com.skilldistillery.proxyshop.respositories.ItemToBuyRepository;
import com.skilldistillery.proxyshop.respositories.StoreRepository;
import com.skilldistillery.proxyshop.respositories.UserRepository;

@Service
public class ItemToBuyServiceImpl implements ItemToBuyService {

	@Autowired
	private ItemToBuyRepository itemToBuyRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private StoreRepository storeRepo;
	
	@Override
	public ItemToBuy findById(int id) {
		return itemToBuyRepo.findById(id).orElse(null);
	}
	
	@Override
	public List<ItemToBuy> findAll() {
		return itemToBuyRepo.findAll();
	}
	
	@Override
	public ItemToBuy createItem(String username, int storeId, ItemToBuy newItem) {
		User user = userRepo.findByUsername(username);
		Store store = storeRepo.findById(storeId).orElse(null);
		
		newItem.setUser(user);
		newItem.setStore(store);
		
		return itemToBuyRepo.saveAndFlush(newItem);
	}

}
