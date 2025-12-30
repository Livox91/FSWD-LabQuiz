import React, { useState } from 'react';
import ProductAdd from '../ProductAdd/ProductAdd';
import ProductPage from '../ProductPage/ProductPage';
import './HomePage.css';

const HomePage = () => {
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

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isAddingProduct, setIsAddingProduct] = useState(false);

    const handleAddProduct = (newProduct) => {
        // Create a new product with a unique ID
        const productWithId = {
            ...newProduct,
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
        };

        setProducts(prevProducts => [...prevProducts, productWithId]);
        setIsAddingProduct(false); // Hide the add form after submission
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsAddingProduct(false);
    };

    const handleBackToList = () => {
        setSelectedProduct(null);
    };

    const handleAddClick = () => {
        setIsAddingProduct(true);
        setSelectedProduct(null);
    };

    return (
        <div className="home-page">
            {/* Header Section */}
            <header className="home-header">
                <h1>Product Catalog</h1>
                <button
                    className="add-product-button"
                    onClick={handleAddClick}
                >
                    Add New Product
                </button>
            </header>

            {/* Main Content */}
            <main className="home-main">
                {isAddingProduct ? (
                    <div className="add-product-section">
                        <button className="back-button" onClick={() => setIsAddingProduct(false)}>
                            ← Back to Products
                        </button>
                        <ProductAdd onProductAdd={handleAddProduct} />
                    </div>
                ) : selectedProduct ? (
                    <div className="product-detail-section">
                        <button className="back-button" onClick={handleBackToList}>
                            ← Back to Products
                        </button>
                        <ProductPage {...selectedProduct} />
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map(product => (
                            <div
                                key={product.id}
                                className="product-card"
                                onClick={() => handleProductClick(product)}
                            >
                                <div className="product-card-image">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className="product-card-content">
                                    <h3>{product.name}</h3>
                                    <p className="product-card-category">{product.category}</p>
                                    <p className="product-card-price">${product.price.toFixed(2)}</p>
                                    <span className={`stock-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default HomePage;
