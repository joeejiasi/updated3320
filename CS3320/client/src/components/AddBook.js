import React, { useState } from "react";

const AddBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [isbn, setIsbn] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        let book = await fetch(
            'http://localhost:5000/', {
            method: "post",
            body: JSON.stringify({title, author, publisher, isbn}),
            headers: {'Content-Type': 'application/json'}
        })
        book = await book.json();

        if(book === "Book already exists") {
            alert("Error: Book already exists");
        }
        else { 
            if(book) {
                alert("Book added successfully!");
                setTitle("");
                setAuthor("");
                setPublisher("");
                setIsbn("");
            }
        }
    };

    return (
        <div>
            <h1 className = "App-book-header">Add a Book</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Publisher:</label>
                    <input
                        type="text"
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>ISBN:</label>
                    <input
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;
