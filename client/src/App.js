import React, { useState, useEffect } from 'react';
import './App.css';
import DataList from './components/DataList';
import AddDataForm from './components/AddDataForm';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/data');
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddData = async (newData) => {
    try {
      const response = await fetch('http://localhost:5000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      
      if (!response.ok) throw new Error('Failed to add data');
      const result = await response.json();
      setData([...data, result]);
    } catch (err) {
      console.error('Error adding data:', err);
      setError(err.message);
    }
  };

  const handleDeleteData = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/data/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete data');
      setData(data.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting data:', err);
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🚀 Jackcol App</h1>
        <p>A modern web application with React & Node.js</p>
      </header>

      <main className="app-main">
        {error && <div className="error-message">{error}</div>}
        
        <AddDataForm onAdd={handleAddData} />
        
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <DataList data={data} onDelete={handleDeleteData} />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 Jackcol App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
