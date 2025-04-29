import React, { useState } from "react";

const EditBook = () => {
    const [book, setBook] = useState({
        title: "Sample Book",
        author: "Sample Author",
        publisher: "Sample Publisher",
        isbn: "123456789"
    });
    const [id, setId] = useState("123456789");

    const handleSubmit = async (e) => {
        e.preventDefault();

        let upBook = await fetch(
            'http://localhost:5000/' + id, {
            method: "put",
            body: JSON.stringify(book),
            headers: {'Content-Type': 'application/json'}
        })
        upBook = await upBook.json();

        if(upBook.error){
            alert("Failed to update the book");
        }
        else if(upBook === "Book does not exist.") {
            alert("Error: Book is not in library.");
        }
        else {
            alert("Book updated successfully!");
            setBook({
                title: "",
                author: "",
                publisher: "",
                isbn: ""
            });
            setId("");
        }
    };

    return (
        <div>
            <h1 className = "App-book-header">Edit Book</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ISBN of book to be changed:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={book.title}
                        onChange={(e) => setBook({ ...book, title: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        value={book.author}
                        onChange={(e) => setBook({ ...book, author: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Publisher:</label>
                    <input
                        type="text"
                        value={book.publisher}
                        onChange={(e) => setBook({ ...book, publisher: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>ISBN:</label>
                    <input
                        type="text"
                        value={book.isbn}
                        onChange={(e) => setBook({ ...book, isbn: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditBook;
