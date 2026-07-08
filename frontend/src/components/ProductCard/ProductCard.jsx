import "./ProductCard.css";
import { Link } from "react-router-dom";
function ProductCard({ product }) {
  return (
    <div className="product-card">

      <img src={product.image} alt={product.title} />

      <h2>{product.title}</h2>

      <p className="description">
        {product.description}
      </p>

      <h3>₹ {product.price}</h3>

      <Link to={`/products/${product._id}`}>
  <button>View Details</button>
</Link>

    </div>
  );
}

export default ProductCard;