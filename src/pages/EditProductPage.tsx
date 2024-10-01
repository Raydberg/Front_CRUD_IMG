import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, saveProduct } from '../service/products.service';

const EditProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>({});
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            getProductById(Number(id)).then(response => {
                setProduct(response.data);
                setImagePreview(getPhotosImagePath(response.data.id, response.data.photos));
            }).catch(error => {
                console.error('Error al obtener el producto:', error);
            });
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('id', product.id);
            formData.append('productName', product.productName);
            formData.append('price', product.price);
            if (image) {
                formData.append('image', image);
            } else {
                formData.append('photos', product.photos);
            }

            await saveProduct(formData);
            navigate('/'); 
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        }
    };

    const getPhotosImagePath = (id: number, photo: string) => {
        return `http://localhost:8080/product-photos/${id}/${encodeURIComponent(photo)}`;
    };

    return (
        <div>
            <h1>Editar Producto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Producto</label>
                    <input
                        type="text"
                        name="productName"
                        value={product.productName || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Precio</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Fotos</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                    />
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
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default EditProductPage;