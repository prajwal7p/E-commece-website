import { useContext } from "react";
import { CartContext } from "../../context/cart-context";
import "./CartItem.css";

function CartItem({ item }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  return (
    <div className="cart-item">

      <img
        src={item.image}
        alt={item.title}
      />

      <div className="cart-info">

        <h3>{item.title}</h3>

        <p>₹ {item.price}</p>

        <div className="quantity">

          <button
            onClick={() => decreaseQuantity(item._id)}
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => increaseQuantity(item._id)}
          >
            +
          </button>

        </div>

        <button
          className="remove-btn"
          onClick={() => removeFromCart(item._id)}
        >
          Remove
        </button>

      </div>

    </div>
  );
}

export default CartItem;
