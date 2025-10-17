// client/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

// ** CONNECTION POINT **: Yahan hum backend ka URL de rahe hain
// Local par: 'http://localhost:5000/api/items'
// Deploy hone ke baad, ise aapke Vercel server URL se badalna padega.
const API_URL = 'http://localhost:5000/api/items'; 

function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Data Fetch karne ka function (GET) ---
  const fetchItems = async () => {
    try {
      // Back-end se data maanga (GET request)
      const response = await axios.get(API_URL);
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Data Fetch Error:', error);
      setLoading(false);
    }
  };

  // Component load hone par data fetch karein
  useEffect(() => {
    fetchItems();
  }, []);

  // --- Data Submit karne ka function (POST) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      // Back-end ko data bheja (POST request)
      await axios.post(API_URL, { text: text });

      setText(''); // Input field khali karein
      fetchItems(); // New list dobara load karein
    } catch (error) {
      console.error('Data Submit Error:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>MERN Connection Test</h1>

      {/* Input Field aur Button */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Kuchh likhein aur save karein..."
          style={{ flexGrow: 1, padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px', marginLeft: '10px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Save Karein
        </button>
      </form>

      {/* Saved Items ki List */}
      <h2>Saved Items:</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item) => (
            <li key={item._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0', borderRadius: '4px' }}>
              {item.text}
            </li>
          ))}
          {items.length === 0 && <p>Koi item save nahi kiya gaya.</p>}
        </ul>
      )}
    </div>
  );
}

export default App;