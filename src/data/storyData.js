import { 
  Sunrise, Flame, Sun, Sparkles, Waves, Scale, Zap, Droplet,
  Cloud, Scroll, GraduationCap, School, Mountain, Wind, 
  Eye, Globe, Infinity, Telescope, BookOpen, Feather, 
  Trees, Footprints, Home, User, Target, Star, Trophy,
  Brain, Heart, Lightbulb, Medal, BookText,Shield,Sprout, Moon, CloudRain, Compass, Crown
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
      { id: 'observe_ritual', text: "Quietly observe the morning ritual", label: "Path of Observation & Hidden Knowledge", nextChapter: 'observer_path', reward: { xp: 50 } },
      { id: 'seek_healing_path', text: "Witness the village healer treating the sick", label: "Path of Medicine & Compassion", nextChapter: 'healing_path', reward: { xp: 50 } },
      { id: 'warrior_calling_early', text: "Notice warriors training at the edge of the village", label: "Path of Protection & Strength", nextChapter: 'warrior_initiation', reward: { xp: 50 } },
      { id: 'seek_protection', text: "Ask about defending sacred traditions", label: "Path of Protection & Guardianship", nextChapter: 'protection_path', reward: { xp: 50 } },
      { id: 'earth_observation', text: "Observe farmers performing earth rituals", label: "Path of Sacred Agriculture", nextChapter: 'agricultural_path', reward: { xp: 50 } }
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
      { id: 'practical_ritual', text: "Request to assist in the morning ritual", label: "Learn through practice and service", nextChapter: 'ritual_training', reward: { xp: 50 } },
      { id: 'protect_fire', text: "Ask about protecting sacred traditions through strength", label: "Path of the warrior-protector", nextChapter: 'warrior_initiation', reward: { xp: 65 } },
      { id: 'build_unity', text: "Inquire about uniting different traditions peacefully", label: "Path of alliance and peace", nextChapter: 'alliance_builder', reward: { xp: 60 } },
      { id: 'protect_traditions', text: "Learn about protecting sacred knowledge", label: "Guardian duties", nextChapter: 'protection_path', reward: { xp: 60 } },
      { id: 'night_practices', text: "Ask about night-time spiritual practices", label: "Night vigil path", nextChapter: 'night_vigil_path', reward: { xp: 55 } }
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
      { id: 'meditation_training', text: "Request meditation training first", label: "Prepare the mind for the mantra", nextChapter: 'meditation_mastery', reward: { xp: 70 } },
      { id: 'witness_healing', text: "Hear about sacred healing practices", label: "Path of medicine and Ashvins", nextChapter: 'healing_path', reward: { xp: 70 } },
      { id: 'observe_storm', text: "Be drawn to distant thunder during meditation", label: "Path of storms and Indra", nextChapter: 'storm_calling', reward: { xp: 75 } },
      { id: 'cosmic_unity_quest', text: "Ask about uniting heaven and earth", label: "Cosmic unity path", nextChapter: 'cosmic_unity_path', reward: { xp: 65 } },
      { id: 'purification_interest', text: "Learn about spiritual purification", label: "Purification path", nextChapter: 'purification_path', reward: { xp: 60 } }
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
      { id: 'deep_meditation', text: "Meditate on cosmic order", label: "Contemplate Rta (cosmic law)", nextChapter: 'rta_meditation', reward: { xp: 80 } },
      { id: 'rain_prayers', text: "Pray for rain beside the sacred river", label: "Rain ceremony path", nextChapter: 'rain_ceremony_path', reward: { xp: 65 } }
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
      { id: 'live_truth', text: "Simply live according to this understanding", label: "Embody the teaching", nextChapter: 'silent_sage', reward: { xp: 120 } },
      { id: 'healing_late', text: "Apply your wisdom to healing others' suffering", label: "Path of healing arts", nextChapter: 'healing_path', reward: { xp: 115 } },
      { id: 'warrior_late', text: "Use your understanding to protect dharma through strength", label: "Path of righteous warrior", nextChapter: 'warrior_initiation', reward: { xp: 115 } },
      { id: 'diplomacy_late', text: "Build bridges between different traditions", label: "Path of alliance-building", nextChapter: 'alliance_builder', reward: { xp: 115 } },
      { id: 'protection_late', text: "Dedicate your wisdom to protecting dharma", label: "Guardian path", nextChapter: 'protection_path', reward: { xp: 110 } },
      { id: 'unity_late', text: "Seek to unite all aspects of existence", label: "Cosmic unity path", nextChapter: 'cosmic_unity_path', reward: { xp: 115 } },
      { id: 'agriculture_late', text: "Honor Earth Mother through sacred agriculture", label: "Earth path", nextChapter: 'agricultural_path', reward: { xp: 110 } },
      { id: 'vigil_late', text: "Undertake the sacred night vigils", label: "Tapas path", nextChapter: 'night_vigil_path', reward: { xp: 110 } },
      { id: 'rain_late', text: "Learn to call the life-giving rains", label: "Rain ceremony path", nextChapter: 'rain_ceremony_path', reward: { xp: 110 } },
      { id: 'purification_late', text: "Dedicate yourself to purifying souls", label: "Purification path", nextChapter: 'purification_path', reward: { xp: 115 } }

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
  },

  // ✅ ADD THESE NEW CHAPTERS TO THE END (after 'ending_reflection' and before the closing };)

  // === STORM & THUNDER PATH ===
  storm_calling: {
    id: 'storm_calling',
    title: "The Thunder Awakens",
    chapter: 5,
    description: "You seek the knowledge of storms. Dark clouds gather as you climb the sacred mountain. A flash of lightning illuminates an ancient hermit who grins wildly. 'You wish to know Indra? Then you must learn to dance with the storm!'",
    icon: Cloud,
    unlocks: ['indra'],
    choices: [
      { id: 'learn_thunderbolts', text: "Study the hymns of Indra's vajra", label: "Master the weapon of the gods", nextChapter: 'vajra_wisdom', reward: { xp: 110, deity: 'indra' } },
      { id: 'storm_meditation', text: "Meditate during a thunderstorm", label: "Face your fear of nature's fury", nextChapter: 'storm_meditation_path', reward: { xp: 100 } },
      { id: 'warrior_training', text: "Request training in warrior arts", label: "Learn the way of the Kshatriya", nextChapter: 'warrior_initiation', reward: { xp: 95 } }
    ]
  },

  vajra_wisdom: {
    id: 'vajra_wisdom',
    title: "The Thunderbolt's Secret",
    chapter: 6,
    description: "The hermit teaches: 'Indra's vajra is not mere violence - it is righteous force that destroys obstacles and demons. With it, he freed the waters trapped by Vritra. Power without purpose is destruction; purpose without power is helpless.'",
    icon: Zap,
    choices: [
      { id: 'study_vritra', text: "Learn about the battle with Vritra", label: "Understand cosmic conflict", nextChapter: 'vritra_battle', reward: { xp: 120 } },
      { id: 'righteous_power', text: "Contemplate righteous use of force", label: "Balance strength and dharma", nextChapter: 'dharma_warrior', reward: { xp: 130 } }
    ]
  },

  vritra_battle: {
    id: 'vritra_battle',
    title: "The Serpent of Drought",
    chapter: 7,
    description: "The hymn tells of Vritra, the serpent-demon who imprisoned the life-giving waters. Indra, fortified by soma, wielded his thunderbolt and shattered the demon, releasing the rivers to flow again. This is more than myth - it is the eternal battle of life against stagnation.",
    icon: Waves,
    choices: [
      { id: 'identify_vritra', text: "Recognize the 'Vritra' in your own life", label: "Internal conquest", nextChapter: 'inner_demons', reward: { xp: 140 } },
      { id: 'become_warrior', text: "Pledge to fight for righteousness in the world", label: "External dharma-war", nextChapter: 'dharma_warrior', reward: { xp: 135 } }
    ]
  },

  storm_meditation_path: {
    id: 'storm_meditation_path',
    title: "Sitting in the Storm",
    chapter: 6,
    description: "Rain pounds, thunder crashes, lightning splits the sky. You sit unmoving. At first, terror. Then, slowly, a strange peace emerges. The storm is not hostile - it simply IS, a manifestation of cosmic energy neither good nor evil.",
    icon: Mountain,
    choices: [
      { id: 'storm_master', text: "Complete 108 storm meditations", label: "Become one with the tempest", nextChapter: 'storm_master_path', reward: { xp: 150 } },
      { id: 'return_teaching', text: "Share this fearlessness with others", label: "Teach courage", nextChapter: 'master_teacher', reward: { xp: 140 } }
    ]
  },

  storm_master_path: {
    id: 'storm_master_path',
    title: "Master of Storms",
    chapter: 8,
    description: "You have sat through countless storms, and now they hold no terror. More than that - you can sense their coming, read their moods, understand their purpose. People call you the Storm Sage, one who has befriended the fury of heaven.",
    icon: Crown,
    choices: [
      { id: 'storm_sage_completion', text: "Accept your role as Storm Sage", label: "Master the storm path completely", nextChapter: 'ending_reflection', reward: { xp: 200, achievement: 'storm_master' } }
    ]
  },

  // === WARRIOR & BATTLE PATH ===
  warrior_initiation: {
    id: 'warrior_initiation',
    title: "The Kshatriya's Oath",
    chapter: 6,
    description: "A grizzled warrior-sage accepts you as student. 'To be Kshatriya is not to love violence but to master it. We train not for conquest but for protection, not for glory but for dharma. Your strength must serve the weak, not dominate them.'",
    icon: Target,
    choices: [
      { id: 'weapon_training', text: "Begin intensive weapons training", label: "Master martial arts", nextChapter: 'weapon_master', reward: { xp: 100 } },
      { id: 'strategic_study', text: "Study strategy and leadership", label: "Learn to lead warriors", nextChapter: 'battle_strategy', reward: { xp: 110 } },
      { id: 'spiritual_warrior', text: "Focus on inner strength over outer", label: "Become a spiritual warrior", nextChapter: 'dharma_warrior', reward: { xp: 115 } }
    ]
  },

  weapon_master: {
    id: 'weapon_master',
    title: "The Art of Combat",
    chapter: 7,
    description: "Years of practice with sword, bow, spear, and mace transform your body into a weapon. Yet your teacher reminds you: 'True mastery is knowing when NOT to fight. The greatest victory is the battle avoided through wisdom.'",
    icon: Target,
    choices: [
      { id: 'test_skills', text: "Test your skills in ritual combat", label: "Prove your prowess", nextChapter: 'first_battle', reward: { xp: 130 } },
      { id: 'teach_warriors', text: "Begin teaching younger warriors", label: "Pass on your knowledge", nextChapter: 'warrior_school', reward: { xp: 125 } }
    ]
  },

  battle_strategy: {
    id: 'battle_strategy',
    title: "The General's Wisdom",
    chapter: 7,
    description: "You study the ancient texts of war - how terrain shapes battle, how morale decides victory, how a wise leader preserves their warriors' lives. Strategy is philosophy made practical, ethics tested by fire.",
    icon: BookText,
    choices: [
      { id: 'lead_expedition', text: "Lead a defensive expedition", label: "Protect your people", nextChapter: 'first_battle', reward: { xp: 140 } },
      { id: 'diplomatic_warrior', text: "Combine strategy with diplomacy", label: "Win without fighting", nextChapter: 'alliance_builder', reward: { xp: 145 } }
    ]
  },

  first_battle: {
    id: 'first_battle',
    title: "Baptism of Fire",
    chapter: 8,
    description: "Raiders threaten a neighboring village. You lead the defense. The chaos of real combat is nothing like training - it is terror and confusion. Yet your discipline holds. You fight not with hatred but with purpose: to protect the innocent.",
    icon: Zap,
    choices: [
      { id: 'victory_reflection', text: "Reflect on the cost of victory", label: "Understand war's true nature", nextChapter: 'battle_series', reward: { xp: 150 } },
      { id: 'seek_peace', text: "Pursue peace negotiations after victory", label: "End conflict through understanding", nextChapter: 'alliance_builder', reward: { xp: 155 } }
    ]
  },

  battle_series: {
    id: 'battle_series',
    title: "The Fifteen Battles",
    chapter: 9,
    description: "Over the years, you fight in fifteen battles - some defensive, some to protect trade routes, some to stop injustice. Each leaves scars, both visible and hidden. You become known as a formidable warrior, but you never forget: violence, even righteous violence, always has a cost.",
    icon: Medal,
    choices: [
      { id: 'warrior_sage', text: "Retire as a battle-tested sage", label: "Combine warrior wisdom with spiritual insight", nextChapter: 'ending_reflection', reward: { xp: 220, achievement: 'fifteen_battles' } }
    ]
  },

  dharma_warrior: {
    id: 'dharma_warrior',
    title: "The Righteous Blade",
    chapter: 7,
    description: "You dedicate yourself to dharma-yuddha - righteous warfare. Not fighting for personal gain or glory, but as a sacred duty to protect dharma itself. Your strength becomes a shield for the weak, your courage a beacon for the frightened.",
    icon: Scale,
    choices: [
      { id: 'protect_dharma', text: "Devote your life to protecting dharma", label: "Become a guardian", nextChapter: 'dharma_guardian', reward: { xp: 160 } },
      { id: 'teach_dharma_combat', text: "Teach others the way of righteous combat", label: "Create a tradition of dharma-warriors", nextChapter: 'warrior_school', reward: { xp: 155 } }
    ]
  },

  dharma_guardian: {
    id: 'dharma_guardian',
    title: "Guardian of Sacred Law",
    chapter: 8,
    description: "You become a living embodiment of dharma-protection. Wherever injustice arises, you appear. Wherever the weak are oppressed, you stand as their shield. Your name becomes legendary - not for conquests, but for righteousness.",
    icon: Crown,
    choices: [
      { id: 'guardian_completion', text: "Continue protecting dharma until your last breath", label: "Complete the guardian's path", nextChapter: 'ending_reflection', reward: { xp: 210, achievement: 'dharma_guardian' } }
    ]
  },

  warrior_school: {
    id: 'warrior_school',
    title: "The Academy of Warriors",
    chapter: 8,
    description: "You establish a school teaching both martial prowess and ethical discipline. Your students learn that true warrior-hood means protecting the helpless, not dominating them. The school attracts students from across the land.",
    icon: School,
    choices: [
      { id: 'expand_school', text: "Expand the school's influence", label: "Create a lasting warrior tradition", nextChapter: 'ending_reflection', reward: { xp: 200, achievement: 'warrior_teacher' } }
    ]
  },

  inner_demons: {
    id: 'inner_demons',
    title: "The Battle Within",
    chapter: 8,
    description: "You realize the greatest Vritra is not external but internal - the demons of fear, anger, greed, and ignorance that imprison your inner waters of wisdom. The real thunderbolt is self-awareness; the true battle is with yourself.",
    icon: Brain,
    choices: [
      { id: 'conquer_self', text: "Dedicate years to conquering inner demons", label: "Win the inner war", nextChapter: 'self_mastery', reward: { xp: 170 } },
      { id: 'help_others_conquer', text: "Help others face their inner demons", label: "Become a psychological healer", nextChapter: 'healing_teacher', reward: { xp: 165 } }
    ]
  },

  self_mastery: {
    id: 'self_mastery',
    title: "Victory Over Self",
    chapter: 9,
    description: "After years of internal struggle, you achieve victory over your inner demons. Fear no longer paralyzes you. Anger no longer controls you. Greed no longer drives you. This inner freedom is the greatest achievement, worth more than any external conquest.",
    icon: Trophy,
    choices: [
      { id: 'share_mastery', text: "Teach the path of self-mastery", label: "Guide others to inner freedom", nextChapter: 'ending_reflection', reward: { xp: 230, achievement: 'self_master' } }
    ]
  },

  // === HEALING & MEDICINE PATH ===
  healing_path: {
    id: 'healing_path',
    title: "The Call to Heal",
    chapter: 5,
    description: "During your travels, you encounter a village ravaged by disease. An elderly medicine woman works tirelessly to save lives. Seeing your interest, she says: 'Healing is the noblest art. The Ashvins, divine physicians, taught us that all knowledge should ultimately serve to ease suffering.'",
    icon: Heart,
    unlocks: ['ashvins'],
    choices: [
      { id: 'learn_herbs', text: "Study herbal medicine", label: "Learn the healing plants", nextChapter: 'herbal_wisdom', reward: { xp: 90, deity: 'ashvins' } },
      { id: 'spiritual_healing', text: "Study healing through mantras and rituals", label: "Explore spiritual medicine", nextChapter: 'mantra_healing', reward: { xp: 95 } },
      { id: 'become_apprentice', text: "Become the medicine woman's apprentice", label: "Learn through service", nextChapter: 'healing_apprentice', reward: { xp: 85 } }
    ]
  },

  herbal_wisdom: {
    id: 'herbal_wisdom',
    title: "The Language of Plants",
    chapter: 6,
    description: "The medicine woman teaches you hundreds of plants - which heal wounds, which reduce fever, which calm the mind, which ease pain. Each plant is a gift from the earth, a form of divine compassion made tangible.",
    icon: Trees,
    choices: [
      { id: 'master_herbalism', text: "Master the complete herbal pharmacopeia", label: "Become an expert herbalist", nextChapter: 'master_healer', reward: { xp: 130 } },
      { id: 'discover_plants', text: "Search for new healing plants", label: "Expand medical knowledge", nextChapter: 'plant_explorer', reward: { xp: 125 } }
    ]
  },

  mantra_healing: {
    id: 'mantra_healing',
    title: "Healing Through Sound",
    chapter: 6,
    description: "You learn that certain mantras, properly intoned, can influence the body's healing processes. The Ashvins themselves used sacred sounds to restore sight to the blind and mobility to the lame. Sound vibration affects matter - this is cosmic law.",
    icon: Waves,
    choices: [
      { id: 'combine_healing', text: "Combine mantra healing with herbal medicine", label: "Integrate multiple healing arts", nextChapter: 'master_healer', reward: { xp: 140 } },
      { id: 'pure_sound', text: "Focus exclusively on sound healing", label: "Master vibrational medicine", nextChapter: 'sound_healer', reward: { xp: 135 } }
    ]
  },

  healing_apprentice: {
    id: 'healing_apprentice',
    title: "Learning Through Service",
    chapter: 6,
    description: "For years, you assist the medicine woman. You clean wounds, prepare medicines, comfort the dying, celebrate births. Through hands-on practice, you learn what no book can teach - the art of presence, the medicine of compassion.",
    icon: Heart,
    choices: [
      { id: 'continue_service', text: "Continue serving the sick and injured", label: "Dedicate your life to healing", nextChapter: 'master_healer', reward: { xp: 135 } },
      { id: 'study_more', text: "Seek additional medical knowledge", label: "Travel to learn from other healers", nextChapter: 'traveling_healer', reward: { xp: 130 } }
    ]
  },

  master_healer: {
    id: 'master_healer',
    title: "The Complete Physician",
    chapter: 7,
    description: "You have mastered multiple healing traditions - herbs, mantras, surgery, dietary therapy, psychological counseling. People travel great distances to seek your care. You understand that healing is not just treating symptoms but addressing the whole person.",
    icon: Medal,
    choices: [
      { id: 'healing_school', text: "Establish a school of medicine", label: "Train the next generation of healers", nextChapter: 'medical_school', reward: { xp: 160 } },
      { id: 'continue_healing', text: "Continue healing until you cannot", label: "Serve as a healer your entire life", nextChapter: 'healing_sage', reward: { xp: 155 } }
    ]
  },

  medical_school: {
    id: 'medical_school',
    title: "Academy of Healing Arts",
    chapter: 8,
    description: "Your medical school becomes renowned. Students learn not just techniques but ethics - that healing should be offered to all, rich and poor alike. Your systematic approach to medicine will influence healers for generations.",
    icon: School,
    choices: [
      { id: 'medical_legacy', text: "Ensure your medical knowledge survives", label: "Create lasting healing traditions", nextChapter: 'ending_reflection', reward: { xp: 200, achievement: 'healing_master' } }
    ]
  },

  healing_sage: {
    id: 'healing_sage',
    title: "The Healing Presence",
    chapter: 8,
    description: "In your later years, you find that sometimes your mere presence heals. You've cultivated such compassion, such deep understanding, that patients feel better just being near you. This is healing at its most subtle - the medicine of wisdom and love.",
    icon: Crown,
    choices: [
      { id: 'healing_completion', text: "Dedicate your final years to healing", label: "Complete the healer's path", nextChapter: 'ending_reflection', reward: { xp: 210, achievement: 'healing_sage' } }
    ]
  },

  traveling_healer: {
    id: 'traveling_healer',
    title: "Wandering Physician",
    chapter: 7,
    description: "You travel from village to village, offering healing wherever it's needed. You treat kings and beggars with equal care. Each region teaches you new techniques, new plants, new approaches. Your knowledge becomes encyclopedic.",
    icon: Footprints,
    choices: [
      { id: 'heal_everywhere', text: "Continue healing across the entire land", label: "Bring medicine to remote regions", nextChapter: 'healing_sage', reward: { xp: 170 } }
    ]
  },

  plant_explorer: {
    id: 'plant_explorer',
    title: "Seeker of Healing Plants",
    chapter: 7,
    description: "You venture into forests, mountains, and distant lands searching for rare medicinal plants. You discover species unknown to your teachers, expanding the pharmacopeia. Each discovery could save countless lives.",
    icon: Telescope,
    choices: [
      { id: 'document_plants', text: "Document all your botanical discoveries", label: "Create a comprehensive herbal text", nextChapter: 'medical_school', reward: { xp: 165 } }
    ]
  },

  sound_healer: {
    id: 'sound_healer',
    title: "Master of Vibrational Medicine",
    chapter: 7,
    description: "You have mastered the science of healing through sound. Different tones affect different organs, different mantras treat different ailments. You can diagnose illness by listening to a person's voice. Sound is your primary medicine.",
    icon: Waves,
    choices: [
      { id: 'sound_healing_complete', text: "Perfect the art of sound healing", label: "Become a sound healing master", nextChapter: 'healing_sage', reward: { xp: 165 } }
    ]
  },

  healing_teacher: {
    id: 'healing_teacher',
    title: "Healer of Minds",
    chapter: 8,
    description: "You specialize in healing psychological wounds - trauma, grief, fear, confusion. You teach people to face their inner demons, to heal their emotional injuries. This work is harder than healing bodies, but perhaps even more necessary.",
    icon: Brain,
    choices: [
      { id: 'psychological_mastery', text: "Master psychological healing completely", label: "Become a healer of souls", nextChapter: 'ending_reflection', reward: { xp: 215, achievement: 'mind_healer' } }
    ]
  },

  // === ALLIANCE & DIPLOMACY PATH ===
  alliance_builder: {
    id: 'alliance_builder',
    title: "The Diplomatic Path",
    chapter: 7,
    description: "You realize that lasting peace requires not just strength but connection. Inspired by Mitra, god of friendship and contracts, you dedicate yourself to building alliances between tribes, creating networks of mutual support and trust.",
    icon: Compass,
    unlocks: ['mitra'],
    choices: [
      { id: 'first_alliance', text: "Forge your first major alliance", label: "Unite two rival groups", nextChapter: 'diplomatic_success', reward: { xp: 120, deity: 'mitra' } },
      { id: 'learn_diplomacy', text: "Study the art of negotiation and mediation", label: "Master diplomatic skills", nextChapter: 'diplomatic_training', reward: { xp: 115 } }
    ]
  },

  diplomatic_success: {
    id: 'diplomatic_success',
    title: "First Alliance Formed",
    chapter: 8,
    description: "Through patient negotiation, you bring together two groups that have been enemies for generations. You find common ground, build trust, establish fair terms. The alliance holds. You have prevented bloodshed through words rather than weapons.",
    icon: Target,
    choices: [
      { id: 'expand_alliances', text: "Work to create more alliances", label: "Build a network of peace", nextChapter: 'ten_alliances', reward: { xp: 140 } },
      { id: 'teach_diplomacy', text: "Teach others your diplomatic methods", label: "Create peace-makers", nextChapter: 'diplomatic_school', reward: { xp: 135 } }
    ]
  },

  diplomatic_training: {
    id: 'diplomatic_training',
    title: "The Art of Peace",
    chapter: 8,
    description: "You study under experienced diplomats and mediators. You learn to listen deeply, to find win-win solutions, to be patient when emotions run high, to build bridges between different worldviews. Diplomacy is both art and science.",
    icon: BookText,
    choices: [
      { id: 'apply_training', text: "Put your training into practice", label: "Begin your diplomatic work", nextChapter: 'ten_alliances', reward: { xp: 135 } }
    ]
  },

  ten_alliances: {
    id: 'ten_alliances',
    title: "Builder of Ten Alliances",
    chapter: 9,
    description: "Over many years, you forge ten major alliances - between tribes, between kingdoms, between different religious traditions. Each alliance represents countless hours of patient dialogue. The region becomes more peaceful, more prosperous. Your legacy is connection.",
    icon: Trophy,
    choices: [
      { id: 'diplomatic_legacy', text: "Establish permanent peace councils", label: "Make peace-building institutional", nextChapter: 'ending_reflection', reward: { xp: 220, achievement: 'ten_alliances' } }
    ]
  },

  diplomatic_school: {
    id: 'diplomatic_school',
    title: "School of Diplomacy",
    chapter: 9,
    description: "You establish a school teaching the arts of negotiation, mediation, and peace-building. Your graduates travel throughout the land, preventing conflicts, resolving disputes, building bridges. Peace spreads through their efforts.",
    icon: School,
    choices: [
      { id: 'peace_legacy', text: "Watch your students create lasting peace", label: "Complete the diplomatic path", nextChapter: 'ending_reflection', reward: { xp: 210, achievement: 'peacemaker' } }
    ]
  },

  // === SOLAR PATH ===
  solar_wisdom: {
    id: 'solar_wisdom',
    title: "Following the Path of Surya",
    chapter: 5,
    description: "You dedicate yourself to the study of Surya, the sun god who sees all, who brings light to darkness, who marks time itself. Each dawn you greet the rising sun, feeling its warmth as divine benediction.",
    icon: Sun,
    choices: [
      { id: 'sun_meditation', text: "Practice sun-gazing meditation", label: "Absorb solar energy", nextChapter: 'solar_mysteries', reward: { xp: 120 } },
      { id: 'light_bringer', text: "Become a bringer of light and truth", label: "Illuminate others' darkness", nextChapter: 'truth_seeker', reward: { xp: 130 } }
    ]
  },

  solar_mysteries: {
    id: 'solar_mysteries',
    title: "The Seven Horses of the Sun",
    chapter: 6,
    description: "You learn that Surya rides a chariot pulled by seven horses representing the seven days, or seven chakras, or seven rays of light. The sun's journey mirrors the soul's journey - rising from darkness, reaching zenith, then descending, only to rise again eternally.",
    icon: Sparkles,
    choices: [
      { id: 'embody_light', text: "Embody the qualities of light in your life", label: "Become a solar being", nextChapter: 'convergence_point', reward: { xp: 150 } }
    ]
  },

  truth_seeker: {
    id: 'truth_seeker',
    title: "Seeker of Truth",
    chapter: 6,
    description: "Just as the sun reveals all things, you dedicate yourself to truth - seeking it, speaking it, living it. In a world of shadows and deception, you become a voice of clarity and honesty, regardless of the cost.",
    icon: Eye,
    choices: [
      { id: 'truth_warrior', text: "Fight against falsehood wherever you find it", label: "Become a warrior of truth", nextChapter: 'convergence_point', reward: { xp: 155 } }
    ]
  },

  // === WIND PATH ===
  wind_path: {
    id: 'wind_path',
    title: "The Breath of Life",
    chapter: 5,
    description: "You study Vayu, god of wind and prana (life-force). Wind is invisible yet powerful, intangible yet essential. Understanding wind means understanding the breath itself - the bridge between body and spirit.",
    icon: Wind,
    unlocks: ['vayu'],
    choices: [
      { id: 'breath_mastery', text: "Master advanced breathing techniques", label: "Control life-force energy", nextChapter: 'pranayama_master', reward: { xp: 125, deity: 'vayu' } },
      { id: 'wind_meditation', text: "Meditate on the nature of wind", label: "Understand formless power", nextChapter: 'convergence_point', reward: { xp: 115 } }
    ]
  },

  pranayama_master: {
    id: 'pranayama_master',
    title: "Master of Breath",
    chapter: 6,
    description: "Through years of practice, you master pranayama - the control of breath and life-force. You can enter deep meditative states at will, influence your body's functions, even extend your lifespan through breath control. The ancient science becomes living reality.",
    icon: Waves,
    choices: [
      { id: 'teach_pranayama', text: "Teach pranayama to dedicated students", label: "Share the breath sciences", nextChapter: 'convergence_point', reward: { xp: 145 } }
    ]
  },

  // === PURIFICATION PATH ===
  purification_path: {
    id: 'purification_path',
    title: "The Path of Purification",
    chapter: 4,
    description: "You dedicate yourself to purification - of body through ritual baths, of speech through truthfulness, of mind through meditation, of heart through devotion. Purity is not moralism but clarity, removing obstacles to perceiving truth.",
    icon: Droplet,
    choices: [
      { id: 'ritual_purity', text: "Perfect ritual purification practices", label: "Master ceremonial purity", nextChapter: 'convergence_point', reward: { xp: 110 } },
      { id: 'inner_purity', text: "Focus on inner purification of intentions", label: "Cleanse the heart", nextChapter: 'convergence_point', reward: { xp: 120 } }
    ]
  },

  // === ETERNAL SEEKER ===
  eternal_seeker: {
    id: 'eternal_seeker',
    title: "The Endless Journey",
    chapter: 9,
    description: "You realize that the journey itself is the destination. You wander perpetually, always learning, always growing, never claiming to have arrived. This eternal seeking keeps you humble, curious, alive to each moment's possibility.",
    icon: Compass,
    choices: [
      { id: 'accept_journey', text: "Embrace the eternal journey", label: "Make peace with never arriving", nextChapter: 'ending_reflection', reward: { xp: 240, achievement: 'eternal_seeker' } }
    ]
  },

  // === PROTECTION & GUARDIAN PATH ===
  protection_path: {
    id: 'protection_path',
    title: "The Guardian's Call",
    chapter: 5,
    description: "You witness raiders threatening the sacred fire altar. An elder speaks urgently: 'We need those who will protect what is holy. Varuna watches over cosmic order; Agni must be defended. Will you become a guardian of the sacred traditions?'",
    icon: Shield,
    unlocks: ['varuna'],
    choices: [
      { id: 'varuna_oath', text: "Take an oath before Varuna, keeper of cosmic law", label: "Swear to uphold Rta (cosmic order)", nextChapter: 'varuna_guardian', reward: { xp: 100, deity: 'varuna' } },
      { id: 'fire_guardian', text: "Dedicate yourself to protecting the sacred fires", label: "Become keeper of Agni's flame", nextChapter: 'agni_protector', reward: { xp: 95 } },
      { id: 'village_defense', text: "Organize defense of the entire community", label: "Protect all sacred spaces", nextChapter: 'community_guardian', reward: { xp: 90 } }
    ]
  },

  varuna_guardian: {
    id: 'varuna_guardian',
    title: "Varuna's Watchful Eye",
    chapter: 6,
    description: "Varuna, the all-seeing god, knows every deed done in secret. You learn that true protection is not just physical but moral - upholding truth, punishing oath-breakers, maintaining Rta (cosmic order). Varuna's thousand eyes watch you as you watch others.",
    icon: Eye,
    choices: [
      { id: 'oath_keeper', text: "Become keeper of sacred oaths and contracts", label: "Enforce promises and truth", nextChapter: 'oath_enforcer', reward: { xp: 120 } },
      { id: 'cosmic_law', text: "Study the deeper laws of Rta", label: "Understand cosmic order", nextChapter: 'rta_scholar', reward: { xp: 130 } }
    ]
  },

  agni_protector: {
    id: 'agni_protector',
    title: "Guardian of the Eternal Flame",
    chapter: 6,
    description: "The sacred fire must never be extinguished. You learn the rituals of fire-keeping - feeding Agni with precise offerings, protecting the altar from wind and rain, ensuring the flame burns pure. This is no mere task; it is keeping the gods' connection to humanity alive.",
    icon: Flame,
    choices: [
      { id: 'master_fire_keeping', text: "Master all aspects of fire protection", label: "Become supreme fire guardian", nextChapter: 'eternal_flame_keeper', reward: { xp: 140 } },
      { id: 'teach_fire_keeping', text: "Train others in sacred fire protection", label: "Create a guardian tradition", nextChapter: 'guardian_school', reward: { xp: 135 } }
    ]
  },

  community_guardian: {
    id: 'community_guardian',
    title: "Protector of the Sacred Community",
    chapter: 6,
    description: "You organize watches, train defenders, establish warning systems. But you also learn that true protection includes ensuring justice, mediating disputes, and maintaining harmony. Protection without wisdom becomes tyranny.",
    icon: Shield,
    choices: [
      { id: 'complete_protection', text: "Achieve complete community security", label: "Perfect the protection systems", nextChapter: 'protection_master', reward: { xp: 150 } }
    ]
  },

  protection_master: {
    id: 'protection_master',
    title: "Master Guardian",
    chapter: 7,
    description: "Through years of vigilance, you have protected not just physical spaces but the very essence of dharma. Sacred fires burn safely, oaths are kept, justice prevails. You embody Varuna's watchfulness and Agni's enduring flame.",
    icon: Crown,
    choices: [
      { id: 'guardian_legacy', text: "Establish lasting protection traditions", label: "Complete the guardian path", nextChapter: 'ending_reflection', reward: { xp: 200, achievement: 'complete_protection' } }
    ]
  },

  // === COSMIC UNITY PATH (Heaven & Earth) ===
  cosmic_unity_path: {
    id: 'cosmic_unity_path',
    title: "Between Heaven and Earth",
    chapter: 5,
    description: "You contemplate the ancient hymn: 'Dyaus (Sky-Father) and Prithvi (Earth-Mother) are the universal parents, source of all existence.' A sage asks: 'Can you understand how heaven and earth unite in Agni? How the mortal and divine meet?'",
    icon: Infinity,
    unlocks: ['dyaus', 'prithvi'],
    choices: [
      { id: 'study_parents', text: "Study the hymns to heaven and earth", label: "Learn of Dyaus-Prithvi", nextChapter: 'dyaus_prithvi_hymns', reward: { xp: 90, deity: 'dyaus' } },
      { id: 'agni_mediator', text: "Understand Agni as bridge between worlds", label: "Study the divine messenger", nextChapter: 'agni_bridge', reward: { xp: 95, deity: 'agni' } },
      { id: 'unity_meditation', text: "Meditate on the unity of all existence", label: "Seek direct experience", nextChapter: 'unity_experience', reward: { xp: 100 } }
    ]
  },

  dyaus_prithvi_hymns: {
    id: 'dyaus_prithvi_hymns',
    title: "Hymns to the Universal Parents",
    chapter: 6,
    description: "The hymns reveal: 'These two bowls, heaven and earth, contain all creatures.' Dyaus is the fertilizing rain, Prithvi is the nourishing soil. From their eternal union comes all life. They are not separate but complementary aspects of one reality.",
    icon: Heart,
    choices: [
      { id: 'understand_duality', text: "Contemplate the nature of complementary opposites", label: "Understand sacred duality", nextChapter: 'sacred_duality', reward: { xp: 120 } },
      { id: 'ritual_unity', text: "Perform rituals honoring both heaven and earth", label: "Unite them through ceremony", nextChapter: 'unity_ritual', reward: { xp: 115 } }
    ]
  },

  agni_bridge: {
    id: 'agni_bridge',
    title: "Agni: The Divine Messenger",
    chapter: 6,
    description: "Agni is unique - born on earth yet ascending to heaven. He carries offerings upward and brings divine blessings downward. Through Agni, heaven touches earth; through Agni, humans reach gods. He IS the unity you seek.",
    icon: Zap,
    choices: [
      { id: 'become_bridge', text: "Dedicate your life to bridging mortal and divine", label: "Embody Agni's role", nextChapter: 'cosmic_mediator', reward: { xp: 140 } }
    ]
  },

  unity_experience: {
    id: 'unity_experience',
    title: "Direct Experience of Unity",
    chapter: 6,
    description: "In deep meditation, the boundaries dissolve. You are earth feeling the touch of rain. You are sky beholding the earth. Subject and object merge. For one timeless moment, you experience what the Rishis knew: all separation is illusion.",
    icon: Eye,
    choices: [
      { id: 'integrate_experience', text: "Integrate this realization into daily life", label: "Live the unity", nextChapter: 'unity_master', reward: { xp: 150 } }
    ]
  },

  unity_master: {
    id: 'unity_master',
    title: "Master of Cosmic Unity",
    chapter: 7,
    description: "You have united heaven and earth not through external action but through inner realization. You see the divine in the mundane, the eternal in the temporal. Your very presence reminds others of the underlying unity of existence.",
    icon: Infinity,
    choices: [
      { id: 'unity_completion', text: "Share this vision with the world", label: "Complete the unity path", nextChapter: 'ending_reflection', reward: { xp: 210, achievement: 'unite_heaven_earth' } }
    ]
  },

  // === AGRICULTURAL & EARTH PATH ===
  agricultural_path: {
    id: 'agricultural_path',
    title: "Seeds of the Sacred Earth",
    chapter: 5,
    description: "The harvest has failed. Drought threatens the community. An elder speaks: 'The earth is not mere dirt - she is Prithvi Mata, mother of all. Our ancestors knew how to honor her, how to ask for her blessings. Will you learn the sacred agriculture?'",
    icon: Sprout,
    unlocks: ['prithvi'],
    choices: [
      { id: 'earth_worship', text: "Learn the hymns and rituals to Earth Mother", label: "Honor Prithvi", nextChapter: 'prithvi_worship', reward: { xp: 85, deity: 'prithvi' } },
      { id: 'sacred_planting', text: "Study ritual agriculture and blessed planting", label: "Learn sacred farming", nextChapter: 'ritual_agriculture', reward: { xp: 90 } },
      { id: 'grain_ceremonies', text: "Master the ceremonies of grain and harvest", label: "Become harvest priest", nextChapter: 'harvest_master', reward: { xp: 80 } }
    ]
  },

  prithvi_worship: {
    id: 'prithvi_worship',
    title: "Devotion to Earth Mother",
    chapter: 6,
    description: "You learn Prithvi Sukta: 'Truth, eternal order, consecration, ardor, prayer, and ritual uphold the Earth. May she, mother of all, grant us her blessing!' Prithvi is patient, bearing all creatures, forgiving all wounds. She is the supreme mother.",
    icon: Mountain,
    choices: [
      { id: 'earth_rituals', text: "Perform the complete earth rituals", label: "Honor the patient mother", nextChapter: 'earth_ceremony_master', reward: { xp: 110 } },
      { id: 'plant_hundred', text: "Plant 100 seeds with sacred intention", label: "Sow blessings into earth", nextChapter: 'hundred_seeds', reward: { xp: 120 } }
    ]
  },

  ritual_agriculture: {
    id: 'ritual_agriculture',
    title: "Sacred Science of Growing",
    chapter: 6,
    description: "You learn that every agricultural act can be prayer. Plowing is not violence against earth but partnership. Seeds receive mantras. Water is blessed. Harvest is thanksgiving. Agriculture becomes a continuous conversation with the divine.",
    icon: Trees,
    choices: [
      { id: 'plant_hundred_ritual', text: "Plant 100 seeds with full ritual preparation", label: "Perfect sacred agriculture", nextChapter: 'hundred_seeds', reward: { xp: 125 } }
    ]
  },

  hundred_seeds: {
    id: 'hundred_seeds',
    title: "The Hundred Seeds",
    chapter: 7,
    description: "With prayers to Prithvi, invocations to Parjanya (rain god), and Agni-blessed water, you plant exactly 100 seeds. Each one receives a mantra. This is not mere farming - it is a sacred act multiplying life, feeding community, honoring Earth Mother.",
    icon: Sparkles,
    choices: [
      { id: 'see_harvest', text: "Witness the blessed harvest", label: "Reap what was sacredly sown", nextChapter: 'blessed_harvest', reward: { xp: 140 } }
    ]
  },

  blessed_harvest: {
    id: 'blessed_harvest',
    title: "Harvest of Blessings",
    chapter: 8,
    description: "The hundred seeds have multiplied abundantly. The harvest is bountiful, feeding many. But more than physical food, you have demonstrated that when agriculture is performed as sacred act, Earth Mother responds with generosity. You are now a true child of Prithvi.",
    icon: Trophy,
    choices: [
      { id: 'agriculture_master', text: "Teach others sacred agriculture", label: "Complete the earth path", nextChapter: 'ending_reflection', reward: { xp: 200, achievement: 'plant_hundred_seeds' } }
    ]
  },

  // === NIGHT VIGIL & TAPAS PATH ===
  night_vigil_path: {
    id: 'night_vigil_path',
    title: "Call of the Sacred Night",
    chapter: 5,
    description: "A teacher of tapas (austerity) speaks: 'Most fear the night, but the Rishis knew its power. Ratri, goddess of night, reveals what daylight hides. Through night vigils, consciousness transforms. Are you ready for the seven nights of awakening?'",
    icon: Moon,
    unlocks: ['ratri', 'ushas'],
    choices: [
      { id: 'ratri_hymns', text: "Learn the Ratri Sukta hymns to night", label: "Study the night goddess", nextChapter: 'ratri_teachings', reward: { xp: 85, deity: 'ratri' } },
      { id: 'first_vigil', text: "Begin your first night vigil immediately", label: "Start the tapas practice", nextChapter: 'vigil_one', reward: { xp: 90 } },
      { id: 'tapas_preparation', text: "Study the science of austerity first", label: "Understand tapas deeply", nextChapter: 'tapas_wisdom', reward: { xp: 80 } }
    ]
  },

  ratri_teachings: {
    id: 'ratri_teachings',
    title: "Hymns to the Night Goddess",
    chapter: 6,
    description: "The hymn sings: 'The goddess Night has drawn near, looking about with many eyes. She has put on all her glory. The immortal goddess fills the wide space, the depths and heights; she overcomes the darkness with her light.' Ratri is not absence but presence.",
    icon: Star,
    choices: [
      { id: 'night_meditation', text: "Meditate on Ratri's mysteries", label: "Embrace the sacred darkness", nextChapter: 'night_mysteries', reward: { xp: 110 } },
      { id: 'begin_vigils', text: "Begin the seven night vigils", label: "Start the tapas journey", nextChapter: 'vigil_one', reward: { xp: 100 } }
    ]
  },

  vigil_one: {
    id: 'vigil_one',
    title: "First Night: Staying Awake",
    chapter: 6,
    description: "The first vigil is hardest. Your body screams for sleep. Your mind creates phantoms. But you sit through the darkness, chanting mantras, feeding the sacred fire. As dawn approaches, you feel something shift - the first crack in the wall of ordinary consciousness.",
    icon: Flame,
    choices: [
      { id: 'continue_vigils', text: "Continue through all seven nights", label: "Complete the vigil series", nextChapter: 'seven_vigils', reward: { xp: 120 } },
      { id: 'study_between', text: "Study spiritual teachings between vigils", label: "Deepen understanding", nextChapter: 'tapas_wisdom', reward: { xp: 110 } }
    ]
  },

  seven_vigils: {
    id: 'seven_vigils',
    title: "The Seven Nights of Transformation",
    chapter: 7,
    description: "Seven nights. Seven dawns. Each vigil peels away another layer of ordinary awareness. By the seventh night, you are not fighting sleep but dwelling in a state beyond sleep and waking. Ushas (Dawn) greets you as a sister, Ratri as a mother. You have completed the ancient tapas.",
    icon: Crown,
    choices: [
      { id: 'vigil_master', text: "Integrate the vigil wisdom", label: "Become a master of tapas", nextChapter: 'tapas_master', reward: { xp: 160 } }
    ]
  },

  tapas_master: {
    id: 'tapas_master',
    title: "Master of Sacred Austerity",
    chapter: 8,
    description: "Through the seven vigils, you have transformed. Tapas has burned away impurities, refined consciousness, revealed hidden truths. You now understand why the Rishis praised night and dawn - they are gateways to higher consciousness. You are a living bridge between darkness and light.",
    icon: Medal,
    choices: [
      { id: 'tapas_completion', text: "Share the tapas teachings", label: "Complete the vigil path", nextChapter: 'ending_reflection', reward: { xp: 200, achievement: 'seven_vigils' } }
    ]
  },

  // === RAIN CEREMONY PATH ===
  rain_ceremony_path: {
    id: 'rain_ceremony_path',
    title: "The Drought's Lesson",
    chapter: 5,
    description: "Months without rain. Crops wither. Animals suffer. A rain-caller speaks: 'Our ancestors knew how to speak to Parjanya, lord of rain. They knew how Indra releases the imprisoned waters. This knowledge must not be lost. Will you learn the rain ceremonies?'",
    icon: CloudRain,
    unlocks: ['parjanya'],
    choices: [
      { id: 'parjanya_hymns', text: "Learn the hymns to Parjanya, rain lord", label: "Study the rain bringer", nextChapter: 'parjanya_worship', reward: { xp: 90, deity: 'parjanya' } },
      { id: 'water_ritual', text: "Study water liberation rituals", label: "Learn Vritra-slaying ceremonies", nextChapter: 'water_ceremonies', reward: { xp: 85 } },
      { id: 'first_rain_call', text: "Attempt your first rain ceremony immediately", label: "Call the clouds", nextChapter: 'first_rain_ceremony', reward: { xp: 80 } }
    ]
  },

  parjanya_worship: {
    id: 'parjanya_worship',
    title: "Prayers to the Rain Lord",
    chapter: 6,
    description: "The hymn teaches: 'With his thunder Parjanya smites the wicked; sing praises to him! The wind blows, lightning flashes, plants shoot up, the sky streams with moisture. Parjanya quickens all life!' Rain is not accident but divine gift.",
    icon: Waves,
    choices: [
      { id: 'rain_science', text: "Master the complete rain-calling science", label: "Become a rain priest", nextChapter: 'rain_master', reward: { xp: 120 } },
      { id: 'call_twenty_rains', text: "Dedicate yourself to calling twenty rains", label: "Serve as rain-bringer", nextChapter: 'twenty_rains', reward: { xp: 130 } }
    ]
  },

  first_rain_ceremony: {
    id: 'first_rain_ceremony',
    title: "First Call to the Clouds",
    chapter: 6,
    description: "With fumbling hands you perform the ceremony - offerings to Parjanya, prayers to Indra, chants invoking the waters. Nothing happens immediately. But three days later, clouds gather. Rain falls. Perhaps coincidence. Perhaps your prayers were heard. You will never know for certain, but you continue.",
    icon: Cloud,
    choices: [
      { id: 'continue_rain_work', text: "Continue the rain ceremonies", label: "Perfect the practice", nextChapter: 'twenty_rains', reward: { xp: 110 } }
    ]
  },

  twenty_rains: {
    id: 'twenty_rains',
    title: "Summoner of Twenty Rains",
    chapter: 7,
    description: "Over years, you perform rain ceremonies twenty times. Not all succeed, but enough do that people call you when drought threatens. You understand now: rain-calling is not magic but alignment - aligning human consciousness with natural cycles, aligning community intention with cosmic rhythms.",
    icon: Trophy,
    choices: [
      { id: 'rain_completion', text: "Master the complete rain science", label: "Complete the rain path", nextChapter: 'ending_reflection', reward: { xp: 200, achievement: 'summon_twenty_rains' } }
    ]
  },

  // === PURIFICATION PATH ===
  purification_path: {
    id: 'purification_path',
    title: "The Call to Purity",
    chapter: 5,
    description: "You witness a Soma purification ritual - the sacred plant strained through wool, becoming Pavamana (the Purifier). A priest explains: 'Purification is not just physical but spiritual. Can you dedicate yourself to purifying souls, beginning with your own?'",
    icon: Droplet,
    unlocks: ['soma'],
    choices: [
      { id: 'pavamana_study', text: "Study the Pavamana hymns deeply", label: "Learn purification wisdom", nextChapter: 'pavamana_teachings', reward: { xp: 85, deity: 'soma' } },
      { id: 'self_purification', text: "Begin with rigorous self-purification", label: "Purify yourself first", nextChapter: 'inner_purification', reward: { xp: 90 } },
      { id: 'purification_rituals', text: "Learn ceremonial purification techniques", label: "Master purifying rites", nextChapter: 'purification_ceremonies', reward: { xp: 80 } }
    ]
  },

  pavamana_teachings: {
    id: 'pavamana_teachings',
    title: "Wisdom of the Purifier",
    chapter: 6,
    description: "The Pavamana hymns sing: 'Flow onward, Soma, purifying yourself, bringing wealth and wisdom! Cleanse away all impurities!' You learn that purification is not rejection but transformation - taking the impure and refining it into the pure.",
    icon: Sparkles,
    choices: [
      { id: 'become_purifier', text: "Dedicate your life to purification work", label: "Become a purifier of souls", nextChapter: 'soul_purifier', reward: { xp: 120 } }
    ]
  },

  inner_purification: {
    id: 'inner_purification',
    title: "Purifying the Self",
    chapter: 6,
    description: "For months you practice intense purification - ritual baths, fasting, confession of wrongs, meditation on virtues. The process is painful, revealing shadows you'd rather not see. But gradually, you feel lighter, clearer, more aligned with dharma.",
    icon: Heart,
    choices: [
      { id: 'help_others_purify', text: "Help others through purification", label: "Guide others to purity", nextChapter: 'soul_purifier', reward: { xp: 130 } }
    ]
  },

  soul_purifier: {
    id: 'soul_purifier',
    title: "Purifier of Souls",
    chapter: 7,
    description: "You develop methods to help others purify themselves - confession rituals, forgiveness ceremonies, penance practices, transformation meditations. One by one, you guide thirty souls through deep purification. Each transformation is sacred, unique, miraculous.",
    icon: Lightbulb,
    choices: [
      { id: 'thirty_souls', text: "Complete the purification of thirty souls", label: "Fulfill the purifier's calling", nextChapter: 'purification_master', reward: { xp: 150 } }
    ]
  },

  purification_master: {
    id: 'purification_master',
    title: "Master of Sacred Purification",
    chapter: 8,
    description: "Thirty souls have been transformed through your guidance. But you know the secret: you cannot purify anyone - you can only create conditions where they purify themselves. Like Soma strained through wool, purification requires willingness to be refined. You are the facilitator of transformation.",
    icon: Crown,
    choices: [
      { id: 'purification_completion', text: "Establish purification traditions", label: "Complete the purifier's path", nextChapter: 'ending_reflection', reward: { xp: 210, achievement: 'purify_thirty_souls' } }
    ]
  },




};
