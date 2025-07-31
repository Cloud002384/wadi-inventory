import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: '',
    category: '',
    quantity: '',
    entrance: '',
    leave: '',
    photo: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, photo: reader.result }));
      };
      if (files[0]) reader.readAsDataURL(files[0]);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAdd = () => {
    if (form.name && form.category && form.quantity && form.entrance) {
      setItems([...items, { ...form, id: uuidv4() }]);
      setForm({
        name: '',
        category: '',
        quantity: '',
        entrance: '',
        leave: '',
        photo: ''
      });
    }
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>INVENTORY</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
        <input type='file' name='photo' onChange={handleChange} />
        <input placeholder='Item Name' name='name' value={form.name} onChange={handleChange} />
        <input placeholder='Category' name='category' value={form.category} onChange={handleChange} />
        <input placeholder='Quantity' name='quantity' value={form.quantity} onChange={handleChange} />
        <input type='date' placeholder='Date of Entrance' name='entrance' value={form.entrance} onChange={handleChange} />
        <input type='date' placeholder='Date of Leave' name='leave' value={form.leave} onChange={handleChange} />
        <button style={{ backgroundColor: '#FFA500', border: 'none', padding: '10px 20px', color: 'white', cursor: 'pointer' }} onClick={handleAdd}>
          Add Item
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', color: 'black' }}>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Date of Entrance</th>
            <th>Date of Leave</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td><img src={item.photo} alt='' style={{ width: 50, height: 50 }} /></td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>{item.entrance}</td>
              <td>{item.leave}</td>
              <td><button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDelete(item.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;