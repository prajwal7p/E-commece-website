import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import api from "../../services/axios";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await api.get("/orders");

        setOrders(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />

      <main className="orders-page">
        <div className="orders-header">
          <p>Your purchases</p>
          <h1>My Orders</h1>
        </div>

        {loading ? (
          <h2>Loading orders...</h2>
        ) : orders.length === 0 ? (
          <div className="empty-orders">
            <h2>No orders yet</h2>
            <p>Items you buy from the cart will appear here.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <article className="order-card" key={order._id}>
                <div className="order-card-top">
                  <div>
                    <span>Order ID</span>
                    <strong>{order._id}</strong>
                  </div>
                  <div>
                    <span>Status</span>
                    <strong>{order.status}</strong>
                  </div>
                  <div>
                    <span>Total</span>
                    <strong>Rs. {order.total}</strong>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item) => (
                    <div className="order-item" key={item.product}>
                      <img src={item.image} alt={item.title} />
                      <div>
                        <h3>{item.title}</h3>
                        <p>
                          Rs. {item.price} x {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Orders;
