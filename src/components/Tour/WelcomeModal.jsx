import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import './WelcomeModal.css';

const WelcomeModal = ({ onBegin, onSkip }) => {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="welcome-modal-overlay">
      <div className="welcome-modal">
        
        <div className="rishi-avatar">
          <div className="rishi-icon">🧙‍♂️</div>
          <div className="mystical-glow"></div>
        </div>

        <div className="welcome-message">
          <TypeAnimation
            sequence={[
              'Welcome to RigVeda Odyssey, Knowledge Seeker.',
              800,
              'Welcome to RigVeda Odyssey, Knowledge Seeker.\n\nI am Rishi Vedvyasa, here to give you a quick tour of Project-RV.',
            ]}
            wrapper="div"
            cursor={true}
            speed={60}
            style={{
              fontSize: '1.5rem',
              lineHeight: '1.8',
              color: '#fff',
              textAlign: 'center',
              whiteSpace: 'pre-line',
              fontFamily: '"Georgia", serif',
            }}
          />
        </div>

        <div className={`welcome-actions ${showButtons ? 'visible' : ''}`}>
          <button 
            onClick={onBegin}
            className="begin-tour-btn"
          >
            <span className="btn-icon">🚀</span>
            Begin the Journey
          </button>
          
          <button 
            onClick={onSkip}
            className="skip-tour-btn"
          >
            <span className="btn-icon">⏭️</span>
            Skip for Now
          </button>
        </div>

        <div className="vedic-border top"></div>
        <div className="vedic-border bottom"></div>
      </div>
    </div>
  );
};

export default WelcomeModal;
