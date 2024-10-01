import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveProduct } from '../service/products.service';

const ProductForm: React.FC = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const navigate = useNavigate();

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
            navigate('/'); 
        }).catch(error => {
            console.error('There was an error saving the product!', error);
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
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
                <input type="file" onChange={handleImageChange} />
            </div>
            <div>
                {imagePreview ? (
                    <img src={imagePreview} alt="Selected" style={{ width: '200px', height: 'auto' }} />
                ) : (
                    <div style={{ width: '200px', height: '200px', border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        No hay imagen seleccionada
                    </div>
                )}
            </div>
            <button type="submit">Save Product</button>
        </form>
    );
};

export default ProductForm;