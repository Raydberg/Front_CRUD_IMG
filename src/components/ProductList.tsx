import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../service/products.service';
import CardProduct from './CardProduct';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts()
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    const handleDeleteProduct = (id: number) => {
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <div className="">
            <button className="btn btn-outline-success" onClick={() => navigate('/new-product')}>
                Agregar nuevo producto
            </button>
            <h1>Product List</h1>
            <ul className="d-flex ">
                {products.map((product) => (
                    <CardProduct
                        key={product.id}
                        id={product.id}
                        productName={product.productName}
                        price={product.price}
                        photos={product.photos}
                        onDelete={handleDeleteProduct}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ProductList;