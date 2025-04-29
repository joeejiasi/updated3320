import React, { useState, useEffect } from "react";

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch books from the API
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch("/api/books");
                if (!response.ok) {
                    throw new Error("Failed to fetch books.");
                }
                const data = await response.json();
                setBooks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const checkInBook = async (isbn) => {
        try {
            const response = await fetch(`/api/books/checkin/${isbn}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            });

            const result = await response.json();
            if (response.ok) {
                setBooks(books.map(book =>
                    book.isbn === isbn ? { ...book, status: "Available", checkedOutBy: null, dueDate: null } : book
                ));
            } else {
                console.log(result);  // Handle error messages from the backend
            }
        } catch (error) {
            console.error("Error checking in the book:", error);
        }
    };

    const checkOutBook = async (isbn) => {
        const checkedOutBy = "John Doe";  // Example user, replace with actual user data
        const dueDate = "2025-05-01";  // Example due date, replace with actual date

        try {
            const response = await fetch(`/api/books/checkout/${isbn}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ checkedOutBy, dueDate }),
            });

            const result = await response.json();
            if (response.ok) {
                setBooks(books.map(book =>
                    book.isbn === isbn ? { ...book, status: "Checked Out", checkedOutBy, dueDate } : book
                ));
            } else {
                console.log(result);  // Handle error messages from the backend
            }
        } catch (error) {
            console.error("Error checking out the book:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const availableBooks = books.filter(book => book.status === "Available");
    const checkedOutBooks = books.filter(book => book.status === "Checked Out");

    return (
        <div className="Book-div">
            <h1 className="App-book-header">Books List</h1>

            <h2 className="App-mini-header">Available Books</h2>
            {availableBooks.length > 0 ? (
                <table cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th>ISBN</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {availableBooks.map((book) => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publisher}</td>
                                <td>{book.isbn}</td>
                                <td>
                                    <button onClick={() => checkOutBook(book.isbn)}>Check Out</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No available books.</p>
            )}

            <h2 className="App-mini-header">Checked-Out Books</h2>
            {checkedOutBooks.length > 0 ? (
                <table cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th>ISBN</th>
                            <th>Due Date</th>
                            <th>Checked Out By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkedOutBooks.map((book) => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publisher}</td>
                                <td>{book.isbn}</td>
                                <td>{book.dueDate ? book.dueDate.substring(0, 10) : 'N/A'}</td>
                                <td>{book.checkedOutBy || 'N/A'}</td>
                                <td>
                                    <button onClick={() => checkInBook(book.isbn)}>Check In</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No books are currently checked out.</p>
            )}
        </div>
    );
};

export default BooksList;
