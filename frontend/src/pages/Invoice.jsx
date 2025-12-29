import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

export default function Invoice() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState(1);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(r => setProducts(r.data));
  }, []);

  const create = async () => {
    const r = await axios.post("http://localhost:5000/api/invoices", {
      items: [{ product, quantity: qty }]
    });
    setInvoice(r.data);
  };

  const pdf = () => {
    const doc = new jsPDF();
    doc.text("Invoice", 20, 20);
    doc.text(`Total: ₹${invoice.totalAmount}`, 20, 30);
    doc.save("invoice.pdf");
  };

  return (
    <div className="container mt-4">
      <select className="form-control mb-2" onChange={e=>setProduct(e.target.value)}>
        <option>Select</option>
        {products.map(p=>(
          <option key={p._id} value={p._id}>{p.name}</option>
        ))}
      </select>
      <input className="form-control mb-2" type="number" value={qty} onChange={e=>setQty(e.target.value)} />
      <button className="btn btn-success" onClick={create}>Create</button>

      {invoice && <button className="btn btn-primary ms-2" onClick={pdf}>PDF</button>}
    </div>
  );
}

