import express from "express";
import { getBook } from "../controller/book.controller.js";
import Book from "../model/book.model.js";

const router = express.Router();

// GET all books
router.get("/", getBook);

// POST a new book
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
