const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// CREATE
router.post("/", async (req, res) => {
  const category = await Category.create(req.body);
  res.json(category);
});

// READ ALL
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(category);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
});

module.exports = router;
