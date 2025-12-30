import React, { useState, useEffect } from 'react';
import productService from '../../services/productService';
import './ProductManager.css';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newProduct, setNewProduct] = useState({
        name: '',
        category_id: '',
        product_image: '',
        description: ''
    });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await productService.getAllProducts();
            setProducts(data);
        } catch (err) {
            setError('Failed to load products');
            console.error('Error loading products:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!newProduct.name.trim() || !newProduct.category_id.trim()) {
            setError('Name and Category ID are required');
            return;
        }

        try {
            setLoading(true);
            setError('');
            await productService.createProduct(newProduct);
            setNewProduct({ name: '', category_id: '', product_image: '', description: '' });
            await loadProducts(); // Reload products
        } catch (err) {
            setError('Failed to create product');
            console.error('Error creating product:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="product-manager">
            <h1 className="main-title">ZakiHaider</h1>
            <h2 className="product-title">Product Manager</h2>

            {error && <div className="error-message">{error}</div>}

            <form className="product-form" onSubmit={handleAddProduct}>
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="Product name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                    <input
                        type="text"
                        name="category_id"
                        placeholder="Category ID"
                        value={newProduct.category_id}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="url"
                        name="product_image"
                        placeholder="Product Image URL"
                        value={newProduct.product_image}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                    <textarea
                        name="description"
                        placeholder="Description (optional)"
                        value={newProduct.description}
                        onChange={handleInputChange}
                        className="form-input"
                        rows="2"
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? '⏳ Adding...' : '➕ Add Product'}
                </button>
            </form>

            <div className="products-section">
                <h3>Products ({products.length})</h3>
                {loading && !products.length ? (
                    <div className="loading">Loading products...</div>
                ) : products.length === 0 ? (
                    <div className="empty-state">
                        <p>No products found</p>
                        <p>Add your first product using the form above</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map(product => (
                            <div key={product._id} className="product-card">
                                <div className="product-info">
                                    <h4 className="product-name">{product.name}</h4>
                                    <p className="product-category">{product.category_name}</p>
                                    {product.description && (
                                        <p className="product-description">{product.description}</p>
                                    )}
                                    {product.product_image && (
                                        <img
                                            src={product.product_image}
                                            alt={product.name}
                                            className="product-image"
                                            onError={(e) => { e.target.style.display = 'none' }}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductManager;