package com.skilldistillery.proxyshop.services;

import java.util.List;

import com.skilldistillery.proxyshop.entities.Store;
import com.skilldistillery.proxyshop.entities.User;

public interface UserService {
	
	User findById(int id);
	
	List<User> findAll();

	User createUser(String username, String password, int storeId, Boolean enabled, String role, User newUser);
	 
	
	User updateUser(String username, String password, Boolean enabled, String role, User updateUser);
	
	boolean deleteUserById(int userId);

}
