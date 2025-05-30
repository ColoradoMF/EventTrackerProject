package com.skilldistillery.proxyshop.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.proxyshop.entities.User;
import com.skilldistillery.proxyshop.respositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public User findById(int id) {
		return userRepo.findById(id).orElse(null);
	}

	@Override
	public List<User> findAll() {
		return userRepo.findAll();
	}

	@Override
	public User createUser(String username, String password, int storeId, Boolean enabled, String role, User newUser) {
		return userRepo.saveAndFlush(newUser);
	}

	@Override
	public User updateUser(String username, String password, Boolean enabled, String role, User updateUser) {
		
		User existingUser = userRepo.findById(updateUser.getId()).orElse(null);
		existingUser.setUsername(updateUser.getUsername());
		existingUser.setPassword(updateUser.getPassword());
		existingUser.setEnabled(updateUser.getEnabled());
		existingUser.setRole(updateUser.getRole());
		return null;
	}

	@Override
	public boolean deleteUserById(int storeId) {
		if (userRepo.existsById(storeId)) {
			userRepo.deleteById(storeId);
			return true;
		}
		return false;
	}

}