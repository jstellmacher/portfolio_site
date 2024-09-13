import { FaLinkedin, FaGithub, FaGoogleDrive, FaDev } from 'react-icons/fa';
import { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeD4e9DOan1GRI7ROncyKbtuuD2AAnfBUC2iv9C2FW_NLaVaA/formResponse';

    const googleFormData = new FormData();
    googleFormData.append('entry.1045755040', formData.name);
    googleFormData.append('entry.254777327', formData.email);
    googleFormData.append('entry.707048920', formData.message);

    try {
      await fetch(googleFormUrl, {
        method: 'POST',
        body: googleFormData,
        mode: 'no-cors'
      });

      setFormData({ name: '', email: '', message: '' });
      alert('Thank you for your message!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <section id="contact" className="pt-24 pb-16 bg-gradient-to-r from-green-500/50 to-blue-500/50 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-6 text-center">Connect With Me!</h2>
        <p className="text-lg font-light mb-8 text-center max-w-2xl mx-auto">
          Fill out the form below to get in touch.
        </p>
        
        <div className="mt-12 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white/90 p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                required
                placeholder="Please include a brief reason for your outreach."
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-3xl font-semibold mb-4">Follow Me</h3>
          <div className="flex justify-center space-x-6">
            <a href="https://www.linkedin.com/in/jaichuang-stellmacher/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300">
              <FaLinkedin size={30} />
            </a>
            <a href="https://github.com/jstellmacher" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <FaGithub size={30} />
            </a>
            <a href="https://linktr.ee/jaijai.stell" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-300">
              <FaGoogleDrive size={30} />
            </a>
            <a href="https://dev.to/jstellmacher" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300">
              <FaDev size={30} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;