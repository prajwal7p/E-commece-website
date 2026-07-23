import { useContext, useState } from "react";
import api from "../../services/axios";
import { CartContext } from "../../context/cart-context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const { cart } = useContext(CartContext);
    const navigate = useNavigate();

 const [user, setUser] = useState(() => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
 });
 const [showMenu, setShowMenu] = useState(false);

async function handleLogout() {
  try {
    await api.post("/logout");

    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  } catch (err) {
    console.log(err);
  }
}
// async function fetchUser() {
//   try {
//     const res = await api.get("/me");
//     setUser(res.data);
//   } catch (err) {
//     setUser(null);
//   }
// }
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>ShopKart</h2>
      </div>

      <ul className="nav-links">
  <li>
    <Link to="/">Home</Link>
  </li>

  <li>
    <Link to="/products">Products</Link>
  </li>

  <li>
    <Link to="/cart">Cart ({cart.length})</Link>
  </li>

  {user?.role === "admin" && (
    <li>
      <Link to="/dashboard">Dashboard</Link>
    </li>
  )}

  {!user ? (
  <>
    <li>
      <Link to="/login">Login</Link>
    </li>

    <li>
      <Link to="/signup">Signup</Link>
    </li>
  </>
) : (
  <>
    <li className="profile">

  <div
    className="avatar"
    onClick={() => setShowMenu(!showMenu)}
  >
    {user.username.charAt(0).toUpperCase()}
  </div>

  {showMenu && (

    <div className="dropdown">

      <h4>{user.username}</h4>

      <p>{user.email}</p>

      <hr />

      <Link to="/profile">
        My Profile
      </Link>

      <Link to="/orders">
        My Orders
      </Link>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>

  )}

</li>
  </>
)}
</ul>
    </nav>
  );
}

export default Navbar;
