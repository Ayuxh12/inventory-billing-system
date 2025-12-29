import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    stock: 0,
    sales: 0,
    invoices: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Fetch everything
        const [catRes, prodRes, invRes] = await Promise.all([
          axios.get("http://localhost:5000/api/categories"),
          axios.get("http://localhost:5000/api/products"),
          axios.get("http://localhost:5000/api/invoices")
        ]);

        const categories = catRes.data;
        const products = prodRes.data;
        const invoices = invRes.data;

        const totalStock = products.reduce(
          (sum, p) => sum + (p.stock || 0),
          0
        );

        const totalSales = invoices.reduce(
          (sum, i) => sum + (i.totalAmount || 0),
          0
        );

        setStats({
          categories: categories.length,
          products: products.length,
          stock: totalStock,
          sales: totalSales,
          invoices: invoices.length
        });
      } catch (err) {
        console.error("Dashboard error:", err);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Welcome, {user.name}</h2>
      <p className="text-muted">
        Role: <strong>{user.role.toUpperCase()}</strong>
      </p>

      <div className="row mt-4">
        {user.role === "admin" && (
          <>
            <Card title="Categories" value={stats.categories} />
            <Card title="Products" value={stats.products} />
            <Card title="Total Stock" value={stats.stock} />
          </>
        )}

        <Card title="Total Sales (₹)" value={stats.sales} />
        <Card title="Total Invoices" value={stats.invoices} />
      </div>

      {user.role === "cashier" && (
        <div className="alert alert-info mt-4">
          <strong>Quick Tip:</strong> Use the <b>Invoice</b> tab to create sales.
          Stock updates automatically.
        </div>
      )}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="col-md-3 mb-3">
      <div className="card text-center shadow-sm">
        <div className="card-body">
          <h6 className="text-muted">{title}</h6>
          <h4>{value}</h4>
        </div>
      </div>
    </div>
  );
}
