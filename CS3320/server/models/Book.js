const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    status: { type: String, default: "Available" },
    checkedOutBy: { type: String },
    dueDate: { type: Date },
});

module.exports = mongoose.model("Book", BookSchema);
