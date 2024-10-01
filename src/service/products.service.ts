import axios from "axios";

const API_URL = 'http://localhost:8080/products';

export const getProducts = () => {
    return axios.get(`${API_URL}/index`);
};
export const getProductById = (id: number) => {
    return axios.get(`${API_URL}/showFormForUpdate/${id}`);
};

export const saveProduct = (product: FormData) => {
    return axios.post(`${API_URL}/saveProduct`, product, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteProduct = (id: number) => {
    return axios.delete(`${API_URL}/deleteProduct/${id}`);
};

export const findPaginated = (pageNo: number, sortField: string, sortDir: string) => {
    return axios.get(`${API_URL}/page/${pageNo}`, {
        params: { sortField, sortDir },
    });
};