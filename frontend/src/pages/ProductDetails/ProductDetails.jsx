import { useContext } from "react";
import { CartContext } from "../../context/cart-context";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await api.get(`/viewproducts/${id}`);

        setProduct(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchProduct();
  }, [id]);

  async function handleAddToCart() {
    try {
      await api.get("/me"); // Check if user is logged in

      await addToCart(product);

      alert("Product added to cart");
    } catch {
      navigate("/login");
    }
  }

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="details-container">
        <img src={product.image} alt={product.title} />

        <div className="details">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h2>₹ {product.price}</h2>
          <button onClick={handleAddToCart}>Add To Cart</button>{" "}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;
