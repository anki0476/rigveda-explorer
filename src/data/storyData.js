import {
  Sunrise, Flame, Sun, Sparkles, Waves, Scale, Zap, Droplet,
  Cloud, Scroll, GraduationCap, School, Mountain, Wind,
  Eye, Globe, Infinity, Telescope, BookOpen, Feather,
  Trees, Footprints, Home, User, Target, Star, Trophy,
  Brain, Heart, Lightbulb, Medal, BookText, Shield, Sprout, Moon, CloudRain, Compass, Crown, Rainbow
} from 'lucide-react';

export const storyChapters = {
  start: {
    id: 'start',
    title: "The Awakening at Dawn",
    chapter: 1,
    description: "1500 BCE. The sacred Saraswati river flows beside your village. As dawn breaks, you hear the ancient chants of Rishis performing Agnihotra. A burning question stirs within you: What is the truth behind these sacred hymns? Your journey into the depths of RigVeda begins now.",
    icon: Sunrise,
    choices: [
      { id: 'vasishtha_path', text: "Approach Rishi Vasishtha at the sacred fire", label: "Path of Sacred Fire & Ritual Mastery", nextChapter: 'vasishtha_first_meeting', reward: { xp: 50 } },
      { id: 'vishwamitra_path', text: "Seek Rishi Vishwamitra in meditation", label: "Path of Divine Light & Mantras", nextChapter: 'vishwamitra_first_meeting', reward: { xp: 50 } },
      { id: 'river_meditation', text: "Sit alone by the Saraswati for self-reflection", label: "Path of Inner Waters & Cosmic Sound", nextChapter: 'saraswati_first_encounter', reward: { xp: 50 } },
      { id: 'observe_ritual', text: "Quietly observe the morning ritual", label: "Path of Observation & Hidden Knowledge", nextChapter: 'observer_ritual_beginning', reward: { xp: 50 } },
      { id: 'seek_healing_path', text: "Witness the village healer treating the sick", label: "Path of Medicine & Compassion", nextChapter: 'healing_path', reward: { xp: 50 } },
      { id: 'warrior_calling_early', text: "Notice warriors training at the edge of the village", label: "Path of Protection & Strength", nextChapter: 'warrior_initiation', reward: { xp: 50 } },
      { id: 'seek_protection', text: "Ask about defending sacred traditions", label: "Path of Protection & Guardianship", nextChapter: 'protection_path', reward: { xp: 50 } },
      { id: 'earth_observation', text: "Observe farmers performing earth rituals", label: "Path of Sacred Agriculture", nextChapter: 'agricultural_path', reward: { xp: 50 } },
      { id: 'protection_path', text: "Ask about defending sacred traditions", label: "Path of Protection & Guardianship", nextChapter: 'protection_first_encounter', reward: { xp: 50 } },
      { id: 'agricultural_path', text: "Observe farmers performing earth rituals", label: "Path of Sacred Agriculture", nextChapter: 'agricultural_first_encounter', reward: { xp: 50 } }
    ]
  },

  vasishtha_first_meeting: {
    id: 'vasishtha_first_meeting',
    title: "Meeting Rishi Vasishtha",
    chapter: 2,
    description: "You approach the sacred fire where Rishi Vasishtha performs the morning Agnihotra. His weathered face shows decades of devotion to the flame. As you arrive, he speaks without turning: 'I felt your presence before I saw you. Fire reveals truth. What brings you here, seeker?'",
    icon: Flame,
    dialogue: {
      npc: "Rishi Vasishtha",
      lines: [
        "The morning fire never lies. It shows us what we are.",
        "Do you come seeking knowledge, or seeking to escape something?",
        "Most who approach fire do so with hidden agendas. The flame burns away pretense."
      ]
    },
    choices: [
      {
        id: 'honest_answer',
        text: "I seek truth, though I do not know what truth means",
        label: "Answer truthfully",
        nextChapter: 'vasishtha_approves',
        reward: { xp: 75, trust: 'vasishtha' }
      },
      {
        id: 'ambiguous_answer',
        text: "I wish to serve the divine",
        label: "Give a partial answer",
        nextChapter: 'vasishtha_probes',
        reward: { xp: 60, trust: 'vasishtha_low' }
      },
      {
        id: 'question_back',
        text: "What is fire, truly?",
        label: "Ask a counter-question",
        nextChapter: 'vasishtha_tests',
        reward: { xp: 80 }
      }
    ]
  },

  vasishtha_approves: {
    id: 'vasishtha_approves',
    title: "The Teacher Accepts",
    chapter: 3,
    description: "Vasishtha smiles slightly. 'Good. You are honest about your ignorance. That is rarer than you think.' He gestures you to sit. 'Most seekers come with fixed ideas about what truth should be. Fire taught me that truth is not fixed - it flows like flame, changes like smoke, persists like heat. Let me teach you.'",
    icon: Flame,
    dialogue: {
      npc: "Rishi Vasishtha",
      lines: [
        "First, you must understand that Agni is alive.",
        "The Rishis did not worship fire as dead matter.",
        "We honor it as a conscious being, a messenger between worlds."
      ]
    },
    sideQuests: [
      {
        id: 'feed_fire_week',
        title: "Feed the Fire for Seven Days",
        description: "Vasishtha asks you to prepare and offer ghee to the fire each morning for a week. Simple task, but it teaches discipline and gratitude.",
        reward: { xp: 50, understanding: 'ritual_basics' }
      },
      {
        id: 'observe_smoke',
        title: "Study the Smoke Patterns",
        description: "Spend hours watching how smoke rises, disperses, returns. Learn to read messages in the smoke.",
        reward: { xp: 45, understanding: 'fire_language' }
      }
    ],
    choices: [
      {
        id: 'accept_teaching',
        text: "I am ready to learn",
        label: "Begin formal training",
        nextChapter: 'fire_principles',
        reward: { xp: 90 }
      }
    ]
  },

  vasishtha_probes: {
    id: 'vasishtha_probes',
    title: "The Teacher Questions",
    chapter: 3,
    description: "Vasishtha raises an eyebrow. 'Service to the divine is vague. What does it mean to serve? What is this divine you wish to serve?' He pauses, studying you. 'Your answer shows intention but lacks clarity.'",
    icon: Eye,
    dialogue: {
      npc: "Rishi Vasishtha",
      lines: [
        "Service without understanding is blind obedience.",
        "I accept your dedication, but you must deepen your clarity.",
        "Come - we will work together to refine your purpose."
      ]
    },
    choices: [
      {
        id: 'clarify_path',
        text: "I will pursue deeper understanding",
        label: "Commit to growth",
        nextChapter: 'fire_principles',
        reward: { xp: 85 }
      }
    ]
  },
  
  vasishtha_tests: {
    id: 'vasishtha_tests',
    title: "Fire Tests the Seeker",
    chapter: 3,
    description: "Vasishtha smiles broadly. 'Excellent question! Fire is consciousness, transformation, the bridge between worlds. By asking this, you show genuine curiosity. Such seekers I love to teach.'",
    icon: Flame,
    dialogue: {
      npc: "Rishi Vasishtha",
      lines: [
        "Your question reveals a seeking mind.",
        "Yes - let us explore fire together.",
        "This is how true teaching begins - with your genuine inquiry."
      ]
    },
    choices: [
      {
        id: 'begin_teaching',
        text: "Begin teaching me about fire",
        label: "Start the fire teachings",
        nextChapter: 'fire_principles',
        reward: { xp: 95 }
      }
    ]
  },

  fire_principles: {
    id: 'fire_principles',
    title: "The Five Principles of Agni",
    chapter: 4,
    description: "Vasishtha teaches: 'Fire has five essential qualities. First, purification - it burns away impurities. Second, transformation - it converts matter into energy. Third, communication - it carries offerings to the gods. Fourth, protection - it guards against darkness and demons. Fifth, sustenance - it cooks food, warms bodies. Master these, and you understand not just fire but life itself.'",
    icon: BookOpen,
    dialogue: {
      npc: "Rishi Vasishtha",
      lines: [
        "A fire that only burns is mere destruction.",
        "But fire guided by intention becomes sacrament.",
        "The same flame that destroys also creates. This is the paradox you must understand."
      ]
    },
    sideQuests: [
      {
        id: 'observe_purification',
        title: "Witness Fire's Purification Power",
        description: "Collect items of different materials and observe how fire purifies them differently. Leaves become ash, metal becomes refined.",
        reward: { xp: 60, understanding: 'purification_science' }
      },
      {
        id: 'study_cooking',
        title: "Study Fire in Cooking",
        description: "Help prepare meals using fire. Notice how raw food becomes digestible, nutrition becomes available.",
        reward: { xp: 55, understanding: 'fire_sustenance' }
      },
      {
        id: 'night_watch',
        title: "Guard the Sacred Fire Through the Night",
        description: "Spend the night ensuring the sacred fire never goes out. Learn patience and vigilance.",
        reward: { xp: 70, understanding: 'fire_protection' }
      }
    ],
    choices: [
      {
        id: 'master_principles',
        text: "I wish to internalize these principles",
        label: "Deepen your understanding",
        nextChapter: 'agni_meditation_practice',
        reward: { xp: 100 }
      }
    ]
  },

  agni_meditation_practice: {
    id: 'agni_meditation_practice',
    title: "Gazing Into the Flame",
    chapter: 5,
    description: "Vasishtha teaches you Agni-meditation - focusing your entire consciousness into the heart of the flame. 'When you truly see fire, you see into the heart of existence. Fire is not separate from you - it burns in your cells, in your blood, in your consciousness. Become the flame.'",
    icon: Flame,
    dialogue: {
      npc: "Rishi Vasishtha",
      lines: [
        "Most people fear fire because they see it as other.",
        "When you understand that the same Agni exists in your heart, fear becomes impossible.",
        "At the core of every consciousness burns sacred fire. Find it within yourself."
      ]
    },
    sideQuests: [
      {
        id: 'forty_day_meditation',
        title: "40-Day Flame Meditation",
        description: "Meditate on the fire flame for 40 consecutive days. Watch as your inner vision opens.",
        reward: { xp: 150, achievement: 'flame_seer' }
      },
      {
        id: 'inner_fire_discovery',
        title: "Discover Your Inner Fire",
        description: "Through meditation, find the fire that burns in your own body and consciousness.",
        reward: { xp: 120, understanding: 'inner_flame' }
      }
    ],
    choices: [
      {
        id: 'experience_unity',
        text: "I am beginning to feel the fire within",
        label: "Recognize internal Agni",
        nextChapter: 'vasishtha_advanced_teaching',
        reward: { xp: 130 }
      },
      {
        id: 'study_mantras_alt',
        text: "I want to learn the sacred hymns",
        label: "Study the hymns of Agni",
        nextChapter: 'agni_hymns',
        reward: { xp: 100 }
      }
    ]
  },

  vasishtha_advanced_teaching: {
    id: 'vasishtha_advanced_teaching',
    title: "The Secret of Sacrifice",
    chapter: 6,
    description: "Vasishtha reveals deeper wisdom: 'All existence is sacrifice - [translate:yajna]. Stars sacrifice themselves as light. Trees sacrifice themselves as oxygen and wood. Water sacrifices itself as rain. You are not asked to give something you don't have - you are asked to participate consciously in existence's eternal dance of giving.'",
    icon: Target,
    dialogue: {
      npc: "Rishi Vasishtha",
      lines: [
        "Most misunderstand yajna as barter with gods.",
        "But yajna is the cosmic law itself.",
        "To live is to give. To give is to receive. This cycle is sacred."
      ]
    },
    sideQuests: [
      {
        id: 'hundred_offerings',
        title: "Make 100 Conscious Offerings",
        description: "For 100 days, make daily offerings to the sacred fire with complete awareness. Each offering is an act of conscious sacrifice.",
        reward: { xp: 180, achievement: 'hundred_offerings' }
      },
      {
        id: 'teach_disciple',
        title: "Begin Teaching a New Disciple",
        description: "A younger seeker asks to learn. Teach them what you've learned about fire and sacrifice.",
        reward: { xp: 140, achievement: 'first_teacher' }
      },
      {
        id: 'special_ritual',
        title: "Perform a Special Ritual for the Village",
        description: "Vasishtha asks you to lead a complete Agnihotra for the benefit of the entire community.",
        reward: { xp: 160, achievement: 'ritual_master' }
      }
    ],
    choices: [
      {
        id: 'become_vasishtha_heir',
        text: "I wish to become your spiritual successor",
        label: "Accept deep discipleship",
        nextChapter: 'vasishtha_final_teaching',
        reward: { xp: 180, deity: 'agni', unlocks: ['agni'] }
      },
      {
        id: 'seek_other_teachers',
        text: "I am ready to seek other Rishis",
        label: "Move to the next stage of learning",
        nextChapter: 'fire_mysteries',
        reward: { xp: 150 }
      }
    ]
  },

  vasishtha_final_teaching: {
    id: 'vasishtha_final_teaching',
    title: "The Ultimate Sacrifice",
    chapter: 7,
    description: "On his deathbed (after many years of teaching together), Vasishtha whispers: 'The final sacrifice is the sacrifice of ego itself. I offered my life to fire. Now fire consumes what remains of my separate identity. I return to Agni from which I came. This is not death but transformation. Continue the work.'",
    icon: Crown,
    dialogue: {
      npc: "Rishi Vasishtha (aged)",
      lines: [
        "I have fed the fire for sixty years.",
        "Now the fire has consumed me completely.",
        "This is the goal - to become fire, to be one with it."
      ]
    },
    sideQuests: [
      {
        id: 'maintain_eternal_flame',
        title: "Maintain Vasishtha's Eternal Flame",
        description: "For the rest of your life, keep the fire that Vasishtha tended burning. It becomes your primary duty and meditation.",
        reward: { xp: 300, achievement: 'eternal_flame_keeper' }
      }
    ],
    choices: [
      {
        id: 'carry_legacy',
        text: "I will carry your legacy forward",
        label: "Accept the sacred responsibility",
        nextChapter: 'convergence_point',
        reward: { xp: 250, achievement: 'vasishtha_heir' }
      }
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

  vishwamitra_first_meeting: {
    id: 'vishwamitra_first_meeting',
    title: "Encountering Rishi Vishwamitra",
    chapter: 2,
    description: "You find Rishi Vishwamitra in deep meditation beneath an ancient banyan tree. His aura radiates golden light. When he opens his eyes, he speaks: 'Welcome, seeker. I sensed your arrival through the cosmic vibrations. The sound of truth calls to those with ears to hear.'",
    icon: Sun,
    dialogue: {
      npc: "Rishi Vishwamitra",
      lines: [
        "There are many paths to the divine - through fire, water, earth, wind.",
        "But the most direct path is through sound, through the sacred word.",
        "The Gayatri mantra is the heart of all Vedic knowledge - a bridge between human and divine."
      ]
    },
    choices: [
      {
        id: 'eager_student',
        text: "Teach me the Gayatri mantra immediately",
        label: "Show eager devotion",
        nextChapter: 'vishwamitra_gayatri_initiation',
        reward: { xp: 80, trust: 'vishwamitra' }
      },
      {
        id: 'humble_seeker',
        text: "First, let me understand my readiness",
        label: "Demonstrate humility",
        nextChapter: 'vishwamitra_preparation',
        reward: { xp: 70 }
      },
      {
        id: 'philosophical_question',
        text: "What is the relationship between sound and reality?",
        label: "Ask a deep question",
        nextChapter: 'vishwamitra_sound_philosophy',
        reward: { xp: 90 }
      }
    ]
  },

  vishwamitra_preparation: {
    id: 'vishwamitra_preparation',
    title: "Preparing the Mind",
    chapter: 3,
    description: "Vishwamitra guides you through purification practices. 'Before the mantra enters your being, the vessel must be clean. A muddy river cannot reflect the sun. First, we purify your consciousness.'",
    icon: Waves,
    dialogue: {
      npc: "Rishi Vishwamitra",
      lines: [
        "Sit by the river at dawn and sunset for 21 days.",
        "Observe your breath - how it rises and falls like tides.",
        "Let thoughts pass like clouds. Don't grasp them, don't push them away."
      ]
    },
    sideQuests: [
      {
        id: 'river_breathing',
        title: "Practice Pranayama by the Saraswati",
        description: "Learn controlled breathing techniques (pranayama) by the river for 21 days.",
        reward: { xp: 100, understanding: 'breath_control' }
      },
      {
        id: 'ritual_bathing',
        title: "Ritual Purification Bathing",
        description: "Perform ritual bathing each morning, setting intentions for the day.",
        reward: { xp: 80, understanding: 'ritual_purity' }
      },
      {
        id: 'diet_discipline',
        title: "Follow a Sattvic Diet",
        description: "Consume only pure foods (milk, fruits, vegetables) to elevate consciousness.",
        reward: { xp: 90, understanding: 'sattvic_living' }
      }
    ],
    choices: [
      {
        id: 'complete_preparation',
        text: "Complete the 21-day preparation",
        label: "Achieve mental clarity",
        nextChapter: 'vishwamitra_gayatri_initiation',
        reward: { xp: 140 }
      }
    ]
  },

  vishwamitra_sound_philosophy: {
    id: 'vishwamitra_sound_philosophy',
    title: "[translate:Shabda Brahman] - The Word is Brahman",
    chapter: 3,
    description: "Vishwamitra teaches: 'All creation arose from primordial sound - [translate:Nada Brahman]. Before anything existed, there was vibration. OM is the source-sound from which all others emerged. When you chant OM, you're not just making sound - you're touching the fabric of existence itself.'",
    icon: Sparkles,
    dialogue: {
      npc: "Rishi Vishwamitra",
      lines: [
        "The Rigveda is not mere poetry - it is encoded truth in sound.",
        "Each syllable carries power. Each word resonates with cosmic meaning.",
        "To understand the mantra is to understand the structure of reality."
      ]
    },
    sideQuests: [
      {
        id: 'om_chanting',
        title: "Chant OM 1000 Times",
        description: "Chant the sacred syllable OM with full awareness, feeling its vibration in your body.",
        reward: { xp: 120, understanding: 'om_power' }
      },
      {
        id: 'sound_meditation',
        title: "Meditate on Inner Sound",
        description: "In meditation, listen to the natural sounds within your body and consciousness.",
        reward: { xp: 110, understanding: 'inner_sound' }
      },
      {
        id: 'mantra_resonance',
        title: "Feel Sound Resonance in Different Chakras",
        description: "Chant different sounds and feel where they resonate in your energy centers.",
        reward: { xp: 100, understanding: 'chakra_sound' }
      }
    ],
    choices: [
      {
        id: 'ready_for_gayatri',
        text: "I am ready to receive the Gayatri",
        label: "Request the supreme mantra",
        nextChapter: 'vishwamitra_gayatri_initiation',
        reward: { xp: 130 }
      }
    ]
  },

  vishwamitra_gayatri_initiation: {
    id: 'vishwamitra_gayatri_initiation',
    title: "The Gayatri Initiation",
    chapter: 4,
    description: "Vishwamitra leads you to the river at sunrise. He intones solemnly: 'Om Bhur Bhuvah Svah, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat.' The words penetrate your being. 'This is the most sacred mantra. Treat it as you would treat a precious gem. Guard it. Nurture it. Let it transform you.'",
    icon: Sparkles,
    dialogue: {
      npc: "Rishi Vishwamitra",
      lines: [
        "OM - the primordial sound of creation.",
        "Bhur Bhuvah Svah - the three worlds: physical, subtle, causal.",
        "Tat Savitur - that radiant divine source.",
        "Varenyam - the most worthy of worship.",
        "Bhargo Devasya Dhimahi - I meditate on that divine light.",
        "Dhiyo Yo Nah Prachodayat - may it illuminate my intellect."
      ]
    },
    sideQuests: [
      {
        id: 'gayatri_40days',
        title: "Chant Gayatri for 40 Days at Sunrise",
        description: "Recite the Gayatri mantra 108 times each morning at sunrise for 40 consecutive days.",
        reward: { xp: 180, achievement: 'gayatri_practitioner' }
      },
      {
        id: 'gayatri_meaning',
        title: "Meditate on Each Line's Meaning",
        description: "Spend days contemplating the deeper meaning of each phrase in the Gayatri.",
        reward: { xp: 160, understanding: 'gayatri_wisdom' }
      }
    ],
    choices: [
      {
        id: 'daily_practice',
        text: "Commit to daily Gayatri practice",
        label: "Embrace lifelong chanting",
        nextChapter: 'vishwamitra_mantra_mastery',
        reward: { xp: 150 }
      }
    ]
  },

  vishwamitra_mantra_mastery: {
    id: 'vishwamitra_mantra_mastery',
    title: "The Power of Repeated Chanting",
    chapter: 5,
    description: "After weeks of daily practice, you begin to experience transformation. Your mind becomes clearer. Colors seem brighter. You feel connected to something vast and eternal. Vishwamitra smiles: 'The mantra is working through you. You are becoming a vessel for divine light.'",
    icon: Sun,
    dialogue: {
      npc: "Rishi Vishwamitra",
      lines: [
        "You have chanted 4000 times. The mantra is now flowing through your very cells.",
        "Your consciousness is rising. You are beginning to perceive the unity behind all forms.",
        "Continue the practice. The more you chant, the more the veil lifts."
      ]
    },
    sideQuests: [
      {
        id: 'mantra_integration',
        title: "Live the Gayatri Principle Daily",
        description: "Apply the Gayatri's wisdom to all your actions - seeing divine light in everything.",
        reward: { xp: 170, understanding: 'mantra_living' }
      },
      {
        id: 'teach_others',
        title: "Teach Others the Gayatri",
        description: "Share the mantra and its benefits with sincere seekers in your community.",
        reward: { xp: 150, achievement: 'mantra_teacher' }
      },
      {
        id: 'surya_worship',
        title: "Develop Sun Worship (Surya Namaskar) Practice",
        description: "Practice 12 sun salutations daily, coordinating movements with Gayatri chanting.",
        reward: { xp: 160, understanding: 'surya_connection' }
      }
    ],
    choices: [
      {
        id: 'advanced_mantras',
        text: "Ask to learn other sacred mantras",
        label: "Deepen your mantra knowledge",
        nextChapter: 'vishwamitra_vedic_chanting',
        reward: { xp: 170 }
      },
      {
        id: 'merge_practice',
        text: "Seek to merge all teachings into one practice",
        label: "Move toward integration",
        nextChapter: 'convergence_point',
        reward: { xp: 160 }
      }
    ]
  },

  vishwamitra_vedic_chanting: {
    id: 'vishwamitra_vedic_chanting',
    title: "The Ancient Recitation Arts",
    chapter: 6,
    description: "Vishwamitra reveals: 'The Rigveda was preserved through precise oral recitation for thousands of years. The Rishis developed techniques to memorize vast amounts of sacred text without error. I will teach you these methods - they are keys to understanding and retaining divine knowledge.'",
    icon: BookOpen,
    dialogue: {
      npc: "Rishi Vishwamitra",
      lines: [
        "There are 11 ways of reciting the Vedas - each revealing different layers of meaning.",
        "The Samaveda is the Rigveda sung in melodic form - the musical manifestation of truth.",
        "When properly chanted, the verses create harmonic frequencies that elevate consciousness."
      ]
    },
    sideQuests: [
      {
        id: 'memorize_hymn',
        title: "Memorize a Complete Rigvedic Hymn",
        description: "Master one of the 1028 Rigvedic hymns using ancient mnemonic techniques.",
        reward: { xp: 200, achievement: 'hymn_keeper' }
      },
      {
        id: 'vedic_chanting',
        title: "Learn Vedic Recitation Techniques",
        description: "Study the precise pronunciation (Samhita) and melodic patterns (Samaveda) of sacred texts.",
        reward: { xp: 180, understanding: 'vedic_chanting' }
      }
    ],
    choices: [
      {
        id: 'become_vedic_master',
        text: "Dedicate yourself to preserving the Vedas",
        label: "Become a guardian of sacred knowledge",
        nextChapter: 'vishwamitra_final_wisdom',
        reward: { xp: 200, deity: 'surya', achievement: 'vedic_master' }
      }
    ]
  },

  vishwamitra_final_wisdom: {
    id: 'vishwamitra_final_wisdom',
    title: "The Ultimate Truth",
    chapter: 7,
    description: "After years of study with Vishwamitra, he reveals his deepest teaching: 'All the mantras, all the hymns, all the practices point to one truth - that the divine consciousness pervades everything. You are not separate from it. The Gayatri teaches this: the light you worship outwardly is the light that burns within your own heart. Become that light.'",
    icon: Crown,
    dialogue: {
      npc: "Rishi Vishwamitra (elder)",
      lines: [
        "I have devoted my life to understanding sound and vibration.",
        "I have taught thousands of students the sacred mantras.",
        "But the greatest teaching is this: the universe itself is the Guru. Listen to its every whisper."
      ]
    },
    sideQuests: [
      {
        id: 'eternal_service',
        title: "Commit to Eternal Teaching",
        description: "Make it your life's work to teach the Gayatri and Vedic wisdom to future generations.",
        reward: { xp: 300, achievement: 'eternal_teacher' }
      }
    ],
    choices: [
      {
        id: 'continue_legacy',
        text: "I will continue your legacy",
        label: "Become a Vedic teacher",
        nextChapter: 'convergence_point',
        reward: { xp: 280, achievement: 'vishwamitra_successor' }
      }
    ]
  },


  gayatri_practice: {
    id: 'gayatri_practice',
    title: "The Sacred Syllables",
    chapter: 3,
    description: "Vishwamitra intones: 'Om Bhur Bhuvah Svah, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat.' The words resonate through your being. 'Meditate on this daily at sunrise,' he instructs.",
    icon: Sparkles,
    dialogue: {
      npc: "Rishi Vishwamitra",
      lines: [
        "Each syllable of the Gayatri carries cosmic power.",
        "Om connects you to primordial sound.",
        "Bhur Bhuvah Svah takes you through the three worlds.",
        "Tat Savitur reveals the divine light.",
        "Practice this mantra with full presence at sunrise."
      ]
    },
    sideQuests: [
      {
        id: 'sunrise_40days',
        title: "Practice Gayatri for 40 Sunrises",
        description: "Recite the Gayatri mantra each dawn for 40 consecutive days.",
        reward: { xp: 130, understanding: 'gayatri_practice' }
      },
      {
        id: 'mantra_integration',
        title: "Integrate Mantra Into Daily Life",
        description: "Let the Gayatri's wisdom guide all your actions.",
        reward: { xp: 120, understanding: 'mantra_daily' }
      }
    ],
    choices: [
      { 
        id: 'sunrise_practice', 
        text: "Practice at sunrise for 40 days", 
        label: "Commit to disciplined practice", 
        nextChapter: 'solar_wisdom', 
        reward: { xp: 120 } 
      },
      { 
        id: 'explore_sound', 
        text: "Study the vibrational science of the mantra", 
        label: "Understand mantra mechanics", 
        nextChapter: 'shabda_brahman', 
        reward: { xp: 100 } 
      }
    ]
  },

  shabda_brahman: {
    id: 'shabda_brahman',
    title: "The Cosmic Word",
    chapter: 4,
    description: "Vishwamitra explains the profound truth: 'All creation arose from primordial sound. The syllable OM contains all reality. When you chant, you align with the fundamental vibration of existence itself.'",
    icon: Waves,
    dialogue: {
      npc: "Rishi Vishwamitra",
      lines: [
        "In the beginning was Shabda - sound, vibration.",
        "From [translate:Nada Brahman]] - cosmic sound - all universes emerged.",
        "Every atom vibrates with the frequency of creation.",
        "When you understand this, you understand everything."
      ]
    },
    sideQuests: [
      {
        id: 'study_creation_hymns',
        title: "Study the Nasadiya Sukta (Creation Hymn)",
        description: "Meditate on the hymn that begins 'Then there was neither being nor non-being.'",
        reward: { xp: 140, understanding: 'creation_mystery' }
      },
      {
        id: 'sound_observation',
        title: "Observe Sound in Nature",
        description: "Listen deeply to natural sounds - rivers, wind, animals - recognizing the cosmic vibration.",
        reward: { xp: 135, understanding: 'natural_sound' }
      }
    ],
    choices: [
      { 
        id: 'creation_study', 
        text: "Study the hymns of creation", 
        label: "Explore the cosmic origins", 
        nextChapter: 'convergence_point', 
        reward: { xp: 150 } 
      },
      { 
        id: 'sound_meditation', 
        text: "Practice sound meditation", 
        label: "Become one with the cosmic vibration", 
        nextChapter: 'meditation_mastery', 
        reward: { xp: 130 } 
      }
    ]
  },

  meditation_mastery: {
    id: 'meditation_mastery',
    title: "Stillness of Mind",
    chapter: 4,
    description: "Through weeks of practice, your mind becomes still as a windless lake. In this clarity, you begin to perceive truths hidden beneath the surface of reality.",
    icon: Brain,
    dialogue: {
      npc: "Inner Guide",
      lines: [
        "The surface of the mind is like rippled water.",
        "Through meditation, these ripples cease.",
        "When the water is still, it reflects the infinite sky perfectly.",
        "This is the mind without disturbance - Samadhi."
      ]
    },
    sideQuests: [
      {
        id: 'deepen_meditation',
        title: "Sit in Meditation for 100 Days",
        description: "Maintain a consistent daily meditation practice for 100 consecutive days.",
        reward: { xp: 160, achievement: 'meditation_century' }
      },
      {
        id: 'witness_mind',
        title: "Become Witness to Your Own Mind",
        description: "Develop the capacity to observe your thoughts without identification or reaction.",
        reward: { xp: 150, understanding: 'mind_witnessing' }
      },
      {
        id: 'flow_experience',
        title: "Experience Flow States",
        description: "Achieve states of meditation where there is no sense of time or separation.",
        reward: { xp: 170, achievement: 'flow_master' }
      }
    ],
    choices: [
      { 
        id: 'continue_meditation', 
        text: "Deepen your meditative practice further", 
        label: "Path of deeper inner exploration", 
        nextChapter: 'convergence_point', 
        reward: { xp: 140 } 
      },
      { 
        id: 'combine_action', 
        text: "Balance meditation with ritual action and service", 
        label: "Unite contemplation and practice", 
        nextChapter: 'convergence_point', 
        reward: { xp: 130 } 
      }
    ]
  },

  saraswati_first_encounter: {
    id: 'saraswati_first_encounter',
    title: "The Call of the Sacred River",
    chapter: 2,
    description: "You sit alone by the banks of the Saraswati at dawn. The river flows eternally, indifferent yet nurturing. An ancient sage appears beside you: 'The river has called you. She whispers secrets to those who listen with the heart. Will you learn her language?'",
    icon: Waves,
    dialogue: {
      npc: "Old Sage by the River",
      lines: [
        "The Saraswati is not just water - she is the flow of knowledge, consciousness itself.",
        "She carries the wisdom of all things to the cosmic ocean.",
        "Those who follow her teachings learn the art of adaptation and persistence."
      ]
    },
    choices: [
      {
        id: 'listen_to_river',
        text: "Teach me to listen to the river's wisdom",
        label: "Begin water meditation",
        nextChapter: 'saraswati_listening_practice',
        reward: { xp: 75 }
      },
      {
        id: 'study_varuna',
        text: "Tell me about Varuna, lord of waters",
        label: "Learn cosmic law",
        nextChapter: 'varuna_cosmic_wisdom',
        reward: { xp: 85 }
      },
      {
        id: 'ritual_immersion',
        text: "Guide me in ritual bathing",
        label: "Seek purification",
        nextChapter: 'saraswati_purification',
        reward: { xp: 70 }
      }
    ]
  },

  saraswati_listening_practice: {
    id: 'saraswati_listening_practice',
    title: "The Language of Water",
    chapter: 3,
    description: "The sage teaches: 'Water has no form of its own, yet it takes every form. Listen to how it flows around rocks, cascades down waterfalls, pools in still places. Each movement teaches a different lesson. Become water and understand all paths.'",
    icon: Waves,
    dialogue: {
      npc: "Old Sage",
      lines: [
        "Water is adaptable yet persistent - it wears away mountains over time.",
        "Water seeks the lowest places yet rises highest when called.",
        "Water cleanses, nourishes, connects all things."
      ]
    },
    sideQuests: [
      {
        id: 'observe_water_flow',
        title: "Observe Water Flow for 21 Days",
        description: "Sit by the river daily and study how water moves, adapts, persists.",
        reward: { xp: 100, understanding: 'water_wisdom' }
      },
      {
        id: 'ritual_ablution',
        title: "Perform Daily Ritual Ablutions",
        description: "Bathe in the river each morning with awareness of water's purifying properties.",
        reward: { xp: 90, understanding: 'water_purity' }
      },
      {
        id: 'water_meditation',
        title: "Meditate on Water Elements",
        description: "Contemplate water in all its forms: rivers, clouds, dew, rain.",
        reward: { xp: 95, understanding: 'water_forms' }
      }
    ],
    choices: [
      {
        id: 'deepen_practice',
        text: "I wish to go deeper into water's mysteries",
        label: "Advance to cosmic understanding",
        nextChapter: 'varuna_cosmic_wisdom',
        reward: { xp: 130 }
      }
    ]
  },

  varuna_cosmic_wisdom: {
    id: 'varuna_cosmic_wisdom',
    title: "Varuna - The All-Seeing Guardian",
    chapter: 4,
    description: "The sage reveals profound teachings: 'Varuna is the cosmic ocean and the law that sustains it. He is the witness who sees all deeds, judges all truth and falsehood. The waters reflect his all-seeing eye. To understand Varuna is to understand justice, order, and cosmic responsibility.'",
    icon: Eye,
    dialogue: {
      npc: "Old Sage",
      lines: [
        "Varuna's gaze penetrates all deception - no lie can hide from him.",
        "He binds all beings through [translate:Rta] - cosmic law and order.",
        "To worship Varuna is to commit to truth in all your dealings."
      ]
    },
    sideQuests: [
      {
        id: 'truth_practice',
        title: "Practice Complete Truthfulness for 40 Days",
        description: "Never speak an untruth, never deceive, always maintain integrity.",
        reward: { xp: 150, achievement: 'truth_keeper' }
      },
      {
        id: 'night_vigil',
        title: "Night Vigil Under Stars",
        description: "Spend nights by the river contemplating the cosmic order and your place in it.",
        reward: { xp: 120, understanding: 'cosmic_order' }
      },
      {
        id: 'dharma_study',
        title: "Study the Laws of Dharma",
        description: "Learn how to live righteously in alignment with cosmic law.",
        reward: { xp: 140, understanding: 'dharma_living' }
      }
    ],
    choices: [
      {
        id: 'embrace_dharma',
        text: "I commit to living by Dharma",
        label: "Accept cosmic responsibility",
        nextChapter: 'saraswati_dharma_integration',
        reward: { xp: 160 }
      }
    ]
  },

  saraswati_purification: {
    id: 'saraswati_purification',
    title: "Ritual Purification and Rebirth",
    chapter: 3,
    description: "The sage leads you through sacred ritual ablutions. 'Each bath is a death and rebirth. You emerge cleansed not just of physical impurities but of karmic burden. Let the Saraswati wash away your past and prepare you for transformation.'",
    icon: Droplet,
    dialogue: {
      npc: "Old Sage",
      lines: [
        "The river cleanses the body; meditation cleanses the mind; devotion cleanses the soul.",
        "Each immersion in sacred waters is a covenant with the divine.",
        "Emerge from the water reborn, transformed, ready to serve a higher purpose."
      ]
    },
    sideQuests: [
      {
        id: 'hundred_baths',
        title: "Take 100 Sacred Baths",
        description: "Immerse yourself in the Saraswati 100 times with complete mindfulness.",
        reward: { xp: 160, achievement: 'purified_seeker' }
      },
      {
        id: 'mantra_bathing',
        title: "Chant Mantras While Bathing",
        description: "Combine Gayatri or water-related mantras with your ritual bathing.",
        reward: { xp: 130, understanding: 'mantra_water_connection' }
      }
    ],
    choices: [
      {
        id: 'transformed_continue',
        text: "I feel reborn and ready to continue",
        label: "Move forward with renewed spirit",
        nextChapter: 'saraswati_dharma_integration',
        reward: { xp: 140 }
      }
    ]
  },

  saraswati_dharma_integration: {
    id: 'saraswati_dharma_integration',
    title: "Living Dharma - Cosmic Order in Daily Life",
    chapter: 5,
    description: "You've learned water's lessons and Varuna's principles. Now the sage teaches: 'Dharma is not abstract philosophy - it is how you live each moment. The cosmic order manifests through righteous action, truthful speech, and compassionate service.'",
    icon: Scale,
    dialogue: {
      npc: "Old Sage",
      lines: [
        "Your [translate:Svadharma]] - your unique duty - is to be discovered and fulfilled.",
        "The river teaches that each being has a role in the cosmic ecology.",
        "Find your role. Fulfill it with devotion. This is the path to liberation."
      ]
    },
    sideQuests: [
      {
        id: 'discover_svadharma',
        title: "Discover Your Unique Dharma",
        description: "Through meditation and contemplation, identify your unique purpose and duties.",
        reward: { xp: 170, understanding: 'svadharma' }
      },
      {
        id: 'serve_community',
        title: "Serve the Community Selflessly",
        description: "Perform service without expectation of reward for one full season.",
        reward: { xp: 160, achievement: 'selfless_servant' }
      },
      {
        id: 'teach_dharma',
        title: "Teach Others the Way of Dharma",
        description: "Share your understanding of cosmic order and righteous living with others.",
        reward: { xp: 150, achievement: 'dharma_teacher' }
      }
    ],
    choices: [
      {
        id: 'river_guardian',
        text: "I wish to become a guardian of these teachings",
        label: "Dedicate yourself fully",
        nextChapter: 'saraswati_final_wisdom',
        reward: { xp: 180 }
      }
    ]
  },

  saraswati_final_wisdom: {
    id: 'saraswati_final_wisdom',
    title: "The Ocean of Consciousness",
    chapter: 6,
    description: "After years of practice, the sage reveals the ultimate truth: 'All rivers flow to the ocean. All individual consciousness flows to universal consciousness. The Saraswati is both a physical river and the cosmic current of knowledge flowing through all existence. You are both the river and the ocean.'",
    icon: Infinity,
    dialogue: {
      npc: "Old Sage (wise elder)",
      lines: [
        "I have taught you the ways of water, of Varuna, of Dharma.",
        "But the greatest teaching cannot be spoken - it must be lived.",
        "Go now. Become the river. Flow with the cosmic current."
      ]
    },
    sideQuests: [
      {
        id: 'eternal_guardian',
        title: "Become an Eternal Guardian",
        description: "Commit to protecting the Saraswati and its wisdom for future generations.",
        reward: { xp: 300, achievement: 'river_guardian_eternal' }
      }
    ],
    choices: [
      {
        id: 'complete_integration',
        text: "I have become the river and the cosmic current",
        label: "Achieve ultimate unity",
        nextChapter: 'convergence_point',
        reward: { xp: 280, deity: 'varuna', achievement: 'saraswati_master' }
      }
    ]
  },

  // === PATH 4: INDRA STORM PATH (Warrior, Strength, Victory) ===

  indra_first_call: {
    id: 'indra_first_call',
    chapter: 2,
    title: "The Thunder Awakens Within",
    description: "You hear a distant thunder. The sky darkens. A warrior with eyes like lightning appears: 'I am sent by Indra, king of the gods, lord of storms. He has noticed your spirit. Do you have the courage to walk the path of the warrior? Or will you cower like prey?'",
    icon: Zap,
    dialogue: {
      npc: "Indra's Warrior Herald",
      lines: [
        "Indra is not a god of destruction - he is a god of overcoming obstacles.",
        "He defeated Vritra, the serpent of chaos, and brought forth the waters.",
        "To follow Indra is to embrace challenge, to face fear, to conquer limitations."
      ]
    },
    choices: [
      {
        id: 'accept_warrior_call',
        text: "Yes! I accept the warrior's path",
        label: "Embrace the challenge",
        nextChapter: 'indra_warrior_training',
        reward: { xp: 90, trust: 'indra' }
      },
      {
        id: 'seek_understanding_first',
        text: "Tell me more about what this path entails",
        label: "Ask for wisdom",
        nextChapter: 'indra_warrior_philosophy',
        reward: { xp: 80 }
      },
      {
        id: 'test_warrior',
        text: "Prove your claims - show me your power",
        label: "Challenge the herald",
        nextChapter: 'indra_power_display',
        reward: { xp: 95 }
      }
    ]
  },

  indra_warrior_training: {
    id: 'indra_warrior_training',
    title: "Physical Mastery",
    chapter: 3,
    description: "The herald takes you to training grounds where warriors drill daily. 'The body is a temple and a weapon. You must strengthen it, master it, make it an instrument of your will. But physical strength is only the beginning. True warrior power flows from unwavering spirit.'",
    icon: Shield,
    dialogue: {
      npc: "Indra's Warrior Herald",
      lines: [
        "A warrior's strength is not just in muscles, but in discipline, courage, and dharma.",
        "Train your body to obey your mind. Train your mind to serve higher truth.",
        "The greatest victory is the victory over your own limitations."
      ]
    },
    sideQuests: [
      {
        id: 'physical_training',
        title: "Complete Rigorous Physical Training",
        description: "Master martial techniques - sword, staff, hand-to-hand combat.",
        reward: { xp: 150, achievement: 'warrior_trained' }
      },
      {
        id: 'stamina_building',
        title: "Build Stamina and Endurance",
        description: "Run, swim, climb - develop the body of a true warrior.",
        reward: { xp: 130, understanding: 'physical_mastery' }
      },
      {
        id: 'weapon_mastery',
        title: "Master the Sacred Weapons",
        description: "Learn to wield weapons not for violence but for protection and truth.",
        reward: { xp: 140, understanding: 'righteous_combat' }
      }
    ],
    choices: [
      {
        id: 'complete_physical',
        text: "My body is now a warrior's instrument",
        label: "Move to mental training",
        nextChapter: 'indra_warrior_philosophy',
        reward: { xp: 150 }
      }
    ]
  },

  indra_warrior_philosophy: {
    id: 'indra_warrior_philosophy',
    title: "The Warrior's Code",
    chapter: 4,
    description: "The herald teaches deeper philosophy: 'A true warrior fights not for personal gain but to uphold Dharma. Indra fought Vritra to liberate the waters - an act of cosmic service. Your strength must serve truth, justice, and the protection of the vulnerable.'",
    icon: Crown,
    dialogue: {
      npc: "Indra's Warrior Herald",
      lines: [
        "A warrior without dharma is just a brute using force.",
        "But a warrior with dharma is a protector, a guardian of cosmic order.",
        "Know when to fight, when to show mercy, when to step aside. This is wisdom."
      ]
    },
    sideQuests: [
      {
        id: 'study_warrior_dharma',
        title: "Study Warrior Ethics and Dharma",
        description: "Learn the principles governing righteous combat and protection.",
        reward: { xp: 160, understanding: 'warrior_dharma' }
      },
      {
        id: 'protect_village',
        title: "Protect the Village",
        description: "Use your newfound strength to defend your community from harm.",
        reward: { xp: 170, achievement: 'protector' }
      },
      {
        id: 'indra_worship',
        title: "Study the Indra Hymns",
        description: "Learn the Rigvedic hymns dedicated to Indra's victories and virtues.",
        reward: { xp: 150, understanding: 'indra_wisdom' }
      }
    ],
    choices: [
      {
        id: 'warrior_victory',
        text: "I am ready to face great challenges",
        label: "Move to advanced training",
        nextChapter: 'indra_victory_quest',
        reward: { xp: 170 }
      }
    ]
  },

  indra_power_display: {
    id: 'indra_power_display',
    title: "The Storm's Wrath",
    chapter: 3,
    description: "The sky erupts. Lightning splits the heavens. Thunder shakes the earth. The herald's form becomes radiant with divine energy: 'This is the power of Indra - the force that overcomes all obstacles. This power can now flow through you if you prove yourself worthy.'",
    icon: Zap,
    dialogue: {
      npc: "Indra's Herald (transformed)",
      lines: [
        "Feel the raw power of the storm.",
        "This is the energy you must learn to channel without being consumed by it.",
        "Accept Indra's gift with humility."
      ]
    },
    sideQuests: [
      {
        id: 'survive_storm',
        title: "Endure the Sacred Storm",
        description: "Stand in the storm without fear as it rages around you.",
        reward: { xp: 180, achievement: 'storm_survivor' }
      }
    ],
    choices: [
      {
        id: 'embrace_power',
        text: "I accept Indra's power and will use it wisely",
        label: "Commit to the warrior path",
        nextChapter: 'indra_warrior_training',
        reward: { xp: 160, deity: 'indra' }
      }
    ]
  },

  indra_victory_quest: {
    id: 'indra_victory_quest',
    title: "The Great Challenge",
    chapter: 5,
    description: "Indra himself appears in a vision: 'Vritra still dwells in the hearts of all beings - fear, doubt, ego. Go forth and conquer these inner demons. Win your first great victory over yourself. Then you will be ready for whatever challenges the world presents.'",
    icon: Trophy,
    dialogue: {
      npc: "Indra (cosmic voice)",
      lines: [
        "The greatest enemy you will ever face lives within your own heart.",
        "Conquer it, and all external enemies will fall before you.",
        "This is the path to true victory and liberation."
      ]
    },
    sideQuests: [
      {
        id: 'face_fear',
        title: "Face Your Deepest Fear",
        description: "Identify and directly confront your greatest internal obstacle.",
        reward: { xp: 200, achievement: 'fearless_warrior' }
      },
      {
        id: 'overcome_ego',
        title: "Transcend Ego Through Service",
        description: "Perform humble service without any desire for recognition or reward.",
        reward: { xp: 190, achievement: 'ego_transcender' }
      },
      {
        id: 'lead_others',
        title: "Lead Others to Victory",
        description: "Help others overcome their own obstacles and fears.",
        reward: { xp: 180, achievement: 'guide_of_warriors' }
      }
    ],
    choices: [
      {
        id: 'eternal_warrior',
        text: "I have conquered myself and am ready to serve",
        label: "Become Indra's champion",
        nextChapter: 'indra_final_wisdom',
        reward: { xp: 220 }
      }
    ]
  },

  indra_final_wisdom: {
    id: 'indra_final_wisdom',
    title: "Indra's Final Teaching",
    chapter: 6,
    description: "Indra appears in full glory: 'You have walked the warrior's path with honor. You have learned that true strength serves truth, that courage stands against corruption, that victory means liberation for all. Become my instrument in the world - not for glory but for justice.'",
    icon: Crown,
    dialogue: {
      npc: "Indra (divine lord)",
      lines: [
        "I have watched you transform from seeker to warrior.",
        "Now go forth as my champion of dharma.",
        "Protect the weak, stand for truth, overcome all obstacles - this is your destiny."
      ]
    },
    sideQuests: [
      {
        id: 'eternal_duty',
        title: "Take the Warrior's Sacred Oath",
        description: "Commit eternally to the protection of dharma and the vulnerable.",
        reward: { xp: 300, achievement: 'indra_champion' }
      }
    ],
    choices: [
      {
        id: 'warrior_complete',
        text: "I accept my destiny as a warrior of dharma",
        label: "Become a eternal champion",
        nextChapter: 'convergence_point',
        reward: { xp: 280, deity: 'indra', achievement: 'indra_warrior_complete' }
      }
    ]
  },

  // === PATH 5: HEALING PATH (Ashvins, Medicine, Compassion) ===

  ashvin_healing_call: {
    id: 'ashvin_healing_call',
    chapter: 2,
    title: "The Healers' Summons",
    description: "You witness the village healer performing miracles - curing illnesses, easing pain, bringing hope. That night, two divine figures appear in your dreams: 'We are the Ashvins, physicians of the gods. We have seen compassion in your heart. Will you learn the art of healing?'",
    icon: Heart,
    dialogue: {
      npc: "The Ashvins (divine twins)",
      lines: [
        "We are the gods of healing, of restoration, of bringing the broken back to wholeness.",
        "Healing is not just medicine - it is compassion made manifest.",
        "Those who follow us learn to see the divine spark even in the most broken beings."
      ]
    },
    choices: [
      {
        id: 'accept_healer_path',
        text: "Teach me to heal",
        label: "Begin the healing path",
        nextChapter: 'ashvin_apprenticeship',
        reward: { xp: 85 }
      },
      {
        id: 'understand_healing',
        text: "What is the deeper meaning of healing?",
        label: "Seek understanding first",
        nextChapter: 'ashvin_healing_philosophy',
        reward: { xp: 80 }
      },
      {
        id: 'prove_worthiness',
        text: "What must I do to prove my worthiness?",
        label: "Ask for a test",
        nextChapter: 'ashvin_compassion_test',
        reward: { xp: 90 }
      }
    ]
  },

  ashvin_apprenticeship: {
    id: 'ashvin_apprenticeship',
    title: "Learning the Healing Arts",
    chapter: 3,
    description: "The village healer welcomes you as apprentice. 'Healing involves knowledge of herbs and their properties, understanding of the body's rhythms, but most importantly, it requires genuine compassion. Each patient is a universe unto themselves. Learn to treat them as such.'",
    icon: Heart,
    dialogue: {
      npc: "Village Healer",
      lines: [
        "There are 7000 herbs with healing properties. Learn them.",
        "There are countless ailments. Understand their roots.",
        "But above all, heal with love. Healing without love is just mechanics."
      ]
    },
    sideQuests: [
      {
        id: 'herb_study',
        title: "Master 100 Healing Herbs",
        description: "Study the properties, applications, and preparation of 100 medicinal plants.",
        reward: { xp: 150, achievement: 'herbalist' }
      },
      {
        id: 'treat_patients',
        title: "Treat 100 Patients with Complete Success",
        description: "Personally tend to patients and bring about their healing.",
        reward: { xp: 170, achievement: 'compassionate_healer' }
      },
      {
        id: 'massage_therapy',
        title: "Master Therapeutic Touch",
        description: "Learn to heal through touch, massage, and energy work.",
        reward: { xp: 140, understanding: 'healing_touch' }
      }
    ],
    choices: [
      {
        id: 'advanced_healing',
        text: "I am ready for deeper healing knowledge",
        label: "Progress to spiritual healing",
        nextChapter: 'ashvin_spiritual_healing',
        reward: { xp: 160 }
      }
    ]
  },

  ashvin_healing_philosophy: {
    id: 'ashvin_healing_philosophy',
    title: "The Philosophy of Wholeness",
    chapter: 4,
    description: "The Ashvins teach: 'Disease is not merely physical - it arises from imbalance in body, mind, and spirit. True healing restores balance to all three. You must learn to see the whole being, not just the broken part.'",
    icon: Lightbulb,
    dialogue: {
      npc: "The Ashvins",
      lines: [
        "Physical ailments often reflect spiritual wounds.",
        "Mental disturbance manifests as bodily disease.",
        "To heal truly, address the root - be it physical, mental, or spiritual."
      ]
    },
    sideQuests: [
      {
        id: 'holistic_study',
        title: "Study the Three Doshas",
        description: "Learn [translate:Ayurveda]] - the ancient system of balancing body, mind, spirit.",
        reward: { xp: 160, understanding: 'ayurvedic_medicine' }
      },
      {
        id: 'meditation_healing',
        title: "Learn to Heal Through Meditation",
        description: "Develop the ability to channel healing energy through focused consciousness.",
        reward: { xp: 150, understanding: 'energy_healing' }
      }
    ],
    choices: [
      {
        id: 'spiritual_healer',
        text: "I will become a healer of body, mind, and spirit",
        label: "Integrate all healing knowledge",
        nextChapter: 'ashvin_spiritual_healing',
        reward: { xp: 170 }
      }
    ]
  },

  ashvin_compassion_test: {
    id: 'ashvin_compassion_test',
    title: "The Test of the Heart",
    chapter: 3,
    description: "The Ashvins place you before a suffering being: 'This person committed terrible crimes. Yet they suffer now. Will you heal them? Can your compassion extend even to the fallen and broken?'",
    icon: Heart,
    dialogue: {
      npc: "The Ashvins",
      lines: [
        "True compassion does not judge.",
        "A healer treats all equally - the virtuous and the fallen.",
        "Can you love unconditionally? This is the real test."
      ]
    },
    sideQuests: [
      {
        id: 'heal_criminal',
        title: "Heal the Broken and Fallen",
        description: "Extend compassion and healing to those society has rejected.",
        reward: { xp: 180, achievement: 'universal_healer' }
      }
    ],
    choices: [
      {
        id: 'universal_compassion',
        text: "Yes, I will heal them",
        label: "Accept universal compassion",
        nextChapter: 'ashvin_apprenticeship',
        reward: { xp: 160, deity: 'ashvin' }
      }
    ]
  },

  ashvin_spiritual_healing: {
    id: 'ashvin_spiritual_healing',
    title: "Healing the Spirit",
    chapter: 5,
    description: "The Ashvins reveal: 'The deepest healing comes when a being remembers their divine nature. Help them see the infinite consciousness within themselves. This knowledge alone can heal any disease.'",
    icon: Star,
    dialogue: {
      npc: "The Ashvins",
      lines: [
        "You have learned to heal the body and calm the mind.",
        "Now learn to awaken the spirit within each being.",
        "This is the ultimate healing - remembering that all disease is illusion of separation."
      ]
    },
    sideQuests: [
      {
        id: 'spiritual_guide',
        title: "Guide Others to Spiritual Awakening",
        description: "Help patients remember their divine nature and infinite consciousness.",
        reward: { xp: 200, achievement: 'spiritual_healer' }
      },
      {
        id: 'train_healers',
        title: "Train a New Generation of Healers",
        description: "Pass on your knowledge and compassion to committed students.",
        reward: { xp: 190, achievement: 'healer_of_healers' }
      }
    ],
    choices: [
      {
        id: 'eternal_healer',
        text: "I dedicate myself to universal healing",
        label: "Become an eternal healer",
        nextChapter: 'ashvin_final_wisdom',
        reward: { xp: 210 }
      }
    ]
  },

  ashvin_final_wisdom: {
    id: 'ashvin_final_wisdom',
    title: "The Ashvins' Greatest Secret",
    chapter: 6,
    description: "The divine twins appear in blazing light: 'You have learned our teachings well. Now know this: the greatest healing is not of individual bodies but of humanity's collective consciousness. Help humanity remember its divine nature. This is the ultimate service.'",
    icon: Star,
    dialogue: {
      npc: "The Ashvins (divine presence)",
      lines: [
        "We are satisfied with your commitment to healing.",
        "Go now and be our presence in the world.",
        "Heal not just individuals, but help restore the divine connection in all beings."
      ]
    },
    sideQuests: [
      {
        id: 'eternal_healing_mission',
        title: "Commit to Eternal Healing",
        description: "Make healing your eternal mission across lifetimes.",
        reward: { xp: 300, achievement: 'eternal_healer_ashvin' }
      }
    ],
    choices: [
      {
        id: 'healing_complete',
        text: "I accept this sacred mission",
        label: "Become eternal healer",
        nextChapter: 'convergence_point',
        reward: { xp: 280, deity: 'ashvin', achievement: 'ashvin_healer_master' }
      }
    ]
  },

  water_wisdom: {
    id: 'water_wisdom',
    title: "The Teaching of Waters",
    chapter: 3,
    description: "An old sage joins you by the river. 'Water teaches us,' he says. 'It adapts to every vessel, seeks the lowest place, yet nothing can resist it. This is the way of wisdom - gentle persistence, humble power.'",
    icon: Droplet,
    dialogue: {
      npc: "Old Sage",
      lines: [
        "Water is the softest element, yet it wears away the hardest stone.",
        "It never fights - it always finds the way around obstacles.",
        "Yet water nourishes all life. This is the paradox of true power.",
        "Learn to be like water, and you will master life's challenges."
      ]
    },
    sideQuests: [
      {
        id: 'water_observation',
        title: "Observe Water for 21 Days",
        description: "Sit by the river daily and study how water moves, adapts, and persists.",
        reward: { xp: 100, understanding: 'water_nature' }
      },
      {
        id: 'water_philosophy',
        title: "Contemplate Water's Teachings",
        description: "Reflect on the lessons water teaches about flexibility, gentleness, and persistence.",
        reward: { xp: 95, understanding: 'water_philosophy' }
      }
    ],
    choices: [
      { 
        id: 'learn_more', 
        text: "Ask about Varuna, lord of waters and cosmic ocean", 
        label: "Study the cosmic ocean", 
        nextChapter: 'varuna_mysteries', 
        reward: { xp: 90 } 
      },
      { 
        id: 'practical_wisdom', 
        text: "Apply water's teaching to your daily life", 
        label: "Embody the teaching", 
        nextChapter: 'convergence_point', 
        reward: { xp: 100 } 
      }
    ]
  },

  varuna_mysteries: {
    id: 'varuna_mysteries',
    title: "The All-Seeing Guardian",
    chapter: 4,
    description: "The sage speaks of Varuna: 'He who sees all, from whom no deed is hidden. The cosmic ocean is his domain, and all laws of right and wrong flow from him. His gaze pierces through every deception.'",
    icon: Eye,
    dialogue: {
      npc: "Old Sage",
      lines: [
        "Varuna's thousand eyes see everything in creation.",
        "He is the keeper of cosmic order - [translate:Rta]].",
        "No lie escapes his vision; no oath broken passes unnoticed.",
        "To understand Varuna is to understand that truth is the foundation of reality."
      ]
    },
    sideQuests: [
      {
        id: 'study_rta',
        title: "Study the Laws of Rta (Cosmic Order)",
        description: "Learn how universal order manifests through natural laws and moral principles.",
        reward: { xp: 115, understanding: 'rta_nature' }
      },
      {
        id: 'varuna_meditation',
        title: "Meditate on Varuna's All-Seeing Gaze",
        description: "Contemplate how cosmic consciousness witnesses all action without judgment yet perfectly understands.",
        reward: { xp: 120, understanding: 'varuna_consciousness' }
      }
    ],
    choices: [
      { 
        id: 'moral_law', 
        text: "Study the nature of truth and falsehood", 
        label: "Understand cosmic justice", 
        nextChapter: 'rta_meditation', 
        reward: { xp: 110 } 
      },
      { 
        id: 'ocean_meditation', 
        text: "Meditate on the infinite cosmic ocean and its depths", 
        label: "Contemplate boundlessness", 
        nextChapter: 'convergence_point', 
        reward: { xp: 120 } 
      }
    ]
  },

  rta_meditation: {
    id: 'rta_meditation',
    title: "The Cosmic Order",
    chapter: 4,
    description: "You come to understand [translate:Rta]] - the fundamental order underlying all existence. The sun rises and sets in perfect rhythm, seasons turn, rivers flow to the sea. This is not mere repetition but divine law, the very structure of reality.",
    icon: Scale,
    dialogue: {
      npc: "Old Sage",
      lines: [
        "[translate:Rta]] is the eternal principle of right order.",
        "Every atom follows it. Every star obeys it.",
        "When humans align with [translate:Rta]], they live in harmony with cosmic truth.",
        "This is the foundation of all dharma - righteous living."
      ]
    },
    sideQuests: [
      {
        id: 'observe_patterns',
        title: "Observe Cosmic Patterns",
        description: "Study how natural cycles - day/night, seasons, celestial movements - reflect perfect order.",
        reward: { xp: 125, understanding: 'cosmic_patterns' }
      },
      {
        id: 'align_with_order',
        title: "Align Your Life With Cosmic Order",
        description: "Structure your daily practices in harmony with natural and cosmic rhythms.",
        reward: { xp: 135, understanding: 'rta_alignment' }
      }
    ],
    choices: [
      { 
        id: 'dharma_study', 
        text: "Study how humans align with this universal order", 
        label: "Learn about Dharma", 
        nextChapter: 'convergence_point', 
        reward: { xp: 140 } 
      },
      { 
        id: 'cosmic_meditation', 
        text: "Meditate deeply on the universal patterns", 
        label: "Perceive the hidden connections", 
        nextChapter: 'convergence_point', 
        reward: { xp: 130 } 
      }
    ]
  },

  observer_ritual_beginning: {
    id: 'observer_ritual_beginning',
    title: "The Silent Watcher",
    chapter: 2,
    description: "You sit in the temple's corner, unnoticed. The rituals unfold around you - each gesture precise, each word sacred. An old scholar notices your keen observation: 'You see what others miss. The path of the observer requires patience, humility, and the ability to find profound meaning in small details. Will you walk this path?'",
    icon: Eye,
    dialogue: {
      npc: "Elder Scholar",
      lines: [
        "Most people rush through life, missing the sacred patterns everywhere.",
        "The observer learns through patient watching - how things connect, why rituals matter.",
        "In stillness and attention, all knowledge reveals itself."
      ]
    },
    choices: [
      {
        id: 'commit_observation',
        text: "I will observe everything with complete attention",
        label: "Begin the observer's practice",
        nextChapter: 'observer_ritual_study',
        reward: { xp: 80 }
      },
      {
        id: 'ask_philosophy',
        text: "What wisdom comes from observation alone?",
        label: "Understand the deeper purpose",
        nextChapter: 'observer_philosophy',
        reward: { xp: 85 }
      },
      {
        id: 'learn_patterns',
        text: "Teach me to see the hidden patterns",
        label: "Learn pattern recognition",
        nextChapter: 'observer_pattern_mastery',
        reward: { xp: 90 }
      }
    ]
  },

  observer_ritual_study: {
    id: 'observer_ritual_study',
    title: "The Language of Ritual",
    chapter: 3,
    description: "The scholar teaches: 'Every ritual has layers - outer form, inner meaning, and deepest truth. Watch the Agnihotra. See how fire transforms offerings. This transformation mirrors how consciousness transforms raw experience into wisdom.'",
    icon: BookOpen,
    dialogue: {
      npc: "Elder Scholar",
      lines: [
        "Ritual is not superstition - it is the crystallized wisdom of ages.",
        "Each gesture symbolizes cosmic truths. Each word carries power.",
        "The observer who truly sees understands that reality itself is the ultimate ritual."
      ]
    },
    sideQuests: [
      {
        id: 'observe_hundred_rituals',
        title: "Observe 100 Different Rituals",
        description: "Attend and carefully observe 100 different ceremonies across seasons and temples.",
        reward: { xp: 170, achievement: 'ritual_master_observer' }
      },
      {
        id: 'document_patterns',
        title: "Document Ritual Patterns",
        description: "Write detailed notes on the patterns, repetitions, and meanings you discover.",
        reward: { xp: 150, understanding: 'ritual_patterns' }
      },
      {
        id: 'teach_observations',
        title: "Teach Others Your Observations",
        description: "Share your insights with sincere students interested in understanding ritual.",
        reward: { xp: 140, achievement: 'teacher_of_ritual' }
      }
    ],
    choices: [
      {
        id: 'deepen_observation',
        text: "I have discovered profound patterns",
        label: "Move to deeper understanding",
        nextChapter: 'observer_philosophy',
        reward: { xp: 150 }
      }
    ]
  },

  observer_philosophy: {
    id: 'observer_philosophy',
    title: "The Philosophy of Attention",
    chapter: 4,
    description: "The scholar reveals: 'Attention is the highest form of prayer. When you truly observe something, you give it your consciousness. This act of witnessing is itself a sacred participation in creation. The observer becomes co-creator with the divine.'",
    icon: Brain,
    dialogue: {
      npc: "Elder Scholar",
      lines: [
        "What you observe shapes reality. Your attention literally participates in creation.",
        "The Rishis understood this - they observed the world and their observations became the hymns.",
        "You are not separate from what you observe - you are intimately connected."
      ]
    },
    sideQuests: [
      {
        id: 'meditate_observation',
        title: "Meditate on the Power of Observation",
        description: "Spend weeks contemplating how your attention shapes reality.",
        reward: { xp: 160, understanding: 'observer_consciousness' }
      },
      {
        id: 'study_consciousness',
        title: "Study the Nature of Consciousness",
        description: "Explore how awareness itself participates in creation.",
        reward: { xp: 150, understanding: 'consciousness_creation' }
      }
    ],
    choices: [
      {
        id: 'master_observation',
        text: "I will become a perfect observer",
        label: "Achieve mastery",
        nextChapter: 'observer_pattern_mastery',
        reward: { xp: 170 }
      }
    ]
  },

  observer_pattern_mastery: {
    id: 'observer_pattern_mastery',
    title: "The Master of Patterns",
    chapter: 5,
    description: "Years of observation have granted you profound sight. You see the cosmic patterns underlying all existence - how the Rigveda hymns follow the same patterns as rituals, seasons, human life cycles, and stellar movements. Everything resonates with everything else.",
    icon: Target,
    dialogue: {
      npc: "Elder Scholar",
      lines: [
        "You have learned what took the Rishis lifetimes to discover.",
        "The entire universe operates through recurring patterns and cycles.",
        "This knowledge is the foundation of all wisdom traditions."
      ]
    },
    sideQuests: [
      {
        id: 'document_patterns',
        title: "Create the Pattern Encyclopedia",
        description: "Systematically document all the patterns you've discovered.",
        reward: { xp: 200, achievement: 'pattern_encyclopedia_creator' }
      },
      {
        id: 'predict_future',
        title: "Learn to Predict Through Pattern Recognition",
        description: "Apply your pattern knowledge to anticipate future events.",
        reward: { xp: 190, understanding: 'predictive_wisdom' }
      }
    ],
    choices: [
      {
        id: 'become_sage_observer',
        text: "I will become a sage of patterns",
        label: "Achieve ultimate observation",
        nextChapter: 'observer_final_wisdom',
        reward: { xp: 200 }
      }
    ]
  },

  observer_final_wisdom: {
    id: 'observer_final_wisdom',
    title: "The Observer Becomes the Observed",
    chapter: 6,
    description: "The scholar, now ancient, reveals the final truth: 'You have observed everything - except yourself. Now understand: the observer is the ultimate mystery. You are the consciousness observing itself through infinite forms. You are both the watcher and the watched.'",
    icon: Infinity,
    dialogue: {
      npc: "Elder Scholar (ancient sage)",
      lines: [
        "I have shared all the knowledge of observation I possess.",
        "But the deepest truth cannot be taught - only discovered.",
        "Go now and continue observing. The universe is infinitely deep."
      ]
    },
    sideQuests: [
      {
        id: 'eternal_observation',
        title: "Commit to Eternal Observation",
        description: "Make observation your eternal practice, seeing the divine in all forms.",
        reward: { xp: 300, achievement: 'eternal_observer' }
      }
    ],
    choices: [
      {
        id: 'observer_complete',
        text: "I have become the observer and the observed",
        label: "Achieve enlightened observation",
        nextChapter: 'convergence_point',
        reward: { xp: 280, achievement: 'observer_master' }
      }
    ]
  },

  // === PATH 7: INNER SEEKER PATH (Independent Meditation - Self-Discovery) ===

  inner_seeker_solitude: {
    id: 'inner_seeker_solitude',
    title: "The Call to Solitude",
    chapter: 2,
    description: "You feel drawn away from all teaching, all rituals, all external guidance. A mysterious voice whispers: 'The greatest teacher is within. Your own consciousness is the Guru. Will you venture into the depths of your own being and discover truth there?'",
    icon: Compass,
    dialogue: {
      npc: "Inner Guide (your own intuition)",
      lines: [
        "All external teachers can only point the way.",
        "But truth can only be discovered within yourself.",
        "Meditate. Go inward. Your true nature awaits discovery."
      ]
    },
    choices: [
      {
        id: 'embrace_solitude',
        text: "Yes, I will retreat and meditate",
        label: "Begin inner exploration",
        nextChapter: 'inner_seeker_retreat',
        reward: { xp: 85 }
      },
      {
        id: 'question_path',
        text: "How do I know this inner path is valid?",
        label: "Seek validation first",
        nextChapter: 'inner_seeker_validation',
        reward: { xp: 80 }
      },
      {
        id: 'balance_approach',
        text: "Can I balance solitude with some external guidance?",
        label: "Seek balanced approach",
        nextChapter: 'inner_seeker_balance',
        reward: { xp: 90 }
      }
    ]
  },

  inner_seeker_retreat: {
    id: 'inner_seeker_retreat',
    title: "Retreat Into Silence",
    chapter: 3,
    description: "You find a cave or secluded space and begin the great work of introspection. Days merge into weeks. External silence reveals internal vastness. Thoughts, emotions, and sensations arise and dissolve. You begin to touch something deeper than mind - pure consciousness itself.",
    icon: Brain,
    dialogue: {
      npc: "Inner Guide",
      lines: [
        "Silence is not emptiness - it is fullness beyond words.",
        "In the depths, you will find your true nature.",
        "Continue. You are approaching the truth."
      ]
    },
    sideQuests: [
      {
        id: 'hundred_day_meditation',
        title: "100-Day Continuous Meditation Retreat",
        description: "Sit in unbroken meditation for 100 days, watching the mind's transformations.",
        reward: { xp: 200, achievement: 'meditation_master' }
      },
      {
        id: 'witness_arising',
        title: "Witness All Mental Phenomena",
        description: "Observe thoughts, emotions, and sensations without judgment or identification.",
        reward: { xp: 180, understanding: 'mental_witness' }
      },
      {
        id: 'touch_void',
        title: "Touch the Void of Pure Being",
        description: "Experience states where even the meditator dissolves into pure consciousness.",
        reward: { xp: 200, achievement: 'void_explorer' }
      }
    ],
    choices: [
      {
        id: 'emerge_transformed',
        text: "I have touched the infinite",
        label: "Move to integration",
        nextChapter: 'inner_seeker_integration',
        reward: { xp: 180 }
      }
    ]
  },

  inner_seeker_validation: {
    id: 'inner_seeker_validation',
    title: "Testing the Inner Path",
    chapter: 3,
    description: "You meditate selectively, testing your inner experiences against external reality. Slowly, synchronicities appear. Insights prove accurate. Your intuition begins to manifest as tangible results. The inner path validates itself through direct experience.",
    icon: Lightbulb,
    dialogue: {
      npc: "Inner Guide",
      lines: [
        "Truth always validates itself through experience.",
        "Watch how your inner knowing manifests in outer reality.",
        "This is the only proof that matters."
      ]
    },
    sideQuests: [
      {
        id: 'apply_insights',
        title: "Apply Inner Insights Practically",
        description: "Test your meditative insights in real-world situations and document results.",
        reward: { xp: 170, understanding: 'practical_realization' }
      },
      {
        id: 'trust_intuition',
        title: "Develop Perfect Intuitive Trust",
        description: "Learn to act on intuitive knowing without rational justification.",
        reward: { xp: 160, achievement: 'intuition_master' }
      }
    ],
    choices: [
      {
        id: 'deepen_practice',
        text: "My inner path is validated - I will go deeper",
        label: "Commit fully to inner work",
        nextChapter: 'inner_seeker_integration',
        reward: { xp: 170 }
      }
    ]
  },

  inner_seeker_balance: {
    id: 'inner_seeker_balance',
    title: "The Middle Way",
    chapter: 3,
    description: "You discover the paradox: complete solitude can become spiritual escapism, yet constant external teaching can prevent true inner discovery. The balanced path honors both - daily meditation at your own pace, occasional consultation with wise elders, but ultimately trusting your inner compass.",
    icon: Scale,
    dialogue: {
      npc: "Inner Guide",
      lines: [
        "The greatest wisdom balances silence and seeking.",
        "Listen within, but remain open to outside wisdom.",
        "Trust yourself, but stay humble to mystery."
      ]
    },
    sideQuests: [
      {
        id: 'balanced_practice',
        title: "Establish Balanced Daily Practice",
        description: "Create a sustainable routine balancing meditation, learning, and service.",
        reward: { xp: 165, understanding: 'balanced_living' }
      }
    ],
    choices: [
      {
        id: 'continue_integration',
        text: "Balance brings me clarity",
        label: "Move to integration",
        nextChapter: 'inner_seeker_integration',
        reward: { xp: 170 }
      }
    ]
  },

  inner_seeker_integration: {
    id: 'inner_seeker_integration',
    title: "Bringing Inner Truth Outward",
    chapter: 5,
    description: "Your inner realizations demand expression. How do you embody what you've discovered? The challenge is: live the truth you've found, let it naturally radiate through your being without needing to proselytize or teach. Become your realization.",
    icon: Star,
    dialogue: {
      npc: "Inner Guide",
      lines: [
        "The deepest teaching is your own transformed life.",
        "Others will see your peace and ask what you've found.",
        "Then, if it serves, you can share."
      ]
    },
    sideQuests: [
      {
        id: 'embody_truth',
        title: "Embody Your Realization",
        description: "Live with complete integrity and consistency from your inner truth.",
        reward: { xp: 210, achievement: 'truth_embodied' }
      },
      {
        id: 'inspire_naturally',
        title: "Inspire Others Through Presence",
        description: "Let your presence and example naturally attract and transform others.",
        reward: { xp: 200, achievement: 'living_teacher' }
      }
    ],
    choices: [
      {
        id: 'become_inner_sage',
        text: "My life is my teaching",
        label: "Become inner wisdom embodied",
        nextChapter: 'inner_seeker_final_wisdom',
        reward: { xp: 220 }
      }
    ]
  },

  inner_seeker_final_wisdom: {
    id: 'inner_seeker_final_wisdom',
    title: "The Self Recognizes Itself",
    chapter: 6,
    description: "In the depths of meditation, you finally realize: there is no separate 'you' observing truth. You ARE the truth observing itself. The seeker and the sought are one. All your searching led you back to what you always were - infinite, eternal, divine consciousness.",
    icon: Infinity,
    dialogue: {
      npc: "Inner Guide (no longer separate)",
      lines: [
        "There is no guide except yourself.",
        "There is no path except the path of being.",
        "You are home."
      ]
    },
    sideQuests: [
      {
        id: 'eternal_inner_work',
        title: "Commit to Eternal Inner Exploration",
        description: "Continue deepening your realization throughout eternity.",
        reward: { xp: 300, achievement: 'eternal_inner_seeker' }
      }
    ],
    choices: [
      {
        id: 'inner_seeker_complete',
        text: "I have found myself",
        label: "Complete inner journey",
        nextChapter: 'convergence_point',
        reward: { xp: 280, deity: 'brahman', achievement: 'inner_seeker_master' }
      }
    ]
  },

  // === PATH 8: WANDERING SCHOLAR PATH (Multi-Teacher Journey) ===

  wandering_scholar_call: {
    id: 'wandering_scholar_call',
    title: "The Call to Wander",
    chapter: 2,
    description: "A traveling philosopher passes through your village. 'There is one truth,' he says, 'but infinite paths to it. I have studied with 100 teachers and each taught me something essential. Come - wander with me. Learn from everyone. The world itself is the greatest Guru.'",
    icon: Footprints,
    dialogue: {
      npc: "Wandering Philosopher",
      lines: [
        "No single teacher holds all wisdom - each sees one facet of the infinite.",
        "I have walked for decades, learning from Rishis, yogis, healers, warriors, farmers.",
        "Each revealed something the others could not. Join this endless quest."
      ]
    },
    choices: [
      {
        id: 'accept_wandering',
        text: "Yes! I will wander and learn from all",
        label: "Begin the wandering journey",
        nextChapter: 'wandering_scholar_first_teacher',
        reward: { xp: 90 }
      },
      {
        id: 'question_completeness',
        text: "Can one truly learn from so many without confusion?",
        label: "Seek understanding of the method",
        nextChapter: 'wandering_scholar_philosophy',
        reward: { xp: 85 }
      },
      {
        id: 'test_scholar',
        text: "Prove your wisdom - what have you learned?",
        label: "Test the philosopher",
        nextChapter: 'wandering_scholar_teaching',
        reward: { xp: 95 }
      }
    ]
  },

  wandering_scholar_first_teacher: {
    id: 'wandering_scholar_first_teacher',
    title: "The First Lesson",
    chapter: 3,
    description: "You travel to the first teacher - a master of fire rituals in a distant mountain temple. He teaches: 'Agni is transformation. Watch how I have transformed through the flame. This is the first lesson all wanderers must learn - you will be constantly transformed by what you encounter.'",
    icon: Flame,
    dialogue: {
      npc: "Fire Master",
      lines: [
        "Welcome, wanderer. You come seeking wisdom.",
        "I will teach you one thing - the rest you must discover yourself.",
        "Agni burns away the false. Let this teaching burn in your heart."
      ]
    },
    sideQuests: [
      {
        id: 'complete_fire_teaching',
        title: "Complete the Fire Teaching",
        description: "Fully absorb and embody the fire master's lessons before moving on.",
        reward: { xp: 150, understanding: 'fire_wisdom_first' }
      },
      {
        id: 'receive_blessing',
        title: "Receive the Teacher's Blessing",
        description: "Earn the master's blessing to continue on the wandering path.",
        reward: { xp: 140, achievement: 'blessed_wanderer' }
      }
    ],
    choices: [
      {
        id: 'continue_wandering',
        text: "I am transformed by this teaching - onward to the next teacher",
        label: "Move to the second teacher",
        nextChapter: 'wandering_scholar_second_teacher',
        reward: { xp: 170 }
      }
    ]
  },

  wandering_scholar_philosophy: {
    id: 'wandering_scholar_philosophy',
    title: "The Philosophy of Synthesis",
    chapter: 3,
    description: "The philosopher teaches: 'You fear confusion - but confusion is the beginning of wisdom. When many teachings collide within you, something new emerges. You don't learn from any single teacher - you learn from the dynamic interplay between them. You become a living synthesis of all wisdom.'",
    icon: Brain,
    dialogue: {
      npc: "Wandering Philosopher",
      lines: [
        "Fire and Water seem contradictory, yet both are essential.",
        "The warrior and the healer have opposite methods, yet both serve dharma.",
        "In you, these contradictions resolve into a higher unity."
      ]
    },
    sideQuests: [
      {
        id: 'embrace_paradox',
        title: "Learn to Hold Paradox",
        description: "Develop the capacity to hold contradictory truths simultaneously.",
        reward: { xp: 170, understanding: 'paradox_wisdom' }
      }
    ],
    choices: [
      {
        id: 'ready_to_wander',
        text: "I understand - I'm ready to become a synthesis",
        label: "Begin the multi-teacher journey",
        nextChapter: 'wandering_scholar_second_teacher',
        reward: { xp: 180 }
      }
    ]
  },

  wandering_scholar_teaching: {
    id: 'wandering_scholar_teaching',
    title: "The Philosopher Teaches",
    chapter: 3,
    description: "The wandering philosopher shares his wisdom: 'From fire masters I learned transformation. From water teachers I learned adaptation. From warriors I learned courage. From healers I learned compassion. From scholars I learned discernment. Each teacher added a color to my palette. Now I paint the world with all of them together.'",
    icon: Rainbow,
    dialogue: {
      npc: "Wandering Philosopher",
      lines: [
        "I have synthesized contradictions into wisdom.",
        "I am fire and water, warrior and healer, scholar and mystic.",
        "This is what becomes possible when you study with many teachers."
      ]
    },
    sideQuests: [
      {
        id: 'witness_synthesis',
        title: "Witness the Philosopher's Synthesis",
        description: "Observe how the philosopher seamlessly integrates different teachings.",
        reward: { xp: 160, understanding: 'wisdom_synthesis' }
      }
    ],
    choices: [
      {
        id: 'join_philosopher',
        text: "I want to become like you - a living synthesis",
        label: "Become a wandering scholar",
        nextChapter: 'wandering_scholar_second_teacher',
        reward: { xp: 180, deity: 'saraswati' }
      }
    ]
  },

  wandering_scholar_second_teacher: {
    id: 'wandering_scholar_second_teacher',
    title: "The Second Lesson",
    chapter: 4,
    description: "You meet the second teacher - a water sage by a river. 'Fire teaches transformation, but water teaches persistence. Watch how I flow around obstacles rather than burning through them. This wisdom balances what you learned before. The path of the wanderer is learning how different wisdom traditions complement each other.'",
    icon: Waves,
    dialogue: {
      npc: "Water Sage",
      lines: [
        "The fire master teaches absolute truth.",
        "I teach relative truth - how to navigate the world with wisdom and compassion.",
        "Both are necessary. You came at the right time."
      ]
    },
    sideQuests: [
      {
        id: 'integrate_teachings',
        title: "Integrate Fire and Water Teachings",
        description: "Find the synthesis point between transformation and persistence.",
        reward: { xp: 180, achievement: 'two_elements_master' }
      }
    ],
    choices: [
      {
        id: 'continue_quest',
        text: "I see how teachings balance each other",
        label: "Continue to more teachers",
        nextChapter: 'wandering_scholar_multiple_teachers',
        reward: { xp: 190 }
      }
    ]
  },

  wandering_scholar_multiple_teachers: {
    id: 'wandering_scholar_multiple_teachers',
    title: "The Endless Quest",
    chapter: 5,
    description: "Years pass. You've studied with 50 teachers - warriors, healers, scholars, artists, farmers, mystics. Each added layers to your understanding. You realize the true wisdom lies not in any single teaching but in your ability to weave them into a coherent whole. You become a master of synthesis.",
    icon: Infinity,
    dialogue: {
      npc: "Wandering Philosopher (now your companion)",
      lines: [
        "You are approaching mastery of the wandering path.",
        "You have learned to see the same truth expressed through infinite forms.",
        "Now comes the final step - to teach others this art of synthesis."
      ]
    },
    sideQuests: [
      {
        id: 'study_fifty_teachers',
        title: "Study With 50+ Different Teachers",
        description: "Collect wisdom from as many sources as possible.",
        reward: { xp: 250, achievement: 'universal_student_fifty' }
      },
      {
        id: 'create_synthesis_teaching',
        title: "Create Your Own Synthesis Teaching",
        description: "Develop a unique teaching that integrates all you've learned.",
        reward: { xp: 240, achievement: 'synthesis_creator' }
      },
      {
        id: 'find_new_teachers',
        title: "Discover Hidden Teachers",
        description: "Find and learn from teachers nobody else knows about.",
        reward: { xp: 230, understanding: 'hidden_wisdom' }
      }
    ],
    choices: [
      {
        id: 'become_master_scholar',
        text: "I have become a master of all teachings",
        label: "Reach mastery",
        nextChapter: 'wandering_scholar_final_wisdom',
        reward: { xp: 250 }
      }
    ]
  },

  wandering_scholar_final_wisdom: {
    id: 'wandering_scholar_final_wisdom',
    title: "The Ultimate Realization",
    chapter: 6,
    description: "After decades of wandering, you finally understand: there is one truth expressing itself through infinite teachers. Each tradition is incomplete, yet each is perfect. The wandering path teaches that wisdom requires humility - to recognize that every being, every perspective, every experience is a teacher offering some facet of the infinite.",
    icon: Star,
    dialogue: {
      npc: "The Wandering Path itself (speaking through all teachers)",
      lines: [
        "You have learned from fire, water, earth, wind, space.",
        "You have learned from gods, sages, warriors, healers, farmers, children.",
        "Now understand: the path itself has been your true teacher all along."
      ]
    },
    sideQuests: [
      {
        id: 'eternal_wandering',
        title: "Commit to Eternal Wandering",
        description: "Make wandering your eternal practice, always learning, always discovering.",
        reward: { xp: 300, achievement: 'eternal_wanderer_master' }
      }
    ],
    choices: [
      {
        id: 'wandering_complete',
        text: "I have learned from all teachers and all teachings",
        label: "Achieve complete wisdom synthesis",
        nextChapter: 'convergence_point',
        reward: { xp: 280, deity: 'saraswati', achievement: 'wandering_scholar_master' }
      }
    ]
  },

    // === PATH 11: PROTECTION PATH (Guardianship & Sacred Defense) ===

    protection_first_encounter: {
      id: 'protection_first_encounter',
      title: "The Guardian's Call",
      chapter: 2,
      description: "An elder guardian approaches you: 'Sacred traditions are under threat from those who would forget them. Will you take on the sacred responsibility of protecting our knowledge, our rituals, our way of life? A guardian must be vigilant, wise, and compassionate.'",
      icon: Shield,
      dialogue: {
        npc: "Elder Guardian",
        lines: [
          "Protection is not about violence - it is about preservation.",
          "A true guardian defends truth without aggression.",
          "We protect traditions so they can flow to future generations."
        ]
      },
      choices: [
        {
          id: 'accept_guardian_role',
          text: "I will become a guardian of sacred knowledge",
          label: "Accept the guardian role",
          nextChapter: 'protection_training',
          reward: { xp: 85 }
        },
        {
          id: 'understand_guardianship',
          text: "What does guardianship truly mean?",
          label: "Seek understanding first",
          nextChapter: 'protection_philosophy',
          reward: { xp: 80 }
        },
        {
          id: 'test_guardian',
          text: "Show me what guardianship looks like",
          label: "Witness guardian practice",
          nextChapter: 'protection_demonstration',
          reward: { xp: 90 }
        }
      ]
    },
  
    protection_training: {
      id: 'protection_training',
      title: "The Guardian's Training",
      chapter: 3,
      description: "You begin training to protect the sacred traditions. The guardian teaches: 'You must learn to recognize threats - not just external attacks but internal decay, forgotten rituals, lost knowledge. Your role is to preserve and transmit.'",
      icon: Shield,
      dialogue: {
        npc: "Elder Guardian",
        lines: [
          "A guardian must know every ritual, every hymn, every teaching.",
          "You become a living library - a protector of living knowledge.",
          "Through you, the traditions survive and flourish."
        ]
      },
      sideQuests: [
        {
          id: 'memorize_traditions',
          title: "Memorize All Sacred Traditions",
          description: "Learn and memorize the core teachings, rituals, and hymns.",
          reward: { xp: 160, achievement: 'tradition_keeper' }
        },
        {
          id: 'train_younger_guardians',
          title: "Train the Next Generation",
          description: "Begin teaching younger members to become guardians.",
          reward: { xp: 150, achievement: 'mentor_guardian' }
        },
        {
          id: 'document_knowledge',
          title: "Document Sacred Knowledge",
          description: "Create written records to ensure knowledge survives.",
          reward: { xp: 140, understanding: 'documented_wisdom' }
        }
      ],
      choices: [
        {
          id: 'deepen_protection',
          text: "I am ready for deeper guardian knowledge",
          label: "Advance training",
          nextChapter: 'protection_philosophy',
          reward: { xp: 150 }
        }
      ]
    },
  
    protection_philosophy: {
      id: 'protection_philosophy',
      title: "The Philosophy of Sacred Defense",
      chapter: 4,
      description: "The guardian reveals: 'True protection requires understanding the threats. There are those who would commercialize the sacred, distort the teachings, or forget them entirely. A guardian must counter these threats through wisdom, not force.'",
      icon: BookOpen,
      dialogue: {
        npc: "Elder Guardian",
        lines: [
          "The greatest threat to sacred traditions is apathy and forgetfulness.",
          "Your role is to keep the flame alive - literally and metaphorically.",
          "Protect through preservation, education, and living example."
        ]
      },
      sideQuests: [
        {
          id: 'identify_threats',
          title: "Identify and Document Threats",
          description: "Study modern threats to traditional knowledge and document them.",
          reward: { xp: 155, understanding: 'threat_awareness' }
        },
        {
          id: 'preserve_rituals',
          title: "Establish Preservation Protocols",
          description: "Create systems to ensure rituals are preserved and transmitted correctly.",
          reward: { xp: 165, achievement: 'preservation_master' }
        }
      ],
      choices: [
        {
          id: 'become_protector',
          text: "I will become a true protector",
          label: "Embrace full responsibility",
          nextChapter: 'protection_mastery',
          reward: { xp: 170 }
        }
      ]
    },
  
    protection_demonstration: {
      id: 'protection_demonstration',
      title: "The Guardian in Action",
      chapter: 3,
      description: "You witness the guardian responding to a crisis - a younger member has forgotten a crucial ritual. Rather than punishing them, the guardian patiently teaches, corrects, and encourages. 'This is guardianship - firm but compassionate protection.'",
      icon: Heart,
      dialogue: {
        npc: "Elder Guardian",
        lines: [
          "See how I handle this situation with patience?",
          "A guardian protects the tradition, not through harshness but through love.",
          "Everyone deserves a second chance to learn and remember."
        ]
      },
      sideQuests: [
        {
          id: 'practice_compassion',
          title: "Practice Compassionate Correction",
          description: "Learn to correct mistakes with kindness and patience.",
          reward: { xp: 150, understanding: 'compassionate_teaching' }
        }
      ],
      choices: [
        {
          id: 'understand_guardianship_deep',
          text: "I understand - protection through love",
          label: "Commit to compassionate guardianship",
          nextChapter: 'protection_training',
          reward: { xp: 160, deity: 'brahman' }
        }
      ]
    },
  
    protection_mastery: {
      id: 'protection_mastery',
      title: "The Master Guardian",
      chapter: 5,
      description: "Years pass. You have become a master guardian - known throughout the region as a keeper of traditions. People come to you to learn, to remember, to reconnect with their heritage. Your role transcends individual teaching - you are a living bridge between past and future.",
      icon: Crown,
      dialogue: {
        npc: "Elder Guardian",
        lines: [
          "You have mastered the art of protection.",
          "Now your task is to ensure this knowledge flows endlessly forward.",
          "Become a beacon - a light showing the way back to truth."
        ]
      },
      sideQuests: [
        {
          id: 'establish_school',
          title: "Establish a School of Guardianship",
          description: "Create an institution dedicated to training future guardians.",
          reward: { xp: 210, achievement: 'school_founder' }
        },
        {
          id: 'write_teachings',
          title: "Write Comprehensive Teachings",
          description: "Document everything you've learned about guardianship and tradition.",
          reward: { xp: 200, achievement: 'knowledge_scribe' }
        }
      ],
      choices: [
        {
          id: 'eternal_guardian',
          text: "I am now a guardian eternal",
          label: "Achieve ultimate guardianship",
          nextChapter: 'protection_final_wisdom',
          reward: { xp: 210 }
        }
      ]
    },
  
    protection_final_wisdom: {
      id: 'protection_final_wisdom',
      title: "The Guardian's Final Teaching",
      chapter: 6,
      description: "The elder guardian, now very old, passes the final teaching: 'You have become what I hoped you would be - not a warrior defending against enemies, but a guardian nurturing living wisdom. Continue this work. Protect not through force but through love, through example, through dedication.'",
      icon: Star,
      dialogue: {
        npc: "Elder Guardian (elder sage)",
        lines: [
          "My time grows short, but the tradition continues through you.",
          "You are now the guardian. Guard well.",
          "May all who come after walk in the light of truth you preserve."
        ]
      },
      sideQuests: [
        {
          id: 'eternal_protection_mission',
          title: "Accept Eternal Guardianship",
          description: "Commit to protecting and preserving sacred knowledge forever.",
          reward: { xp: 300, achievement: 'eternal_guardian_master' }
        }
      ],
      choices: [
        {
          id: 'protection_complete',
          text: "I accept eternal guardianship",
          label: "Become eternal guardian",
          nextChapter: 'convergence_point',
          reward: { xp: 280, achievement: 'protection_guardian_master' }
        }
      ]
    },
  
    // === PATH 12: SACRED AGRICULTURE PATH (Earth Rituals & Fertility) ===
  
    agricultural_first_encounter: {
      id: 'agricultural_first_encounter',
      title: "The Farmer's Blessing",
      chapter: 2,
      description: "You observe farmers performing sacred rituals to the earth. An experienced farmer notices you: 'The earth is alive, sacred, alive with divine consciousness. Agriculture is not just survival - it is a sacred partnership with the divine feminine, with Prithvi, the earth goddess. Will you learn this sacred dance?'",
      icon: Trees,
      dialogue: {
        npc: "Elder Farmer",
        lines: [
          "The earth provides everything. We are her children.",
          "But we do not take from her - we work with her in sacred partnership.",
          "Every seed planted is a prayer. Every harvest is grace."
        ]
      },
      choices: [
        {
          id: 'learn_agriculture',
          text: "Teach me the sacred ways of agriculture",
          label: "Begin agricultural wisdom",
          nextChapter: 'agricultural_training',
          reward: { xp: 85 }
        },
        {
          id: 'understand_earth',
          text: "Tell me about your relationship with the earth",
          label: "Understand earth consciousness",
          nextChapter: 'agricultural_philosophy',
          reward: { xp: 80 }
        },
        {
          id: 'participate_ritual',
          text: "Let me participate in the earth rituals",
          label: "Join sacred rituals",
          nextChapter: 'agricultural_ritual_practice',
          reward: { xp: 90 }
        }
      ]
    },
  
    agricultural_training: {
      id: 'agricultural_training',
      title: "Learning Earth's Rhythms",
      chapter: 3,
      description: "The farmer teaches: 'Agriculture is not about controlling the earth but learning her rhythms. The seasons, the moon cycles, the weather patterns - all are divine timing. When you align with these rhythms, the earth provides abundantly.'",
      icon: Sprout,
      dialogue: {
        npc: "Elder Farmer",
        lines: [
          "Plant by the lunar calendar. Harvest under certain stars.",
          "Speak to the seeds. Thank the earth. Honor the water.",
          "Work with her, never against her. This is the way."
        ]
      },
      sideQuests: [
        {
          id: 'cultivate_garden',
          title: "Cultivate a Sacred Garden",
          description: "Plant and tend a garden using sacred agricultural practices.",
          reward: { xp: 160, achievement: 'garden_cultivator' }
        },
        {
          id: 'learn_seasons',
          title: "Master the Agricultural Seasons",
          description: "Learn and implement the complete agricultural cycle for one full year.",
          reward: { xp: 170, understanding: 'seasonal_wisdom' }
        },
        {
          id: 'seed_preservation',
          title: "Preserve Sacred Seeds",
          description: "Learn to save and preserve seeds in the traditional sacred way.",
          reward: { xp: 150, achievement: 'seed_keeper' }
        }
      ],
      choices: [
        {
          id: 'deepen_practice',
          text: "I understand the earth's rhythms",
          label: "Advance to deeper work",
          nextChapter: 'agricultural_philosophy',
          reward: { xp: 160 }
        }
      ]
    },
  
    agricultural_philosophy: {
      id: 'agricultural_philosophy',
      title: "[translate:Prithvi] - The Earth Goddess",
      chapter: 4,
      description: "The farmer reveals: 'The earth is not mere matter - she is Prithvi, a divine goddess. In the Rigveda, she is honored as the foundation of all creation. When you work the soil, you commune with the divine. Every harvest is her gift to you.'",
      icon: Waves,
      dialogue: {
        npc: "Elder Farmer",
        lines: [
          "Prithvi is the giver of all abundance.",
          "She asks only that we treat her with respect and gratitude.",
          "To farm sacredly is to honor the earth goddess in every action."
        ]
      },
      sideQuests: [
        {
          id: 'study_earth_hymns',
          title: "Study the Earth Hymns",
          description: "Learn and meditate on the Rigvedic hymns dedicated to Prithvi.",
          reward: { xp: 165, understanding: 'prithvi_wisdom' }
        },
        {
          id: 'earth_gratitude_practice',
          title: "Daily Gratitude to the Earth",
          description: "Establish a daily practice of thanking the earth for her gifts.",
          reward: { xp: 155, achievement: 'grateful_steward' }
        }
      ],
      choices: [
        {
          id: 'become_earth_keeper',
          text: "I will become a keeper of Prithvi's sacred trust",
          label: "Dedicate to earth stewardship",
          nextChapter: 'agricultural_mastery',
          reward: { xp: 170 }
        }
      ]
    },
  
    agricultural_ritual_practice: {
      id: 'agricultural_ritual_practice',
      title: "The Sacred Agricultural Rituals",
      chapter: 3,
      description: "You participate in sacred planting rituals - prayers sung to the seeds, offerings made to the earth, sacred mantras chanted as you sow. 'Every action is a prayer,' the farmer explains. 'When done with awareness, agriculture becomes worship.'",
      icon: Sparkles,
      dialogue: {
        npc: "Elder Farmer",
        lines: [
          "We sing to the seeds before planting.",
          "We offer water as an offering to Prithvi.",
          "We harvest with gratitude, never with greed."
        ]
      },
      sideQuests: [
        {
          id: 'master_rituals',
          title: "Master All Agricultural Rituals",
          description: "Learn and perform all sacred rituals associated with farming.",
          reward: { xp: 175, achievement: 'ritual_farmer' }
        }
      ],
      choices: [
        {
          id: 'ritual_complete',
          text: "These rituals connect me to the divine",
          label: "Commit to sacred agriculture",
          nextChapter: 'agricultural_training',
          reward: { xp: 165, deity: 'prithvi' }
        }
      ]
    },
  
    agricultural_mastery: {
      id: 'agricultural_mastery',
      title: "The Master Farmer",
      chapter: 5,
      description: "Years pass. Your fields flourish. The land around you becomes incredibly fertile. Other farmers come to learn your secrets. 'There is no secret,' you teach them, 'except love, respect, and alignment with the earth's natural rhythms.'",
      icon: Sprout,
      dialogue: {
        npc: "Elder Farmer",
        lines: [
          "You have become a true master of sacred agriculture.",
          "Your fields are a testament to your sacred partnership with the earth.",
          "Now teach others this ancient way before it is forgotten."
        ]
      },
      sideQuests: [
        {
          id: 'share_knowledge',
          title: "Share Agricultural Wisdom",
          description: "Teach other farmers the sacred methods you've mastered.",
          reward: { xp: 210, achievement: 'agricultural_teacher' }
        },
        {
          id: 'establish_farm_community',
          title: "Establish Sacred Farm Community",
          description: "Create a community dedicated to sacred agriculture.",
          reward: { xp: 220, achievement: 'community_founder' }
        }
      ],
      choices: [
        {
          id: 'eternal_steward',
          text: "I am a steward of the earth forever",
          label: "Become eternal earth keeper",
          nextChapter: 'agricultural_final_wisdom',
          reward: { xp: 220 }
        }
      ]
    },
  
    agricultural_final_wisdom: {
      id: 'agricultural_final_wisdom',
      title: "Prithvi's Final Blessing",
      chapter: 6,
      description: "The elder farmer, now very old, performs a final blessing in your field: 'The earth has spoken through you. Your work honors Prithvi. Continue this sacred work. Teach others. Let the sacred way of agriculture never fade from this world.'",
      icon: Star,
      dialogue: {
        npc: "Elder Farmer (ancient wisdom keeper)",
        lines: [
          "I have farmed this land for 50 years.",
          "I leave it to you now, in perfect condition.",
          "May you and all who come after honor the earth as she deserves."
        ]
      },
      sideQuests: [
        {
          id: 'eternal_stewardship',
          title: "Accept Eternal Earth Stewardship",
          description: "Commit to protecting and honoring the earth forever.",
          reward: { xp: 300, achievement: 'eternal_earth_steward' }
        }
      ],
      choices: [
        {
          id: 'agricultural_complete',
          text: "I am one with the earth and her rhythms",
          label: "Achieve earth unity",
          nextChapter: 'convergence_point',
          reward: { xp: 280, deity: 'prithvi', achievement: 'agricultural_master' }
        }
      ]
    },
  

    ritual_scholar: {
      id: 'ritual_scholar',
      title: "Master of Ceremonies",
      chapter: 3,
      description: "Over months and years, you observe and study every ritual, every tradition. You become a living repository of sacred knowledge, understanding not just the 'how' but the profound 'why' behind each practice.",
      icon: BookText,
      dialogue: {
        npc: "Ritual Master",
        lines: [
          "Each gesture in a ritual carries cosmic significance.",
          "Each word spoken is a mantra channeling divine energy.",
          "You have learned the outer forms - now seek the inner meaning.",
          "The rituals are the universe expressing itself through form."
        ]
      },
      sideQuests: [
        {
          id: 'master_hundred_rituals',
          title: "Master 100 Different Rituals",
          description: "Achieve complete mastery of a hundred distinct sacred ceremonies.",
          reward: { xp: 145, achievement: 'ritual_master_hundred' }
        },
        {
          id: 'understand_symbolism',
          title: "Understand Ritual Symbolism",
          description: "Study the deep symbolic meaning behind all ritual elements and movements.",
          reward: { xp: 140, understanding: 'ritual_symbolism' }
        }
      ],
      choices: [
        { 
          id: 'teach_rituals', 
          text: "Share your comprehensive knowledge with others", 
          label: "Become a teacher of traditions", 
          nextChapter: 'convergence_point', 
          reward: { xp: 120 } 
        },
        { 
          id: 'deeper_meaning', 
          text: "Seek the ultimate transcendent meaning behind all rituals", 
          label: "Quest for the source", 
          nextChapter: 'convergence_point', 
          reward: { xp: 130 } 
        }
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
    dialogue: {
      npc: "Surya's Messenger",
      lines: [
        "The sun never rests - it is eternal motion.",
        "Seven horses pull the solar chariot - seven cosmic principles.",
        "Each dawn is a rebirth. Each sunset is release.",
        "In the sun's cycle lies the secret of all transformation."
      ]
    },
    sideQuests: [
      {
        id: 'solar_salutation',
        title: "Perform 365 Solar Salutations",
        description: "Greet the rising sun with sacred movements for an entire year.",
        reward: { xp: 160, achievement: 'sun_worshipper' }
      },
      {
        id: 'solar_meditation',
        title: "Meditate on the Seven Rays",
        description: "Contemplate each of the seven rays of the sun and their cosmic qualities.",
        reward: { xp: 155, understanding: 'solar_rays' }
      }
    ],
    choices: [
      { 
        id: 'embody_light', 
        text: "Embody the qualities of light and eternal renewal in your life", 
        label: "Become a solar being", 
        nextChapter: 'convergence_point', 
        reward: { xp: 150 } 
      },
      {
        id: 'teach_solar',
        text: "Share the solar mysteries with others",
        label: "Become a sun teacher",
        nextChapter: 'convergence_point',
        reward: { xp: 145 }
      }
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

  earth_ceremony_master: {
    id: 'earth_ceremony_master',
    title: "Master of Earth Ceremonies",
    chapter: 7,
    description: "Through years of sacred rituals honoring Prithvi, you have mastered the complete ceremonial tradition. You understand the precise times, the correct offerings, the proper invocations. You have become a living bridge between human and earth goddess. Your ceremonies bring abundance, healing, and blessing to the land.",
    icon: Crown,
    dialogue: {
      npc: "Earth Mother (through your understanding)",
      lines: [
        "You have learned to speak my language - the language of seasons and soil.",
        "Your ceremonies are heard. Your intentions are received.",
        "Through you, I bless the land and nourish all creatures.",
        "Continue this sacred work. Teach others the way of earth honor."
      ]
    },
    sideQuests: [
      {
        id: 'teach_earth_ceremonies',
        title: "Teach Earth Ceremonies to Community",
        description: "Pass on your knowledge to those who will carry the tradition forward.",
        reward: { xp: 155, achievement: 'earth_ceremony_teacher' }
      }
    ],
    choices: [
      {
        id: 'earth_mastery_complete',
        text: "Share earth wisdom with all who seek it",
        label: "Complete the earth ceremony path",
        nextChapter: 'ending_reflection',
        reward: { xp: 200, achievement: 'earth_ceremony_master' }
      }
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

  night_mysteries: {
    id: 'night_mysteries',
    title: "The Secrets Revealed in Darkness",
    chapter: 7,
    description: "In the depths of night, truths hidden by daylight emerge. You contemplate: What mysteries does darkness hold? What does the night reveal that day obscures? The answer comes as a profound realization - night is not absence of light but presence of subtlety.",
    icon: Brain,
    dialogue: {
      npc: "Inner Wisdom",
      lines: [
        "Night is not empty - it is full of subtle presences.",
        "Daylight shows the surface; night reveals the depths.",
        "What cannot be seen becomes visible to inner sight.",
        "Ratri teaches that all mysteries dwell in her embrace."
      ]
    },
    choices: [
      {
        id: 'mystery_mastery',
        text: "Continue exploring the night's mysteries",
        label: "Deepen your nocturnal practice",
        nextChapter: 'vigil_one',
        reward: { xp: 130 }
      }
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

  tapas_wisdom: {
    id: 'tapas_wisdom',
    title: "The Science of Sacred Austerity",
    chapter: 6,
    description: "Tapas is not punishment but purification through discipline. The ancient Rishis knew: through austerity, consciousness refines like gold in fire. Tapas burns away impurities, reveals hidden truths, elevates awareness. You learn the philosophical and practical foundations of this sacred practice.",
    icon: Flame,
    dialogue: {
      npc: "Tapas Master",
      lines: [
        "Tapas means 'heat' - the transformative heat of spiritual discipline.",
        "Through austerity, the mind becomes clear, the spirit becomes luminous.",
        "Not harsh punishment, but conscious refinement of being.",
        "The seven vigils are tapas in action - burning away sleep, revealing awakeness."
      ]
    },
    sideQuests: [
      {
        id: 'study_tapas_texts',
        title: "Study Ancient Tapas Texts",
        description: "Learn from the Rishis' teachings on austerity and discipline.",
        reward: { xp: 115, understanding: 'tapas_philosophy' }
      }
    ],
    choices: [
      {
        id: 'begin_tapas_practice',
        text: "Begin the tapas practice immediately",
        label: "Start the transformation",
        nextChapter: 'vigil_one',
        reward: { xp: 140 }
      }
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

  water_ceremonies: {
    id: 'water_ceremonies',
    title: "The Ritual of Water Liberation",
    chapter: 6,
    description: "You learn the ancient water ceremonies - rituals that align human intention with the cosmic principle of water's freedom. These ceremonies invoke Indra's power to break barriers (like Vritra), Parjanya's generous rain, and Varuna's cosmic waters. Water that was trapped becomes free; dry lands become fertile.",
    icon: Waves,
    dialogue: {
      npc: "Water Priest",
      lines: [
        "Water is imprisoned by drought, by dams, by limitation.",
        "Our ceremonies call to the imprisoned waters - 'Flow! Be Free!'",
        "We invoke Indra to shatter obstacles. We call Parjanya to rain.",
        "The ancient words have power - they speak to cosmic forces."
      ]
    },
    sideQuests: [
      {
        id: 'master_water_rituals',
        title: "Master All Water Liberation Rituals",
        description: "Learn and practice the complete system of water ceremonies.",
        reward: { xp: 140, understanding: 'water_liberation' }
      }
    ],
    choices: [
      {
        id: 'perform_ceremonies',
        text: "Perfect the water liberation rituals",
        label: "Master ritual water magic",
        nextChapter: 'rain_master',
        reward: { xp: 130 }
      }
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

  rain_master: {
    id: 'rain_master',
    title: "Master of the Rains",
    chapter: 7,
    description: "You have perfected the science of rain-calling. The ceremonies are flawless. Your invocations are powerful. Over the years, droughts have ended when you performed the rituals. People travel from distant lands to request your assistance. You have become a legendary rain-bringer - not through magic, but through perfect alignment of human intention with natural cycles and cosmic law.",
    icon: CloudRain,
    dialogue: {
      npc: "Parjanya (through your understanding)",
      lines: [
        "You have learned to speak to me, rain god, accurately.",
        "Your ceremonies call to the clouds. Your words move the waters.",
        "I respond to your righteousness and your dedication.",
        "Go forth - bring water where there is drought, abundance where there is need."
      ]
    },
    sideQuests: [
      {
        id: 'legendary_rain_caller',
        title: "Become Legendary Rain-Bringer",
        description: "Establish your name and reputation as master of rain ceremonies.",
        reward: { xp: 170, achievement: 'rain_legend' }
      }
    ],
    choices: [
      {
        id: 'rain_master_complete',
        text: "Dedicate yourself to bringing rain where needed",
        label: "Perfect the rain-calling path",
        nextChapter: 'ending_reflection',
        reward: { xp: 210, achievement: 'rain_master' }
      }
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
    description: "You witness a [translate:Soma]] purification ritual - the sacred plant strained through wool, becoming [translate:Pavamana]] (the Purifier). A priest explains: 'Purification is not just physical but spiritual. Can you dedicate yourself to purifying souls, beginning with your own?'",
    icon: Droplet,
    unlocks: ['soma'],
    dialogue: {
      npc: "Priest of Purification",
      lines: [
        "[translate:Soma]] is the sacred plant of purification and transcendence.",
        "[translate:Pavamana]] means 'the one who purifies' - it flows through the filter to become pure.",
        "This mirrors your own path - strain away impurities, let clarity remain.",
        "Will you commit to this sacred purification?"
      ]
    },
    sideQuests: [
      {
        id: 'study_pavamana',
        title: "Study Pavamana Hymns Deeply",
        description: "Learn the sacred verses that guide purification energy.",
        reward: { xp: 95, understanding: 'pavamana_hymns' }
      },
      {
        id: 'purification_commitment',
        title: "Commit to the Purification Path",
        description: "Dedicate yourself wholly to spiritual cleansing.",
        reward: { xp: 105, understanding: 'purification_commitment' }
      }
    ],
    choices: [
      { 
        id: 'pavamana_study', 
        text: "Study the [translate:Pavamana]] hymns deeply", 
        label: "Learn purification wisdom", 
        nextChapter: 'pavamana_teachings', 
        reward: { xp: 85, deity: 'soma' } 
      },
      { 
        id: 'self_purification', 
        text: "Begin with rigorous self-purification", 
        label: "Purify yourself first", 
        nextChapter: 'inner_purification', 
        reward: { xp: 90 } 
      },
      { 
        id: 'purification_rituals', 
        text: "Learn ceremonial purification techniques", 
        label: "Master purifying rites", 
        nextChapter: 'purification_ceremonies', 
        reward: { xp: 80 } 
      }
    ]
  },

  
  purification_ceremonies: {
    id: 'purification_ceremonies',
    title: "Ritual Purification Practices",
    chapter: 6,
    description: "You learn the sacred ceremonies of purification - ritual baths in holy waters, chanting of purifying mantras, offerings to sacred fires. These are not mere physical actions but sacred choreography of transformation.",
    icon: Sparkles,
    dialogue: {
      npc: "Purification Master",
      lines: [
        "Water washes the body. Fire cleanses the mind. Air carries away darkness.",
        "The [translate:Pavamana]] mantras direct purifying forces through your entire being.",
        "Each ceremony is a descent into the sacred fire and emergence reborn.",
        "Through ritual purification, you align with cosmic cleansing forces."
      ]
    },
    sideQuests: [
      {
        id: 'master_rituals',
        title: "Master All Purification Rituals",
        description: "Learn and perform all traditional purification ceremonies with perfect precision.",
        reward: { xp: 155, achievement: 'purification_ritualist' }
      },
      {
        id: 'sacred_bathing',
        title: "Perform 108 Sacred Baths",
        description: "Undergo ritual purification bathing 108 times at sacred locations.",
        reward: { xp: 165, achievement: 'water_purified' }
      }
    ],
    choices: [
      { 
        id: 'self_purification', 
        text: "Focus on your own deep purification", 
        label: "Begin inner purification work", 
        nextChapter: 'inner_purification', 
        reward: { xp: 140 } 
      },
      { 
        id: 'ritual_mastery', 
        text: "Perfect the ceremonial purification techniques", 
        label: "Master the purification rites", 
        nextChapter: 'purification_master', 
        reward: { xp: 145 } 
      }
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
