import React, { useState } from 'react';

function FeedbackForm() {
    const [feedback, setFeedback] = useState('');
    const [location, setLocation] = useState('home');
    const [feedbackType, setFeedbackType] = useState('bug');
    const [rating, setRating] = useState(5);
    const [email, setEmail] = useState('');

    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd8zXlxV4UTfsgcRLRux5CUZvjhi2NcsQMbisOLx7v-l9miVg/formResponse';

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Collecting form data
        const formData = new URLSearchParams({
            'entry.1391667706': feedback,  // Update these entry IDs based on your form fields
            'entry.114714684': location,
            'entry.1346895101': feedbackType,
            'entry.1585382826': rating,
            'entry.1744930520': email
        });
    
        fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            body: formData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(response => {
            if (response.ok) {
                alert('Feedback submitted successfully!');
            } else {
                alert('There was an issue submitting your feedback.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an issue submitting your feedback.');
        });
    
        // Clear form
        setFeedback('');
        setLocation('home');
        setFeedbackType('bug');
        setRating(5);
        setEmail('');
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white text-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
            <form onSubmit={handleSubmit}>
                {/* Where in the site */}
                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-700">Where in the Site:</label>
                <select 
                    id="location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                >
                    <option value="home">Home</option>
                    <option value="about">About</option>
                    <option value="projects">Projects</option>
                    <option value="work">Work</option>
                    <option value="contact">Contact</option>
                    <option value="miniApps">Mini Apps</option>
                    <option value="other">Other</option>
                </select>

                {/* Feedback Type */}
                <label htmlFor="feedbackType" className="block mb-2 text-sm font-medium text-gray-700">Feedback Type:</label>
                <select 
                    id="feedbackType" 
                    value={feedbackType} 
                    onChange={(e) => setFeedbackType(e.target.value)} 
                    className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                >
                    <option value="bug">Bug</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="compliment">Compliment</option>
                    <option value="other">Other</option>
                </select>

                {/* Rating */}
                <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-700">Rating (1 to 5):</label>
                <select 
                    id="rating" 
                    value={rating} 
                    onChange={(e) => setRating(e.target.value)} 
                    className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>

                {/* Description */}
                <label htmlFor="feedback" className="block mb-2 text-sm font-medium text-gray-700">Description (500 characters max):</label>
                <textarea 
                    id="feedback" 
                    value={feedback} 
                    onChange={(e) => setFeedback(e.target.value)} 
                    maxLength="500" 
                    placeholder="Your feedback here..." 
                    required 
                    className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Email */}
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email (optional):</label>
                <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email" 
                    className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                />

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
}

export default FeedbackForm;