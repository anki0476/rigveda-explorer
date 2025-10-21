import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import WelcomeModal from './WelcomeModal';
import GuidedTour from './GuidedTour';

const TourOrchestrator = () => {
  console.log('🎯 TourOrchestrator MOUNTED');
  
  const [tourState, setTourState] = useState('waiting');
  const location = useLocation();

  useEffect(() => {
    console.log('🎯 TourOrchestrator useEffect running');
    
    // Only show tour on home page
    if (location.pathname !== '/') {
      console.log('🎯 Not on home page, skipping tour');
      return;
    }

    const hasSeenTour = localStorage.getItem('hasSeenTour');
    console.log('🎯 hasSeenTour:', hasSeenTour);

    if (hasSeenTour === 'true') {
      console.log('🎯 Tour already seen');
      setTourState('complete');
      return;
    }

    // Wait 3 seconds, then show welcome modal
    console.log('🎯 Starting 3-second timer...');
    const timer = setTimeout(() => {
      console.log('🎯 Timer done! Showing welcome modal');
      setTourState('welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, [location]);

  const handleBeginTour = () => {
    console.log('🎯 User clicked Begin Tour');
    setTourState('touring');
  };

  const handleSkipTour = () => {
    console.log('🎯 User clicked Skip Tour');
    localStorage.setItem('hasSeenTour', 'true');
    setTourState('complete');
  };

  const handleTourComplete = () => {
    console.log('🎯 Tour completed!');
    localStorage.setItem('hasSeenTour', 'true');
    setTourState('complete');
  };

  // Debug utility
  useEffect(() => {
    window.restartTour = () => {
      localStorage.removeItem('hasSeenTour');
      window.location.reload();
    };
    return () => delete window.restartTour;
  }, []);

  console.log('🎯 Current tourState:', tourState);

  if (tourState === 'welcome') {
    return <WelcomeModal onBegin={handleBeginTour} onSkip={handleSkipTour} />;
  }

  if (tourState === 'touring') {
    return <GuidedTour onComplete={handleTourComplete} />;
  }

  return null;
};

export default TourOrchestrator;
