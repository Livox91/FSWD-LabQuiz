import React from 'react';
import './ProductPage.css';

const ProductPage = ({
    name,
    description,
    price,
    image,
    category,
    rating,
    inStock,
    onAddToCart
}) => {
    return (
        <div className="product-page">
            <div className="product-container">
                {/* Product Image */}
                <div className="product-image-section">
                    <img
                        src={image}
                        alt={name}
                        className="product-image"
                    />
                    {!inStock && (
                        <div className="out-of-stock-badge">Out of Stock</div>
                    )}
                </div>

                {/* Product Details */}
                <div className="product-details-section">
                    <div className="product-category">{category}</div>
                    <h1 className="product-name">{name}</h1>

                    {/* Rating */}
                    {rating && (
                        <div className="product-rating">
                            <span className="stars">
                                {'★'.repeat(Math.floor(rating))}
                                {'☆'.repeat(5 - Math.floor(rating))}
                            </span>
                            <span className="rating-value">({rating}/5)</span>
                        </div>
                    )}

                    {/* Price */}
                    <div className="product-price">
                        <span className="price-label">Price:</span>
                        <span className="price-value">${price.toFixed(2)}</span>
                    </div>

                    {/* Description */}
                    <div className="product-description">
                        <h3>Description</h3>
                        <p>{description}</p>
                    </div>

                    {/* Stock Status */}
                    <div className="stock-status">
                        <span className={`status-indicator ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                            {inStock ? '✓ In Stock' : '✗ Out of Stock'}
                        </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        className="add-to-cart-btn"
                        onClick={onAddToCart}
                        disabled={!inStock}
                    >
                        {inStock ? 'Add to Cart' : 'Notify When Available'}
                    </button>
                </div>
            </div>
        </div>
    );
};



export default ProductPage;
