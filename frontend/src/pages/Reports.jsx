import { useEffect, useState } from "react";
import axios from "axios";

export default function Reports() {
  const [invoices, setInvoices] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/invoices");

        setInvoices(res.data);

        const total = res.data.reduce(
          (sum, inv) => sum + (inv.totalAmount || 0),
          0
        );

        setTotalSales(total);
      } catch (err) {
        console.error("Reports error:", err);
      }
    };

    loadReports();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Sales Reports</h2>

      <div className="card mb-3">
        <div className="card-body">
          <h5>Total Sales: ₹ {totalSales}</h5>
          <p className="text-muted">
            Total Invoices: {invoices.length}
          </p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, index) => (
              <tr key={inv._id}>
                <td>{index + 1}</td>
                <td>{new Date(inv.createdAt).toLocaleString()}</td>
                <td>{inv.items.length}</td>
                <td>{inv.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {invoices.length === 0 && (
        <p className="text-muted">No sales records found.</p>
      )}
    </div>
  );
}
