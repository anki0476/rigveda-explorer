import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Share2, Download, RefreshCw, Home } from 'lucide-react';

const VedicIdentityQuiz = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('intro');
  const [answers, setAnswers] = useState({});
  const [identity, setIdentity] = useState(null);

  // Quiz questions (same as before)
  const questions = [
    {
      id: 'element',
      question: 'Which element resonates with you most?',
      emoji: '🌟',
      options: [
        { value: 'fire', label: 'Fire - Transformation & Energy', icon: '🔥' },
        { value: 'water', label: 'Water - Flow & Healing', icon: '💧' },
        { value: 'air', label: 'Air - Wisdom & Freedom', icon: '🌬️' },
        { value: 'earth', label: 'Earth - Stability & Growth', icon: '🌍' }
      ]
    },
    {
      id: 'time',
      question: 'When do you feel most alive?',
      emoji: '⏰',
      options: [
        { value: 'dawn', label: 'Dawn - New beginnings', icon: '🌅' },
        { value: 'noon', label: 'Noon - Peak energy', icon: '☀️' },
        { value: 'dusk', label: 'Dusk - Reflection time', icon: '🌆' },
        { value: 'night', label: 'Night - Deep wisdom', icon: '🌙' }
      ]
    },
    {
      id: 'purpose',
      question: 'What drives you in life?',
      emoji: '🎯',
      options: [
        { value: 'knowledge', label: 'Seeking Knowledge', icon: '📚' },
        { value: 'justice', label: 'Fighting for Justice', icon: '⚖️' },
        { value: 'creation', label: 'Creating Beauty', icon: '🎨' },
        { value: 'protection', label: 'Protecting Others', icon: '🛡️' }
      ]
    },
    {
      id: 'challenge',
      question: 'How do you face challenges?',
      emoji: '⚡',
      options: [
        { value: 'courage', label: 'With courage & action', icon: '⚔️' },
        { value: 'wisdom', label: 'With wisdom & strategy', icon: '🧠' },
        { value: 'patience', label: 'With patience & endurance', icon: '🧘' },
        { value: 'creativity', label: 'With creativity & innovation', icon: '💡' }
      ]
    },
    {
      id: 'nature',
      question: 'Which aspect of nature speaks to you?',
      emoji: '🌿',
      options: [
        { value: 'sky', label: 'The Infinite Sky', icon: '🌌' },
        { value: 'mountains', label: 'Mighty Mountains', icon: '⛰️' },
        { value: 'rivers', label: 'Flowing Rivers', icon: '🌊' },
        { value: 'forests', label: 'Sacred Forests', icon: '🌳' }
      ]
    }
  ];

  // Deity matching algorithm (same as before)
  const calculateIdentity = (answers) => {
    const deityProfiles = {
      agni: {
        name: 'Agni',
        title: 'Fire Keeper',
        sanskritName: 'Agni-putra/putri',
        element: 'fire',
        attributes: { power: 95, wisdom: 75, creativity: 85, protection: 70 },
        description: 'You are the transformative flame, bringing light to darkness and warmth to cold hearts.',
        mantra: 'Om Agnaye Namaha',
        color: '#FF6B35',
        emoji: '🔥'
      },
      indra: {
        name: 'Indra',
        title: 'Storm Warrior',
        sanskritName: 'Indra-vira/vira',
        element: 'air',
        attributes: { power: 98, wisdom: 65, creativity: 60, protection: 90 },
        description: 'You are the thunderbolt bearer, facing challenges with unstoppable courage.',
        mantra: 'Om Indraya Namaha',
        color: '#4A90E2',
        emoji: '⚡'
      },
      saraswati: {
        name: 'Saraswati',
        title: 'Wisdom Seeker',
        sanskritName: 'Saraswati-jana',
        element: 'water',
        attributes: { power: 60, wisdom: 98, creativity: 95, protection: 65 },
        description: 'You flow like sacred knowledge, illuminating minds with wisdom and art.',
        mantra: 'Om Saraswatyai Namaha',
        color: '#7B68EE',
        emoji: '📚'
      },
      surya: {
        name: 'Surya',
        title: 'Solar Guardian',
        sanskritName: 'Surya-kiran',
        element: 'fire',
        attributes: { power: 88, wisdom: 85, creativity: 70, protection: 80 },
        description: 'You shine with the radiance of a thousand suns, bringing clarity and vitality.',
        mantra: 'Om Suryaya Namaha',
        color: '#FFD700',
        emoji: '☀️'
      },
      vayu: {
        name: 'Vayu',
        title: 'Wind Wanderer',
        sanskritName: 'Vayu-suta/suta',
        element: 'air',
        attributes: { power: 75, wisdom: 90, creativity: 85, protection: 70 },
        description: 'You move freely like the wind, carrying wisdom across all boundaries.',
        mantra: 'Om Vayave Namaha',
        color: '#87CEEB',
        emoji: '🌬️'
      },
      prithvi: {
        name: 'Prithvi',
        title: 'Earth Nurturer',
        sanskritName: 'Prithvi-mitra',
        element: 'earth',
        attributes: { power: 70, wisdom: 80, creativity: 75, protection: 95 },
        description: 'You are grounded and nurturing, providing stability and growth to all.',
        mantra: 'Om Prithvyai Namaha',
        color: '#8B4513',
        emoji: '🌍'
      },
      soma: {
        name: 'Soma',
        title: 'Moon Mystic',
        sanskritName: 'Soma-chandra',
        element: 'water',
        attributes: { power: 65, wisdom: 92, creativity: 88, protection: 75 },
        description: 'You possess the mystical essence of moonlight, healing and inspiring.',
        mantra: 'Om Somaya Namaha',
        color: '#C0C0C0',
        emoji: '🌙'
      },
      ushas: {
        name: 'Ushas',
        title: 'Dawn Bringer',
        sanskritName: 'Ushas-priya',
        element: 'air',
        attributes: { power: 70, wisdom: 85, creativity: 92, protection: 68 },
        description: 'You herald new beginnings, painting the world with hope and beauty.',
        mantra: 'Om Ushase Namaha',
        color: '#FF69B4',
        emoji: '🌅'
      }
    };

    let scores = {};
    Object.keys(deityProfiles).forEach(deity => scores[deity] = 0);

    if (answers.element === 'fire') {
      scores.agni += 3;
      scores.surya += 2;
    } else if (answers.element === 'water') {
      scores.saraswati += 3;
      scores.soma += 2;
    } else if (answers.element === 'air') {
      scores.vayu += 3;
      scores.indra += 2;
      scores.ushas += 1;
    } else if (answers.element === 'earth') {
      scores.prithvi += 3;
    }

    if (answers.time === 'dawn') scores.ushas += 3;
    if (answers.time === 'noon') scores.surya += 3;
    if (answers.time === 'dusk') scores.soma += 2;
    if (answers.time === 'night') scores.soma += 3;

    if (answers.purpose === 'knowledge') scores.saraswati += 3;
    if (answers.purpose === 'justice') scores.indra += 3;
    if (answers.purpose === 'creation') {
      scores.saraswati += 2;
      scores.ushas += 2;
    }
    if (answers.purpose === 'protection') {
      scores.prithvi += 3;
      scores.indra += 2;
    }

    if (answers.challenge === 'courage') scores.indra += 3;
    if (answers.challenge === 'wisdom') scores.saraswati += 3;
    if (answers.challenge === 'patience') scores.prithvi += 3;
    if (answers.challenge === 'creativity') {
      scores.ushas += 2;
      scores.saraswati += 2;
    }

    if (answers.nature === 'sky') {
      scores.vayu += 2;
      scores.indra += 2;
    }
    if (answers.nature === 'mountains') scores.prithvi += 2;
    if (answers.nature === 'rivers') {
      scores.saraswati += 2;
      scores.soma += 2;
    }
    if (answers.nature === 'forests') scores.prithvi += 2;

    let maxScore = 0;
    let selectedDeity = 'agni';
    Object.keys(scores).forEach(deity => {
      if (scores[deity] > maxScore) {
        maxScore = scores[deity];
        selectedDeity = deity;
      }
    });

    return deityProfiles[selectedDeity];
  };

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    const currentIndex = questions.findIndex(q => q.id === questionId);
    
    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        const nextQuestion = questions[currentIndex + 1];
        setStep(`quiz-${nextQuestion.id}`);
      }, 300);
    } else {
      setTimeout(() => {
        const result = calculateIdentity(newAnswers);
        setIdentity(result);
        setStep('result');
      }, 300);
    }
  };

  const handleShare = () => {
    const text = `I discovered my Vedic Identity! 🕉️\n\nI am ${identity.title} aligned with ${identity.name}!\n${identity.description}\n\nDiscover yours at: [Your URL Here]`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Vedic Identity',
        text: text,
      }).catch(() => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard! Share on your socials 🎉');
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard! Share on your socials 🎉');
    }
  };

  const handleDownload = () => {
    alert('Download feature - integrate with html2canvas or similar library');
  };

  const handleRetake = () => {
    setAnswers({});
    setIdentity(null);
    setStep('intro');
  };

  // NEW: Back to Home Button Component
  const BackButton = () => (
    <button
      onClick={() => navigate('/')}
      className="fixed top-20 left-4 z-50 flex items-center gap-2 px-4 py-2 
                 bg-[var(--color-parchment)] border-2 border-[var(--color-gold)]/30 
                 rounded-lg text-[var(--color-ink)] font-semibold
                 hover:bg-[var(--color-gold)]/10 hover:border-[var(--color-gold)]
                 hover:scale-105 transition-all duration-300 shadow-lg"
    >
      <Home size={20} />
      <span>Home</span>
    </button>
  );

  // Intro Screen
  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-[#EDE5D8] to-[#E8D5C4] flex items-center justify-center p-4">
        <BackButton />
        <div className="max-w-2xl w-full">
          <div className="double-golden-border bg-[var(--color-parchment-light)] p-12 rounded-2xl text-center">
            <div className="text-7xl mb-6 animate-pulse">🕉️</div>
            <h1 className="text-5xl font-[family:--font-family-header] text-[var(--color-ink)] mb-4">
              Discover Your Vedic Identity
            </h1>
            <p className="text-xl text-[var(--color-ink-light)] mb-8 leading-relaxed">
              Answer 5 sacred questions to reveal which Vedic deity aligns with your soul. 
              Receive your personalized Sanskrit name, power attributes, and sacred mantra.
            </p>
            
            <div className="flex items-center justify-center gap-8 mb-8 text-[var(--color-ink-light)]">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-[var(--color-gold)]" />
                <span>5 Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⏱️</span>
                <span>2 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Share2 size={20} className="text-[var(--color-gold)]" />
                <span>Shareable</span>
              </div>
            </div>

            <button
              onClick={() => setStep(`quiz-${questions[0].id}`)}
              className="px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundColor: 'var(--color-gold)',
                color: 'var(--color-ink)',
              }}
            >
              Begin Your Journey
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  if (step.startsWith('quiz-')) {
    const currentQuestionId = step.replace('quiz-', '');
    const currentQuestion = questions.find(q => q.id === currentQuestionId);
    const currentIndex = questions.findIndex(q => q.id === currentQuestionId);
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-[#EDE5D8] to-[#E8D5C4] flex items-center justify-center p-4">
        <BackButton />
        <div className="max-w-3xl w-full">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-[var(--color-ink-light)] mb-2">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-[var(--color-parchment)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--color-gold)] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="double-golden-border bg-[var(--color-parchment-light)] p-8 rounded-2xl">
            <div className="text-6xl text-center mb-6">{currentQuestion.emoji}</div>
            <h2 className="text-3xl font-[family:--font-family-header] text-[var(--color-ink)] text-center mb-8">
              {currentQuestion.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className="flex items-center gap-4 p-6 rounded-xl border-2 border-[var(--color-gold)]/30 
                           bg-[var(--color-parchment)] hover:bg-[var(--color-gold)]/10 
                           hover:border-[var(--color-gold)] hover:scale-105 
                           transition-all duration-300 text-left group"
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {option.icon}
                  </span>
                  <span className="text-lg text-[var(--color-ink)] font-medium">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Result Screen
  if (step === 'result' && identity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-[#EDE5D8] to-[#E8D5C4] flex items-center justify-center p-4">
        <BackButton />
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-[family:--font-family-header] text-[var(--color-ink)] mb-2">
              Your Vedic Identity Revealed
            </h1>
            <p className="text-[var(--color-ink-light)]">Share your unique spiritual profile with the world</p>
          </div>

          <div 
            className="double-golden-border p-8 rounded-2xl relative overflow-hidden"
            style={{
              backgroundColor: 'var(--color-parchment-light)',
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(218, 165, 32, 0.1) 0%, transparent 50%)',
            }}
          >
            <div className="text-center mb-6">
              <div className="text-8xl mb-4 animate-bounce">{identity.emoji}</div>
              <h2 className="text-4xl font-[family:--font-family-header] text-[var(--color-ink)] mb-2">
                {identity.name}
              </h2>
              <div 
                className="inline-block px-6 py-2 rounded-full text-white font-semibold text-lg"
                style={{ backgroundColor: identity.color }}
              >
                {identity.title}
              </div>
            </div>

            <div className="text-center mb-6 p-4 bg-[var(--color-gold)]/10 rounded-lg">
              <p className="text-sm text-[var(--color-ink-light)] mb-1">Your Sanskrit Name</p>
              <p className="text-2xl font-[family:--font-family-sanskrit] text-[var(--color-gold)]">
                {identity.sanskritName}
              </p>
            </div>

            <p className="text-center text-lg text-[var(--color-ink-light)] mb-6 leading-relaxed">
              {identity.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.entries(identity.attributes).map(([attr, value]) => (
                <div key={attr} className="bg-[var(--color-parchment)] p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[var(--color-ink)] font-semibold capitalize">{attr}</span>
                    <span className="text-[var(--color-gold)] font-bold">{value}</span>
                  </div>
                  <div className="h-2 bg-[var(--color-gold)]/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[var(--color-gold)] transition-all duration-1000"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center p-4 bg-[var(--color-gold)]/5 rounded-lg border-2 border-[var(--color-gold)]/30 mb-6">
              <p className="text-sm text-[var(--color-ink-light)] mb-2">Your Sacred Mantra</p>
              <p className="text-xl font-[family:--font-family-sanskrit] text-[var(--color-ink)]">
                {identity.mantra}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold 
                         transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: 'var(--color-gold)',
                  color: 'var(--color-ink)',
                }}
              >
                <Share2 size={20} />
                Share Result
              </button>
              
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold 
                         border-2 border-[var(--color-gold)] text-[var(--color-ink)]
                         hover:bg-[var(--color-gold)]/10 transition-all duration-300"
              >
                <Download size={20} />
                Download Card
              </button>
              
              <button
                onClick={handleRetake}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold 
                         border-2 border-[var(--color-ink-light)] text-[var(--color-ink-light)]
                         hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] 
                         transition-all duration-300"
              >
                <RefreshCw size={20} />
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default VedicIdentityQuiz;
