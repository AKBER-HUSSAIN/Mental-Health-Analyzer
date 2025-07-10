import React from 'react';
import { useLocation } from 'react-router-dom';
import TipCard from '../components/TipCard';

function Result() {
  const location = useLocation();
  const text = location.state?.text || '';
  // Placeholder for emotion and tips
  const emotion = 'happy';
  const tips = [
    'Keep a gratitude journal.',
    'Spend time with loved ones.',
    'Take a walk outdoors.'
  ];

  return (
    <div style={{padding: 24}}>
      <h2>Analysis Result</h2>
      <p><strong>Your text:</strong> {text}</p>
      <p><strong>Detected Emotion:</strong> {emotion}</p>
      <h3>Wellness Tips</h3>
      {tips.map((tip, idx) => <TipCard key={idx} tip={tip} />)}
    </div>
  );
}

export default Result;
