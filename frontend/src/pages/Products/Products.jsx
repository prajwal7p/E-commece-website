import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";
import api from "../../services/axios";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get("/viewproducts");

        setProducts(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(search.toLowerCase())
);

  return (
    <>
      <Navbar />

      <div className="products-page">

        <h1>Our Products</h1>

        {loading ? (
  <h2>Loading...</h2>
) : (
  <>
    <div className="search-box">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
    

    <div className="products-grid">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))
      ) : (
        <h2>No Products Found</h2>
      )}
    </div>
  </>
)}

      </div>

      <Footer />
    </>
  );
}

export default Products;
