import React, { useState } from 'react';
import './App.css';
import CardList from './Cardlist';

function App() {
  const [url, setUrl] = useState('');
  const [popupMessage, setPopupMessage] = useState('');

  const handleAddLink = async () => {
    try {
      const response = await fetch(`https://bookey-backend.vercel.app/api/addBookmark?url=${encodeURIComponent(url)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setPopupMessage('Bookmark added successfully');
        setUrl(''); // Clear the input field
        // You can perform additional actions or reload the cards here if needed
      } else {
        setPopupMessage('Failed to add bookmark');
      }
    } catch (error) {
      console.error('Error adding bookmark:', error.message);
      setPopupMessage('Error adding bookmark');
    }
  };

  return (
    <>
      <div className="container">
        <div className="heading">Bookmarks</div>
        <div className="components">
          <div className="form">
            <input
              type="text"
              className="form__input"
              placeholder="Type anything..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="btn btn__primary" onClick={handleAddLink}>
            <p>Add Link</p>
          </div>
        </div>

        <CardList />

        {popupMessage && (
          <div className="popup">
            <p>{popupMessage}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
