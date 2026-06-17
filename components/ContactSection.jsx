import { useState } from 'react';
import './ContactSection.css';

const UniqueContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const googleFormUrl =
      'https://docs.google.com/forms/d/e/1FAIpQLSeD4e9DOan1GRI7ROncyKbtuuD2AAnfBUC2iv9C2FW_NLaVaA/formResponse';

    const googleFormData = new FormData();
    googleFormData.append('entry.1045755040', formData.name);
    googleFormData.append('entry.254777327', formData.phone);
    googleFormData.append('entry.707048920', formData.email);

    try {
      await fetch(googleFormUrl, {
        method: 'POST',
        body: googleFormData,
        mode: 'no-cors'
      });

      setFormData({ name: '', phone: '', email: '' });
      alert('Thank you for your submission!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <div
      id="contact"
      className="
        max-w-3xl mx-auto px-8 py-12 mt-20
        rounded-2xl shadow-2xl
        backdrop-blur-xl border
        bg-gradient-to-br from-white/70 to-gray-200/40
        dark:from-black/70 dark:to-black/40
        border-white/40 dark:border-white/10
      "
    >
      <div className="text-left text-gray-900 dark:text-gray-100 mb-6">
        <h2 className="text-3xl font-bold">Contact Me</h2>
      </div>

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
    </div>
  );
};

export default UniqueContactForm;
