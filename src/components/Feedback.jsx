import React, { useState } from 'react';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(2);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!name || !email || !comments) {
      alert('Please fill out all fields');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('https://formspree.io/f/mldedaoq', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, rating, comments }),
      });

      setLoading(false);
      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error('Form submission failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="feedback-section p-10 bg-gray-100">
      {submitted ? (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-600">Thank You for Your Feedback, {name}!</h3>
          <p className="text-gray-700 mt-4">
            We truly appreciate you taking the time to provide us with your thoughts and suggestions. Your feedback helps us improve and serve you better.
          </p>
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-center gap-8 max-w-6xl mx-auto">
          {/* Mockup Image Section */}
          <div className="lg:w-1/2">
            <img
              src="/3d-rendering-cartoon-like-person-showing-thumbs-up.jpg" // Replace with your mockup image URL
              alt="Feedback Mockup"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="lg:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold mb-4 text-center">We Value Your Feedback!</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <div className="rating-section">
              <label className="block mb-2">Rate Us:</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer text-2xl ${
                      star <= rating ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <textarea
              placeholder="Your Comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="border p-2 w-full h-32 rounded"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Feedback;
