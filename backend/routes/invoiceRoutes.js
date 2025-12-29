const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice");
const Product = require("../models/Product");

// CREATE INVOICE
router.post("/", async (req, res) => {
  const { items } = req.body;

  let total = 0;

  for (let item of items) {
    const product = await Product.findById(item.product);

    if (!product || product.stock < item.quantity) {
      return res.status(400).json({
        message: `Insufficient stock for product`
      });
    }

    product.stock -= item.quantity;
    await product.save();

    total += item.quantity * product.price;
    item.price = product.price;
  }

  const invoice = await Invoice.create({
    items,
    totalAmount: total
  });

  res.json(invoice);
});

// GET ALL INVOICES
router.get("/", async (req, res) => {
  const invoices = await Invoice.find().populate("items.product");
  res.json(invoices);
});

module.exports = router;
