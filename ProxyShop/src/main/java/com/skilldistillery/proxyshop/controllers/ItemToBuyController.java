package com.skilldistillery.proxyshop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.proxyshop.entities.ItemToBuy;
import com.skilldistillery.proxyshop.services.ItemToBuyService;

import jakarta.servlet.http.HttpServletRequest;
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
			resp.setStatus(HttpServletResponse.SC_NOT_FOUND); //404
		}
		return itemToBuy;
	}
	
	@PostMapping("items")
	public ItemToBuy createItem(@RequestParam(name = "storeId") int storeId, 
								@RequestBody ItemToBuy newItem, 
								HttpServletResponse resp, 
								HttpServletRequest req) {
		
		try {
			ItemToBuy createdItem = itemToBuyService.createItem("mike", storeId, newItem);
			if (createdItem != null) {
				resp.setStatus(HttpServletResponse.SC_CREATED); //201
				resp.setHeader("Location", req.getRequestURL().append("/").append(createdItem.getId()).toString());
				return createdItem;
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400 if fail to create
		}
		return null;
	}
	
	@PutMapping("items/{id}")
	public ItemToBuy updateItem(@PathVariable int id,
	                            @RequestParam(name = "storeId") int storeId,
	                            @RequestBody ItemToBuy updatedItem,
	                            HttpServletResponse resp) {
	    updatedItem.setId(id); // ensure path ID overrides anything in JSON body

	    ItemToBuy result = itemToBuyService.updateItem("mike", storeId, updatedItem);

	    if (result == null) {
	        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
	    }

	    return result;
	}
	
	@PutMapping("test")
	public String testPut() {
	    return "PUT method is working";
	}


}
