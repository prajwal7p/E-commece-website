import { useState } from "react";
import api from "../../services/axios";
import Navbar from "../../components/Navbar/Navbar";
import "./Admin.css";

function Admin() {

  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
    price: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await api.post("/addproduct", form);

      alert(res.data.status);

      setForm({
        title: "",
        image: "",
        description: "",
        price: ""
      });

    } catch (err) {
      alert(err.response?.data?.status || "Something went wrong");
    }
  }

  return (
    <>
      <Navbar />

      <div className="admin-container">

        <form onSubmit={handleSubmit} className="admin-form">

          <h1>Dashboard</h1>

         <label>Product Title</label>

<input
type="text"
name="title"
placeholder="Enter Product Title"
value={form.title}
onChange={handleChange}
required
/>

       <label>Image URL</label>

<input
type="text"
name="image"
placeholder="Paste Image URL"
value={form.image}
onChange={handleChange}
required
/>

          <label>Description</label>

<textarea
name="description"
placeholder="Enter Product Description"
value={form.description}
onChange={handleChange}
required
/>

          <label>Price</label>

<input
type="number"
name="price"
placeholder="Enter Product Price"
value={form.price}
onChange={handleChange}
required
/>

<button type="submit">
    Add Product
</button>
        </form>

      </div>

    </>
  );
}

export default Admin;
