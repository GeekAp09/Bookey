import React, { useState, useEffect } from 'react';

const CardList = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://bookey-backend.vercel.app/api/bookmarks');
        const data = await response.json();
        setBookmarks(data);
      } catch (error) {
        console.error('Error fetching bookmarks:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <ul className="cards">
      {bookmarks.map((bookmark, index) => (
        <li key={index}>
          <a href={bookmark.url} className="card">
            <img src={bookmark.imageUrl === "false" ? 'error.jpg' : bookmark.imageUrl} className="card__image" alt="" onerror="this.onerror=null;/error.jpg;" />
            <div className="card__overlay">
              <div className="card__header">
                <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                  <path />
                </svg>
                <img className="card__thumb" src={bookmark.imageUrl} alt="" />
                <div className="card__header-text">
                  <h3 className="card__title">{bookmark.title}</h3>
                  <span className="card__status">
                     {bookmark.name}
                  </span>
                </div>
              </div>
              <p className="card__description">{bookmark.description}</p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default CardList;
