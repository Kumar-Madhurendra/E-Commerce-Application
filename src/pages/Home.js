import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import './Home.css';

const Home = () => {
  const featuredProducts = products.slice(0, 6);
  const categoryProducts = categories.slice(1); // Exclude 'All Products'

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

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Discover Amazing Products</h1>
              <p>Shop the latest trends in electronics, fashion, and home essentials. Quality products at unbeatable prices.</p>
              <div className="hero-buttons">
                <Link to="/products" className="btn btn-primary">
                  Shop Now
                  <FaArrowRight />
                </Link>
                <Link to="/products?category=electronics" className="btn btn-secondary">
                  Browse Electronics
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop" 
                alt="Shopping" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            {categoryProducts.map((category) => (
              <Link 
                key={category.id} 
                to={`/products?category=${category.id}`} 
                className="category-card"
              >
                <div className="category-icon">
                  {category.id === 'electronics' && '📱'}
                  {category.id === 'clothing' && '👕'}
                  {category.id === 'accessories' && '👜'}
                  {category.id === 'home' && '🏠'}
                </div>
                <h3>{category.name}</h3>
                <p>Explore our {category.name.toLowerCase()} collection</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <Link to="/products" className="view-all-link">
              View All Products
              <FaArrowRight />
            </Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.8</div>
              <div className="stat-label">
                Customer Rating
                <div className="rating-stars">
                  {renderStars(4.8)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for the latest products and exclusive offers.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input"
                required
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 