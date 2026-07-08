import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart-context";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CartItem from "../../components/CartItem/CartItem";
import api from "../../services/axios";
import "./Cart.css";

function Cart() {
  const { cart, fetchCart } = useContext(CartContext);
  const [buying, setBuying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  async function handleBuyNow() {
    if (cart.length === 0) {
      return;
    }

    try {
      setBuying(true);

      const res = await api.post("/orders");

      alert(res.data.status);
      await fetchCart();
      navigate("/orders");
    } catch (err) {
      alert(err.response?.data?.status || "Order failed");
    } finally {
      setBuying(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="cart-page">
        <div className="cart-header">
          <div>
            <p>Ready to checkout</p>
            <h1>Your Cart</h1>
          </div>
          <span>{cart.length} items</span>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Cart is Empty</h2>
            <p>Add products to your cart and they will stay saved here.</p>
          </div>
        ) : (
          <div className="cart-layout">
            <section className="cart-items">
              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </section>

            <aside className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <strong>Rs. {total}</strong>
              </div>

              <div className="summary-row">
                <span>Delivery</span>
                <strong>Free</strong>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <strong>Rs. {total}</strong>
              </div>

              <button
                className="buy-now-btn"
                onClick={handleBuyNow}
                disabled={buying}
              >
                {buying ? "Placing Order..." : "Buy Now"}
              </button>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Cart;
