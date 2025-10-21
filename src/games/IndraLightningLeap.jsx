import React, { useRef, useEffect, useState } from "react";

const WIDTH = 600;
const HEIGHT = 220;

function getRandomInt(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}

export default function IndraLightningLeap() {
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef({});

  // Load all sprite images
  useEffect(() => {
    const imagesToLoad = {
      indra: '/images/game/indra-airavata.png',
      soma: '/images/game/soma-drop.png',
      snake: '/images/game/snake-obstacle.png',
      vritra: '/images/game/vritra-obstacle.png'
    };

    let loadedCount = 0;
    const totalImages = Object.keys(imagesToLoad).length;

    Object.entries(imagesToLoad).forEach(([key, src]) => {
      const img = new Image();
      img.onload = () => {
        imagesRef.current[key] = img;
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load: ${src}`);
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Game state
    let indra = {
      x: 40,
      y: HEIGHT - 105,
      vy: 0,
      width: 90,  // ← BIGGER
      height: 90, // ← BIGGER
      jumping: false,
      doubleJumpAvailable: true,
      onGround() { return this.y >= HEIGHT - this.height - 15; }
    };
    
    let obstacles = [];
    let drops = [];
    let gameOver = false;
    let score = 0;
    let lightningEnergy = 0;
    let animationId = null;
    let lightningFlash = 0;

    const resetGame = () => {
      indra.y = HEIGHT - 105;
      indra.vy = 0;
      indra.jumping = false;
      indra.doubleJumpAvailable = true;
      obstacles = [];
      drops = [];
      gameOver = false;
      score = 0;
      lightningEnergy = 0;
      lightningFlash = 0;
      loop();
    };

    function jump() {
      if (indra.onGround()) {
        indra.vy = -11;
        indra.jumping = true;
      } else if (indra.doubleJumpAvailable) {
        indra.vy = -9;
        indra.doubleJumpAvailable = false;
      }
    }

    function lightningStrike() {
      if (lightningEnergy >= 1) { // ← Just need 1 Soma
        obstacles = [];
        lightningEnergy -= 1; // ← Use 1 Soma
        lightningFlash = 10;
      }
    }

    function loop() {
      if (gameOver) return;
      
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      
      // Sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      gradient.addColorStop(0, '#87CEEB');
      gradient.addColorStop(1, '#E0F6FF');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Lightning flash effect
      if (lightningFlash > 0) {
        ctx.fillStyle = `rgba(255, 255, 100, ${lightningFlash / 15})`;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        lightningFlash--;
      }

      // Ground
      ctx.fillStyle = "#8B7355";
      ctx.fillRect(0, HEIGHT - 15, WIDTH, 15);

      // Player physics
      indra.y += indra.vy;
      indra.vy += 0.6;
      if (indra.y > HEIGHT - indra.height - 15) {
        indra.y = HEIGHT - indra.height - 15;
        indra.vy = 0;
        indra.jumping = false;
        indra.doubleJumpAvailable = true;
      }

      // Draw Indra (sprite)
      if (imagesRef.current.indra) {
        ctx.drawImage(imagesRef.current.indra, indra.x, indra.y, indra.width, indra.height);
      }

      // Spawn obstacles (LESS FREQUENT, MORE SPACING)
      if (Math.random() < 0.015) {
        const isVritra = Math.random() < 0.25;
        obstacles.push({ 
          x: WIDTH, 
          y: HEIGHT - (isVritra ? 75 : 43), 
          w: isVritra ? 60 : 28,
          h: isVritra ? 60 : 28,
          type: isVritra ? 'vritra' : 'snake'
        });
      }

      // Move and draw obstacles
      for (let o of obstacles) {
        o.x -= 4;
        const sprite = imagesRef.current[o.type];
        if (sprite) {
          ctx.drawImage(sprite, o.x, o.y, o.w, o.h);
        }
        
        // Collision
        if (
          o.x < indra.x + indra.width - 10 &&
          o.x + o.w > indra.x + 10 &&
          o.y < indra.y + indra.height - 10 &&
          o.y + o.h > indra.y + 10
        ) {
          gameOver = true;
        }
      }
      obstacles = obstacles.filter(o => o.x + o.w > 0);

      // Spawn soma drops
      if (Math.random() < 0.012) {
        drops.push({ x: WIDTH, y: getRandomInt(HEIGHT - 100, HEIGHT - 30), r: 15 });
      }

      // Move and draw drops
      for (let d of drops) {
        d.x -= 4;
        if (imagesRef.current.soma) {
          ctx.drawImage(imagesRef.current.soma, d.x - d.r, d.y - d.r, d.r * 2, d.r * 2);
        }
        
        // Pickup
        if (
          d.x < indra.x + indra.width &&
          d.x + d.r > indra.x &&
          d.y < indra.y + indra.height &&
          d.y + d.r > indra.y
        ) {
          score += 1;
          lightningEnergy += 1; // ← Add 1 Soma
          d.x = -100;
        }
      }
      drops = drops.filter(d => d.x + d.r > 0);

      // HUD
      ctx.fillStyle = "#111";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText(`Score: ${score}`, 10, 22);
      
      // Lightning energy display
      ctx.fillStyle = lightningEnergy >= 1 ? "#FFD700" : "#666";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText(`⚡ ${lightningEnergy}`, 480, 22);
      if (lightningEnergy >= 1) {
        ctx.fillText("Press X!", 475, 42);
      }

      if (!gameOver) {
        animationId = requestAnimationFrame(loop);
      } else {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(150, 80, 300, 80);
        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 26px serif";
        ctx.fillText("Game Over!", 200, 120);
        ctx.font = "14px serif";
        ctx.fillText(`Final Score: ${score}`, 230, 140);
        ctx.fillText("Press R to Replay", 220, 155);
      }
    }

    function onKey(e) {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
      if (e.key === "x" || e.key === "X") {
        e.preventDefault();
        lightningStrike();
      }
      if (e.key === "r" || e.key === "R") {
        if (gameOver) resetGame();
      }
    }

    window.addEventListener("keydown", onKey);
    resetGame();

    return () => {
      window.removeEventListener("keydown", onKey);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [imagesLoaded]);

  if (!imagesLoaded) {
    return (
      <div className="w-full flex flex-col items-center">
        <div className="text-center py-8">
          <div className="text-2xl animate-pulse">⚡ Loading Indra's Quest...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <canvas 
        ref={canvasRef} 
        width={WIDTH} 
        height={HEIGHT} 
        style={{
          borderRadius: 10,
          border: '3px solid #D97706',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          marginTop: 16
        }}
      />
      <p className="mt-3 text-[15px] text-amber-700 font-semibold">
        <span className="font-bold">Space/↑:</span> Jump  
        <span className="font-bold ml-4">X:</span> Lightning ⚡ (1 Soma)  
        <span className="font-bold ml-4">R:</span> Restart
      </p>
      <p className="mt-1 text-sm opacity-70 text-amber-800">
        Guide Indra & Airavata. Dodge serpents, collect Soma, unleash lightning!
      </p>
    </div>
  );
}
