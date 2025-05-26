package com.skilldistillery.proxyshop.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.skilldistillery.proxyshop.entities.ItemToBuy;
import com.skilldistillery.proxyshop.respositories.ItemToBuyRepository;

@SpringBootTest
class ItemToBuyRepositoryTest {
	
	@Autowired
	private ItemToBuyRepository itemToBuyRepo;

	@Test
	void test_itemToBuyRepo_findById() {
		Optional<ItemToBuy> itemToBuyOpt = itemToBuyRepo.findById(1);
		ItemToBuy itemToBuy = null;
		if(itemToBuyOpt.isPresent()) {
			itemToBuy = itemToBuyOpt.get();
		}
	}

}
