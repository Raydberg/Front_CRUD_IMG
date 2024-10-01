import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../service/products.service";

interface Product {
    id: number;
    productName?: string;
    price: number;
    photos: string;
    onDelete: (id: number) => void;
}

const CardProduct: React.FC<Product> = ({ id, productName, price, photos, onDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await deleteProduct(id);
            onDelete(id);
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    const handleEdit = () => {
        navigate(`/edit-product/${id}`);
    };

    const getPhotosImagePath = (id: number, photo: string) => {
        const url = `http://localhost:8080/product-photos/${id}/${encodeURIComponent(photo)}`;
        console.log('Image URL:', url); // Verifica la URL generada
        return url;
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Img variant="top" src={getPhotosImagePath(id, photos)} />
                <Card.Title>{productName}</Card.Title>
                <Card.Text>
                    {price}
                </Card.Text>
                <Button variant="outline-warning" onClick={handleEdit}>
                    Editar
                </Button>
                <Button variant="outline-danger" onClick={handleDelete}>
                    Eliminar
                </Button>
            </Card.Body>
        </Card>
    );
};

export default CardProduct;