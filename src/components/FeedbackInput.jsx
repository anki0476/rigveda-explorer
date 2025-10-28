import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Input = () => {
  // State management
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [rateLimited, setRateLimited] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Rate limit configuration
  const RATE_LIMIT_KEY = 'rigveda_feedback_limit';
  const MAX_SUBMISSIONS = 2; // Maximum 2 submissions
  const TIME_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

  // Check rate limit on component mount
  useEffect(() => {
    checkRateLimit();
  }, []);

  // Update countdown timer
  useEffect(() => {
    if (rateLimited && timeRemaining > 0) {
      const timer = setInterval(() => {
        const remaining = getRemainingTime();
        setTimeRemaining(remaining);
        
        if (remaining <= 0) {
          setRateLimited(false);
          setTimeRemaining(0);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [rateLimited, timeRemaining]);

  // Check if user has exceeded rate limit
  const checkRateLimit = () => {
    const storedData = localStorage.getItem(RATE_LIMIT_KEY);
    
    if (!storedData) return false;

    const { submissions, firstSubmissionTime } = JSON.parse(storedData);
    const currentTime = Date.now();
    const timePassed = currentTime - firstSubmissionTime;

    // Reset if time window has passed
    if (timePassed > TIME_WINDOW) {
      localStorage.removeItem(RATE_LIMIT_KEY);
      return false;
    }

    // Check if limit exceeded
    if (submissions >= MAX_SUBMISSIONS) {
      setRateLimited(true);
      setTimeRemaining(getRemainingTime());
      return true;
    }

    return false;
  };

  // Get remaining time until rate limit resets
  const getRemainingTime = () => {
    const storedData = localStorage.getItem(RATE_LIMIT_KEY);
    if (!storedData) return 0;

    const { firstSubmissionTime } = JSON.parse(storedData);
    const currentTime = Date.now();
    const timePassed = currentTime - firstSubmissionTime;
    const remaining = TIME_WINDOW - timePassed;

    return Math.max(0, Math.ceil(remaining / 1000)); // Return seconds
  };

  // Format time remaining as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Update submission count
  const updateRateLimit = () => {
    const storedData = localStorage.getItem(RATE_LIMIT_KEY);
    const currentTime = Date.now();

    if (!storedData) {
      // First submission
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({
        submissions: 1,
        firstSubmissionTime: currentTime
      }));
    } else {
      const { submissions, firstSubmissionTime } = JSON.parse(storedData);
      const timePassed = currentTime - firstSubmissionTime;

      // Reset if time window passed
      if (timePassed > TIME_WINDOW) {
        localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({
          submissions: 1,
          firstSubmissionTime: currentTime
        }));
      } else {
        // Increment submission count
        localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({
          submissions: submissions + 1,
          firstSubmissionTime
        }));
      }
    }

    // Check if we've hit the limit
    checkRateLimit();
  };

  // Submit handler with Web3Forms API
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check rate limit before submitting
    if (checkRateLimit()) {
      setError(`Rate limit exceeded. Please wait ${formatTime(timeRemaining)}`);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "db5190de-02a6-42de-95f5-3e8fc8cfde8c",
          name: "Anonymous Rigveda Explorer User",
          message: feedback,
          from_name: "Rigveda Explorer Feedback",
          subject: "🕉️ New Feedback from Rigveda Explorer",
          page: "About Page",
          timestamp: new Date().toISOString()
        })
      });

      const result = await response.json();
      
      if (result.success) {
        console.log("✅ Feedback submitted successfully!");
        
        // Update rate limit counter
        updateRateLimit();
        
        setFeedback("");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError("Submission failed. Please try again.");
        console.error("❌ Submission failed:", result);
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
      console.error("❌ Network error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <OuterWrapper>
      <StyledWrapper>
        <form onSubmit={handleSubmit}>
          {/* Feedback Input */}
          <div className="brutalist-container">
            <input
              className="brutalist-input smooth-type"
              placeholder="Share your thoughts about Rigveda Odyssey..."
              type="text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              disabled={isSubmitting || rateLimited}
              maxLength={500}
            />
            <label className="brutalist-label">
              Give your Feedback here :)
            </label>
          </div>

          {/* Submit Button */}
          <SubmitButton 
            type="submit" 
            disabled={isSubmitting || !feedback.trim() || rateLimited}
          >
            {isSubmitting ? '✨ Sending...' : 
             rateLimited ? `⏱️ Wait ${formatTime(timeRemaining)}` : 
             '📨 Send Feedback'}
          </SubmitButton>

          {/* Rate Limit Warning */}
          {rateLimited && (
            <RateLimitWarning>
              ⏳ You've reached the feedback limit (3 per hour). Please wait {formatTime(timeRemaining)} to submit again.
            </RateLimitWarning>
          )}

          {/* Honeypot for spam protection */}
          <input 
            type="checkbox" 
            name="botcheck" 
            style={{ display: 'none' }} 
            tabIndex="-1"
          />
        </form>
        
        {/* Success Message */}
        {submitted && (
          <SuccessMessage>
            🙏 Thank you for your feedback! Your thoughts help us make Rigveda more accessible.
          </SuccessMessage>
        )}

        {/* Error Message */}
        {error && !rateLimited && (
          <ErrorMessage>
            ⚠️ {error}
          </ErrorMessage>
        )}
      </StyledWrapper>
    </OuterWrapper>
  );
};

// Styled Components
const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
  margin-top: 80px;
`;

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 600px;

  .brutalist-container {
    position: relative;
    font-family: monospace;
  }

  .brutalist-input {
    width: 100%;
    padding: 15px;
    font-size: 18px;
    font-weight: bold;
    color: var(--color-ink);
    background-color: var(--color-parchment-light);
    border: 4px solid var(--color-ink);
    outline: none;
    transition: all 0.3s;
    font-family: 'Arial', sans-serif;
  }

  .brutalist-input:focus {
    background-color: var(--color-saffron-light);
    box-shadow: 5px 5px 0px var(--color-gold);
    transform: translate(-2px, -2px);
  }

  .brutalist-input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .brutalist-input::placeholder {
    color: var(--color-ink);
    opacity: 0.5;
  }

  .brutalist-label {
    position: absolute;
    left: -2px;
    top: -35px;
    font-size: 18px;
    font-weight: bold;
    color: var(--color-ink);
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 5px 10px;
    background-color: var(--color-gold);
    border: 3px solid var(--color-ink);
  }

  .smooth-type {
    animation: type 0.5s ease-in-out;
  }

  @keyframes type {
    0% { width: 0; }
    100% { width: 100%; }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 16px 24px;
  font-size: 18px;
  font-weight: bold;
  color: var(--color-parchment-light);
  background-color: var(--color-gold);
  border: 4px solid var(--color-ink);
  border-radius: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover:not(:disabled) {
    background-color: var(--color-saffron);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const SuccessMessage = styled.div`
  margin-top: 20px;
  padding: 16px;
  background-color: var(--color-saffron);
  color: var(--color-ink);
  border: 3px solid var(--color-gold);
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  animation: slideIn 0.5s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ErrorMessage = styled.div`
  margin-top: 20px;
  padding: 16px;
  background-color: #ffebee;
  color: #c62828;
  border: 3px solid #ef5350;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
`;

const RateLimitWarning = styled.div`
  margin-top: 20px;
  padding: 16px;
  background-color: #fff3e0;
  color: #e65100;
  border: 3px solid #ff9800;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }
`;

export default Input;
