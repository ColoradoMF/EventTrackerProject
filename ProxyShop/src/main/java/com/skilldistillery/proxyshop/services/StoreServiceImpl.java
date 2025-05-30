package com.skilldistillery.proxyshop.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.proxyshop.entities.Store;
import com.skilldistillery.proxyshop.respositories.StoreRepository;

@Service
public class StoreServiceImpl implements StoreService {
	
	@Autowired
	private StoreRepository storeRepo;

	@Override
	public Store findById(int id) {
		return storeRepo.findById(id).orElse(null);
	}

	@Override
	public List<Store> findAll() {
		return storeRepo.findAll();
	}

	@Override
	public Store createStore(String name, int storeId, Store newStore) {
		return storeRepo.saveAndFlush(newStore);
	}

	@Override
	public Store updateStore(String name, int storeId, Store updateStore) {
		
		Store existingStore = storeRepo.findById(updateStore.getId()).orElse(null);
		existingStore.setName(updateStore.getName());
		existingStore.setLogoImageUrl(updateStore.getLogoImageUrl());
		existingStore.setDescription(updateStore.getDescription());
		return null;
	}

	@Override
	public boolean deleteStoreById(int storeId) {
		if (storeRepo.existsById(storeId)) {
			storeRepo.deleteById(storeId);
			return true;
		}
		return false;
	}

}