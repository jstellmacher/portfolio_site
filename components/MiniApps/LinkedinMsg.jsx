import React, { useState } from 'react';
import { FaLinkedin, FaCopy, FaCheck } from 'react-icons/fa';

const LinkedinMsg = () => {
  const [formData, setFormData] = useState({
    recipientName: '',
    yourName: '',
    skill1: '',
    skill2: '',
    skill3: '',
    specificArea: '',
  });

  const [copySuccess, setCopySuccess] = useState(false);

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'recipientName' || name === 'yourName') {
      newValue = capitalizeWords(value);
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const generateMessage = () => {
    return `Hi ${formData.recipientName},

I hope you're doing well. My name is ${formData.yourName}, and I'm currently honing my skills in ${formData.skill1}, ${formData.skill2}, and ${formData.skill3}. I'm really impressed by your experience in ${formData.specificArea}, and I'd love to learn more about your journey.

Would you be open to a quick coffee chat or a 15-minute call? I'd appreciate any advice or insights you can share.

Thanks for your time!

Best,
${formData.yourName}`;
  };

  const copyToClipboard = () => {
    const message = generateMessage();
    
    if (navigator.clipboard && window.isSecureContext) {
      // For modern browsers
      navigator.clipboard.writeText(message)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch(() => {
          alert('Failed to copy message. Please try manually selecting and copying the text.');
        });
    } else {
      // Fallback for older browsers or non-secure contexts
      let textArea = document.createElement("textarea");
      textArea.value = message;
      textArea.style.position = "fixed";  // Avoid scrolling to bottom
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        alert('Failed to copy message. Please try manually selecting and copying the text.');
      }

      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        <FaLinkedin className="inline-block mr-2 text-blue-600" />
        LinkedIn Message Maker
      </h1>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2">
          <form>
            {Object.keys(formData).map((key) => (
              <div key={key} className="mb-4">
                <label className="block mb-2 text-gray-700 font-semibold">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                </label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-gray-800"
                  placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                />
              </div>
            ))}
          </form>
          <button
            onClick={copyToClipboard}
            className={`w-full ${copySuccess ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white p-2 rounded flex items-center justify-center transition-colors duration-300`}
          >
            {copySuccess ? <FaCheck className="mr-2" /> : <FaCopy className="mr-2" />}
            {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
        <div className="w-full md:w-1/2 px-2 mt-4 md:mt-0">
          <div className="p-4 bg-gray-100 rounded h-full">
            <h2 className="font-bold mb-2 text-gray-800">Live Preview:</h2>
            <pre className="whitespace-pre-wrap text-gray-700 text-sm overflow-auto" style={{maxHeight: "calc(100% - 2rem)"}}>
              {generateMessage()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedinMsg;
