import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ProductAdd from './components/ProductAdd/ProductAdd';
import ProductPage from './components/ProductPage/ProductPage';
import './App.css';
import ReduxExample from './components/ReduxExample';
import ProductManager from './components/ProductManager/ProductManager';

function App() {
  const [products, setProducts] = useState([
    // Initial sample product
    {
      id: 1,
      name: "Premium Wireless Headphones",
      description: "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      category: "Electronics",
      inStock: true
    }
  ]);

  const handleAddProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    };

    setProducts(prevProducts => [...prevProducts, productWithId]);
  };

  const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find(p => String(p.id) === id);

    if (!product) {
      return (
        <div style={{ padding: 20 }}>
          <button onClick={() => window.history.back()} className="back-button">← Back to Products</button>
          <h2>Product not found</h2>
        </div>
      );
    }

    return <ProductPage {...product} />;
  };

  return (
    <BrowserRouter>

      <Routes>
        {/* <Route path="/" element={<HomePage products={products} />} /> */}
        <Route path="/" element={<ProductManager />} />
        <Route path="/add" element={<ProductAdd onProductAdd={handleAddProduct} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
