import React from 'react';

function TipCard({ tip }) {
  return (
    <div style={{border: '1px solid #ccc', borderRadius: 8, padding: 16, margin: 8}}>
      <p>{tip}</p>
    </div>
  );
}

export default TipCard;
