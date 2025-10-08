import { 
  Sunrise, Flame, Sun, Sparkles, Waves, Scale, Zap, Droplet,
  Cloud, Scroll, GraduationCap, School, Mountain, Wind, 
  Eye, Globe, Infinity, Telescope, BookOpen, Feather, 
  Trees, Footprints, Home, User, Target, Star, Trophy,
  Brain, Heart, Lightbulb, Medal, BookText, Compass, Crown
} from 'lucide-react';

export const storyChapters = {
  start: {
    id: 'start',
    title: "The Awakening at Dawn",
    chapter: 1,
    description: "1500 BCE. The sacred Saraswati river flows beside your village. As dawn breaks, you hear the ancient chants of Rishis performing Agnihotra. A burning question stirs within you: What is the truth behind these sacred hymns? Your journey into the depths of RigVeda begins now.",
    icon: Sunrise,
    choices: [
      { id: 'vasishtha_path', text: "Approach Rishi Vasishtha at the sacred fire", label: "Path of Sacred Fire & Ritual Mastery", nextChapter: 'vasishtha_teachings', reward: { xp: 50 } },
      { id: 'vishwamitra_path', text: "Seek Rishi Vishwamitra in meditation", label: "Path of Divine Light & Mantras", nextChapter: 'vishwamitra_teachings', reward: { xp: 50 } },
      { id: 'river_meditation', text: "Sit alone by the Saraswati for self-reflection", label: "Path of Inner Waters & Cosmic Sound", nextChapter: 'saraswati_meditation', reward: { xp: 50 } },
      { id: 'observe_ritual', text: "Quietly observe the morning ritual", label: "Path of Observation & Hidden Knowledge", nextChapter: 'observer_path', reward: { xp: 50 } }
    ]
  },

  vasishtha_teachings: {
    id: 'vasishtha_teachings',
    title: "The Sacred Fire Teachings",
    chapter: 2,
    description: "Rishi Vasishtha welcomes you to the fire altar. 'Agni is not merely flame,' he says, 'but the cosmic messenger between mortals and gods. Through fire, we speak to the heavens.' The sacred smoke rises, carrying prayers skyward.",
    icon: Flame,
    unlocks: ['agni'],
    choices: [
      { id: 'learn_mantras', text: "Learn the fire mantras and their meanings", label: "Study the hymns of Agni (Mandala 1)", nextChapter: 'agni_hymns', reward: { xp: 75, deity: 'agni' } },
      { id: 'question_nature', text: "Ask about the true nature of Agni", label: "Seek deeper wisdom about fire's essence", nextChapter: 'fire_mysteries', reward: { xp: 60 } },
      { id: 'practical_ritual', text: "Request to assist in the morning ritual", label: "Learn through practice and service", nextChapter: 'ritual_training', reward: { xp: 50 } }
    ]
  },

  agni_hymns: {
    id: 'agni_hymns',
    title: "The Hymns of Fire",
    chapter: 3,
    description: "Vasishtha teaches you the sacred verses: 'Agni, I invoke thee, the purifier, the priest who sits at the altar, who offers sacrifice through the seasons.' You feel the ancient words awakening something within you.",
    icon: BookOpen,
    choices: [
      { id: 'master_chanting', text: "Master the chanting technique", label: "Perfect the sacred pronunciation", nextChapter: 'fire_mysteries', reward: { xp: 80 } },
      { id: 'understand_meaning', text: "Seek the deeper meaning behind the words", label: "Explore the philosophy of fire", nextChapter: 'fire_mysteries', reward: { xp: 90 } }
    ]
  },

  fire_mysteries: {
    id: 'fire_mysteries',
    title: "The Three Forms of Agni",
    chapter: 4,
    description: "Vasishtha reveals: 'Agni exists in three forms - as the terrestrial fire we see, as lightning in the atmosphere, and as the sun in the celestial realm. Understanding this trinity reveals the interconnection of all existence.'",
    icon: Zap,
    choices: [
      { id: 'seek_sun', text: "Journey to learn about the celestial fire", label: "Follow the path to Surya", nextChapter: 'solar_wisdom', reward: { xp: 100 } },
      { id: 'study_storm', text: "Study the atmospheric manifestation", label: "Seek knowledge of storms and lightning", nextChapter: 'storm_calling', reward: { xp: 100 } },
      { id: 'contemplate_unity', text: "Meditate on the unity of all three", label: "Seek the ultimate truth", nextChapter: 'convergence_point', reward: { xp: 120 } }
    ]
  },

  ritual_training: {
    id: 'ritual_training',
    title: "The Morning Oblation",
    chapter: 3,
    description: "You assist Vasishtha in the sacred ritual. He guides your hands as you offer ghee to the flames. 'Each offering is a conversation with the divine,' he explains. 'We give, and the cosmos responds.'",
    icon: Flame,
    choices: [
      { id: 'daily_practice', text: "Commit to daily fire ritual practice", label: "Become a ritual practitioner", nextChapter: 'fire_mysteries', reward: { xp: 70 } },
      { id: 'teach_others', text: "Ask to teach others in the village", label: "Path of the teacher", nextChapter: 'village_teacher', reward: { xp: 85, achievement: 'teacher' } }
    ]
  },

  village_teacher: {
    id: 'village_teacher',
    title: "The Village Instructor",
    chapter: 4,
    description: "You return to your village to share the sacred knowledge. Young students gather around as you teach them the fundamentals of fire worship. Through teaching, your own understanding deepens.",
    icon: Home,
    choices: [
      { id: 'expand_knowledge', text: "Realize you need to learn more yourself", label: "Return to seek advanced teachings", nextChapter: 'fire_mysteries', reward: { xp: 90 } },
      { id: 'combine_paths', text: "Invite other Rishis to teach diverse knowledge", label: "Unite different traditions", nextChapter: 'convergence_point', reward: { xp: 110 } }
    ]
  },

  vishwamitra_teachings: {
    id: 'vishwamitra_teachings',
    title: "The Gayatri Revelation",
    chapter: 2,
    description: "Vishwamitra sits in deep meditation, radiating an aura of profound peace. As you approach, he opens his eyes and speaks: 'I will teach you the most sacred of all mantras - the Gayatri. It is the essence of the Vedas, a prayer to Savitar, the divine illuminator.'",
    icon: Sun,
    unlocks: ['surya'],
    choices: [
      { id: 'learn_gayatri', text: "Receive the Gayatri initiation", label: "Learn the supreme mantra", nextChapter: 'gayatri_practice', reward: { xp: 100, deity: 'surya' } },
      { id: 'ask_power', text: "Ask about the source of mantra power", label: "Understand the science of sound", nextChapter: 'shabda_brahman', reward: { xp: 80 } },
      { id: 'meditation_training', text: "Request meditation training first", label: "Prepare the mind for the mantra", nextChapter: 'meditation_mastery', reward: { xp: 70 } }
    ]
  },

  gayatri_practice: {
    id: 'gayatri_practice',
    title: "The Sacred Syllables",
    chapter: 3,
    description: "Vishwamitra intones: 'Om Bhur Bhuvah Svah, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat.' The words resonate through your being. 'Meditate on this daily at sunrise,' he instructs.",
    icon: Sparkles,
    choices: [
      { id: 'sunrise_practice', text: "Practice at sunrise for 40 days", label: "Commit to disciplined practice", nextChapter: 'solar_wisdom', reward: { xp: 120 } },
      { id: 'explore_sound', text: "Study the vibrational science of the mantra", label: "Understand mantra mechanics", nextChapter: 'shabda_brahman', reward: { xp: 100 } }
    ]
  },

  shabda_brahman: {
    id: 'shabda_brahman',
    title: "The Cosmic Word",
    chapter: 4,
    description: "Vishwamitra explains the profound truth: 'All creation arose from primordial sound. The syllable OM contains all reality. When you chant, you align with the fundamental vibration of existence itself.'",
    icon: Waves,
    choices: [
      { id: 'creation_study', text: "Study the hymns of creation", label: "Explore the cosmic origins", nextChapter: 'convergence_point', reward: { xp: 150 } },
      { id: 'sound_meditation', text: "Practice sound meditation", label: "Become one with the cosmic vibration", nextChapter: 'meditation_mastery', reward: { xp: 130 } }
    ]
  },

  meditation_mastery: {
    id: 'meditation_mastery',
    title: "Stillness of Mind",
    chapter: 4,
    description: "Through weeks of practice, your mind becomes still as a windless lake. In this clarity, you begin to perceive truths hidden beneath the surface of reality.",
    icon: Brain,
    choices: [
      { id: 'continue_meditation', text: "Deepen your meditative practice", label: "Path of inner exploration", nextChapter: 'convergence_point', reward: { xp: 140 } },
      { id: 'combine_action', text: "Balance meditation with ritual action", label: "Unite contemplation and practice", nextChapter: 'convergence_point', reward: { xp: 130 } }
    ]
  },

  saraswati_meditation: {
    id: 'saraswati_meditation',
    title: "By the Sacred River",
    chapter: 2,
    description: "The Saraswati flows eternally, ancient and pure. Sitting on its banks, you contemplate the mystery of water - flowing yet unchanging, soft yet carving mountains, humble yet sustaining all life.",
    icon: Waves,
    unlocks: ['varuna'],
    choices: [
      { id: 'observe_flow', text: "Watch the river's eternal flow", label: "Learn from water's wisdom", nextChapter: 'water_wisdom', reward: { xp: 70 } },
      { id: 'ritual_bath', text: "Perform ritual ablutions", label: "Purify body and spirit", nextChapter: 'purification_path', reward: { xp: 60, deity: 'varuna' } },
      { id: 'deep_meditation', text: "Meditate on cosmic order", label: "Contemplate Rta (cosmic law)", nextChapter: 'rta_meditation', reward: { xp: 80 } }
    ]
  },

  water_wisdom: {
    id: 'water_wisdom',
    title: "The Teaching of Waters",
    chapter: 3,
    description: "An old sage joins you by the river. 'Water teaches us,' he says. 'It adapts to every vessel, seeks the lowest place, yet nothing can resist it. This is the way of wisdom - gentle persistence, humble power.'",
    icon: Droplet,
    choices: [
      { id: 'learn_more', text: "Ask about Varuna, lord of waters", label: "Study the cosmic ocean", nextChapter: 'varuna_mysteries', reward: { xp: 90 } },
      { id: 'practical_wisdom', text: "Apply water's teaching to life", label: "Embody the teaching", nextChapter: 'convergence_point', reward: { xp: 100 } }
    ]
  },

  varuna_mysteries: {
    id: 'varuna_mysteries',
    title: "The All-Seeing Guardian",
    chapter: 4,
    description: "The sage speaks of Varuna: 'He who sees all, from whom no deed is hidden. The cosmic ocean is his domain, and all laws of right and wrong flow from him. His gaze pierces through every deception.'",
    icon: Eye,
    choices: [
      { id: 'moral_law', text: "Study the nature of truth and falsehood", label: "Understand cosmic justice", nextChapter: 'rta_meditation', reward: { xp: 110 } },
      { id: 'ocean_meditation', text: "Meditate on the infinite ocean", label: "Contemplate boundlessness", nextChapter: 'convergence_point', reward: { xp: 120 } }
    ]
  },

  rta_meditation: {
    id: 'rta_meditation',
    title: "The Cosmic Order",
    chapter: 4,
    description: "You come to understand Rta - the fundamental order underlying all existence. The sun rises and sets in perfect rhythm, seasons turn, rivers flow to the sea. This is not mere repetition but divine law, the very structure of reality.",
    icon: Scale,
    choices: [
      { id: 'dharma_study', text: "Study how humans align with this order", label: "Learn about Dharma", nextChapter: 'convergence_point', reward: { xp: 140 } },
      { id: 'cosmic_meditation', text: "Meditate on the universal patterns", label: "Perceive the hidden connections", nextChapter: 'convergence_point', reward: { xp: 130 } }
    ]
  },

  observer_path: {
    id: 'observer_path',
    title: "The Silent Witness",
    chapter: 2,
    description: "You watch from a respectful distance as the ritual unfolds. The precise movements, the sacred words, the rising smoke - each element has meaning. Your keen observation reveals patterns and connections others might miss.",
    icon: Eye,
    choices: [
      { id: 'continue_observing', text: "Observe multiple different rituals", label: "Become a scholar of traditions", nextChapter: 'ritual_scholar', reward: { xp: 70 } },
      { id: 'ask_questions', text: "Approach the Rishis with thoughtful questions", label: "Seek direct instruction", nextChapter: 'multiple_teachers', reward: { xp: 80 } },
      { id: 'independent_practice', text: "Begin your own contemplative practice", label: "Forge your own path", nextChapter: 'independent_seeker', reward: { xp: 65 } }
    ]
  },

  ritual_scholar: {
    id: 'ritual_scholar',
    title: "Master of Ceremonies",
    chapter: 3,
    description: "Over months and years, you observe and study every ritual, every tradition. You become a living repository of sacred knowledge, understanding not just the 'how' but the profound 'why' behind each practice.",
    icon: BookText,
    choices: [
      { id: 'teach_rituals', text: "Share your comprehensive knowledge", label: "Become a teacher of traditions", nextChapter: 'convergence_point', reward: { xp: 120 } },
      { id: 'deeper_meaning', text: "Seek the ultimate meaning behind all rituals", label: "Quest for the source", nextChapter: 'convergence_point', reward: { xp: 130 } }
    ]
  },

  multiple_teachers: {
    id: 'multiple_teachers',
    title: "The Universal Student",
    chapter: 3,
    description: "You seek wisdom from every available source - Vasishtha's fire knowledge, Vishwamitra's mantra mastery, the riverside sages' meditation techniques. Each teacher adds a facet to your understanding.",
    icon: GraduationCap,
    choices: [
      { id: 'synthesize_learning', text: "Integrate all teachings into unified wisdom", label: "Seek the underlying unity", nextChapter: 'convergence_point', reward: { xp: 140 } },
      { id: 'continue_seeking', text: "Search for even more teachers and traditions", label: "Expand your knowledge further", nextChapter: 'wandering_scholar', reward: { xp: 110 } }
    ]
  },

  wandering_scholar: {
    id: 'wandering_scholar',
    title: "The Traveling Seeker",
    chapter: 4,
    description: "You travel from village to village, teacher to teacher, absorbing wisdom like the earth absorbs rain. Each place, each person reveals new insights about the sacred hymns and their meanings.",
    icon: Footprints,
    choices: [
      { id: 'return_home', text: "Return home with accumulated wisdom", label: "Share what you have learned", nextChapter: 'convergence_point', reward: { xp: 150 } },
      { id: 'continue_journey', text: "Continue wandering indefinitely", label: "Make the journey itself your destination", nextChapter: 'eternal_seeker', reward: { xp: 130 } }
    ]
  },

  independent_seeker: {
    id: 'independent_seeker',
    title: "The Self-Taught Path",
    chapter: 3,
    description: "Without formal instruction, you develop your own practices based on observation and intuition. Sometimes this leads to dead ends, sometimes to unique insights no traditional teaching contains.",
    icon: Compass,
    choices: [
      { id: 'seek_validation', text: "Present your findings to learned Rishis", label: "Test your understanding", nextChapter: 'multiple_teachers', reward: { xp: 90 } },
      { id: 'trust_intuition', text: "Continue trusting your inner guidance", label: "Follow your unique path", nextChapter: 'convergence_point', reward: { xp: 120 } }
    ]
  },

  convergence_point: {
    id: 'convergence_point',
    title: "Where All Paths Meet",
    chapter: 5,
    description: "Through your unique journey, you arrive at a profound realization: all the deities, all the rituals, all the teachings point toward the same ultimate truth. The many are expressions of the One. The paths differ, but the destination is singular.",
    icon: Target,
    choices: [
      { id: 'ultimate_truth', text: "Seek to understand this ultimate reality", label: "Quest for Brahman", nextChapter: 'brahman_quest', reward: { xp: 140 } },
      { id: 'teach_unity', text: "Teach others about the unity you've discovered", label: "Become a teacher of synthesis", nextChapter: 'master_teacher', reward: { xp: 130 } },
      { id: 'live_truth', text: "Simply live according to this understanding", label: "Embody the teaching", nextChapter: 'silent_sage', reward: { xp: 120 } }
    ]
  },

  brahman_quest: {
    id: 'brahman_quest',
    title: "Beyond Name and Form",
    chapter: 6,
    description: "You seek that which underlies all existence - not a deity with attributes, but the formless reality from which all forms arise. This is no longer worship but direct inquiry into the nature of Being itself.",
    icon: Infinity,
    unlocks: ['brahman'],
    choices: [
      { id: 'nasadiya_study', text: "Study the Creation Hymn (Nasadiya Sukta)", label: "Contemplate the origin of existence", nextChapter: 'nasadiya_wisdom', reward: { xp: 160, deity: 'brahman' } },
      { id: 'deep_meditation', text: "Attempt direct realization through meditation", label: "Seek immediate knowledge", nextChapter: 'meditation_depths', reward: { xp: 150 } }
    ]
  },

  nasadiya_wisdom: {
    id: 'nasadiya_wisdom',
    title: "The Unanswerable Question",
    chapter: 7,
    description: "The Nasadiya Sukta speaks: 'Then even nothingness was not, nor existence. Who truly knows? Perhaps even the gods came later. Perhaps only the One who watches from the highest heaven knows - or perhaps not even He.' This cosmic humility transforms you.",
    icon: Globe,
    choices: [
      { id: 'embrace_mystery', text: "Accept the profound mystery of existence", label: "Find peace in not-knowing", nextChapter: 'enlightened_acceptance', reward: { xp: 180 } },
      { id: 'continue_seeking', text: "Though the question is unanswerable, continue contemplating", label: "Make the question your meditation", nextChapter: 'eternal_contemplation', reward: { xp: 170 } }
    ]
  },

  meditation_depths: {
    id: 'meditation_depths',
    title: "The Inner Silence",
    chapter: 7,
    description: "Days blur into weeks. Your meditation deepens to profound levels. There are moments when subject and object dissolve, when the meditator and the meditated become one. Words fail to capture these experiences.",
    icon: Brain,
    choices: [
      { id: 'share_experience', text: "Attempt to guide others to similar realizations", label: "Become a meditation master", nextChapter: 'master_teacher', reward: { xp: 180 } },
      { id: 'continue_practice', text: "Go even deeper into the silence", label: "Pursue complete liberation", nextChapter: 'enlightened_acceptance', reward: { xp: 190 } }
    ]
  },

  master_teacher: {
    id: 'master_teacher',
    title: "The Guru's Mantle",
    chapter: 8,
    description: "Students seek you out, drawn by your wisdom and presence. You establish a teaching lineage, carefully guiding seekers along the same path you traveled. Your name will be remembered through generations.",
    icon: Crown,
    choices: [
      { id: 'create_school', text: "Establish a permanent school of teaching", label: "Found a lasting tradition", nextChapter: 'legacy_builder', reward: { xp: 200, achievement: 'master_teacher' } },
      { id: 'wandering_teacher', text: "Teach while traveling from place to place", label: "Spread wisdom far and wide", nextChapter: 'wandering_guru', reward: { xp: 190 } }
    ]
  },

  silent_sage: {
    id: 'silent_sage',
    title: "Beyond Words",
    chapter: 8,
    description: "You retreat from teaching and speaking. Your very presence becomes a teaching. People travel great distances just to sit silently in your company, and they leave transformed without a word being spoken.",
    icon: Heart,
    choices: [
      { id: 'complete_silence', text: "Maintain absolute silence for the rest of your life", label: "The path of mauna", nextChapter: 'enlightened_acceptance', reward: { xp: 200, achievement: 'silent_sage' } },
      { id: 'occasional_teaching', text: "Speak rarely, only when absolutely necessary", label: "Let each word carry maximum weight", nextChapter: 'enlightened_acceptance', reward: { xp: 190 } }
    ]
  },

  enlightened_acceptance: {
    id: 'enlightened_acceptance',
    title: "The Final Understanding",
    chapter: 9,
    description: "You have traveled far, learned much, and ultimately discovered that the greatest wisdom lies in acceptance of mystery. The RigVeda's hymns are not meant to answer all questions but to keep us in right relationship with the unknowable. You have found peace.",
    icon: Star,
    choices: [
      { id: 'complete_journey', text: "Reflect on your entire journey", label: "See the path you have walked", nextChapter: 'ending_reflection', reward: { xp: 250, achievement: 'enlightened' } }
    ]
  },

  legacy_builder: {
    id: 'legacy_builder',
    title: "Builder of Traditions",
    chapter: 9,
    description: "Your school flourishes. Hundreds of students learn the sacred knowledge you have systematized and preserved. Your interpretation of the RigVeda becomes a major tradition, influencing countless future generations.",
    icon: Trophy,
    choices: [
      { id: 'see_legacy', text: "Watch your teachings spread through the land", label: "Complete your life's work", nextChapter: 'ending_reflection', reward: { xp: 250, achievement: 'legacy_builder' } }
    ]
  },

  wandering_guru: {
    id: 'wandering_guru',
    title: "The Traveling Light",
    chapter: 9,
    description: "Until your final days, you walk from village to village, teaching seekers, performing rituals, sharing wisdom. You own nothing, yet you have given everything. Your path is your teaching, your life is your sermon.",
    icon: Footprints,
    choices: [
      { id: 'complete_wandering', text: "Continue walking until the very end", label: "Make peace with impermanence", nextChapter: 'ending_reflection', reward: { xp: 250, achievement: 'eternal_wanderer' } }
    ]
  },

  eternal_contemplation: {
    id: 'eternal_contemplation',
    title: "Living the Question",
    chapter: 9,
    description: "The unanswerable question becomes your constant companion. Not seeking an answer, but dwelling in the mystery itself becomes your practice. This living question keeps you forever humble, forever curious, forever in wonder.",
    icon: Lightbulb,
    choices: [
      { id: 'final_peace', text: "Find peace in permanent wonder", label: "Complete the journey", nextChapter: 'ending_reflection', reward: { xp: 250, achievement: 'eternal_seeker' } }
    ]
  },

  ending_reflection: {
    id: 'ending_reflection',
    title: "The Journey Complete",
    chapter: 10,
    description: "As your life draws toward its natural conclusion, you look back on the path you have walked. From that first morning by the sacred fire to this moment of final understanding, each step was necessary. The RigVeda has been your guide, your teacher, your companion. And now you understand: the journey was always about becoming who you truly are.",
    icon: Medal,
    choices: []
  }
};
