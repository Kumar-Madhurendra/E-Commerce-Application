import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa';
import useStore from '../store/useStore';
import { products } from '../data/products';
import toast from 'react-hot-toast';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, getCartItem } = useStore();
  
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const product = products.find(p => p.id === parseInt(id));
  const cartItem = getCartItem(product?.id);

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="product-not-found">
            <h2>Product not found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <Link to="/products" className="btn btn-primary">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

  const handleAddToCart = () => {
    if (product.colors.length > 1 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }
    if (product.sizes.length > 1 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }

    const productToAdd = {
      ...product,
      selectedColor,
      selectedSize
    };

    addToCart(productToAdd, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="image-thumbnails">
              {[product.image, product.image, product.image].map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <div className="product-category">{product.category}</div>
              <h1>{product.name}</h1>
              <div className="product-rating">
                {renderStars(product.rating)}
                <span className="rating-value">{product.rating}</span>
                <span className="review-count">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="product-price">
              <span className="current-price">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="original-price">{formatPrice(product.originalPrice)}</span>
                  <span className="discount-badge">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {/* Product Options */}
            {product.colors.length > 1 && (
              <div className="product-option">
                <label>Color:</label>
                <div className="color-options">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    >
                      {selectedColor === color && <span className="check">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 1 && (
              <div className="product-option">
                <label>Size:</label>
                <div className="size-options">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="product-option">
              <label>Quantity:</label>
              <div className="quantity-selector">
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity-value">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="product-actions">
              <button 
                onClick={handleAddToCart}
                className="btn btn-primary add-to-cart-btn"
                disabled={!product.inStock}
              >
                <FaShoppingCart />
                {cartItem ? `In Cart (${cartItem.quantity})` : 'Add to Cart'}
              </button>
              
              <button className="btn btn-secondary wishlist-btn">
                <FaHeart />
                Add to Wishlist
              </button>
            </div>

            {/* Product Features */}
            <div className="product-features">
              <h3>Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="shipping-info">
              <div className="info-item">
                <FaTruck />
                <div>
                  <strong>Free Shipping</strong>
                  <p>On orders over ₹2000</p>
                </div>
              </div>
              <div className="info-item">
                <FaShieldAlt />
                <div>
                  <strong>Secure Payment</strong>
                  <p>SSL encrypted checkout</p>
                </div>
              </div>
              <div className="info-item">
                <FaUndo />
                <div>
                  <strong>Easy Returns</strong>
                  <p>30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 