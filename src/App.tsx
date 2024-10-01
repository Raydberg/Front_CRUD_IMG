import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import ProductForm from "./components/ProductForm";
import EditProductPage from "./pages/EditProductPage";
function App() {
  return (
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-product" element={<ProductForm />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
