package com.skilldistillery.proxyshop.services;

import java.util.List;

import com.skilldistillery.proxyshop.entities.Store;

public interface StoreService {
	
	Store findById(int id);
	
	List<Store> findAll();

	Store createStore(Store newStore);
	
	Store updateStore( int storeId, Store updateStore);
	
	boolean deleteStoreById(int storeId);

}
