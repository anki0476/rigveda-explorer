import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import './GuidedTour.css';

const GuidedTour = ({ onComplete }) => {
  
  useEffect(() => {
    startTour();
  }, []);

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      showButtons: ['next', 'previous'],
      progressText: 'Step {{current}} of {{total}}',
      popoverClass: 'rigveda-guided-tour',
      
      steps: [
        {
          popover: {
            title: '🧭 Welcome to Explore',
            description: 'Let us begin your journey through the RigVeda Odyssey. I shall guide you through all the features.',
          }
        },

        {
          element: '#deity-network-card',
          popover: {
            title: '🕸️ Deity Network',
            description: 'Explore the intricate web of relationships between 26 Vedic deities through an interactive visualization.',
            side: 'right',
          }
        },

        {
          element: '#topics-card',
          popover: {
            title: '📚 Life Topics',
            description: 'Discover ancient wisdom on modern topics: mind, health, ethics, nature, and relationships.',
            side: 'left',
          }
        },

        {
          element: '#hymns-card',
          popover: {
            title: '🎵 Sacred Hymns',
            description: 'Experience authentic hymn recitations with full translations and modern relevance.',
            side: 'right',
          }
        },

        {
          element: '#surprise-card',
          popover: {
            title: '✨ Surprise Me!',
            description: 'Uncover fascinating facts about linguistics, mythology, and cross-cultural connections in the RigVeda.',
            side: 'left',
          }
        },

        {
          element: '#timeline-section',
          popover: {
            title: '⏳ RigVeda Through Time',
            description: 'Walk through 3,500+ years of Vedic history, from composition to modern preservation.',
            side: 'bottom',
          }
        },

        {
          element: '#ask-rishi-card',
          popover: {
            title: '🧙‍♂️ Ask the Rishi',
            description: 'I am always here to answer your questions. Ask me anything about the RigVeda, and I shall illuminate your path.',
            side: 'left',
          }
        },

        {
          element: '#podcasts-card',
          popover: {
            title: '📖 The Ten Mandalas',
            description: 'Journey through all 10 sacred books with beautifully narrated podcast explainers in English and Hindi.',
            side: 'top',
          }
        },

        {
          element: '#about-card',
          popover: {
            title: '📜 About Project-RV',
            description: 'Learn about the vision behind RigVeda Odyssey — making ancient wisdom accessible for modern seekers.',
            side: 'right',
          }
        },

        {
          element: '#global-search',
          popover: {
            title: '🔍 Global Search',
            description: 'Search across all hymns, deities, and topics instantly. Your gateway to targeted exploration.',
            side: 'bottom',
          }
        },

        {
          popover: {
            title: '🎉 Your Journey Begins Now!',
            description: 'You are now ready to explore the RigVeda Odyssey. May your quest for knowledge be fruitful, Knowledge Seeker!',
          }
        }
      ],

      onDestroyStarted: () => {
        if (onComplete) onComplete();
        driverObj.destroy();
      },

      onHighlightStarted: (element) => {
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
          });
        }
      },

      nextBtnText: 'Next →',
      prevBtnText: '← Previous',
      doneBtnText: 'Begin Exploring! 🚀'
    });

    driverObj.drive();
  };

  return null;
};

export default GuidedTour;
