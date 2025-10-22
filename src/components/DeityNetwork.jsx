import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Network } from 'lucide-react';
import * as d3 from 'd3';
import deitiesData from '../data/deities.json';
import connectionsData from '../data/connections.json';
import BookLoadingAnimation from './BookLoadingAnimation';
import RishiWelcome from './RishiWelcome';


const DeityNetwork = () => {
  const deityRelationships = {
    indra: [
      {
        deity: "Agni",
        type: "Divine Partnership",
        description: "Indra and Agni form the most celebrated divine duo in the Rigveda. Together they represent the complete cosmic order - Indra controls the heavens and storms while Agni governs earthly fire and ritual.",
        establishment: "Their partnership was established when Agni helped Indra defeat Vritra by providing the sacred fire-power needed for the thunderbolt (vajra). Agni's transformative energy combined with Indra's martial strength created an unbeatable alliance.",
        relevance: "This relationship symbolizes the unity of earthly and celestial powers. In Vedic rituals, offerings to Agni reach Indra in heaven, showing how terrestrial worship connects to divine favor."
      },
      {
        deity: "Soma",
        type: "Divine Sustenance",
        description: "Soma is Indra's source of power and vitality. The sacred drink provides Indra with the strength needed to perform his cosmic duties and defeat demons.",
        establishment: "Before each great battle, especially against Vritra, Indra drinks copious amounts of soma to amplify his powers. The pressing and offering of soma became central to Vedic ritual specifically to empower Indra.",
        relevance: "This relationship represents the reciprocal nature of divine-human interaction: humans prepare soma through ritual, and Indra gains strength to protect cosmic order."
      }
    ],
    agni: [
      {
        deity: "Indra",
        type: "Divine Partnership",
        description: "The most frequently invoked pair in the Rigveda, representing the union of heaven and earth, power and transformation.",
        establishment: "Agni serves as the messenger between humans and gods, carrying offerings upward. Indra receives these offerings in heaven, creating a divine circuit of exchange.",
        relevance: "Symbolizes the complete Vedic worldview: Agni transforms material offerings into spiritual energy that reaches Indra, who then protects the cosmos."
      },
      {
        deity: "Soma",
        type: "Ritual Transformation",
        description: "Agni and Soma work together in every sacrifice - Agni's fire purifies and transforms the soma offering, making it suitable for divine consumption.",
        establishment: "In the ritual sequence, soma stalks are pressed, filtered, mixed with milk, and then offered into Agni's fire. This transformation process is essential.",
        relevance: "Represents the alchemical transformation at the heart of Vedic practice. Agni's fire doesn't destroy soma but elevates it."
      }
    ],
    soma: [
      {
        deity: "Indra",
        type: "Power Source",
        description: "Soma empowers Indra for his cosmic battles. Without soma, Indra cannot perform his duties as the protector of cosmic order.",
        establishment: "The relationship began when gods and demons churned the cosmic ocean, producing soma. Indra became its primary consumer, using its power to defeat Vritra.",
        relevance: "Shows how divine power requires sustenance and renewal. Even the mightiest god depends on ritual offering and preparation."
      }
    ],
    varuna: [
      {
        deity: "Mitra",
        type: "Cosmic Sovereigns",
        description: "Varuna and Mitra are often invoked together as Mitra-Varuna, representing complementary aspects of cosmic law and social contract.",
        establishment: "Both emerged as keepers of Rita (cosmic order). Mitra governs oaths while Varuna oversees cosmic law and moral order.",
        relevance: "Their partnership shows how cosmic order and social order mirror each other. Justice in human society reflects divine justice in the cosmos."
      }
    ],
    ushas: [
      {
        deity: "Agni",
        type: "Renewal Partners",
        description: "Both Ushas (Dawn) and Agni represent eternal renewal - Ushas through daily sunrise, Agni through ritual rekindling.",
        establishment: "Both are described as ancient yet ever-young. They share the quality of reliable, cyclical return after darkness.",
        relevance: "Emphasizes cyclical time. Endings contain beginnings, darkness gives way to light, death enables rebirth."
      }
    ],
    rudra: [
      {
        deity: "Maruts",
        type: "Father and Sons",
        description: "Rudra is the father of the Maruts, storm gods who accompany him. They share his fierce, wild nature.",
        establishment: "The Maruts were born from Rudra's power and rage. They inherited his destructive capacity but channel it into storms that bring renewal.",
        relevance: "Shows how fierce power can be productive. Storms destroy but also bring life-giving rain."
      }
    ],
    indra: [
      {
        deity: "Agni",
        type: "Divine Partnership",
        description: "Indra and Agni form the most celebrated divine duo in the Rigveda. Together they represent the complete cosmic order - Indra controls the heavens and storms while Agni governs earthly fire and ritual.",
        establishment: "Their partnership was established when Agni helped Indra defeat Vritra by providing the sacred fire-power needed for the thunderbolt (vajra). Agni's transformative energy combined with Indra's martial strength created an unbeatable alliance.",
        relevance: "This relationship symbolizes the unity of earthly and celestial powers. In Vedic rituals, offerings to Agni reach Indra in heaven, showing how terrestrial worship connects to divine favor."
      },
      {
        deity: "Soma",
        type: "Divine Sustenance",
        description: "Soma is Indra's source of power and vitality. The sacred drink provides Indra with the strength needed to perform his cosmic duties and defeat demons.",
        establishment: "Before each great battle, especially against Vritra, Indra drinks copious amounts of soma to amplify his powers. The pressing and offering of soma became central to Vedic ritual specifically to empower Indra.",
        relevance: "This relationship represents the reciprocal nature of divine-human interaction: humans prepare soma through ritual, and Indra gains strength to protect cosmic order."
      },
      {
        deity: "Maruts",
        type: "Divine Companions",
        description: "The Maruts are Indra's companions in battle, storm gods who fight alongside him against demons and chaos.",
        establishment: "The Maruts, sons of Rudra, allied with Indra in his battles. Together they create the cosmic storms that defeat evil forces.",
        relevance: "Shows that even the mightiest deity benefits from allies. Leadership requires both individual strength and the support of companions."
      },
      {
        deity: "Varuna",
        type: "Complementary Sovereignty",
        description: "Indra and Varuna represent different aspects of divine kingship - Indra as active warrior-king, Varuna as maintainer of cosmic law.",
        establishment: "Their relationship evolved from potential rivalry to complementary rule, with Indra governing through action and Varuna through cosmic order (Rita).",
        relevance: "Demonstrates that effective governance requires both active protection and established law, force and justice working together."
      }
    ],
    agni: [
      {
        deity: "Indra",
        type: "Divine Partnership",
        description: "The most frequently invoked pair in the Rigveda, representing the union of heaven and earth, power and transformation.",
        establishment: "Agni serves as the messenger between humans and gods, carrying offerings upward. Indra receives these offerings in heaven, creating a divine circuit of exchange.",
        relevance: "Symbolizes the complete Vedic worldview: Agni transforms material offerings into spiritual energy that reaches Indra, who then protects the cosmos."
      },
      {
        deity: "Soma",
        type: "Ritual Transformation",
        description: "Agni and Soma work together in every sacrifice - Agni's fire purifies and transforms the soma offering, making it suitable for divine consumption.",
        establishment: "In the ritual sequence, soma stalks are pressed, filtered, mixed with milk, and then offered into Agni's fire. This transformation process is essential.",
        relevance: "Represents the alchemical transformation at the heart of Vedic practice. Agni's fire doesn't destroy soma but elevates it, turning physical substance into divine nourishment."
      },
      {
        deity: "Ushas",
        type: "Cosmic Kinship",
        description: "Both Agni and Ushas herald beginnings - Agni through ritual fire kindled at dawn, Ushas through the breaking of day.",
        establishment: "Both are described as eternal yet ever-renewing. Agni is reborn with each kindling; Ushas returns each morning.",
        relevance: "Emphasizes cyclical time and renewal. Both deities prove that endings contain beginnings, demonstrating the eternal return of light and sacred fire."
      },
      {
        deity: "Surya",
        type: "Luminous Brotherhood",
        description: "Agni and Surya are often called twin lights - Agni is the earthly sun, Surya the celestial sun. Together they illuminate all realms.",
        establishment: "Agni was entrusted with bringing celestial fire to earth, making him Surya's earthly counterpart and brother in illumination.",
        relevance: "Shows how divine principles manifest across different realms. The same essential light operates both in ritual fire and solar radiance."
      }
    ],
    soma: [
      {
        deity: "Indra",
        type: "Power Source",
        description: "Soma empowers Indra for his cosmic battles. Without soma, Indra cannot perform his duties as the protector of cosmic order.",
        establishment: "The relationship began when gods and demons churned the cosmic ocean, producing soma. Indra became its primary consumer, using its power to defeat Vritra.",
        relevance: "Shows how divine power requires sustenance and renewal. Even the mightiest god depends on ritual offering and preparation."
      },
      {
        deity: "Agni",
        type: "Transformative Union",
        description: "Soma passes through Agni's fire to complete its transformation from plant to divine nectar. This partnership is central to Vedic sacrifice.",
        establishment: "The ritual order places soma offering into Agni's fire, where heat completes the transformation begun by pressing and filtering.",
        relevance: "Demonstrates that spiritual transformation requires multiple stages - preparation (pressing), purification (filtering), and elevation (fire)."
      },
      {
        deity: "Ashvins",
        type: "Healing Alliance",
        description: "The Ashvins, divine physicians, work with soma's healing and rejuvenating properties to cure diseases and restore vitality.",
        establishment: "Both soma and the Ashvins are associated with dawn, healing, and renewal. They share the domain of restoration and vitality.",
        relevance: "Links spiritual intoxication with physical healing, showing that soma operates on multiple levels - consciousness, health, and divine connection."
      }
    ],
    varuna: [
      {
        deity: "Mitra",
        type: "Cosmic Sovereigns",
        description: "Varuna and Mitra are often invoked together as Mitra-Varuna, representing complementary aspects of cosmic law and social contract.",
        establishment: "Both emerged as keepers of Rita (cosmic order). Mitra governs oaths and contracts while Varuna oversees cosmic law and moral order.",
        relevance: "Their partnership shows how cosmic order and social order mirror each other. Justice in human society reflects divine justice in the cosmos."
      },
      {
        deity: "Indra",
        type: "Balanced Sovereignty",
        description: "Varuna maintains cosmic law while Indra actively defends it. Varuna is passive sovereignty; Indra is active kingship.",
        establishment: "In earlier hymns they sometimes competed, but eventually their roles became complementary - Varuna as judge, Indra as warrior.",
        relevance: "Shows the balance between law and force, judgment and action. A functional cosmos needs both the lawgiver and the protector."
      },
      {
        deity: "Surya",
        type: "Cosmic Witness",
        description: "Surya, the all-seeing sun, works with Varuna in observing all deeds. Both see everything that occurs in the world.",
        establishment: "Varuna's thousand eyes and Surya's all-illuminating rays together ensure nothing escapes divine observation.",
        relevance: "Establishes the principle of cosmic accountability - all actions are witnessed and recorded, creating the foundation for moral behavior."
      }
    ],
    mitra: [
      {
        deity: "Varuna",
        type: "Twin Sovereigns",
        description: "Mitra and Varuna together maintain Rita (cosmic order). Mitra through friendship and contracts, Varuna through law and punishment.",
        establishment: "They emerged together as dual aspects of divine sovereignty, often invoked as a single unit: Mitra-Varuna.",
        relevance: "Demonstrates that order requires both positive bonds (friendship/contract) and negative consequences (law/punishment)."
      },
      {
        deity: "Aryaman",
        type: "Social Order",
        description: "Mitra and Aryaman both govern social bonds - Mitra through contracts between individuals, Aryaman through hospitality and customs.",
        establishment: "Both are Adityas (sons of Aditi) and work together to maintain social harmony and proper conduct between people.",
        relevance: "Shows how different deities govern different aspects of the same domain - contracts, hospitality, and social customs work together."
      }
    ],
    ushas: [
      {
        deity: "Agni",
        type: "Renewal Partners",
        description: "Both Ushas (Dawn) and Agni represent eternal renewal - Ushas through daily sunrise, Agni through ritual rekindling.",
        establishment: "Both are described as ancient yet ever-young. They share the quality of reliable, cyclical return after darkness.",
        relevance: "Emphasizes cyclical time over linear time. Endings contain beginnings, darkness gives way to light, death enables rebirth."
      },
      {
        deity: "Surya",
        type: "Celestial Sequence",
        description: "Ushas prepares the way for Surya (Sun). She is the harbinger; he is the arrival. Dawn announces the sun.",
        establishment: "In Vedic cosmology, Ushas awakens the world and opens the gates of heaven, allowing Surya to begin his daily journey.",
        relevance: "Shows the importance of preparation and transition. Great events require heralds. Light doesn't burst forth but emerges gradually."
      },
      {
        deity: "Ashvins",
        type: "Dawn Companions",
        description: "The Ashvins travel in their chariot at dawn, accompanying Ushas as divine physicians who bring healing and rejuvenation with the morning.",
        establishment: "All three are associated with dawn - Ushas as the goddess herself, Ashvins as those who arrive with her, bringing medicine and miracles.",
        relevance: "Links the physical renewal of daybreak with spiritual and bodily healing. Morning represents fresh starts on all levels."
      }
    ],
    surya: [
      {
        deity: "Ushas",
        type: "Herald and Arrival",
        description: "Ushas (Dawn) prepares the world for Surya's arrival. She is the announcement; he is the event itself.",
        establishment: "Ushas is described as Surya's wife or sister, opening the gates for his daily journey across the sky.",
        relevance: "Demonstrates that important transitions require preparation. Dawn softens the shock of day, making the sun's arrival beautiful rather than harsh."
      },
      {
        deity: "Agni",
        type: "Twin Lights",
        description: "Surya is the celestial fire; Agni is the earthly fire. Together they illuminate the entire cosmos.",
        establishment: "Both are described as eyes of the gods - Surya sees from heaven, Agni from earth. They share the essential quality of luminosity.",
        relevance: "Shows how the same divine principle (light, knowledge, purification) operates across different realms of existence."
      },
      {
        deity: "Savitar",
        type: "Solar Aspects",
        description: "Surya and Savitar are both solar deities but with different aspects - Surya is the visible sun, Savitar is the sun's stimulating power.",
        establishment: "Savitar represents the sun before dawn and after dusk, the hidden power of solar energy even when not visible.",
        relevance: "Distinguishes between manifest and unmanifest aspects of the same power, teaching that divine forces operate even when not directly perceived."
      },
      {
        deity: "Varuna",
        type: "All-Seeing Witnesses",
        description: "Both Surya and Varuna see all deeds - Surya through his all-illuminating light, Varuna through his thousand eyes.",
        establishment: "Both serve as cosmic witnesses whose observation ensures moral accountability.",
        relevance: "Establishes divine omniscience as the foundation of cosmic justice - no deed escapes notice."
      }
    ],
    rudra: [
      {
        deity: "Maruts",
        type: "Father and Sons",
        description: "Rudra is the father of the Maruts, storm gods who accompany him. They share his fierce, wild nature.",
        establishment: "The Maruts were born from Rudra's power and rage. They inherited his destructive capacity but channel it into storms that bring renewal.",
        relevance: "Shows how fierce power can be productive when properly directed. Storms destroy but also bring life-giving rain."
      },
      {
        deity: "Indra",
        type: "Storm Companions",
        description: "Rudra and Indra both wield destructive power for cosmic good - Rudra through storms and disease, Indra through battles against demons.",
        establishment: "While sometimes in tension, both serve as divine warriors protecting cosmic order through fierce means.",
        relevance: "Demonstrates that different aspects of divine force work together. Destruction serves creation; fierceness protects peace."
      }
    ],
    maruts: [
      {
        deity: "Rudra",
        type: "Divine Lineage",
        description: "The Maruts are the sons of Rudra, inheriting his fierce storm nature but expressing it as a collective force rather than individual power.",
        establishment: "Born from Rudra's wrath and power, the Maruts manifest as a group of storm warriors who accompany their father and Indra.",
        relevance: "Shows how divine qualities can be distributed - individual fierce power (Rudra) versus collective force (Maruts)."
      },
      {
        deity: "Indra",
        type: "Battle Companions",
        description: "The Maruts fight alongside Indra in his cosmic battles, providing additional force to his thunderbolt strikes.",
        establishment: "The Maruts allied with Indra, particularly in his battle against Vritra, multiplying his power through their collective storm force.",
        relevance: "Teaches that even the strongest benefit from companions. Collective action amplifies individual strength."
      }
    ],
    ashvins: [
      {
        deity: "Ushas",
        type: "Dawn Companions",
        description: "The Ashvins travel at dawn, arriving with Ushas to bring healing, rescue, and miraculous aid to those in need.",
        establishment: "All three are associated with the liminal time of dawn - Ushas as the goddess, Ashvins as the divine physicians who arrive with her.",
        relevance: "Links dawn's renewal with healing. Morning represents restoration on physical, emotional, and spiritual levels."
      },
      {
        deity: "Soma",
        type: "Healing Partnership",
        description: "The Ashvins work with soma's medicinal and rejuvenating properties to perform miraculous healings.",
        establishment: "Both the Ashvins and soma are associated with vitality, youth, and healing. They combine divine skill with divine medicine.",
        relevance: "Shows that healing requires both medicine (soma) and expertise (Ashvins), substance and skill working together."
      }
    ],
    pushan: [
      {
        deity: "Surya",
        type: "Solar Connection",
        description: "Pushan is associated with the sun's nourishing aspect, complementing Surya's illuminating power with provision and guidance.",
        establishment: "Both are solar deities but with different functions - Surya illuminates, Pushan provides and guides.",
        relevance: "Shows how a single natural phenomenon (the sun) embodies multiple divine functions - light, warmth, nourishment, guidance."
      },
      {
        deity: "Indra",
        type: "Provider and Protector",
        description: "Pushan provides paths and sustenance while Indra provides protection. Together they ensure safe and abundant journeys.",
        establishment: "Both are invoked for successful endeavors - Pushan to find the way and resources, Indra to overcome obstacles.",
        relevance: "Demonstrates complementary divine functions working toward the same goal - successful completion of undertakings."
      }
    ],
    vishnu: [
      {
        deity: "Indra",
        type: "Cosmic Alliance",
        description: "Vishnu and Indra work together in cosmic battles, with Vishnu providing his famous three strides to establish the cosmos while Indra protects it.",
        establishment: "Vishnu's three strides created the space of the universe which Indra then protects and maintains.",
        relevance: "Shows the division between creation (Vishnu's strides establishing cosmic space) and maintenance (Indra's ongoing protection)."
      }
    ],
    vayu: [
      {
        deity: "Indra",
        type: "Atmospheric Brothers",
        description: "Vayu (Wind) and Indra (Storm) are brothers who together control atmospheric phenomena.",
        establishment: "Both are sons of Dyaus (Sky) and work together to create storms, with Vayu providing the wind and Indra the lightning and rain.",
        relevance: "Shows how different atmospheric forces work in concert. Wind and storm are distinct but inseparable phenomena."
      },
      {
        deity: "Maruts",
        type: "Wind Family",
        description: "Vayu is the primary wind god, while the Maruts are storm winds. Together they represent all aspects of air in motion.",
        establishment: "The Maruts can be seen as multiple manifestations of Vayu's power, specialized as storm-bringing winds.",
        relevance: "Demonstrates how a single element (air) can be governed by different deities representing different aspects of its power."
      }
    ],
    savitar: [
      {
        deity: "Surya",
        type: "Solar Aspects",
        description: "Savitar is the stimulating power of the sun, especially before dawn and after dusk, while Surya is the visible solar disc.",
        establishment: "Savitar represents the sun's power to stimulate and energize even when not visible, the hidden solar force.",
        relevance: "Teaches that powerful forces operate even when not directly perceived. Divine influence extends beyond the visible."
      },
      {
        deity: "Ushas",
        type: "Pre-dawn Partnership",
        description: "Savitar is particularly active before dawn, working with Ushas to awaken the world and set all things in motion.",
        establishment: "Savitar stimulates all beings to activity, while Ushas illuminates the world, working together in the transition from night to day.",
        relevance: "Shows how transition requires multiple divine forces - stimulation to act and illumination to see."
      }
    ],
    aditi: [
      {
        deity: "Adityas",
        type: "Mother and Children",
        description: "Aditi is the mother of the Adityas (including Varuna, Mitra, Aryaman), representing boundless space and freedom.",
        establishment: "Aditi gave birth to the Adityas, who are often called 'sons of Aditi.' She represents the cosmic mother, infinite and all-containing.",
        relevance: "Shows the concept of divine lineage and how specific ordering principles (Adityas) emerge from infinite potential (Aditi)."
      }
    ],
    dyaus: [
      {
        deity: "Prithivi",
        type: "Sky and Earth",
        description: "Dyaus (Sky Father) and Prithivi (Earth Mother) are the cosmic parents, representing the fundamental duality of heaven and earth.",
        establishment: "Together they form the primordial pair from whom all else emerges. They are invoked together as Dyavaprithivi.",
        relevance: "Represents the fundamental cosmic polarity - sky above and earth below, masculine and feminine, creating the space for existence."
      },
      {
        deity: "Indra",
        type: "Father and Son",
        description: "Indra is the son of Dyaus and Prithivi, inheriting his father's atmospheric power and his mother's connection to life.",
        establishment: "Indra separated his parents (sky and earth) to create the space for the cosmos, establishing his own kingship.",
        relevance: "Shows how the younger generation of gods supersedes the older, creating the dynamic world from the static primordial pair."
      }
    ],
    prithivi: [
      {
        deity: "Dyaus",
        type: "Cosmic Parents",
        description: "Prithivi (Earth Mother) and Dyaus (Sky Father) together represent the fundamental ground of existence.",
        establishment: "They are the primordial pair, existing before other gods, providing the foundation - earth below, sky above.",
        relevance: "Represents the most basic cosmic structure. All life exists between earth and sky."
      },
      {
        deity: "Agni",
        type: "Earth and Fire",
        description: "Prithivi is the earth who holds and nurtures Agni (fire). She is his vessel and home.",
        establishment: "Fire emerges from earth through friction (fire-drill) and returns to earth as ash, completing a cycle.",
        relevance: "Shows the intimate relationship between elements - earth contains fire, gives it birth, receives it back."
      }
    ],
    sarasvati: [
      {
        deity: "Agni",
        type: "Purification Partnership",
        description: "Sarasvati's waters and Agni's fire work together in ritual purification and transformation.",
        establishment: "Both are essential to sacrifice - water for purification, fire for transformation. Together they complete the ritual process.",
        relevance: "Demonstrates how opposing elements (water and fire) work together. Cleansing and transformation are complementary processes."
      },
      {
        deity: "Indra",
        type: "Abundance Alliance",
        description: "Sarasvati's flowing waters and Indra's rain-bringing power together ensure abundance and prosperity.",
        establishment: "Both govern water's life-giving properties - Sarasvati as the sacred river, Indra as the rain-bringer.",
        relevance: "Shows how different forms of the same element serve different divine functions - flowing water (river) and falling water (rain)."
      }
    ],
    brihaspati: [
      {
        deity: "Agni",
        type: "Sacred Power",
        description: "Brihaspati represents the power of sacred speech (brahman), while Agni is the power of ritual action. Together they complete worship.",
        establishment: "Prayer (Brihaspati) and offering (Agni) work together in sacrifice. Words and actions unite in ritual.",
        relevance: "Demonstrates that effective worship requires both correct speech and correct action, mantra and ritual."
      },
      {
        deity: "Indra",
        type: "Wisdom and Power",
        description: "Brihaspati provides divine wisdom and strategy; Indra provides force. Together they ensure victory.",
        establishment: "Brihaspati serves as chaplain and advisor to the gods, particularly to Indra, providing the wisdom behind successful action.",
        relevance: "Shows that power without wisdom is blind, wisdom without power is weak. Effective leadership requires both."
      }
    ],
    aryaman: [
      {
        deity: "Mitra",
        type: "Social Harmony",
        description: "Aryaman governs hospitality and customs while Mitra governs contracts. Together they maintain social order.",
        establishment: "Both are Adityas who ensure proper social relations - Mitra through formal agreements, Aryaman through customs and hospitality.",
        relevance: "Shows how different aspects of social life are governed by different deities working toward the same end - harmonious society."
      }
    ],
    tvashtar: [
      {
        deity: "Indra",
        type: "Creator and Wielder",
        description: "Tvashtar crafted Indra's thunderbolt (vajra), the weapon that defeats demons. Creator and user of divine weapons.",
        establishment: "Tvashtar, as divine craftsman, forged the vajra that became Indra's signature weapon.",
        relevance: "Shows the relationship between maker and user, craft and application. Even weapons require divine creation before divine use."
      },
      {
        deity: "Agni",
        type: "Craft and Fire",
        description: "Tvashtar uses Agni's fire in his divine smithing, forging tools and weapons through heat and skill.",
        establishment: "As craftsman-god, Tvashtar depends on Agni's transformative fire to shape metal and create divine implements.",
        relevance: "Demonstrates how fire enables craft. Heat transforms raw materials into refined tools."
      }
    ],
    yama: [
      {
        deity: "Agni",
        type: "Death and Cremation",
        description: "Yama rules the realm of the dead while Agni carries the deceased to that realm through cremation fire.",
        establishment: "Agni serves as the psychopomp, carrying souls through cremation smoke to Yama's kingdom.",
        relevance: "Shows the transition between life and death, with fire as the transformative bridge between worlds."
      }
    ],
    parjanya: [
      {
        deity: "Indra",
        type: "Rain Bringers",
        description: "Both Parjanya and Indra are associated with rain - Parjanya as the rain cloud itself, Indra as the storm warrior who releases rain.",
        establishment: "Parjanya represents the natural phenomenon of rain, while Indra represents the active force that brings rain through battle.",
        relevance: "Distinguishes between natural processes (Parjanya's rain) and divine action (Indra's victories that release waters)."
      },
      {
        deity: "Prithivi",
        type: "Sky and Earth",
        description: "Parjanya (rain cloud) and Prithivi (earth) work together - his rain fertilizes her soil, creating life.",
        establishment: "The marriage of sky (Parjanya) and earth (Prithivi) through rainfall is essential for agricultural abundance.",
        relevance: "Represents the sacred marriage of sky and earth through rain, making fertility and growth possible."
      }
    ],
    ratri: [
      {
        deity: "Ushas",
        type: "Night and Dawn",
        description: "Ratri (Night) and Ushas (Dawn) represent complementary aspects of the daily cycle - rest and renewal, darkness and light.",
        establishment: "Night gives way to dawn in eternal succession. They are sisters who share the sky, taking turns ruling.",
        relevance: "Shows the necessity of both rest (night) and activity (day). Darkness and light are equally essential."
      }
    ],
    apas: [
      {
        deity: "Indra",
        type: "Waters Released",
        description: "The Apas (Waters) were imprisoned by Vritra and released by Indra in his greatest victory.",
        establishment: "Indra's defeat of the drought demon Vritra freed the cosmic waters, allowing them to flow and sustain life.",
        relevance: "Represents the liberation of blocked resources. Divine action removes obstacles, allowing natural abundance to flow."
      },
      {
        deity: "Sarasvati",
        type: "Water Manifestations",
        description: "Sarasvati is the sacred river while Apas represents waters in general. She is specific; they are universal.",
        establishment: "Sarasvati is one manifestation of the universal waters (Apas), showing how the universal becomes particular.",
        relevance: "Demonstrates how universal principles manifest in specific forms. General waters become particular rivers."
      }
    ],
    ribhus: [
      {
        deity: "Tvashtar",
        type: "Divine Craftsmen",
        description: "The Ribhus are craftsmen-gods like Tvashtar, but they achieved divinity through skill rather than being born divine.",
        establishment: "The Ribhus, originally mortal, became gods through their exceptional craftsmanship, rivaling Tvashtar's work.",
        relevance: "Shows that divinity can be achieved through excellence. Skill and dedication can elevate mortals to divine status."
      },
      {
        deity: "Agni",
        type: "Fire and Craft",
        description: "The Ribhus use Agni's fire in their crafting, creating miraculous objects through heat and skill.",
        establishment: "Like Tvashtar, the Ribhus depend on Agni's transformative fire to work their craft.",
        relevance: "Reinforces fire's role as the enabling force for transformation and creation through craft."
      }
    ],
    vak: [
      {
        deity: "Brihaspati",
        type: "Speech Embodied",
        description: "Vak is the goddess of speech itself, while Brihaspati is the lord of sacred speech. She is the power; he is the user.",
        establishment: "Vak represents speech as a cosmic force, while Brihaspati represents skillful use of that force in ritual and prayer.",
        relevance: "Distinguishes between speech as power (Vak) and speech as skillfully wielded tool (Brihaspati)."
      },
      {
        deity: "Sarasvati",
        type: "Flow and Expression",
        description: "Both Sarasvati and Vak are associated with speech and flow - Sarasvati as the flowing river and eloquence, Vak as speech itself.",
        establishment: "The connection between flowing water (Sarasvati) and flowing speech (Vak) links expression to natural movement.",
        relevance: "Shows how speech flows like water, carrying meaning as rivers carry water. Eloquence is compared to abundant, pure flow."
      }
    ]
  };
  // ============= END OF RELATIONSHIP DATA =============
  const svgRef = useRef();
  const [selectedDeity, setSelectedDeity] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);  // ← ADDED


  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);


    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if (isLoading) return;  // ← ADDED - Don't render D3 until loaded


    const width = 1200;
    const height = 800;


    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'var(--color-parchment-light)')
      .style('border-radius', '12px');


    svg.selectAll('*').remove();


    const nodes = deitiesData.deities.map(d => ({
      id: d.id,
      name: d.name,
      category: d.category,
      color: d.color,
      iconSuggestion: d.iconSuggestion,
      hymnCount: d.hymnCount,
      description: d.description,
      domains: d.domains,
      attributes: d.attributes,
      keyMyths: d.keyMyths,
      sampleHymns: d.sampleHymns,
      alternateNames: d.alternateNames,
      mandalas: d.mandalas,
      peakMandalas: d.peakMandalas
    }));


    const links = connectionsData.connections.map(c => ({
      source: c.source,
      target: c.target,
      type: c.type
    }));


    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));


    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#d4af37')
      .attr('stroke-opacity', 0.3)
      .attr('stroke-width', 2);


    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .style('cursor', 'pointer')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedDeity(d);
      })
      .on('mouseenter', (event, d) => {
        const [x, y] = d3.pointer(event, svg.node());
        setTooltip({
          visible: true,
          content: `${d.name} - ${d.hymnCount} hymns`,
          x,
          y
        });


        // Highlight connected nodes and links
        const connectedNodeIds = new Set();
        connectedNodeIds.add(d.id);


        // Find all connected links
        link
          .style('stroke-opacity', l => {
            if (l.source.id === d.id || l.target.id === d.id) {
              connectedNodeIds.add(l.source.id);
              connectedNodeIds.add(l.target.id);
              return 0.8;
            }
            return 0.05;
          })
          .style('stroke-width', l => {
            if (l.source.id === d.id || l.target.id === d.id) {
              return 3;
            }
            return 2;
          });


        // Dim non-connected nodes
        node.style('opacity', n => connectedNodeIds.has(n.id) ? 1 : 0.2);
      })
      .on('mouseleave', () => {
        setTooltip({ visible: false, content: '', x: 0, y: 0 });


        // Reset all nodes and links
        link
          .style('stroke-opacity', 0.3)
          .style('stroke-width', 2);
        
        node.style('opacity', 1);
      });


    node.append('circle')
      .attr('r', d => d.category === 'major' ? 25 : 15)
      .attr('fill', d => d.color || '#d4af37')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))')
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', d.category === 'major' ? 30 : 20);
      })
      .on('mouseleave', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', d.category === 'major' ? 25 : 15);
      });


    node.append('text')
      .text(d => d.iconSuggestion || '✨')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .style('font-size', d => d.category === 'major' ? '20px' : '12px')
      .style('pointer-events', 'none')
      .style('user-select', 'none');


    node.append('text')
      .text(d => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.category === 'major' ? '40px' : '28px')
      .style('font-size', '12px')
      .style('fill', 'var(--color-ink)')
      .style('font-family', 'var(--font-family-header)')
      .style('pointer-events', 'none')
      .style('user-select', 'none');


    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);


      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });


    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }


    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }


    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }


    return () => simulation.stop();
  }, [isLoading]);  // ← ADDED isLoading to dependency array


  // Modal Component
  const Modal = () => {
    if (!selectedDeity) return null;


    return createPortal(
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          overflow: 'auto'
        }}
        onClick={() => setSelectedDeity(null)}
      >
        <div
          style={{
            backgroundColor: 'var(--color-parchment-light)',
            borderRadius: '1rem',
            maxWidth: '56rem',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ padding: '2rem' }}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedDeity(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                color: 'var(--color-ink-light)',
                backgroundColor: 'var(--color-parchment-dark)',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                lineHeight: 1
              }}
              onMouseOver={(e) => e.target.style.color = 'var(--color-ink)'}
              onMouseOut={(e) => e.target.style.color = 'var(--color-ink-light)'}
            >
              ×
            </button>


            {/* Deity Icon & Name */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>
                {selectedDeity.iconSuggestion}
              </div>
              <h2 style={{ 
                fontSize: '2.25rem', 
                fontFamily: 'var(--font-family-header)', 
                color: 'var(--color-ink)', 
                marginBottom: '0.5rem' 
              }}>
                {selectedDeity.name}
              </h2>
              {selectedDeity.alternateNames && selectedDeity.alternateNames.length > 0 && (
                <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-light)', fontStyle: 'italic' }}>
                  Also known as: {selectedDeity.alternateNames.join(', ')}
                </p>
              )}
            </div>


            {/* Stats Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ backgroundColor: 'var(--color-parchment-dark)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.875rem', fontFamily: 'var(--font-family-header)', color: 'var(--color-saffron)' }}>
                  {selectedDeity.hymnCount}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-light)' }}>Hymns</div>
              </div>
              <div style={{ backgroundColor: 'var(--color-parchment-dark)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.875rem', fontFamily: 'var(--font-family-header)', color: 'var(--color-saffron)', textTransform: 'capitalize' }}>
                  {selectedDeity.category}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-light)' }}>Category</div>
              </div>
              <div style={{ backgroundColor: 'var(--color-parchment-dark)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.875rem', fontFamily: 'var(--font-family-header)', color: 'var(--color-saffron)' }}>
                  {selectedDeity.mandalas?.length || 0}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-light)' }}>Mandalas</div>
              </div>
            </div>


            {/* Description */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-family-header)', color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                Description
              </h3>
              <p style={{ color: 'var(--color-ink-light)', fontFamily: 'var(--font-family-body)', lineHeight: 1.75, fontSize: '1.125rem' }}>
                {selectedDeity.description}
              </p>
            </div>


            {/* Domains */}
            {selectedDeity.domains && selectedDeity.domains.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-header)', color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                  Domains
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedDeity.domains.map((domain, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: 'rgba(212, 175, 55, 0.2)',
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        color: 'var(--color-ink)',
                        textTransform: 'capitalize'
                      }}
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            )}


            {/* Key Events */}
            {selectedDeity.keyMyths && selectedDeity.keyMyths.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-header)', color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                  Key Events
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {selectedDeity.keyMyths.map((myth, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--color-gold)', marginTop: '0.25rem' }}>•</span>
                      <span style={{ color: 'var(--color-ink-light)', fontFamily: 'var(--font-family-body)' }}>
                        {myth}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

                        {/* ============= ADD THIS RELATIONSHIPS SECTION HERE ============= */}
                        {selectedDeity && deityRelationships[selectedDeity.id] && deityRelationships[selectedDeity.id].length > 0 && (
              <div style={{ marginBottom: '1.5rem', paddingTop: '1.5rem', borderTop: '2px solid rgba(212, 175, 55, 0.3)' }}>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-header)', color: 'var(--color-ink)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Network size={20} style={{ color: 'var(--color-gold)' }} /> Divine Relationships
                </h3>
                <div style={{ maxHeight: '16rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
                  {deityRelationships[selectedDeity.id].map((rel, index) => (
                    <div key={index} style={{ background: 'linear-gradient(to right, rgba(255, 248, 220, 0.3), rgba(255, 237, 160, 0.3))', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(212, 175, 55, 0.2)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <h4 style={{ fontWeight: 'bold', color: 'var(--color-ink)', fontSize: '1.125rem' }}>{rel.deity}</h4>
                        <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(212, 175, 55, 0.3)', color: 'var(--color-ink)', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontWeight: '600' }}>
                          {rel.type}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-light)', marginBottom: '0.75rem', lineHeight: '1.5' }}>
                        {rel.description}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', padding: '0.75rem', borderRadius: '0.375rem', borderLeft: '4px solid rgba(212, 175, 55, 0.6)' }}>
                          <p style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-saffron)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            📜 How It Was Established
                          </p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--color-ink-light)', lineHeight: '1.5' }}>
                            {rel.establishment}
                          </p>
                        </div>
                        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', padding: '0.75rem', borderRadius: '0.375rem', borderLeft: '4px solid rgba(255, 140, 0, 0.6)' }}>
                          <p style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-saffron)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            ⚡ Why It's Relevant
                          </p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--color-ink-light)', lineHeight: '1.5' }}>
                            {rel.relevance}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* ============= END OF RELATIONSHIPS SECTION ============= */}
          </div>
        </div>
      </div>,
      document.body
    );
  };


  return (
    <>
      {/* Rishi Welcome Popup - MOVED HERE TO ALWAYS RENDER */}
      <RishiWelcome
        image="/images/rishi-mascot-deity-network.png"
        dialogue="Explore the relation between the deities mentioned in the RigVeda through an interactive Deity Network Web!!"
        storageKey="deityNetworkWelcome"
      />

      {/* Conditional rendering based on loading state */}
      {isLoading ? (
        // Loading state
        <div className="p-4">
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-3 flex items-center justify-center gap-2">
              <Network size={36} className="text-[--color-ink]" />
              Deity Network
            </h1>
            <p className="text-lg text-[--color-ink-light] font-[family:--font-family-body]">
              Interactive network of Vedic deities and their relationships
            </p>
          </div>
          <BookLoadingAnimation size="medium" text="Mapping divine connections..." />
        </div>
      ) : (
        // Main content after loading
        <div className="p-4">
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-3 flex items-center justify-center gap-2">
              <Network size={36} className="text-[--color-ink]" />
              Deity Network
            </h1>
            <p className="text-lg text-[--color-ink-light] font-[family:--font-family-body]">
              Explore {deitiesData.deities.length} Vedic deities and their interconnections. Click any deity for details!
            </p>
          </div>

          <div className="flex justify-center mb-4 relative">
            <svg ref={svgRef} className="shadow-lg" />
            
            {/* Tooltip */}
            {tooltip.visible && (
              <div
                style={{
                  position: 'absolute',
                  left: tooltip.x + 10,
                  top: tooltip.y + 10,
                  backgroundColor: 'var(--color-ink)',
                  color: 'white',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  pointerEvents: 'none',
                  zIndex: 10,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                  whiteSpace: 'nowrap'
                }}
              >
                {tooltip.content}
              </div>
            )}
          </div>

          <Modal />
        </div>
      )}
    </>
  );
};



export default DeityNetwork;
