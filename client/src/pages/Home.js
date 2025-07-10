import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You would send text to backend here
    navigate('/result', { state: { text } });
  };

  return (
    <div style={{padding: 24}}>
      <h2>How are you feeling today?</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={5}
          style={{width: '100%', maxWidth: 500}}
          placeholder="Describe your feelings..."
        />
        <br />
        <button type="submit" style={{marginTop: 12}}>Analyze</button>
      </form>
    </div>
  );
}

export default Home;
