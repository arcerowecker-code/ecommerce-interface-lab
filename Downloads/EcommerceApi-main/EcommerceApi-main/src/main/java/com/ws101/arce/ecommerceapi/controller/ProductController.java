package com.ws101.arce.ecommerceapi.controller;

import com.ws101.arce.ecommerceapi.model.Product;
import com.ws101.arce.ecommerceapi.service.ProductService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAll() {
        return productService.getAllProducts();
    }

    @GetMapping("/search")
    public List<Product> search(@RequestParam Double maxPrice) {
        return productService.searchByPrice(maxPrice);
    }
}