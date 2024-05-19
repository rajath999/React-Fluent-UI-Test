import React, { useState, useEffect } from 'react';
import './styles.css'; // Ensure this file is imported for styling

export interface Product {
    userId: number;
    id:     number;
    title:  string;
    body:   string;
}

const ProductCard: React.FC<Product> = ({ userId, id, title, body }) => {
    return (
        <div className="product-card">
            <h2>{title}</h2>
            <p>{body}</p>
            <small>User ID: {userId} | Product ID: {id}</small>
        </div>
    );
}

const ListProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
          };
          fetchProducts();
    }, []);

    return (
        <div className="product-list">
            <h1>Products List</h1>
            <div className="grid-container">
                {products.map(product => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
}

export default ListProducts;
