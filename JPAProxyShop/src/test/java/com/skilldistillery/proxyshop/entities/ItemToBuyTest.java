package com.skilldistillery.proxyshop.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;

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
	void test() {
		assertEquals("TVP", itemToBuy.getSkuName());
	}

}