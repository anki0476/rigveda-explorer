import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Share2, Download, RefreshCw, Home, ChevronLeft } from 'lucide-react';
import RishiWelcome from '../components/RishiWelcome';


const VedicIdentityQuiz = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('intro');
  const [answers, setAnswers] = useState({});
  const [identity, setIdentity] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);


  // Load saved results from localStorage
  useEffect(() => {
    const savedResults = localStorage.getItem('vedicIdentityResults');
    if (savedResults) {
      try {
        const parsed = JSON.parse(savedResults);
        if (parsed.identity && parsed.answers) {
          setIdentity(parsed.identity);
          setAnswers(parsed.answers);
        }
      } catch (e) {
        console.error('Error loading saved results:', e);
      }
    }
  }, []);


  // 10 QUESTIONS (5 original + 5 new)
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
    },
    // NEW QUESTIONS
    {
      id: 'obstacle',
      question: 'When facing a major obstacle, you tend to:',
      emoji: '💪',
      options: [
        { value: 'agni', label: 'Transform it into opportunity', icon: '🔥' },
        { value: 'indra', label: 'Confront it with determination', icon: '⚔️' },
        { value: 'saraswati', label: 'Study and understand it deeply', icon: '📚' },
        { value: 'soma', label: 'Seek intuitive guidance', icon: '🌙' },
        { value: 'prithvi', label: 'Patiently adapt and endure', icon: '🌱' }
      ]
    },
    {
      id: 'values',
      question: 'What matters most to you in life?',
      emoji: '💎',
      options: [
        { value: 'varuna', label: 'Truth and cosmic justice', icon: '⚖️' },
        { value: 'saraswati', label: 'Knowledge and creativity', icon: '✨' },
        { value: 'indra', label: 'Victory and achievement', icon: '🏆' },
        { value: 'agni', label: 'Transformation and impact', icon: '🔥' },
        { value: 'surya', label: 'Illumination and clarity', icon: '☀️' }
      ]
    },
    {
      id: 'social',
      question: 'In a group setting, you naturally:',
      emoji: '👥',
      options: [
        { value: 'indra', label: 'Take charge and lead', icon: '👑' },
        { value: 'saraswati', label: 'Share knowledge and teach', icon: '🎓' },
        { value: 'soma', label: 'Listen and offer wisdom', icon: '🧘' },
        { value: 'agni', label: 'Energize and spark action', icon: '⚡' },
        { value: 'prithvi', label: 'Support and nurture all', icon: '🤝' }
      ]
    },
    {
      id: 'learning',
      question: 'Your preferred way to learn:',
      emoji: '📖',
      options: [
        { value: 'saraswati', label: 'Deep study of theories', icon: '📚' },
        { value: 'agni', label: 'Jump in and learn by doing', icon: '🔥' },
        { value: 'soma', label: 'Meditative contemplation', icon: '🧘' },
        { value: 'indra', label: 'Competitive mastery', icon: '⚔️' },
        { value: 'surya', label: 'Observing patterns', icon: '👁️' }
      ]
    },
    {
      id: 'conflict',
      question: 'When wronged, you instinctively:',
      emoji: '⚔️',
      options: [
        { value: 'indra', label: 'Confront directly', icon: '⚡' },
        { value: 'varuna', label: 'Seek truth and justice', icon: '⚖️' },
        { value: 'prithvi', label: 'Forgive and harmonize', icon: '🕊️' },
        { value: 'soma', label: 'Withdraw and reflect', icon: '🌙' },
        { value: 'agni', label: 'Transform anger into action', icon: '🔥' }
      ]
    }
  ];


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
    },
    varuna: {
      name: 'Varuna',
      title: 'Truth Keeper',
      sanskritName: 'Varuna-satya',
      element: 'water',
      attributes: { power: 80, wisdom: 95, creativity: 70, protection: 85 },
      description: 'You embody cosmic order and truth, seeing through all illusions.',
      mantra: 'Om Varunaya Namaha',
      color: '#1E3A8A',
      emoji: '⚖️'
    }
  };


  const calculateIdentity = (answers) => {
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
    if (answers.purpose === 'justice') {
      scores.indra += 3;
      scores.varuna += 2;
    }
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


    // NEW questions scoring
    if (answers.obstacle) scores[answers.obstacle] = (scores[answers.obstacle] || 0) + 3;
    if (answers.values) scores[answers.values] = (scores[answers.values] || 0) + 3;
    if (answers.social) scores[answers.social] = (scores[answers.social] || 0) + 3;
    if (answers.learning) scores[answers.learning] = (scores[answers.learning] || 0) + 3;
    if (answers.conflict) scores[answers.conflict] = (scores[answers.conflict] || 0) + 3;


    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);


    const sortedDeities = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(([deityKey, score]) => ({
        ...deityProfiles[deityKey],
        percentage: totalScore > 0 ? Math.round((score / totalScore) * 100) : 0,
        score: score
      }));


    const [primary, secondary, tertiary] = sortedDeities.slice(0, 3);


    return {
      primary,
      secondary,
      tertiary,
      allMatches: sortedDeities
    };
  };


  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);


    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    } else {
      setTimeout(() => {
        const result = calculateIdentity(newAnswers);
        setIdentity(result);
        
        localStorage.setItem('vedicIdentityResults', JSON.stringify({
          identity: result,
          answers: newAnswers,
          timestamp: new Date().toISOString()
        }));
        
        setStep('result');
      }, 300);
    }
  };


  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      const prevQuestionId = questions[currentQuestionIndex - 1].id;
      const newAnswers = { ...answers };
      delete newAnswers[prevQuestionId];
      setAnswers(newAnswers);
    }
  };


  const handleShare = () => {
    if (!identity || !identity.primary) return;
    
    const text = `I discovered my Vedic Identity! 🕉️\n\nI am ${identity.primary.title} aligned with ${identity.primary.name}!\n${identity.primary.description}\n\nDiscover yours at: ${window.location.origin}`;
    
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
    alert('Download feature coming in Phase 2! 📸');
  };


  const handleRetake = () => {
    setAnswers({});
    setIdentity(null);
    setCurrentQuestionIndex(0);
    setStep('intro');
    localStorage.removeItem('vedicIdentityResults');
  };


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


  if (step === 'intro') {
    const hasSavedResults = localStorage.getItem('vedicIdentityResults');
    
    return (
      <>
        {/* Rishi Welcome Popup */}
        <RishiWelcome
          image="/images/rishi-mascot-vedic-id.png"
          dialogue="Come discover which deities align with you the most by answering few simple self reflective questions about yourself!!"
          storageKey="vedicIdentityWelcome"
        />

        <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-[#EDE5D8] to-[#E8D5C4] flex items-center justify-center p-4">
          <BackButton />
          <div className="max-w-2xl w-full">
            <div className="double-golden-border bg-[var(--color-parchment-light)] p-12 rounded-2xl text-center">
              <div className="text-7xl mb-6 animate-pulse">🕉️</div>
              <h1 className="text-5xl font-[family:--font-family-header] text-[var(--color-ink)] mb-4">
                Discover Your Vedic Identity
              </h1>
              <p className="text-xl text-[var(--color-ink-light)] mb-8 leading-relaxed">
                Answer 10 sacred questions to reveal which Vedic deity aligns with your soul. 
                Receive your personalized Sanskrit name, power attributes, and sacred mantra.
              </p>
              
              <div className="flex items-center justify-center gap-8 mb-8 text-[var(--color-ink-light)]">
                <div className="flex items-center gap-2">
                  <Sparkles size={20} className="text-[var(--color-gold)]" />
                  <span>10 Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⏱️</span>
                  <span>3 Minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Share2 size={20} className="text-[var(--color-gold)]" />
                  <span>Shareable</span>
                </div>
              </div>


              {hasSavedResults && (
                <button
                  onClick={() => {
                    const saved = JSON.parse(localStorage.getItem('vedicIdentityResults'));
                    setIdentity(saved.identity);
                    setAnswers(saved.answers);
                    setStep('result');
                  }}
                  className="mb-4 text-[var(--color-gold)] hover:underline text-sm"
                >
                  ← View My Previous Results
                </button>
              )}


              <button
                onClick={() => setStep('questions')}
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
      </>
    );
  }


  if (step === 'questions') {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;


    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-[#EDE5D8] to-[#E8D5C4] flex items-center justify-center p-4">
        <BackButton />
        <div className="max-w-3xl w-full">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-[var(--color-ink-light)] mb-2">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-[var(--color-parchment)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--color-gold)] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>


          {currentQuestionIndex > 0 && (
            <button
              onClick={handleBack}
              className="mb-6 flex items-center gap-2 text-[var(--color-ink-light)] 
                         hover:text-[var(--color-ink)] transition-all duration-300"
            >
              <ChevronLeft size={20} />
              <span>Previous Question</span>
            </button>
          )}


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


  if (step === 'result' && identity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-[#EDE5D8] to-[#E8D5C4] flex items-center justify-center p-4">
        <BackButton />
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-[family:--font-family-header] text-[var(--color-ink)] mb-2">
              Your Vedic Identity Revealed
            </h1>
            <p className="text-[var(--color-ink-light)]">Your complete spiritual profile with top 3 deity alignments</p>
          </div>


          <div 
            className="double-golden-border p-8 rounded-2xl relative overflow-hidden mb-8"
            style={{
              backgroundColor: 'var(--color-parchment-light)',
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(218, 165, 32, 0.1) 0%, transparent 50%)',
            }}
          >
            <div className="text-center mb-6">
              <div className="text-8xl mb-4 animate-bounce">{identity.primary.emoji}</div>
              <h2 className="text-4xl font-[family:--font-family-header] text-[var(--color-ink)] mb-2">
                {identity.primary.name}
              </h2>
              <div 
                className="inline-block px-6 py-2 rounded-full text-white font-semibold text-lg mb-2"
                style={{ backgroundColor: identity.primary.color }}
              >
                {identity.primary.title}
              </div>
              <p className="text-[var(--color-gold)] font-bold text-xl mt-2">
                Primary Deity • {identity.primary.percentage}% Match
              </p>
            </div>


            <div className="text-center mb-6 p-4 bg-[var(--color-gold)]/10 rounded-lg">
              <p className="text-sm text-[var(--color-ink-light)] mb-1">Your Sanskrit Name</p>
              <p className="text-2xl font-[family:--font-family-sanskrit] text-[var(--color-gold)]">
                {identity.primary.sanskritName}
              </p>
            </div>


            <p className="text-center text-lg text-[var(--color-ink-light)] mb-6 leading-relaxed">
              {identity.primary.description}
            </p>


            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.entries(identity.primary.attributes).map(([attr, value]) => (
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
                {identity.primary.mantra}
              </p>
            </div>
          </div>


          {(identity.secondary || identity.tertiary) && (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {identity.secondary && (
                <div className="double-golden-border bg-[var(--color-parchment-light)] p-6 rounded-xl">
                  <div className="text-5xl mb-3 text-center">{identity.secondary.emoji}</div>
                  <h3 className="text-2xl font-[family:--font-family-header] text-[var(--color-ink)] text-center mb-2">
                    {identity.secondary.name}
                  </h3>
                  <div 
                    className="inline-block px-4 py-1 rounded-full text-white font-semibold text-sm mb-3 w-full text-center"
                    style={{ backgroundColor: identity.secondary.color }}
                  >
                    {identity.secondary.title}
                  </div>
                  <p className="text-sm text-[var(--color-gold)] font-bold text-center mb-3">
                    Secondary • {identity.secondary.percentage}% Match
                  </p>
                  <p className="text-sm text-[var(--color-ink-light)] text-center mb-3">
                    {identity.secondary.description}
                  </p>
                  <p className="text-sm text-[var(--color-ink-light)] text-center italic">
                    {identity.secondary.mantra}
                  </p>
                </div>
              )}
              
              {identity.tertiary && (
                <div className="double-golden-border bg-[var(--color-parchment-light)] p-6 rounded-xl">
                  <div className="text-5xl mb-3 text-center">{identity.tertiary.emoji}</div>
                  <h3 className="text-2xl font-[family:--font-family-header] text-[var(--color-ink)] text-center mb-2">
                    {identity.tertiary.name}
                  </h3>
                  <div 
                    className="inline-block px-4 py-1 rounded-full text-white font-semibold text-sm mb-3 w-full text-center"
                    style={{ backgroundColor: identity.tertiary.color }}
                  >
                    {identity.tertiary.title}
                  </div>
                  <p className="text-sm text-[var(--color-gold)] font-bold text-center mb-3">
                    Tertiary • {identity.tertiary.percentage}% Match
                  </p>
                  <p className="text-sm text-[var(--color-ink-light)] text-center mb-3">
                    {identity.tertiary.description}
                  </p>
                  <p className="text-sm text-[var(--color-ink-light)] text-center italic">
                    {identity.tertiary.mantra}
                  </p>
                </div>
              )}
            </div>
          )}


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
    );
  }


  return null;
};


export default VedicIdentityQuiz;
