import React from "react";
import "./App.css"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BooksList from "./components/BooksList";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import CheckOutBook from "./components/CheckOutBook";
import DeleteBook from "./components/DeleteBook";
import CheckInBook from "./components/CheckInBook";

const App = () => {
    return (
        <div className = "App-div">
            <Router className = "Router">
                <div className = "App-div">
                    <header className = "App-header">Library Books</header>
                    <nav className = "App-nav">
                        <ul className = "App-nav-ul">
                            <h1 className = "App-mini-header">Navigation</h1>
                            <li><Link to="/">Books List</Link></li>
                            <li><Link to="/add">Add Book</Link></li>
                            <li><Link to="/edit">Edit Book</Link></li>
                            <li><Link to="/checkout">Check Out Book</Link></li>
                            <li><Link to="/delete">Delete Book</Link></li>
                            <li><Link to="/checkin">Check In Book</Link></li>
                        </ul>
                    </nav>
                    <Routes className = "App-Routes">
                        <Route path="/" element={<BooksList />} />
                        <Route path="/add" element={<AddBook />} />
                        <Route path="/edit" element={<EditBook />} />
                        <Route path="/checkout" element={<CheckOutBook />} />
                        <Route path="/delete" element={<DeleteBook />} />
                        <Route path="/checkin" element={<CheckInBook />} />
                    </Routes>
                </div>
            </Router>
            <footer></footer>
        </div>
    );
};

export default App;
