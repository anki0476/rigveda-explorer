import { 
  Footprints, Flame, Sunrise, Brain, GraduationCap, 
  Trophy, Crown, Globe, Lightbulb, BookOpen,
  Lock, Search, BookText, Scroll, User, Star
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
  }
};

export const titles = {
  seeker: { name: 'Seeker', color: '#95A5A6', icon: '🔍', iconComponent: Search },
  scholar: { name: 'Scholar', color: '#3498DB', icon: '📚', iconComponent: BookText },
  teacher: { name: 'Teacher', color: '#F39C12', icon: '🎓', iconComponent: GraduationCap },
  philosopher: { name: 'Philosopher', color: '#9B59B6', icon: '🤔', iconComponent: Brain },
  rishi: { name: 'Rishi', color: '#E74C3C', icon: '🧘', iconComponent: User },
  master: { name: 'Master', color: '#1ABC9C', icon: '⭐', iconComponent: Star },
  enlightened: { name: 'Enlightened', color: '#FFD700', icon: '🌟', iconComponent: Star }
};

export const getAchievementById = (id) => achievements[id];
export const getAllAchievements = () => Object.values(achievements);
