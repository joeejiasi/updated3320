import React, { useState } from "react";

const DeleteBook = () => {
    const [id, setId] = useState("123456789");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await fetch(
            'http://localhost:5000/' + id, {
            method: "delete",
            headers: {'Content-Type': 'application/json'}
        })
        res = await res.json();

        if(res.error){
            alert("Failed to delete book.");
        }
        else if(res === "Book does not exist") {
            alert("Error: Book was not in library");
        }
        else { 
            alert("Book deleted successfully!");
        }
    };

    return (
        <div>
            <h1 className = "App-book-header">Delete a Book</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ISBN of book to delete:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Delete</button>
            </form>
        </div>
    );
    };

export default DeleteBook;