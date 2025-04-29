import React, { useEffect, useState } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(response => response.json())
      .then(data => {
        setBooks(data);
      })
      .catch(error => {
        setError('Failed to fetch books.');
        console.error('Error fetching books:', error);
      });
  }, []);

  return (
    <div>
      <h1>Books</h1>
      {error && <p>{error}</p>}
      <ul>
        {books.map(book => (
          <li key={book._id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
