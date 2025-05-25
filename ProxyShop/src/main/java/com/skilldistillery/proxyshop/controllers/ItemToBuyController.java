package com.skilldistillery.proxyshop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.proxyshop.entities.ItemToBuy;
import com.skilldistillery.proxyshop.services.ItemToBuyService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
public class ItemToBuyController {
	
	@Autowired
	private ItemToBuyService itemToBuyService;
	
	private String userName = "mike";
	
	@GetMapping("items/{itemId}")
	public ItemToBuy findById( @PathVariable("itemId") int itemId, HttpServletResponse resp) {
		
		ItemToBuy itemToBuy = itemToBuyService.findById(itemId);
		if(itemToBuy == null) {
			resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
		}
		return itemToBuy;
	}

}
