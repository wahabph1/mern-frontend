import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

// ***************************************************************
// ** FINAL DEPLOYMENT URL: Aapka Vercel Backend Address **
// ***************************************************************
// URL: https://mern-backend-rouge.vercel.app/api/items
const API_URL = 'https://mern-backend-rouge.vercel.app/api/items'; 

function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Data Fetch (GET) ---
  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Data Fetch Error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // --- Data Submit (POST) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      // Backend ko data bheja
      await axios.post(API_URL, { text: text });

      setText(''); 
      fetchItems(); // New list load karein
    } catch (error) {
      console.error('Data Submit Error:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>MERN Connection Live Test 🚀</h1>
      
      {/* Input Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New item add karein..."
          style={{ flexGrow: 1, padding: '12px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button type="submit" style={{ padding: '12px 15px', marginLeft: '10px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
          Save Karein
        </button>
      </form>

      {/* Saved Items ki List */}
      <h2>Saved Items:</h2>
      {loading ? (
        <p>Loading items...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item) => (
            <li key={item._id} style={{ border: '1px solid #eee', background: '#f9f9f9', padding: '10px', margin: '8px 0', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              {item.text}
            </li>
          ))}
          {items.length === 0 && <p style={{ color: '#888' }}>Database khali hai. Koi item save nahi kiya gaya.</p>}
        </ul>
      )}
    </div>
  );
}

export default App;