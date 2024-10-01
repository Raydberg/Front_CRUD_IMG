import React, { useEffect, useState } from 'react';
import { getProducts } from '../service/products.service';

interface Product {
    id: number;
    productName?: string;
    price: number;
    photos: string;
}

const getPhotosImagePath = (id: number, photo: string) => {
    const url = `http://localhost:8080/product-photos/${id}/${encodeURIComponent(photo)}`;
    console.log('Image URL:', url); // Verifica la URL generada
    return url;
};

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then(response => {
            setProducts(response.data);
        }).catch(error => {
            console.error('There was an error fetching the products!', error);
        });
    }, []);

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h2>{product.productName}</h2>
                        <p>{product.price}</p>
                        {product.photos && (
                            <img src={getPhotosImagePath(product.id, product.photos)} alt={product.name} width="150" />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;