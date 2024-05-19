import React, { useState, useEffect } from 'react';
import './styles.css'; // Ensure this file is imported for styling
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux-store';
import { fetchProducts } from '../../redux-store/actions/productActions';

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
    const {products} = useSelector((state: AppState) => state.products);
    const dispatch: any = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

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
