import React, { useState } from "react";

const CheckInBook = () => {
    const [id, setId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        let checkIn = await fetch(
            'http://localhost:5000/checkin/' + id, {
            method: "put",
            headers: {'Content-Type': 'application/json'}
        })
        checkIn = await checkIn.json();

        if(checkIn.error){
            alert("Failed to check in the book.");
        }
        else if(checkIn === "Book already checked in.") {
            alert("Error: Book is already checked in.");
        }
        else if(checkIn === "Book does not exist.") {
            alert("Error: Book is not in library.");
        }
        else {
            alert("Book checked in successfully!");
            setId("");
        }
    };

    return (
        <div>
            <h1 className = "App-book-header">Check In a Book</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Book ISBN:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Check In</button>
            </form>
        </div>
    );
};

export default CheckInBook;
