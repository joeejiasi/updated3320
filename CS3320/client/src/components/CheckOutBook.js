import React, { useState } from "react";

const CheckOutBook = () => {
    const [bookId, setBookId] = useState("");
    const [checkedOutBy, setCheckedOutBy] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const curDate = new Date();
        const wantedDate = new Date(dueDate);
        if(wantedDate.getTime() < curDate.getTime()) {
            alert("Please enter a date in the future.")
        }
        else {
            let checkOut = await fetch(
                'http://localhost:5000/checkout/' + bookId, {
                method: "put",
                body: JSON.stringify({checkedOutBy, dueDate}),
                headers: {'Content-Type': 'application/json'}
            })
            checkOut = await checkOut.json();

            if(checkOut.error){
                alert("Failed to check out the book.");
            }
            else if(checkOut === "Book already checked out.") {
                alert("Error: Book already checked out.");
            }
            else if(checkOut === "Book does not exist.") {
                alert("Error: Book is not in library.");
            }
            else {
                alert("Book checked out successfully!");
                setBookId("");
                setCheckedOutBy("");
                setDueDate("");
            }
        }
    };

    return (
        <div>
            <h1 className = "App-book-header">Check Out a Book</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Book ISBN:</label>
                    <input
                        type="text"
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Checked Out By:</label>
                    <input
                        type="text"
                        value={checkedOutBy}
                        onChange={(e) => setCheckedOutBy(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Due Date:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Check Out</button>
            </form>
        </div>
    );
};

export default CheckOutBook;
