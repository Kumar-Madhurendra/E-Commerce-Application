import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
import './ProductCard.css';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, getCartItem } = useStore();
  
  const cartItem = getCartItem(product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= rating ? 'star filled' : 'star'}
        />
      );
    }
    return stars;
  };

  if (viewMode === 'list') {
    return (
      <div className="product-card product-card-list">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          <div className="product-overlay">
            <button className="overlay-btn" onClick={handleAddToCart}>
              <FaShoppingCart />
            </button>
            <button className="overlay-btn">
              <FaHeart />
            </button>
            <Link to={`/products/${product.id}`} className="overlay-btn">
              <FaEye />
            </Link>
          </div>
        </div>
        
        <div className="product-info">
          <div className="product-header">
            <h3 className="product-name">
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </h3>
            <div className="product-rating">
              {renderStars(product.rating)}
              <span className="review-count">({product.reviews})</span>
            </div>
          </div>
          
          <p className="product-description">{product.description}</p>
          
          <div className="product-features">
            {product.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="feature-tag">{feature}</span>
            ))}
          </div>
          
          <div className="product-footer">
            <div className="product-price">
              <span className="current-price">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="original-price">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            
            <div className="product-actions">
              <button 
                className={`btn ${isInCart ? 'btn-secondary' : 'btn-primary'}`}
                onClick={handleAddToCart}
              >
                {isInCart ? `In Cart (${cartItem.quantity})` : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="product-card product-card-grid"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        <div className={`product-overlay ${isHovered ? 'visible' : ''}`}>
          <button className="overlay-btn" onClick={handleAddToCart}>
            <FaShoppingCart />
          </button>
          <button className="overlay-btn">
            <FaHeart />
          </button>
          <Link to={`/products/${product.id}`} className="overlay-btn">
            <FaEye />
          </Link>
        </div>
        
        {product.originalPrice > product.price && (
          <div className="discount-badge">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>
      
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        
        <h3 className="product-name">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        
        <div className="product-rating">
          {renderStars(product.rating)}
          <span className="review-count">({product.reviews})</span>
        </div>
        
        <div className="product-price">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="original-price">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        
        <div className="product-actions">
          <button 
            className={`btn ${isInCart ? 'btn-secondary' : 'btn-primary'}`}
            onClick={handleAddToCart}
          >
            {isInCart ? `In Cart (${cartItem.quantity})` : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 