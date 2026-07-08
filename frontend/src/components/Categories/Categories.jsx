import "./Categories.css";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500"
  },
  {
    id: 3,
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
  },
  {
    id: 4,
    name: "Watches",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500"
  }
];

function Categories() {
  return (
    <section className="categories">
      <h2>Shop By Category</h2>

      <div className="category-container">
        {categories.map((item) => (
          <div className="category-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;