import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
import './Cart.css';

const Cart = () => {
  const { 
    cart, 
    cartTotal, 
    removeFromCart, 
    updateCartItemQuantity, 
    clearCart 
  } = useStore();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      toast.success('Item removed from cart');
    } else {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId);
    toast.success(`${productName} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared');
  };

  const shippingCost = cart.length > 0 ? 749 : 0;
  const tax = cartTotal * 0.08; // 8% tax
  const total = cartTotal + shippingCost + tax;

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FaShoppingBag />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-category">{item.category}</p>
                  <div className="item-price">
                    <span className="current-price">{formatPrice(item.price)}</span>
                    {item.originalPrice > item.price && (
                      <span className="original-price">{formatPrice(item.originalPrice)}</span>
                    )}
                  </div>
                </div>

                <div className="item-quantity">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="item-total">
                  <span className="total-price">{formatPrice(item.price * item.quantity)}</span>
                </div>

                <button 
                  onClick={() => handleRemoveItem(item.id, item.name)}
                  className="remove-btn"
                  title="Remove item"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-item">
              <span>Subtotal ({cart.length} item{cart.length !== 1 ? 's' : ''})</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            
            <div className="summary-item">
              <span>Shipping</span>
              <span>{formatPrice(shippingCost)}</span>
            </div>
            
            <div className="summary-item">
              <span>Tax (8%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            
            <div className="summary-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <div className="cart-actions">
              <Link to="/checkout" className="btn btn-primary checkout-btn">
                Proceed to Checkout
              </Link>
              
              <button 
                onClick={handleClearCart}
                className="btn btn-danger clear-cart-btn"
              >
                Clear Cart
              </button>
              
              <Link to="/products" className="btn btn-secondary continue-shopping-btn">
                <FaArrowLeft />
                Continue Shopping
              </Link>
            </div>

            <div className="cart-benefits">
              <div className="benefit">
                <span className="benefit-icon">🚚</span>
                <div>
                  <strong>Free Shipping</strong>
                  <p>On orders over ₹2000</p>
                </div>
              </div>
              <div className="benefit">
                <span className="benefit-icon">🔄</span>
                <div>
                  <strong>Easy Returns</strong>
                  <p>30-day return policy</p>
                </div>
              </div>
              <div className="benefit">
                <span className="benefit-icon">🔒</span>
                <div>
                  <strong>Secure Checkout</strong>
                  <p>SSL encrypted payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 