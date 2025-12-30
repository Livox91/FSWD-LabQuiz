import React, { useState } from 'react';

import './ProductAdd.css';

const ProductAdd = ({ onProductAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        inStock: true
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Product name is required';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }
        if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
            newErrors.price = 'Please enter a valid price';
        }
        if (!formData.image.trim()) {
            newErrors.image = 'Image URL is required';
        }
        if (!formData.category.trim()) {
            newErrors.category = 'Category is required';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            // Convert price to number
            const productData = {
                ...formData,
                price: Number(formData.price)
            };
            onProductAdd(productData);
            // Reset form
            setFormData({
                name: '',
                description: '',
                price: '',
                image: '',
                category: '',
                inStock: true
            });
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="product-add-container">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="name">Product Name*</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description*</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className={errors.description ? 'error' : ''}
                    />
                    {errors.description && <span className="error-message">{errors.description}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price ($)*</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className={errors.price ? 'error' : ''}
                    />
                    {errors.price && <span className="error-message">{errors.price}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image URL*</label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className={errors.image ? 'error' : ''}
                    />
                    {errors.image && <span className="error-message">{errors.image}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category*</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={errors.category ? 'error' : ''}
                    >
                        <option value="">Select a category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Books">Books</option>
                        <option value="Home">Home</option>
                        <option value="Sports">Sports</option>
                    </select>
                    {errors.category && <span className="error-message">{errors.category}</span>}
                </div>

                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="inStock"
                            checked={formData.inStock}
                            onChange={handleChange}
                        />
                        In Stock
                    </label>
                </div>

                <div className="form-group">
                    <button type="submit" className="submit-button">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};


export default ProductAdd;
