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

	@Override
	public ItemToBuy updateItem(String username, int storeId, ItemToBuy updateItem) {
		System.out.println(">>> Entered updateItem()");
		System.out.println(">>> ID: " + updateItem.getId());
		System.out.println(">>> Name: " + updateItem.getName());
		
		

		ItemToBuy existingItem = itemToBuyRepo.findById(updateItem.getId()).orElse(null);
		
		if (existingItem == null) {
	        System.out.println(">>> Item not found with ID: " + updateItem.getId());
	        return null;
	    }
		
		Store store = storeRepo.findById(storeId).orElse(null);
	    if (store == null) {
	        System.out.println(">>> Store not found with ID " + storeId);
	        return null;
	    }


	    System.out.println(">>> Found item. Updating fields...");
		
		existingItem.setName(updateItem.getName());
	    existingItem.setSku(updateItem.getSku());
	    existingItem.setDescription(updateItem.getDescription());
	    existingItem.setImageUrl(updateItem.getImageUrl());
	    existingItem.setNeeded(updateItem.getNeeded());
		
	    System.out.println(">>> Updated item: " + existingItem);
	    
	    try {
			return itemToBuyRepo.saveAndFlush(existingItem);
		} catch (Exception e) {
			System.err.println(">>> Error during save: " + e.getMessage());
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public boolean deleteItemById(int itemId) {
		if (itemToBuyRepo.existsById(itemId)) {
			itemToBuyRepo.deleteById(itemId);
			return true;
		}
		return false;
	}

}
