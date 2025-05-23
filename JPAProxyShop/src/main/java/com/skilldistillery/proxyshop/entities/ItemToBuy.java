package com.skilldistillery.proxyshop.entities;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;



@Entity
@Table(name="item_to_buy")
public class ItemToBuy {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="sku_name")
	private String skuName;

	public ItemToBuy() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSkuName() {
		return skuName;
	}

	public void setSkuName(String skuName) {
		this.skuName = skuName;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ItemToBuy other = (ItemToBuy) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("itemToBuy [id=").append(id).append(", skuName=").append(skuName).append("]");
		return builder.toString();
	}
	
}
