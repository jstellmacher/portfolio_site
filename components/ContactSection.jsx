import { useState } from 'react';
import './ContactSection.css'; // Import your custom CSS with unique names

const UniqueContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form className="unique-form mb-8" onSubmit={handleSubmit}>
      <ul className="unique-wrapper">
        <li style={{ '--i': 4 }}>
          <input
            className="unique-input"
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </li>
        <li style={{ '--i': 3 }}>
          <input
            className="unique-input"
            type="text"
            placeholder="Phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </li>
        <li style={{ '--i': 2 }}>
          <input
            className="unique-input"
            type="email"
            placeholder="E-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </li>
        <button className="unique-button" style={{ '--i': 1 }}>
          Submit
        </button>
      </ul>
    </form>
  );
};

export default UniqueContactForm;
