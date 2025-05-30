package com.skilldistillery.proxyshop.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class ItemToBuyTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private ItemToBuy itemToBuy;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		 emf = Persistence.createEntityManagerFactory("JPAProxyShop");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		itemToBuy = em.find(ItemToBuy.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		itemToBuy = null;
	}

	@Test
	void test_ItemToBuy_entity_mapping() {
		assertNotNull(itemToBuy);
		assertEquals("12", itemToBuy.getSku());
		assertEquals("Textured Vegetable Protien", itemToBuy.getName());
	}

	@Test
	void test_ItemToBuy_Store_ManyToOne_mapping() {
		assertNotNull(itemToBuy);
		assertNotNull(itemToBuy.getStore());
		assertEquals(1, itemToBuy.getStore().getId());
	}

	@Test
	void test_ItemToBuy_User_ManyToOne_mapping() {
		assertNotNull(itemToBuy);
		assertNotNull(itemToBuy.getUser());
		assertEquals(1, itemToBuy.getUser().getId());
	}
}