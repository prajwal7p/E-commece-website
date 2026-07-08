import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Categories from "../../components/Categories/Categories";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <main className="home-page">
        <section className="hero">
          <div className="hero-content">
            <p className="hero-label">Fresh deals every day</p>
            <h1>ShopKart brings your favorite finds home faster</h1>

            <p>
              Explore electronics, fashion, shoes, watches, and everyday
              essentials with simple browsing and quick cart access.
            </p>

            <div className="hero-actions">
              <Link to="/products" className="primary-action">
                Shop Now
              </Link>
              <a href="#categories" className="secondary-action">
                View Categories
              </a>
            </div>
          </div>

          <div className="hero-showcase">
            <div className="deal-badge">
              <span>Today</span>
              <strong>Up to 40% off</strong>
            </div>
            <img
              src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=900"
              alt="Shopping bags and ecommerce products"
            />
          </div>
        </section>

        <section className="quick-links" aria-label="Shopping benefits">
          <div>
            <strong>Fast Delivery</strong>
            <span>On selected products</span>
          </div>
          <div>
            <strong>Secure Payment</strong>
            <span>Protected checkout</span>
          </div>
          <div>
            <strong>Easy Returns</strong>
            <span>Simple replacement support</span>
          </div>
          <div>
            <strong>Top Brands</strong>
            <span>Curated product picks</span>
          </div>
        </section>

        <div id="categories">
          <Categories />
        </div>

        <section className="featured-section">
          <div className="section-heading">
            <p>Popular right now</p>
            <h2>Featured Storefront</h2>
          </div>

          <div className="featured-grid">
            <Link to="/products" className="feature-card large">
              <img
                src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800"
                alt="Electronics collection"
              />
              <div>
                <span>Electronics</span>
                <h3>Smart gadgets for work and play</h3>
              </div>
            </Link>

            <Link to="/products" className="feature-card">
              <img
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600"
                alt="Sneakers collection"
              />
              <div>
                <span>Shoes</span>
                <h3>New comfort drops</h3>
              </div>
            </Link>

            <Link to="/products" className="feature-card">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
                alt="Watch collection"
              />
              <div>
                <span>Watches</span>
                <h3>Premium daily styles</h3>
              </div>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
