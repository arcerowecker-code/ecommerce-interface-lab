package com.ws101.arce.ecommerceapi.service;

import com.ws101.arce.ecommerceapi.model.Product;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    private List<Product> products = new ArrayList<>();

    public ProductService() {
        products.add(new Product(1L, "Laptop", 45000.0, 10));
        products.add(new Product(2L, "Mouse", 500.0, 50));
    }

    public List<Product> getAllProducts() {
        return products;
    }

    public List<Product> searchByPrice(Double maxPrice) {
        List<Product> filtered = new ArrayList<>();
        for (Product p : products) {
            if (p.getPrice() <= maxPrice) {
                filtered.add(p);
            }
        }
        return filtered;
    }
}