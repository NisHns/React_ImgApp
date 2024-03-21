import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [genimages, setGenimages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        "https://huggingface.co/prompthero/openjourney-v4",
      );

      const genimages = response.data.choices.map(choice => choice.text.trim());
      setGenimages(genimages);
    } catch (error) {
      console.error('Error generating images:', error.response || error.message);
      setError('Failed to generate images. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Image Generation App</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter the text to generate images"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? 'Generating.....' : 'Generate Images'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="image-container">
        {genimages.map((image, index) => (
          <img key={index} src={image} alt={`Generated one ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default App;
