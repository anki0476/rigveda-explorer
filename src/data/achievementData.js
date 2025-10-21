import { 
  Footprints, Flame, Sunrise, Brain, GraduationCap, 
  Trophy, Crown, Globe, Lightbulb, BookOpen,
  Lock, Search, BookText, Scroll, User, Star,
  Shield  // ADD THIS for protection achievement
} from 'lucide-react';

export const achievements = {
  first_steps: {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Begin your Vedic journey',
    icon: '👣',
    iconComponent: Footprints,
    xpRequired: 0,
    reward: { title: 'Seeker', xp: 50 },
    tier: 'bronze'
  },

  fire_scholar: {
    id: 'fire_scholar',
    name: 'Fire Scholar',
    description: 'Master the teachings of Agni',
    icon: '🔥',
    iconComponent: Flame,
    xpRequired: 100,
    reward: { title: 'Agni Scholar', xp: 100 },
    tier: 'silver'
  },
  
  dawn_seeker: {
    id: 'dawn_seeker',
    name: 'Dawn Seeker',
    description: 'Greet the dawn with devotion',
    icon: '🌅',
    iconComponent: Sunrise,
    xpRequired: 100,
    reward: { title: 'Dawn Watcher', xp: 100 },
    tier: 'silver'
  },
  
  philosopher: {
    id: 'philosopher',
    name: 'Philosopher',
    description: 'Contemplate the deeper mysteries',
    icon: '🤔',
    iconComponent: Brain,
    xpRequired: 150,
    reward: { title: 'Contemplative', xp: 150 },
    tier: 'silver'
  },
  
  first_teacher: {
    id: 'first_teacher',
    name: 'First Teacher',
    description: 'Share your knowledge with others',
    icon: '🎓',
    iconComponent: GraduationCap,
    xpRequired: 150,
    reward: { title: 'Teacher', xp: 150 },
    tier: 'gold'
  },
  
  collector_novice: {
    id: 'collector_novice',
    name: 'Collector Novice',
    description: 'Collect your first 3 deity cards',
    icon: '🎴',
    iconComponent: Trophy,
    xpRequired: 100,
    reward: { title: 'Collector', xp: 100 },
    tier: 'bronze'
  },
  
  collector_master: {
    id: 'collector_master',
    name: 'Collector Master',
    description: 'Collect all deity cards',
    icon: '👑',
    iconComponent: Crown,
    xpRequired: 1000,
    reward: { title: 'Master Collector', xp: 500 },
    tier: 'platinum'
  },
  
  enlightened: {
    id: 'enlightened',
    name: 'Enlightened',
    description: 'Unlock the Nasadiya Sukta',
    icon: '🌌',
    iconComponent: Globe,
    xpRequired: 300,
    reward: { title: 'Enlightened Sage', xp: 300 },
    tier: 'platinum'
  },
  
  deep_thinker: {
    id: 'deep_thinker',
    name: 'Deep Thinker',
    description: 'Question the nature of creation',
    icon: '💭',
    iconComponent: Lightbulb,
    xpRequired: 150,
    reward: { title: 'Philosopher', xp: 150 },
    tier: 'gold'
  },
  
  hymn_master: {
    id: 'hymn_master',
    name: 'Hymn Master',
    description: 'Study 50 different hymns',
    icon: '📖',
    iconComponent: BookOpen,
    xpRequired: 500,
    reward: { title: 'Rishi', xp: 250 },
    tier: 'gold'
  },

  // === NEW STORY PATH ACHIEVEMENTS ===
  
  complete_protection: {
    id: 'complete_protection',
    name: 'Complete Protection Path',
    description: 'Master the guardian arts and protect the sacred traditions',
    icon: '🛡️',
    iconComponent: Shield,
    xpRequired: 800,
    reward: { title: 'Guardian', xp: 200 },
    tier: 'gold'
  },

  unite_heaven_earth: {
    id: 'unite_heaven_earth',
    name: 'Unite Heaven and Earth',
    description: 'Bridge the mortal and divine realms through cosmic unity',
    icon: '🌌',
    iconComponent: Globe,
    xpRequired: 850,
    reward: { title: 'Cosmic Unifier', xp: 210 },
    tier: 'platinum'
  },

  plant_hundred_seeds: {
    id: 'plant_hundred_seeds',
    name: 'Plant 100 Seeds',
    description: 'Perform sacred agriculture by planting 100 blessed seeds',
    icon: '🌱',
    iconComponent: Footprints,
    xpRequired: 700,
    reward: { title: 'Earth Child', xp: 200 },
    tier: 'gold'
  },

  seven_vigils: {
    id: 'seven_vigils',
    name: 'Complete 7 Night Vigils',
    description: 'Transform consciousness through seven sacred night vigils',
    icon: '🌙',
    iconComponent: Star,
    xpRequired: 750,
    reward: { title: 'Night Master', xp: 200 },
    tier: 'gold'
  },

  summon_twenty_rains: {
    id: 'summon_twenty_rains',
    name: 'Summon 20 Rains',
    description: 'Master rain ceremonies and call the life-giving waters',
    icon: '⛈️',
    iconComponent: Globe,
    xpRequired: 800,
    reward: { title: 'Rain Caller', xp: 200 },
    tier: 'gold'
  },

  purify_thirty_souls: {
    id: 'purify_thirty_souls',
    name: 'Purify 30 Souls',
    description: 'Guide thirty souls through sacred purification rituals',
    icon: '✨',
    iconComponent: Star,
    xpRequired: 900,
    reward: { title: 'Purifier', xp: 210 },
    tier: 'platinum'
  }
};

export const titles = {
  seeker: { name: 'Seeker', color: '#95A5A6', icon: '🔍', iconComponent: Search },
  scholar: { name: 'Scholar', color: '#3498DB', icon: '📚', iconComponent: BookText },
  teacher: { name: 'Teacher', color: '#F39C12', icon: '🎓', iconComponent: GraduationCap },
  philosopher: { name: 'Philosopher', color: '#9B59B6', icon: '🤔', iconComponent: Brain },
  rishi: { name: 'Rishi', color: '#E74C3C', icon: '🧘', iconComponent: User },
  master: { name: 'Master', color: '#1ABC9C', icon: '⭐', iconComponent: Star },
  enlightened: { name: 'Enlightened', color: '#FFD700', icon: '🌟', iconComponent: Star },
  // New titles
  guardian: { name: 'Guardian', color: '#34495E', icon: '🛡️', iconComponent: Shield },
  earth_child: { name: 'Earth Child', color: '#27AE60', icon: '🌱', iconComponent: Footprints },
  night_master: { name: 'Night Master', color: '#2C3E50', icon: '🌙', iconComponent: Star },
  rain_caller: { name: 'Rain Caller', color: '#3498DB', icon: '⛈️', iconComponent: Globe },
  purifier: { name: 'Purifier', color: '#9B59B6', icon: '✨', iconComponent: Star },
  cosmic_unifier: { name: 'Cosmic Unifier', color: '#8E44AD', icon: '🌌', iconComponent: Globe }
};

export const getAchievementById = (id) => achievements[id];
export const getAllAchievements = () => Object.values(achievements);
