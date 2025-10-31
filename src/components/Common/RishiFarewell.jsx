// src/components/Common/RishiFarewell.jsx
import React, { useState } from 'react';
import './RishiFarewell.css';

export const RishiFarewell = ({ isOpen, onStay, onLeave }) => {
  const [isLeavingAnimated, setIsLeavingAnimated] = useState(false);

  if (!isOpen) return null;

  const handleLeave = () => {
    setIsLeavingAnimated(true);
    setTimeout(() => {
      onLeave();
    }, 500);
  };

  const handleStay = () => {
    onStay();
  };

  return (
    <div className="rishi-farewell-overlay">
      <div className={`rishi-farewell-modal ${isLeavingAnimated ? 'fade-out' : ''}`}>
        {/* Rishi Image */}
        <div className="rishi-image-container">
          <div className="rishi-image">
            🧘
          </div>
          <div className="rishi-glow"></div>
        </div>

        {/* Message */}
        <h2 className="rishi-message">
          Do you really want to put a halt at your Journey?
        </h2>

        <p className="rishi-subtext">
          The path of the Rigveda awaits your return, dear seeker...
        </p>

        {/* Buttons */}
        <div className="rishi-actions">
          <button 
            className="rishi-btn rishi-btn-stay"
            onClick={handleStay}
          >
            ✨ Continue Journey
          </button>
          <button 
            className="rishi-btn rishi-btn-leave"
            onClick={handleLeave}
          >
            🚪 Leave
          </button>
        </div>

        {/* Rishi Quote */}
        <div className="rishi-quote">
          <p className="rishi-quote-text">
            "The seeker who leaves mid-path often finds themselves returning with greater determination."
          </p>
          <p className="rishi-quote-attr">
            — Rishi, The Eternal Guide
          </p>
        </div>
      </div>
    </div>
  );
};

export default RishiFarewell;
