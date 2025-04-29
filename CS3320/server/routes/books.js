const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

// List all books (both available and checked-out)
router.get("/", async (req, res) => {
    try {
        const books = await Book.find(); // Fetch all books from the database
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch books." });
    }
});

// List only available books
router.get("/available", async (req, res) => {
    try {
        const books = await Book.find({ status: "Available" });
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch available books." });
    }
});

// List only checked-out books
router.get("/checked-out", async (req, res) => {
    try {
        const books = await Book.find({ status: "Checked Out" });
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch checked-out books." });
    }
});

// Check in a book
router.put("/checkin/:id", async (req, res) => {
    let id = req.params['id'];
    try {
        const book = await Book.findOne({ isbn: id });
        if (!book) return res.json({ message: 'Book does not exist' });
        if (book.status === "Available") return res.json({ message: 'Book already checked in' });

        const updatedBook = await Book.findOneAndUpdate(
            { isbn: id },
            { $set: { status: "Available", checkedOutBy: null, dueDate: null }},
            { new: true }
        );
        res.json(updatedBook);  // Send back updated book
    } catch (error) {
        res.status(500).json({ error: "Failed to check in the book." });
    }
});

// Check out a book
router.put("/checkout/:id", async (req, res) => {
    let id = req.params['id'];
    try {
        const book = await Book.findOne({ isbn: id });
        if (!book) return res.json({ message: 'Book does not exist' });
        if (book.status === "Checked Out") return res.json({ message: 'Book already checked out' });

        const updatedBook = await Book.findOneAndUpdate(
            { isbn: id },
            { $set: { status: "Checked Out", checkedOutBy: req.body.checkedOutBy, dueDate: req.body.dueDate }},
            { new: true }
        );
        res.json(updatedBook);  // Send back updated book
    } catch (error) {
        res.status(500).json({ error: "Failed to check out the book." });
    }
});

// Add a new book
router.post("/", async (req, res) => {
    let book = await Book.findOne({ isbn: req.body.isbn });
    if (book) {
        return res.json({ message: "Book already exists" });
    }
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.json(savedBook);
    } catch (error) {
        res.status(500).json({ error: "Failed to add the book." });
    }
});

// Update book information
router.put("/:id", async (req, res) => {
    let id = req.params['id'];
    try {
        const book = await Book.findOne({ isbn: id });
        if (!book) return res.json({ message: "Book does not exist" });

        const updatedBook = await Book.findOneAndUpdate(
            { isbn: id },
            { $set: { title: req.body.title, author: req.body.author, publisher: req.body.publisher, isbn: req.body.isbn }},
            { new: true }
        );
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: "Failed to update the book." });
    }
});

// Delete a book
router.delete("/:id", async (req, res) => {
    let id = req.params['id'];
    try {
        const deleted = await Book.deleteOne({ isbn: id });
        if (deleted.deletedCount >= 1) {
            res.json({ message: "Book deleted" });
        } else {
            res.json({ message: "Book does not exist" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete the book." });
    }
});

module.exports = router;
