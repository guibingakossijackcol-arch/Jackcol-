import React, { useState } from 'react';
import './AddDataForm.css';

function AddDataForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onAdd(formData);
      setFormData({ name: '', description: '' });
    }
  };

  return (
    <form className="add-data-form" onSubmit={handleSubmit}>
      <h2>Add New Item</h2>
      
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter item name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter item description"
          rows="3"
        ></textarea>
      </div>

      <button type="submit" className="submit-btn">Add Item</button>
    </form>
  );
}

export default AddDataForm;
