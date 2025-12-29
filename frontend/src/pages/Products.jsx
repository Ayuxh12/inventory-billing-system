import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({});

  const load = async () => {
    setProducts((await axios.get("http://localhost:5000/api/products")).data);
    setCategories((await axios.get("http://localhost:5000/api/categories")).data);
  };

  const add = async () => {
    await axios.post("http://localhost:5000/api/products", form);
    setForm({});
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="container mt-4">
      <h3>Products</h3>

      <input className="form-control mb-2" placeholder="Name"
        onChange={e=>setForm({...form,name:e.target.value})}/>
      <input className="form-control mb-2" placeholder="Price"
        onChange={e=>setForm({...form,price:e.target.value})}/>
      <input className="form-control mb-2" placeholder="Stock"
        onChange={e=>setForm({...form,stock:e.target.value})}/>

      <select className="form-control mb-2"
        onChange={e=>setForm({...form,category:e.target.value})}>
        <option>Select Category</option>
        {categories.map(c=>(
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <button className="btn btn-success mb-3" onClick={add}>Add</button>

      <table className="table">
        <thead><tr><th>Name</th><th>Stock</th></tr></thead>
        <tbody>
          {products.map(p=>(
            <tr key={p._id}><td>{p.name}</td><td>{p.stock}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
