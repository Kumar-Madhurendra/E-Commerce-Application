import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaTruck, FaEnvelope, FaHome, FaShoppingBag } from 'react-icons/fa';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="order-confirmation-page">
      <div className="container">
        <div className="confirmation-content">
          {/* Success Message */}
          <div className="success-message">
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            <h1>Thank you for your order!</h1>
            <p>Your order has been successfully placed and is being processed.</p>
            <div className="order-number">
              Order Number: <strong>{orderNumber}</strong>
            </div>
          </div>

          {/* Order Details */}
          <div className="order-details">
            <h2>Order Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <div className="detail-icon">
                  <FaTruck />
                </div>
                <div className="detail-content">
                  <h3>Estimated Delivery</h3>
                  <p>{estimatedDelivery.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FaEnvelope />
                </div>
                <div className="detail-content">
                  <h3>Confirmation Email</h3>
                  <p>We've sent a confirmation email with your order details.</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FaTruck />
                </div>
                <div className="detail-content">
                  <h3>Shipping Updates</h3>
                  <p>You'll receive tracking information once your order ships.</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FaCheckCircle />
                </div>
                <div className="detail-content">
                  <h3>Payment Confirmed</h3>
                  <p>Your payment has been processed successfully.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="next-steps">
            <h2>What's Next?</h2>
            <div className="steps-grid">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Order Processing</h3>
                  <p>We're preparing your order for shipment.</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Shipping</h3>
                  <p>Your order will be shipped within 1-2 business days.</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Delivery</h3>
                  <p>Track your package and receive delivery updates.</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Enjoy!</h3>
                  <p>Unbox your new products and enjoy your purchase.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Information */}
          <div className="support-info">
            <h2>Need Help?</h2>
            <p>If you have any questions about your order, our customer support team is here to help.</p>
            <div className="support-options">
              <div className="support-option">
                <h3>Contact Support</h3>
                <p>Email: support@shophub.com</p>
                <p>Phone: 1-800-SHOP-HUB</p>
                <p>Hours: Mon-Fri 9AM-6PM EST</p>
              </div>
              <div className="support-option">
                <h3>Order Status</h3>
                <p>Track your order and view shipping updates.</p>
                <button className="btn btn-secondary">Track Order</button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <Link to="/" className="btn btn-primary">
              <FaHome />
              Continue Shopping
            </Link>
            <Link to="/products" className="btn btn-secondary">
              <FaShoppingBag />
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 