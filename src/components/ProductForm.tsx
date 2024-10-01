// src/components/ProductForm.tsx
import React, { useState } from 'react';
import { saveProduct } from '../service/products.service';

const ProductForm: React.FC = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('price', price);
        if (image) {
            formData.append('image', image);
        }

        saveProduct(formData).then(response => {
            console.log('Product saved successfully', response.data);
        }).catch(error => {
            console.error('There was an error saving the product!', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div>
                <label>Price:</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
                <label>Image:</label>
                <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
            </div>
            <button type="submit">Save Product</button>
        </form>
    );
};

export default ProductForm;