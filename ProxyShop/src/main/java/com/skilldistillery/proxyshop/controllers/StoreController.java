package com.skilldistillery.proxyshop.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.proxyshop.entities.Store;
import com.skilldistillery.proxyshop.services.StoreService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin({"*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class StoreController {
	
	@Autowired
	private StoreService storeService;
	
	@GetMapping("stores/{storeId}")
	public Store findById( @PathVariable("storeId") int storeId, HttpServletResponse resp) {
		
		Store store = storeService.findById(storeId);
		if(store == null) {
			resp.setStatus(HttpServletResponse.SC_NOT_FOUND); //404
		}
		return store;
	}
	
	@GetMapping("stores")
	public List<Store> getAllStores(HttpServletResponse resp) {
	    List<Store> stores = storeService.findAll();
	    return stores;
	}

	
	@PostMapping("stores")
	public Store createItem( @RequestBody Store newStore, 
							HttpServletResponse resp, 
							HttpServletRequest req) {
		try {
			Store createdStore = storeService.createStore(newStore);
			if (createdStore != null) {
				resp.setStatus(HttpServletResponse.SC_CREATED); //201
				resp.setHeader("Location", req.getRequestURL().append("/").append(createdStore.getId()).toString());
				return createdStore;
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400 if fail to create
		}
		return null;
	}
	
	@PutMapping("stores/{id}")
	public Store updateStore(@PathVariable("id") int storeId,
	                            @RequestBody Store updatedStore,
	                            HttpServletResponse resp) {
//	    updatedStore.setId(storeId); // path ID can override anything in JSON body
	    
//	    System.out.println("Updating store with storeId: " + storeId);

	    Store result = storeService.updateStore( storeId, updatedStore);

	    if (result == null) {
	        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
	    }

	    return result;
	}
	
	@DeleteMapping("stores/{id}")
	public void deleteItem(@PathVariable("id") int id, HttpServletResponse resp) {
		if (storeService.deleteStoreById(id)) {
			resp.setStatus(HttpServletResponse.SC_NO_CONTENT); // 204
		} else {
			resp.setStatus(HttpServletResponse.SC_NOT_FOUND); // 404
		}
	}
	
}
