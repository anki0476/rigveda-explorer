export const deityCards = {
    agni: {
      id: 'agni',
      name: 'Agni',
      title: 'God of Fire',
      sanskrit: 'अग्नि',
      rarity: 'legendary',
      element: 'fire',
      power: 95,
      wisdom: 85,
      influence: 90,
      hymns: 200,
      description: 'Messenger between humans and gods. The divine priest who carries offerings to heaven through sacred fire.',
      quote: 'I praise Agni, the chosen priest, god, minister of sacrifice...',
      abilities: ['Divine Messenger', 'Sacred Fire', 'Purification'],
      color: '#FF6B35',
      icon: '🔥',
      unlockRequirement: 'Complete Fire Path'
    },
    
    indra: {
      id: 'indra',
      name: 'Indra',
      title: 'King of Gods',
      sanskrit: 'इन्द्र',
      rarity: 'legendary',
      element: 'thunder',
      power: 100,
      wisdom: 75,
      influence: 95,
      hymns: 250,
      description: 'Warrior god of thunder and rain. Slayer of Vritra, the dragon of drought. Most celebrated deity in RigVeda.',
      quote: 'I will declare the manly deeds of Indra...',
      abilities: ['Thunderbolt', 'Dragon Slayer', 'Rain Bringer'],
      color: '#4A90E2',
      icon: '⚡',
      unlockRequirement: 'Defeat 10 story challenges'
    },
    
    surya: {
      id: 'surya',
      name: 'Surya',
      title: 'The Sun God',
      sanskrit: 'सूर्य',
      rarity: 'epic',
      element: 'light',
      power: 90,
      wisdom: 90,
      influence: 85,
      hymns: 10,
      description: 'The all-seeing eye that illuminates the world. Source of life, light, and knowledge.',
      quote: 'May we attain that excellent glory of Savitar the god...',
      abilities: ['Illumination', 'All-Seeing', 'Life Force'],
      color: '#FFD700',
      icon: '☀️',
      unlockRequirement: 'Complete Light Path'
    },
    
    varuna: {
      id: 'varuna',
      name: 'Varuna',
      title: 'Lord of Cosmic Order',
      sanskrit: 'वरुण',
      rarity: 'epic',
      element: 'water',
      power: 85,
      wisdom: 95,
      influence: 90,
      hymns: 46,
      description: 'Guardian of Rta (cosmic law). Omniscient god of sky and waters who knows all human deeds.',
      quote: 'Varuna knows the flight of birds in heaven...',
      abilities: ['Cosmic Law', 'Omniscience', 'Water Control'],
      color: '#00A8E8',
      icon: '🌊',
      unlockRequirement: 'Complete Wisdom Path'
    },
    
    soma: {
      id: 'soma',
      name: 'Soma',
      title: 'The Sacred Essence',
      sanskrit: 'सोम',
      rarity: 'rare',
      element: 'plant',
      power: 70,
      wisdom: 85,
      influence: 80,
      hymns: 120,
      description: 'Divine plant and its juice. Brings immortality and inspiration. Entire Mandala 9 dedicated to Soma.',
      quote: 'Flow onward, Soma, for Indra, for our prosperity...',
      abilities: ['Immortality', 'Inspiration', 'Divine Ecstasy'],
      color: '#9B59B6',
      icon: '🌿',
      unlockRequirement: 'Collect 5 deity cards'
    },
    
    ushas: {
      id: 'ushas',
      name: 'Ushas',
      title: 'Goddess of Dawn',
      sanskrit: 'उषस',
      rarity: 'rare',
      element: 'light',
      power: 65,
      wisdom: 80,
      influence: 75,
      hymns: 20,
      description: 'Beautiful goddess who brings each new day. Rides a golden chariot pulled by red cows.',
      quote: 'Dawn on us with prosperity, O Ushas, daughter of the sky...',
      abilities: ['New Beginnings', 'Beauty', 'Awakening'],
      color: '#FFB6C1',
      icon: '🌅',
      unlockRequirement: 'Complete 3 dawn meditations'
    },
    
    vayu: {
      id: 'vayu',
      name: 'Vayu',
      title: 'God of Wind',
      sanskrit: 'वायु',
      rarity: 'epic',
      element: 'air',
      power: 80,
      wisdom: 75,
      influence: 80,
      hymns: 12,
      description: 'Swift god of wind and breath. Life force that moves through all beings.',
      quote: 'To Vayu now the Sama hymns are sung...',
      abilities: ['Swiftness', 'Life Breath', 'Messenger'],
      color: '#A8DADC',
      icon: '💨',
      unlockRequirement: 'Travel 50 story paths'
    },
  
    // Secret/Hidden cards
    brahman: {
      id: 'brahman',
      name: 'Brahman',
      title: 'The Ultimate Reality',
      sanskrit: 'ब्रह्मन्',
      rarity: 'mythic',
      element: 'cosmic',
      power: 100,
      wisdom: 100,
      influence: 100,
      hymns: 0,
      description: 'The supreme, ultimate reality. Beyond all gods, beyond creation itself. The source and essence of all existence.',
      quote: 'That ONE breathed, windless, by its own impulse...',
      abilities: ['Omnipotence', 'Transcendence', 'Unity'],
      color: '#C9ADA7',
      icon: '🕉️',
      unlockRequirement: 'Complete Nasadiya Sukta path'
    }
  };
  
  export const rarityColors = {
    common: '#95A5A6',
    rare: '#3498DB',
    epic: '#9B59B6',
    legendary: '#F39C12',
    mythic: '#E74C3C'
  };
  
  export const getDeityById = (id) => deityCards[id];
  export const getAllDeities = () => Object.values(deityCards);
  export const getDeityByRarity = (rarity) => getAllDeities().filter(d => d.rarity === rarity);
  