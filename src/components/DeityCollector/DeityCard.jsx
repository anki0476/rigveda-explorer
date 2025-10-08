import React, { useState, useRef, useCallback, useEffect } from 'react';
import { rarityColors } from '../../data/deityCards';
import './DeityCard3D.css';

const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max);
const round = (value, precision = 3) => parseFloat(value.toFixed(precision));
const adjust = (value, fromMin, fromMax, toMin, toMax) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const DeityCard = ({ deity, isUnlocked, onFlip }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const innerCardRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
    if (isUnlocked) {
      setIsFlipped(!isFlipped);
      if (onFlip) onFlip(!isFlipped);
      
      // Reset tilt when flipping
      const innerCard = innerCardRef.current;
      if (innerCard) {
        innerCard.style.transition = 'transform 0.7s ease';
      }
    }
  };

  const updateCardTransform = useCallback((offsetX, offsetY) => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    const innerCard = innerCardRef.current;
    if (!card || !wrap || !innerCard) return;

    const width = card.clientWidth;
    const height = card.clientHeight;

    const percentX = clamp((100 / width) * offsetX);
    const percentY = clamp((100 / height) * offsetY);

    const centerX = percentX - 50;
    const centerY = percentY - 50;

    const rotateX = round(-(centerX / 3.5));
    const rotateY = round(centerY / 3.5);

    const properties = {
      '--pointer-x': `${percentX}%`,
      '--pointer-y': `${percentY}%`,
      '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
      '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
      '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
      '--pointer-from-top': `${percentY / 100}`,
      '--pointer-from-left': `${percentX / 100}`,
      '--rotate-x': `${rotateX}deg`,
      '--rotate-y': `${rotateY}deg`
    };

    Object.entries(properties).forEach(([property, value]) => {
      wrap.style.setProperty(property, value);
    });

    // Apply 3D transform directly to inner card - only if not flipped
    if (!isFlipped) {
      innerCard.style.transition = 'none';
      innerCard.style.transform = `rotateY(0deg) translate3d(0, 0, 0.1px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
    }
  }, [isFlipped]);

  const handlePointerMove = useCallback(
    (event) => {
      if (!isUnlocked || isFlipped) return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      updateCardTransform(event.clientX - rect.left, event.clientY - rect.top);
    },
    [isUnlocked, isFlipped, updateCardTransform]
  );

  const handlePointerEnter = useCallback(() => {
    if (!isUnlocked || isFlipped) return;
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (wrap && card) {
      wrap.classList.add('active');
      card.classList.add('active');
    }
  }, [isUnlocked, isFlipped]);

  const handlePointerLeave = useCallback(() => {
    if (isFlipped) return; // Don't reset if flipped
    
    const wrap = wrapRef.current;
    const card = cardRef.current;
    const innerCard = innerCardRef.current;
    if (wrap && card && innerCard) {
      wrap.classList.remove('active');
      card.classList.remove('active');
      // Reset to center position smoothly
      innerCard.style.transition = 'transform 1s ease';
      innerCard.style.transform = 'rotateY(0deg) translate3d(0, 0, 0.1px) rotateX(0deg) rotateY(0deg)';
    }
  }, [isFlipped]);

  // Update transform when flip state changes
  useEffect(() => {
    const innerCard = innerCardRef.current;
    if (!innerCard) return;

    if (isFlipped) {
      // When flipping, use CSS transform for flip animation
      innerCard.style.transition = 'transform 0.7s ease';
      innerCard.style.transform = 'rotateY(180deg) scale(1.05)';
    } else {
      // When flipping back, reset to normal
      innerCard.style.transition = 'transform 0.7s ease';
      innerCard.style.transform = 'rotateY(0deg) translate3d(0, 0, 0.1px) rotateX(0deg) rotateY(0deg)';
    }
  }, [isFlipped]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !isUnlocked) return;

    card.addEventListener('pointerenter', handlePointerEnter);
    card.addEventListener('pointermove', handlePointerMove);
    card.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      card.removeEventListener('pointerenter', handlePointerEnter);
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [isUnlocked, isFlipped, handlePointerEnter, handlePointerMove, handlePointerLeave]);

  return (
    <div 
      ref={wrapRef}
      className="deity-card-3d-wrapper relative w-full h-full cursor-pointer"
      style={{ 
        minHeight: '450px',
        zIndex: isFlipped ? 999 : 1,
        position: 'relative'
      }}
    >
      <div 
        ref={cardRef}
        className="deity-card-3d relative w-full h-full"
        style={{ 
          minHeight: '450px'
        }}
        onClick={handleClick}
      >
        <div 
          ref={innerCardRef}
          className="relative w-full h-full"
          style={{ 
            transformStyle: 'preserve-3d',
            minHeight: '450px'
          }}
        >
          {/* 3D Effects - Only show when not flipped */}
          {!isFlipped && isUnlocked && (
            <>
              <div className="deity-card-shine" />
              <div className="deity-card-glare" />
            </>
          )}

          {/* Front of Card */}
          <div 
            className="absolute w-full h-full"
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              minHeight: '450px'
            }}
          >
            <div 
              className={`double-golden-border rounded-2xl p-6 h-full transition-all ${
                isUnlocked 
                  ? 'bg-gradient-to-br from-[--color-parchment-light] to-[--color-parchment] hover:shadow-2xl' 
                  : 'bg-[--color-parchment-dark] opacity-50'
              }`}
              style={{
                borderTopColor: isUnlocked ? deity.color : '#666',
                borderTopWidth: '6px',
                minHeight: '450px'
              }}
            >
              {isUnlocked ? (
                <>
                  {/* Rarity Badge */}
                  <div 
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-[family:--font-family-header] font-bold text-white uppercase z-20"
                    style={{ backgroundColor: rarityColors[deity.rarity] }}
                  >
                    {deity.rarity}
                  </div>

                  {/* Icon */}
                  <div className="text-6xl text-center mb-4 relative z-10">
                    {deity.icon}
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl font-[family:--font-family-header] font-bold text-[--color-ink] text-center mb-1 relative z-10">
                    {deity.name}
                  </h3>
                  
                  {/* Sanskrit */}
                  <p className="text-lg sanskrit text-[--color-gold] text-center mb-2 relative z-10">
                    {deity.sanskrit}
                  </p>

                  {/* Title */}
                  <p className="text-sm font-[family:--font-family-body] text-[--color-ink-light] text-center italic mb-4 relative z-10">
                    {deity.title}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2 mb-4 relative z-10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-[family:--font-family-header] text-[--color-ink]">Power</span>
                      <div className="flex-1 mx-2 bg-[--color-parchment-dark] rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[--color-gold] to-[--color-saffron] h-full rounded-full transition-all duration-500"
                          style={{ width: `${deity.power}%` }}
                        ></div>
                      </div>
                      <span className="font-[family:--font-family-body] font-bold text-[--color-ink]">{deity.power}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="font-[family:--font-family-header] text-[--color-ink]">Wisdom</span>
                      <div className="flex-1 mx-2 bg-[--color-parchment-dark] rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-400 to-purple-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${deity.wisdom}%` }}
                        ></div>
                      </div>
                      <span className="font-[family:--font-family-body] font-bold text-[--color-ink]">{deity.wisdom}</span>
                    </div>
                  </div>

                  {/* Hymn Count */}
                  <div className="text-center text-sm font-[family:--font-family-body] text-[--color-ink-light] relative z-10">
                    📖 {deity.hymns} Hymns
                  </div>

                  {/* Click to flip hint */}
                  <div className="mt-4 text-center text-xs font-[family:--font-family-body] text-[--color-gold] relative z-10">
                    Click to flip →
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="text-6xl mb-4 opacity-30">🔒</div>
                  <p className="text-lg font-[family:--font-family-header] text-[--color-ink-light]">
                    Locked
                  </p>
                  <p className="text-sm font-[family:--font-family-body] text-[--color-ink-light] text-center mt-2 px-4">
                    {deity.unlockRequirement}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Back of Card */}
          {isUnlocked && (
            <div 
              className="absolute w-full h-full overflow-hidden"
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                minHeight: '450px'
              }}
            >
              <div 
                className="double-golden-border rounded-2xl p-5 h-full bg-gradient-to-br from-[--color-parchment-light] to-[--color-parchment] shadow-2xl flex flex-col overflow-y-auto"
                style={{
                  borderTopColor: deity.color,
                  borderTopWidth: '6px',
                  minHeight: '450px',
                  maxHeight: '450px'
                }}
              >
                {/* Description */}
                <p className="text-xs font-[family:--font-family-body] text-[--color-ink-light] leading-relaxed mb-3 flex-shrink-0">
                  {deity.description}
                </p>

                {/* Quote */}
                <div className="spine-border p-2 mb-3 bg-[--color-parchment] flex-shrink-0">
                  <p className="text-[10px] font-[family:--font-family-body] italic text-[--color-ink-light] leading-tight">
                    "{deity.quote}"
                  </p>
                </div>

                {/* Abilities */}
                <div className="mb-3 flex-shrink-0">
                  <h4 className="text-xs font-[family:--font-family-header] font-bold text-[--color-ink] mb-2">
                    Divine Abilities:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {deity.abilities.map((ability, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-[--color-gold]/20 border border-[--color-gold] rounded-full text-[10px] font-[family:--font-family-body] text-[--color-ink]"
                      >
                        {ability}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Element Badge */}
                <div className="text-center mb-3 flex-shrink-0">
                  <span 
                    className="inline-block px-3 py-1 rounded-lg text-xs font-[family:--font-family-header] font-bold text-white"
                    style={{ backgroundColor: deity.color }}
                  >
                    {deity.element.toUpperCase()}
                  </span>
                </div>

                {/* Click to flip back - AT BOTTOM */}
                <div className="mt-auto text-center text-[10px] font-[family:--font-family-body] text-[--color-gold] pt-2 flex-shrink-0">
                  Click to flip back ←
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeityCard;
