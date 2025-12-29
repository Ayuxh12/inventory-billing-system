import { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const load = async () => {
    const res = await axios.get("http://localhost:5000/api/categories");
    setCategories(res.data);
  };

  const add = async () => {
    await axios.post("http://localhost:5000/api/categories", { name });
    setName("");
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="container mt-4">
      <h3>Categories</h3>
      <input className="form-control mb-2" value={name}
        placeholder="Category name"
        onChange={e=>setName(e.target.value)} />
      <button className="btn btn-success mb-3" onClick={add}>Add</button>

      <ul className="list-group">
        {categories.map(c=>(
          <li className="list-group-item" key={c._id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
