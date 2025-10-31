export const deityCards = {
  // === ⭐ STARTER CARDS (0 XP - FREE) ===
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
    hymns: 218,
    xpRequired: 0,
    storyRequired: true,  // ✅ Story path needed
    description: 'God of fire and sacrifice. Mediator between humans and gods, consumer of offerings.',
    quote: 'I praise Agni, the chosen priest, god, minister of sacrifice...',
    abilities: ['Divine Messenger', 'Sacred Fire', 'Purification'],
    color: '#FF6B35',
    icon: '🔥',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/75e5fad2-c60a-4e97-bb65-9f6c5bbfdb0b.png',
    unlockRequirement: 'Starter Card'
  },

  ushas: {
    id: 'ushas',
    name: 'Ushas',
    title: 'Goddess of Dawn',
    sanskrit: 'उषस',
    rarity: 'rare',
    element: 'dawn',
    power: 65,
    wisdom: 80,
    influence: 75,
    hymns: 20,
    xpRequired: 0,
    storyRequired: true,  // ✅ Story path needed
    description: 'Goddess of dawn, bringer of light and consciousness. Most prominent female deity.',
    quote: 'Dawn on us with prosperity, O Ushas, daughter of the sky...',
    abilities: ['New Beginnings', 'Beauty', 'Awakening'],
    color: '#FFB6C1',
    icon: '🌅',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/3e99e062-1ef0-4e22-b806-a7ca6c4c95c7.png',
    unlockRequirement: 'Starter Card'
  },

  pushan: {
    id: 'pushan',
    name: 'Pushan',
    title: 'God of Journeys',
    sanskrit: 'पूषन',
    rarity: 'rare',
    element: 'guidance',
    power: 65,
    wisdom: 78,
    influence: 72,
    hymns: 11,
    xpRequired: 0,
    storyRequired: true,  // ✅ Story path needed
    description: 'Protector of travelers and cattle. Guardian of roads and pathways.',
    quote: 'Pushan, bring us to the man who knows...',
    abilities: ['Safe Passage', 'Pathfinding', 'Herd Protection'],
    color: '#DEB887',
    icon: '🛤️',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/d2a79f57-49f9-4a6b-add0-f80c54ba4e59.png',
    unlockRequirement: 'Starter Card'
  },

  // === 🟦 RARE TIER (600-1020 XP) ===
  soma: {
    id: 'soma',
    name: 'Soma',
    title: 'God of Divine Nectar',
    sanskrit: 'सोम',
    rarity: 'rare',
    element: 'moon',
    power: 70,
    wisdom: 85,
    influence: 80,
    hymns: 143,
    xpRequired: 600,
    storyRequired: false,  // ✅ XP-ONLY: Auto-unlock at 600 XP
    description: 'Personification of sacred soma drink and lunar deity. Source of divine inspiration.',
    quote: 'Flow onward, Soma, for Indra, for our prosperity...',
    abilities: ['Immortality', 'Inspiration', 'Divine Ecstasy'],
    color: '#9B59B6',
    icon: '🌙',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/f0c14dbe-5ca9-4a50-bf45-5c10cc5f7e1f.png',
    unlockRequirement: 'Collect 5 deity cards'
  },

  mitra: {
    id: 'mitra',
    name: 'Mitra',
    title: 'God of Contracts',
    sanskrit: 'मित्र',
    rarity: 'rare',
    element: 'friendship',
    power: 68,
    wisdom: 82,
    influence: 78,
    hymns: 12,
    xpRequired: 700,
    storyRequired: true,  // ✅ Story path + XP needed
    description: 'God of friendship, contracts, and oaths. Often paired with Varuna.',
    quote: 'To Mitra and to Varuna sing forth your song...',
    abilities: ['Sacred Oaths', 'Divine Friendship', 'Day Protector'],
    color: '#FFA500',
    icon: '🤝',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/21636c9e-0d1c-4a6f-9a00-56f95d5bee43.png',
    unlockRequirement: 'Form 10 alliances'
  },

  prithvi: {
    id: 'prithvi',
    name: 'Prithvi',
    title: 'Goddess of Earth',
    sanskrit: 'पृथ्वी',
    rarity: 'rare',
    element: 'earth',
    power: 75,
    wisdom: 80,
    influence: 85,
    hymns: 8,
    xpRequired: 800,
    storyRequired: false,  // ✅ XP-ONLY: Auto-unlock at 800 XP
    description: 'Earth goddess, mother of all. Often paired with Dyaus (sky).',
    quote: 'Great are the Heaven and Earth, liberal, sublime...',
    abilities: ['Earth Nurture', 'Fertility', 'Stability'],
    color: '#8B4513',
    icon: '🌍',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/18cae8cd-a0b8-4c45-8928-f32edec92984.png',
    unlockRequirement: 'Plant 100 seeds'
  },

  ratri: {
    id: 'ratri',
    name: 'Ratri',
    title: 'Goddess of Night',
    sanskrit: 'रात्रि',
    rarity: 'rare',
    element: 'night',
    power: 62,
    wisdom: 75,
    influence: 70,
    hymns: 1,
    xpRequired: 900,
    storyRequired: false,  // ✅ XP-ONLY: Auto-unlock at 900 XP
    description: 'Goddess of night, sister of dawn. Protective and peaceful.',
    quote: 'Night has come, looking around with her eyes...',
    abilities: ['Night Protection', 'Peaceful Rest', 'Star Guidance'],
    color: '#191970',
    icon: '🌙',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/e7801e4f-fc01-443a-9797-a36a35edf99f.png',
    unlockRequirement: 'Complete 7 night vigils'
  },

  tvashtar: {
    id: 'tvashtar',
    name: 'Tvashtar',
    title: 'Divine Craftsman',
    sanskrit: 'त्वष्टृ',
    rarity: 'rare',
    element: 'craft',
    power: 70,
    wisdom: 85,
    influence: 75,
    hymns: 4,
    xpRequired: 940,
    storyRequired: true,  // ✅ Story path + XP needed
    description: 'Divine architect and craftsman. Creator of forms and beings.',
    quote: 'May Tvashtar fashion for you miraculous forms...',
    abilities: ['Divine Crafting', 'Form Creation', 'Weapon Forging'],
    color: '#A0522D',
    icon: '🔨',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/c0fbffdd-60d5-471e-be68-103a960c029c.png',
    unlockRequirement: 'Craft 50 items'
  },

  parjanya: {
    id: 'parjanya',
    name: 'Parjanya',
    title: 'God of Rain',
    sanskrit: 'पर्जन्य',
    rarity: 'rare',
    element: 'rain',
    power: 73,
    wisdom: 72,
    influence: 78,
    hymns: 3,
    xpRequired: 1000,
    storyRequired: false,  // ✅ XP-ONLY: Auto-unlock at 1000 XP
    description: 'Rain god and fertility deity. Waters the earth with life-giving rains.',
    quote: 'Speak out with thunder, pour down the rain-flood...',
    abilities: ['Rain Summoning', 'Fertility', 'Thunder Roar'],
    color: '#4682B4',
    icon: '🌧️',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/3c3a2218-d316-4bf3-b64c-9b2343b0ecb8.png',
    unlockRequirement: 'Summon 20 rains'
  },

  ribhus: {
    id: 'ribhus',
    name: 'Ribhus',
    title: 'Divine Artisans',
    sanskrit: 'ऋभु',
    rarity: 'rare',
    element: 'artisan',
    power: 68,
    wisdom: 80,
    influence: 72,
    hymns: 11,
    xpRequired: 960,
    storyRequired: true,  // ✅ Story path + XP needed
    description: 'Divine craftsmen who became gods through their skill. Created miraculous objects.',
    quote: 'The Ribhus, with skill and art...',
    abilities: ['Miraculous Crafting', 'Youth Restoration', 'Divine Innovation'],
    color: '#CD853F',
    icon: '🎨',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/acbf66f4-0943-4452-80ba-32b5a8d74054.png',
    unlockRequirement: 'Master all crafts'
  },

  apas: {
    id: 'apas',
    name: 'Apas',
    title: 'Water Goddesses',
    sanskrit: 'आप',
    rarity: 'rare',
    element: 'water',
    power: 67,
    wisdom: 78,
    influence: 75,
    hymns: 10,
    xpRequired: 1020,
    storyRequired: false,  // ✅ XP-ONLY: Auto-unlock at 1020 XP
    description: 'Personification of waters. Purifying and life-giving goddesses.',
    quote: 'Waters, you are healing; bring us strength and health...',
    abilities: ['Purification', 'Healing Waters', 'Life Essence'],
    color: '#00CED1',
    icon: '💧',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/48a7ee71-1642-49bd-84a1-218b3eea8848.png',
    unlockRequirement: 'Purify 30 souls'
  },

  // === 🟪 EPIC TIER (1200-2300 XP) ===
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
    hymns: 7,
    xpRequired: 1200,
    storyRequired: true,  // ✅ Story path + XP needed
    description: 'God of wind and breath. Life force that moves through all beings.',
    quote: 'To Vayu now the Sama hymns are sung...',
    abilities: ['Swiftness', 'Life Breath', 'Messenger'],
    color: '#A8DADC',
    icon: '💨',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/b29df3ce-2edb-4597-81cb-dfe4061dac69.png',
    unlockRequirement: 'Travel 50 story paths'
  },

  ashvins: {
    id: 'ashvins',
    name: 'Ashvins',
    title: 'Twin Gods of Healing',
    sanskrit: 'अश्विन',
    rarity: 'epic',
    element: 'healing',
    power: 75,
    wisdom: 85,
    influence: 80,
    hymns: 56,
    xpRequired: 1400,
    storyRequired: true,  // ✅ Story path + XP needed
    description: 'Twin gods of dawn, divine physicians and rescuers. Always invoked together.',
    quote: 'Nasatyas, you who glide in your chariot among the waters...',
    abilities: ['Divine Healing', 'Swift Rescue', 'Twin Power'],
    color: '#87CEEB',
    icon: '👥',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/3bcfbaeb-39e1-4b81-b99f-ed3e30ce67d0.png',
    unlockRequirement: 'Complete Healing Path'
  },

  varuna: {
    id: 'varuna',
    name: 'Varuna',
    title: 'God of Cosmic Waters',
    sanskrit: 'वरुण',
    rarity: 'epic',
    element: 'water',
    power: 85,
    wisdom: 95,
    influence: 90,
    hymns: 46,
    xpRequired: 1600,
    storyRequired: true,  // ✅ Story path + XP needed
    description: 'Guardian of cosmic order (rita), lord of waters and night sky. Punisher of oath-breakers.',
    quote: 'Varuna knows the flight of birds in heaven...',
    abilities: ['Cosmic Law', 'Omniscience', 'Water Control'],
    color: '#00A8E8',
    icon: '🌊',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/e3e77f52-3c72-443f-acde-e7c0f74d6ffe.png',
    unlockRequirement: 'Complete Wisdom Path'
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
    hymns: 33,
    xpRequired: 1800,
    storyRequired: true,  // ✅ Story path + XP needed
    description: 'Sun god, source of light and life. Eye of Mitra and Varuna.',
    quote: 'May we attain that excellent glory of Savitar the god...',
    abilities: ['Illumination', 'All-Seeing', 'Life Force'],
    color: '#FFD700',
    icon: '☀️',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/8f8a87ec-b7ab-457e-9ad7-f2a3add5df79.png',
    unlockRequirement: 'Complete Light Path'
  },

  brihaspati: {
    id: 'brihaspati',
    name: 'Brihaspati',
    title: 'God of Wisdom',
    sanskrit: 'बृहस्पति',
    rarity: 'epic',
    element: 'wisdom',
    power: 72,
    wisdom: 98,
    influence: 85,
    hymns: 14,
    xpRequired: 1900,
    storyRequired: false,  // ✅ XP-ONLY: Auto-unlock at 1900 XP
    description: 'God of prayer and devotion. Divine priest and teacher.',
    quote: 'Brihaspati, the Rishi, the leader of singers...',
    abilities: ['Divine Wisdom', 'Sacred Prayer', 'Teaching'],
    color: '#DAA520',
    icon: '📚',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/39411668-f4f8-47a2-8a3b-ad35e85bdd5e.png',
    unlockRequirement: 'Master all mantras'
  },

  yama: {
    id: 'yama',
    name: 'Yama',
    title: 'God of Dharma',
    sanskrit: 'यम',
    rarity: 'epic',
    element: 'death',
    power: 80,
    wisdom: 92,
    influence: 88,
    hymns: 3,
    xpRequired: 2000,
    storyRequired: true,  // ✅ Story path + XP needed
    description: 'First mortal, king of the dead. Judge of souls and maintainer of cosmic order.',
    quote: 'Honor the King with thine oblations, Yama...',
    abilities: ['Divine Justice', 'Soul Judgment', 'Dharma Guardian'],
    color: '#2F4F4F',
    icon: '⚖️',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/88980171-5bac-4938-aca8-5a03092c1cef.png',
    unlockRequirement: 'Master dharma path'
  },

  maruts: {
    id: 'maruts',
    name: 'Maruts',
    title: 'Storm Gods',
    sanskrit: 'मरुत',
    rarity: 'epic',
    element: 'storm',
    power: 85,
    wisdom: 70,
    influence: 82,
    hymns: 33,
    xpRequired: 2100,
    storyRequired: true,  // ✅ Story path + XP needed
    description: 'Group of storm deities, companions of Indra. Fierce warriors with golden armor.',
    quote: 'Like brilliant heroes, active in their valor...',
    abilities: ['Storm Army', 'War Companions', 'Rain Bringers'],
    color: '#708090',
    icon: '⚔️',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/5c30ce27-fb64-458e-9f3a-a8b27663c50e.png',
    unlockRequirement: 'Lead 15 battles'
  },

  savitar: {
    id: 'savitar',
    name: 'Savitar',
    title: 'God of Sunrise',
    sanskrit: 'सवितृ',
    rarity: 'epic',
    element: 'solar',
    power: 82,
    wisdom: 88,
    influence: 85,
    hymns: 11,
    xpRequired: 2200,
    storyRequired: false,  // ✅ XP-ONLY: Auto-unlock at 2200 XP
    description: 'Solar deity who stimulates and impels all beings. Associated with the Gayatri mantra.',
    quote: 'We meditate on that excellent glory of divine Savitar...',
    abilities: ['Divine Stimulation', 'Golden Hands', 'Inspiration'],
    color: '#FFD700',
    icon: '🌄',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/21f24e0e-74e1-48c4-a43b-7b9f38a9bd90.png',
    unlockRequirement: 'Complete Gayatri meditation'
  },

  dyaus: {
    id: 'dyaus',
    name: 'Dyaus',
    title: 'Sky Father',
    sanskrit: 'द्यौस',
    rarity: 'epic',
    element: 'sky',
    power: 82,
    wisdom: 88,
    influence: 90,
    hymns: 6,
    xpRequired: 2300,
    storyRequired: false,  // ✅ XP-ONLY: Auto-unlock at 2300 XP
    description: 'Sky god, father of gods. Consort of Prithivi (Earth). Ancient celestial patriarch.',
    quote: 'Heaven and Earth, bestow prosperity on all...',
    abilities: ['Sky Dominion', 'Celestial Father', 'Cosmic Unity'],
    color: '#87CEEB',
    icon: '⭐',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/2d4fa020-8688-4a96-9b6b-d3aade2fd383.png',
    unlockRequirement: 'Unite heaven and earth'
  },

  // === 🟨 LEGENDARY TIER (2400-3400 XP) ===
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
    hymns: 289,
    xpRequired: 2400,
    storyRequired: true,  // ✅ Story path + XP needed
    description: 'King of gods, wielder of vajra (thunderbolt), slayer of demon Vritra. Most prominent deity in Rig Veda.',
    quote: 'I will declare the manly deeds of Indra...',
    abilities: ['Thunderbolt', 'Dragon Slayer', 'Rain Bringer'],
    color: '#4A90E2',
    icon: '⚡',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/be4e7c1a-94b8-42ef-a8a4-ab2f4abdf6f6.png',
    unlockRequirement: 'Defeat 10 story challenges'
  },

  rudra: {
    id: 'rudra',
    name: 'Rudra',
    title: 'God of Storms',
    sanskrit: 'रुद्र',
    rarity: 'legendary',
    element: 'storm',
    power: 92,
    wisdom: 88,
    influence: 87,
    hymns: 5,
    xpRequired: 2600,
    storyRequired: true,  // ✅ Story path + XP needed
    description: 'Storm god with healing powers. Father of the Maruts. Precursor to Shiva.',
    quote: 'Father of Maruts, let thy bliss approach us...',
    abilities: ['Storm Control', 'Divine Healing', 'Sacred Arrows'],
    color: '#4B0082',
    icon: '🌩️',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/4d566608-00e0-4ab1-a27b-bdd05a16c90e.png',
    unlockRequirement: 'Master Storm Path'
  },

  saraswati: {
    id: 'saraswati',
    name: 'Saraswati',
    title: 'Goddess of Knowledge',
    sanskrit: 'सरस्वती',
    rarity: 'legendary',
    element: 'knowledge',
    power: 70,
    wisdom: 100,
    influence: 95,
    hymns: 3,
    xpRequired: 2800,
    storyRequired: true,  // ✅ Story path + XP needed
    description: 'Goddess of knowledge, arts, and sacred river. Inspirer of eloquent speech.',
    quote: 'Saraswati, who perfectest our thoughts...',
    abilities: ['Divine Knowledge', 'Sacred Arts', 'Eloquence'],
    color: '#FF69B4',
    icon: '🎵',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/d1c6be08-d68d-49dc-88e2-dc835e01a7e9.png',
    unlockRequirement: 'Learn all hymns'
  },

  vishnu: {
    id: 'vishnu',
    name: 'Vishnu',
    title: 'God of Protection',
    sanskrit: 'विष्णु',
    rarity: 'legendary',
    element: 'preservation',
    power: 88,
    wisdom: 90,
    influence: 92,
    hymns: 6,
    xpRequired: 3000,
    storyRequired: true,  // ✅ Story path + XP needed
    description: 'The wide-striding one who measured the universe in three steps. Preserver deity.',
    quote: 'I will declare the mighty deeds of Vishnu...',
    abilities: ['Three Strides', 'Cosmic Preservation', 'Divine Protection'],
    color: '#4169E1',
    icon: '🛡️',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/5e6e3e52-9b70-4e42-b0f4-7da76e72cb05.png',
    unlockRequirement: 'Complete Protection Path'
  },

  aditi: {
    id: 'aditi',
    name: 'Aditi',
    title: 'Mother of Gods',
    sanskrit: 'अदिति',
    rarity: 'legendary',
    element: 'infinity',
    power: 78,
    wisdom: 95,
    influence: 98,
    hymns: 4,
    xpRequired: 3400,
    storyRequired: false,  // ✅ XP-ONLY: Auto-unlock at 3400 XP
    description: 'Mother of the Adityas (solar deities). Personification of infinity and boundlessness.',
    quote: 'May Aditi make us safe, with all her succors...',
    abilities: ['Infinite Protection', 'Mother Blessing', 'Boundless Grace'],
    color: '#DDA0DD',
    icon: '👑',
    image: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/c9a96ce1-0353-4356-87dc-988b6db6c9f7.png',
    unlockRequirement: 'Birth of legends'
  },

  // === 🔴 MYTHIC TIER (4000+ XP - ULTIMATE) ===
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
    xpRequired: 4000,
    storyRequired: true,  // ✅ Story path + XP needed (Ultimate requirement!)
    description: 'The supreme, ultimate reality. Beyond all gods, beyond creation itself. The source and essence of all existence.',
    quote: 'That ONE breathed, windless, by its own impulse...',
    abilities: ['Omnipotence', 'Transcendence', 'Unity'],
    color: '#C9ADA7',
    icon: '🕉️',
    image: null,
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

// === NEW HELPER FUNCTIONS FOR XP SYSTEM ===
export const getXPRequiredForDeity = (deityId) => {
  const deity = deityCards[deityId];
  return deity ? deity.xpRequired : 0;
};

export const isDeityLocked = (deityId, userXP) => {
  return userXP < getXPRequiredForDeity(deityId);
};

export const getXPToUnlock = (deityId, userXP) => {
  const required = getXPRequiredForDeity(deityId);
  const remaining = required - userXP;
  return Math.max(0, remaining);
};

export const getUnlockProgress = (deityId, userXP) => {
  const required = getXPRequiredForDeity(deityId);
  if (required === 0) return 100;
  return Math.min(100, (userXP / required) * 100);
};

export const getNextDeityToUnlock = (userXP) => {
  return getAllDeities()
    .filter(d => d.xpRequired > 0)
    .filter(d => isDeityLocked(d.id, userXP))
    .sort((a, b) => a.xpRequired - b.xpRequired)[0];
};

export const getUnlockedDeities = (userXP) => {
  return getAllDeities().filter(d => !isDeityLocked(d.id, userXP));
};

export const getLockedDeities = (userXP) => {
  return getAllDeities().filter(d => isDeityLocked(d.id, userXP));
};
