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
      },
      {
        deity: "Vishnu",
        type: "Cosmic Allies",
        description: "Vishnu and Indra are close allies in maintaining cosmic order. Vishnu's three strides created space, which Indra then protects.",
        establishment: "When Vishnu took his three cosmic strides to measure the universe, he created the space that Indra would defend from demons and chaos.",
        relevance: "Shows division of cosmic labor: creation of space (Vishnu) requires protection of that space (Indra)."
      },
      {
        deity: "Vayu",
        type: "Atmospheric Brothers",
        description: "Indra and Vayu are brothers, both sons of Dyaus. Together they control all atmospheric phenomena.",
        establishment: "Born of the same divine parentage, Indra wields lightning and rain while Vayu commands the winds, working together to create storms.",
        relevance: "Demonstrates how different natural forces are governed by related deities who cooperate in creating weather phenomena."
      },
      {
        deity: "Brihaspati",
        type: "Chaplain and King",
        description: "Brihaspati serves as Indra's chaplain, providing the prayers and rituals that amplify Indra's power.",
        establishment: "Before battles, Brihaspati performs the necessary rituals and speaks the mantras that consecrate Indra's weapons and ensure divine favor.",
        relevance: "Illustrates that even divine power requires proper ritual support. Action must be sanctified by sacred speech."
      },
      {
        deity: "Tvashtar",
        type: "Weapon-smith and Warrior",
        description: "Tvashtar crafted Indra's vajra (thunderbolt), the weapon with which Indra defeated Vritra and maintains cosmic order.",
        establishment: "Using his divine craftsmanship, Tvashtar forged the indestructible vajra from the bones of the sage Dadhichi, giving Indra his signature weapon.",
        relevance: "Shows that even divine warriors depend on divine craftsmen. Power requires the tools to express it."
      },
      {
        deity: "Ushas",
        type: "Dawn and Victory",
        description: "Ushas (Dawn) accompanies Indra's victories, bringing light after his battles against demons of darkness.",
        establishment: "When Indra defeats chaos and darkness, Ushas arrives to illuminate the world, symbolizing the restoration of order.",
        relevance: "Links victory over chaos with the arrival of light and order. Darkness cannot withstand combined divine action."
      },
      {
        deity: "Surya",
        type: "King and Sun",
        description: "Surya provides the light by which Indra's victories are seen and celebrated. The sun bears witness to Indra's kingship.",
        establishment: "Surya's daily journey across the sky occurs under Indra's protection, and in turn illuminates Indra's realm.",
        relevance: "Demonstrates mutual dependence: protection enables illumination, illumination validates protection."
      },
      {
        deity: "Apas",
        type: "Waters Liberation",
        description: "Indra liberated the Apas (cosmic waters) from Vritra's imprisonment, allowing them to flow and sustain life.",
        establishment: "In his greatest victory, Indra slew the drought-demon Vritra who had imprisoned the waters, freeing them to nourish the world.",
        relevance: "Represents liberation of essential resources through divine action. Order requires removing obstacles to abundance."
      },
      {
        deity: "Dyaus",
        type: "Father and Son",
        description: "Indra is the son of Dyaus (Sky) and eventually superseded his father as king of the gods.",
        establishment: "Born of Dyaus and Prithivi, Indra separated his parents to create cosmic space and established his own sovereignty.",
        relevance: "Shows generational change in divine order. Dynamic gods replace static primordial forces."
      },
      {
        deity: "Rudra",
        type: "Fierce Allies",
        description: "Indra and Rudra both embody fierce protective power, though expressed differently - Indra through battle, Rudra through storms and disease.",
        establishment: "While sometimes in tension, both serve as divine warriors who use destructive force to protect cosmic order.",
        relevance: "Shows that fierce protection takes multiple forms. Different types of danger require different defenders."
      },
      {
        deity: "Pushan",
        type: "Path-maker and Protector",
        description: "Pushan finds the paths while Indra clears them of obstacles. Together they ensure successful journeys.",
        establishment: "Pushan guides travelers and herders on their paths, while Indra defeats the demons and obstacles they might encounter.",
        relevance: "Illustrates complementary functions: guidance needs protection, protection needs direction."
      },
      {
        deity: "Ashvins",
        type: "Warriors and Healers",
        description: "The Ashvins heal those wounded in Indra's battles, ensuring his warriors can continue fighting for cosmic order.",
        establishment: "After Indra's battles, the Ashvins arrive at dawn to heal the wounded and restore vitality to the world.",
        relevance: "Shows the cycle of war and healing. Destruction in service of order must be followed by restoration."
      },
      {
        deity: "Sarasvati",
        type: "River and Rain",
        description: "Sarasvati's flowing waters complement Indra's rain-bringing power, both ensuring agricultural abundance.",
        establishment: "Indra releases rain through his victories, which feeds Sarasvati's flow, creating a cycle of water and abundance.",
        relevance: "Links divine victory with agricultural prosperity. Cosmic order manifests as earthly fertility."
      },
      {
        deity: "Parjanya",
        type: "Storm Brothers",
        description: "Both Indra and Parjanya bring rain, but Indra through battle and Parjanya through natural process.",
        establishment: "Indra's victories release the waters Vritra imprisoned, while Parjanya's clouds naturally bring rain to earth.",
        relevance: "Distinguishes between dramatic intervention (Indra) and regular natural process (Parjanya) in providing essential water."
      },
      {
        deity: "Aditi",
        type: "Mother of Order",
        description: "Aditi, mother of the Adityas, represents the boundless space in which Indra exercises his protective power.",
        establishment: "Aditi's infinite nature provides the cosmic framework within which Indra's specific protective actions occur.",
        relevance: "Shows relationship between infinite potential (Aditi) and specific action (Indra). Boundlessness requires guardianship."
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
      },
      {
        deity: "Prithivi",
        type: "Earth and Fire",
        description: "Prithivi (Earth) is Agni's mother and home. Fire emerges from earth and returns to it.",
        establishment: "Agni is born from earth through the friction of the fire-drill, lives in earth's wood, and returns to earth as ash.",
        relevance: "Illustrates the cycle of emergence and return. Fire's power comes from earth and ultimately serves earth's fertility."
      },
      {
        deity: "Sarasvati",
        type: "Fire and Water",
        description: "Sarasvati's purifying waters and Agni's purifying fire work together in ritual, representing complementary cleansing forces.",
        establishment: "Rituals require both water (Sarasvati) for washing and fire (Agni) for transformation, combining to achieve complete purification.",
        relevance: "Shows how opposing elements cooperate. True purification requires both washing away (water) and burning away (fire)."
      },
      {
        deity: "Vayu",
        type: "Fire and Wind",
        description: "Vayu (Wind) feeds Agni's flames, making fire burn brighter and spread. Wind is fire's essential companion.",
        establishment: "Without Vayu's breath, Agni cannot burn strongly. Wind carries Agni's smoke upward to the gods.",
        relevance: "Demonstrates elemental interdependence. Fire needs air to exist; their cooperation creates power greater than either alone."
      },
      {
        deity: "Maruts",
        type: "Fire and Storm",
        description: "The Maruts' storm winds sometimes threaten Agni, but also spread his power across the land.",
        establishment: "Storm winds can extinguish small fires but spread large ones. The Maruts' force amplifies Agni's reach.",
        relevance: "Shows complex interdependence: what threatens can also empower, depending on circumstances and scale."
      },
      {
        deity: "Tvashtar",
        type: "Fire and Forge",
        description: "Tvashtar uses Agni's fire in his smithing, combining heat with skill to create divine implements.",
        establishment: "All of Tvashtar's craftsmanship requires Agni's transformative heat to soften, shape, and harden materials.",
        relevance: "Illustrates fire as the enabling force for creation. Heat makes transformation possible; skill directs it."
      },
      {
        deity: "Yama",
        type: "Fire and Death",
        description: "Agni carries the dead through cremation fire to Yama's realm, serving as psychopomp between life and death.",
        establishment: "Cremation fire (Agni) transforms the physical body and carries the soul upward to Yama's kingdom of the ancestors.",
        relevance: "Shows fire as the bridge between worlds. Death is not end but transformation, facilitated by sacred fire."
      },
      {
        deity: "Brihaspati",
        type: "Fire and Speech",
        description: "Brihaspati's sacred words and Agni's sacred fire together complete ritual. Speech directs; fire transforms.",
        establishment: "Mantras (Brihaspati) spoken over offerings give them meaning and direction; fire (Agni) gives them transformation and delivery.",
        relevance: "Demonstrates that ritual requires both intention (word) and action (fire). Meaning and power must unite."
      },
      {
        deity: "Rudra",
        type: "Tame and Wild Fire",
        description: "Agni is the controlled, domestic fire; Rudra is associated with wild, destructive fire. Both aspects of flame's power.",
        establishment: "Agni serves humanity and gods through hearth and sacrifice, while Rudra's fire appears in lightning and wildfire.",
        relevance: "Shows fire's dual nature: beneficent when controlled, dangerous when wild. Same element, different manifestations."
      },
      {
        deity: "Vishnu",
        type: "Fire and Space",
        description: "Vishnu's three strides created the cosmic space in which Agni burns, establishing the realm for fire to exist.",
        establishment: "Vishnu measured the universe, creating the three worlds where Agni manifests: earth, atmosphere, and heaven.",
        relevance: "Shows that space precedes fire. The cosmos must exist before fire can fill it with transformation."
      },
      {
        deity: "Savitar",
        type: "Fire and Stimulation",
        description: "Savitar stimulates all beings to activity, including kindling Agni at dawn to begin the day's rituals.",
        establishment: "Savitar's pre-dawn power sets all things in motion, including the kindling of the sacrificial fire each morning.",
        relevance: "Illustrates the sequence of creation: stimulation precedes action, impulse precedes manifestation."
      },
      {
        deity: "Ribhus",
        type: "Fire and Craft",
        description: "The Ribhus, like Tvashtar, use Agni's fire in their miraculous craftsmanship, depending on heat for transformation.",
        establishment: "The Ribhus' legendary creations all required Agni's fire to work their transformative magic on materials.",
        relevance: "Reinforces fire as the universal enabling force for craft. All making requires heat's transformative power."
      },
      {
        deity: "Vak",
        type: "Fire and Word",
        description: "Vak (Speech) and Agni together manifest divine will: Vak expresses intention, Agni executes transformation.",
        establishment: "Sacred speech (Vak) requires sacred fire (Agni) to carry meaning to the gods. Word and flame cooperate in ritual.",
        relevance: "Shows language and energy as complementary: speech conceptualizes, fire actualizes. Thought needs power to manifest."
      },
      {
        deity: "Dyaus",
        type: "Heaven and Fire",
        description: "Dyaus (Sky) is the source of celestial fire (lightning), which Agni brings to earth for human use.",
        establishment: "Lightning from Dyaus provided the first fire, which Agni then maintained on earth for humanity's benefit.",
        relevance: "Traces fire's divine origin. Earthly fire descends from heavenly fire, connecting humans to cosmic source."
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
      },
      {
        deity: "Maruts",
        type: "Storm and Nectar",
        description: "The Maruts, as Indra's companions, also partake of soma before battle, amplifying their storm-bringing power.",
        establishment: "When Indra drinks soma before battle, he shares it with the Maruts, multiplying their collective force through divine intoxication.",
        relevance: "Shows soma as the fuel for divine action. Collective power requires collective empowerment through ritual offering."
      },
      {
        deity: "Ushas",
        type: "Dawn and Pressing",
        description: "Soma is pressed at dawn when Ushas arrives, linking the preparation of divine nectar with the renewal of light.",
        establishment: "The soma ritual traditionally occurs at dawn, when Ushas illuminates the world and makes all activity visible.",
        relevance: "Connects ritual action with natural cycles. Sacred work happens at sacred times when cosmic forces align."
      },
      {
        deity: "Parjanya",
        type: "Rain and Growth",
        description: "Parjanya's rain nourishes the soma plant, making the growth of this sacred offering possible.",
        establishment: "Rain from Parjanya waters the mountains where soma grows, creating the material basis for the divine drink.",
        relevance: "Links ritual offering to natural provision. Divine action depends on divine gift - rain enables soma."
      },
      {
        deity: "Sarasvati",
        type: "River and Filtering",
        description: "Sarasvati's pure waters are used to filter and mix soma, purifying the offering before it reaches the gods.",
        establishment: "Sacred water from Sarasvati cleanses the pressed soma and dilutes its potency to proper strength for offering.",
        relevance: "Shows how water purifies power. Pure water makes powerful soma suitable for divine consumption."
      },
      {
        deity: "Surya",
        type: "Sun and Potency",
        description: "Surya's light gives soma its power. The plant grows on mountain peaks where sun is strongest.",
        establishment: "Soma's potency comes from absorbing Surya's rays on high mountains. Solar energy becomes liquid power.",
        relevance: "Illustrates transformation of light into liquid power. Sun's energy becomes soma's intoxication through plant intermediary."
      },
      {
        deity: "Rudra",
        type: "Wild Power",
        description: "Rudra, like soma, embodies dangerous power that must be controlled - Rudra through propitiation, soma through ritual.",
        establishment: "Both represent forces that can heal or harm. Proper handling makes them beneficial; misuse makes them dangerous.",
        relevance: "Shows that powerful substances require careful handling. Great power demands great care in its use."
      },
      {
        deity: "Varuna",
        type: "Law and Offering",
        description: "Varuna oversees the proper performance of soma rituals, ensuring they follow cosmic law (Rita).",
        establishment: "Soma offerings must follow precise ritual order to be acceptable. Varuna ensures this order is maintained.",
        relevance: "Links ritual precision with cosmic law. Proper offering follows universal order; disorder makes offering ineffective."
      },
      {
        deity: "Brihaspati",
        type: "Prayer and Offering",
        description: "Brihaspati's prayers and mantras accompany soma offerings, giving them proper consecration and direction.",
        establishment: "The soma ritual requires correct speech (Brihaspati) alongside correct action to effectively convey offering to gods.",
        relevance: "Demonstrates ritual requires both material (soma) and immaterial (mantra). Physical and verbal actions unite in worship."
      },
      {
        deity: "Pushan",
        type: "Paths and Pressing",
        description: "Pushan guides the soma stalks to the pressing ground and the pressed soma to the gods.",
        establishment: "As path-finder and guide, Pushan ensures soma travels correctly from mountain to ritual to heaven.",
        relevance: "Shows guidance applies to substances as well as people. Even offerings need divine guidance to reach their destination."
      },
      {
        deity: "Ribhus",
        type: "Craft and Cup",
        description: "The Ribhus crafted the divine vessels in which soma is offered, combining their skill with soma's power.",
        establishment: "Their miraculous craftsmanship created the perfect cups and implements for soma ritual, earning them divine status.",
        relevance: "Links container to content. Sacred substance requires sacred vessel; form and substance elevate each other."
      },
      {
        deity: "Tvashtar",
        type: "Creator's Drink",
        description: "Tvashtar, as divine craftsman, also partakes of soma to fuel his creative work and maintain his crafting power.",
        establishment: "Creating divine implements requires divine inspiration, which soma provides to Tvashtar's skilled hands.",
        relevance: "Shows creativity requires inspiration. Even divine skill benefits from soma's mind-expanding properties."
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
      },
      {
        deity: "Aditi",
        type: "Son and Mother",
        description: "Varuna is the chief of the Adityas, sons of Aditi. He embodies her boundless nature as cosmic law.",
        establishment: "Born from Aditi's infinite space, Varuna became the enforcer of boundaries within boundlessness - law within freedom.",
        relevance: "Shows how infinite potential (Aditi) generates specific function (Varuna). Boundlessness paradoxically requires limits."
      },
      {
        deity: "Agni",
        type: "Law and Fire",
        description: "Agni's fire tests truth while Varuna judges truth. Fire reveals; law enforces.",
        establishment: "In oath rituals, Agni's fire tests truthfulness while Varuna oversees the cosmic consequences of oaths kept or broken.",
        relevance: "Links physical testing (fire) with cosmic judgment (Varuna). Truth manifests through ordeal and divine observation."
      },
      {
        deity: "Apas",
        type: "Waters and Law",
        description: "Varuna governs the cosmic waters, ensuring they flow according to Rita (cosmic order).",
        establishment: "The Apas (waters) follow Varuna's law in their courses, never overstepping their bounds unless Varuna permits.",
        relevance: "Illustrates how natural law (water flowing) reflects cosmic law (Rita). Physical order mirrors moral order."
      },
      {
        deity: "Dyaus",
        type: "Sky and Ocean",
        description: "Varuna governs the cosmic ocean while Dyaus governs the sky. Together they encompass all space.",
        establishment: "Dyaus provides the dome of heaven; Varuna the depths of the ocean. Between them lies all existence.",
        relevance: "Shows vertical cosmic organization. Sky above, ocean below, define the limits within which life occurs."
      },
      {
        deity: "Ratri",
        type: "Night and Judgment",
        description: "Varuna's watchful eyes remain open even during Ratri (Night), ensuring constant vigilance over moral order.",
        establishment: "While Ratri brings darkness and rest, Varuna's observation never sleeps. Night hides nothing from cosmic law.",
        relevance: "Establishes that moral accountability operates continuously. Darkness provides no cover from divine justice."
      },
      {
        deity: "Rudra",
        type: "Law and Punishment",
        description: "Rudra executes Varuna's judgments through disease and storm, serving as the enforcer of cosmic law.",
        establishment: "When Varuna judges transgression, Rudra often delivers the punishment through his fierce, destructive power.",
        relevance: "Divides judgment from execution. One deity determines guilt; another delivers consequences."
      },
      {
        deity: "Yama",
        type: "Cosmic and Death Judge",
        description: "Varuna judges the living while Yama judges the dead. Together they ensure justice across all states of existence.",
        establishment: "Varuna's domain is the living cosmos; Yama's the realm of ancestors. Justice operates in both realms.",
        relevance: "Shows moral accountability extends beyond death. Living virtue and vice receive both earthly and afterlife consequences."
      },
      {
        deity: "Sarasvati",
        type: "River and Boundaries",
        description: "Sarasvati's course demonstrates Varuna's law - rivers flow within banks, following cosmic order.",
        establishment: "Varuna ensures rivers like Sarasvati stay their course, demonstrating how physical law reflects cosmic law.",
        relevance: "Uses river as metaphor for Rita. Proper flow within boundaries shows cosmic order in action."
      },
      {
        deity: "Brihaspati",
        type: "Law and Ritual Speech",
        description: "Brihaspati's ritual words must follow Varuna's law to be effective. Sacred speech requires cosmic order.",
        establishment: "Mantras work only when properly formulated (Brihaspati) and properly aligned with cosmic order (Varuna).",
        relevance: "Links ritual efficacy to cosmic law. Prayer succeeds when it harmonizes with universal order."
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
      },
      {
        deity: "Indra",
        type: "Contract and Force",
        description: "Mitra governs agreements and oaths while Indra provides the force to protect those who honor their contracts.",
        establishment: "When sacred oaths are made under Mitra's witness, Indra ensures they are honored by defending the righteous party.",
        relevance: "Links social contract with divine protection. Keeping agreements brings divine favor and support."
      },
      {
        deity: "Surya",
        type: "Day and Witness",
        description: "Mitra is associated with daylight and Surya is the sun itself. Together they illuminate all agreements made in the light.",
        establishment: "Contracts and oaths are traditionally made during daylight when both Mitra and Surya witness them.",
        relevance: "Establishes that sacred agreements require divine witness. Daylight makes all actions visible and accountable."
      },
      {
        deity: "Agni",
        type: "Oath and Fire",
        description: "Agni's fire sanctifies oaths made under Mitra's authority, sealing contracts with sacred heat.",
        establishment: "Fire rituals accompanying oath-taking involve both Mitra (who governs the contract) and Agni (who makes it sacred).",
        relevance: "Shows how material and spiritual elements combine. Fire transforms social contract into sacred bond."
      },
      {
        deity: "Aditi",
        type: "Mother and Son",
        description: "Mitra is one of the Adityas, sons of Aditi, embodying her boundless nature as social harmony.",
        establishment: "Born from Aditi's infinite freedom, Mitra creates the bonds that paradoxically enable true social freedom.",
        relevance: "Illustrates that freedom requires structure. Contracts and agreements create the framework for harmonious liberty."
      },
      {
        deity: "Brihaspati",
        type: "Contract and Word",
        description: "Brihaspati provides the sacred words for oath-taking while Mitra ensures those oaths are honored.",
        establishment: "Proper formulation of contracts requires Brihaspati's ritual speech and Mitra's authority over agreements.",
        relevance: "Demonstrates that binding promises need both correct formulation and divine enforcement."
      },
      {
        deity: "Dyaus",
        type: "Day Sky",
        description: "Mitra governs agreements made under Dyaus (the day sky), linking social order with celestial witness.",
        establishment: "Oaths taken beneath the open sky invoke both Dyaus as witness and Mitra as guardian of the contract.",
        relevance: "Shows how cosmic forces oversee human agreements. The sky itself bears witness to our promises."
      },
      {
        deity: "Ushas",
        type: "Dawn and Friendship",
        description: "Mitra's domain of friendship and cooperation is renewed each dawn when Ushas brings light and new opportunities for harmony.",
        establishment: "Each new day (Ushas) brings fresh chances to honor contracts and maintain friendships under Mitra's guidance.",
        relevance: "Links social renewal with daily renewal. Each dawn offers opportunity to restore and strengthen bonds."
      },
      {
        deity: "Sarasvati",
        type: "Flow and Harmony",
        description: "Sarasvati's smooth flow represents the harmonious social relations Mitra promotes through contracts and friendship.",
        establishment: "Just as Sarasvati flows without obstruction when banks are maintained, society flows smoothly when contracts are honored.",
        relevance: "Uses natural metaphor for social order. Proper boundaries enable smooth flow of relationships."
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
      },
      {
        deity: "Ratri",
        type: "Night and Dawn Sisters",
        description: "Ratri (Night) and Ushas (Dawn) are sisters who alternate ruling the sky, representing complementary aspects of the daily cycle.",
        establishment: "Night gives way to dawn in eternal succession. They share the sky, taking turns ruling in perfect harmony.",
        relevance: "Shows the necessity of both rest (night) and activity (day). Darkness and light are equally essential for cosmic balance."
      },
      {
        deity: "Savitar",
        type: "Pre-dawn Stimulation",
        description: "Savitar works before Ushas arrives, stimulating all beings to prepare for the dawn she brings.",
        establishment: "Savitar's power operates in pre-dawn darkness, setting everything in motion for Ushas's illuminating arrival.",
        relevance: "Illustrates that action requires prior stimulation. Awakening is a process, not an instant event."
      },
      {
        deity: "Indra",
        type: "Victory and Dawn",
        description: "Ushas arrives after Indra's nighttime battles, bringing light to celebrate his victories over demons of darkness.",
        establishment: "Indra defeats the forces of chaos and darkness; Ushas illuminates the resulting order with her dawn light.",
        relevance: "Links cosmic battle with cosmic renewal. Victory over chaos is celebrated by the arrival of light."
      },
      {
        deity: "Soma",
        type: "Dawn Pressing",
        description: "Soma rituals traditionally occur at dawn, when Ushas illuminates the sacrificial ground.",
        establishment: "The pressing of soma is timed to Ushas's arrival, making dawn the sacred moment for this crucial ritual.",
        relevance: "Connects ritual timing with cosmic cycles. Sacred actions align with natural transitions for maximum efficacy."
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
      },
      {
        deity: "Indra",
        type: "King and Sun",
        description: "Surya provides the light by which Indra's victories are seen and celebrated. The sun bears witness to Indra's kingship.",
        establishment: "Surya's daily journey across the sky occurs under Indra's protection, and in turn illuminates Indra's realm.",
        relevance: "Demonstrates mutual dependence: protection enables illumination, illumination validates protection."
      },
      {
        deity: "Pushan",
        type: "Solar Brothers",
        description: "Pushan is associated with the sun's nourishing and guiding aspects, complementing Surya's illuminating power.",
        establishment: "Both are solar deities but with different functions - Surya illuminates, Pushan provides and guides.",
        relevance: "Shows how a single natural phenomenon (the sun) embodies multiple divine functions - light, warmth, nourishment, guidance."
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
      },
      {
        deity: "Agni",
        type: "Wild and Tame Fire",
        description: "Rudra represents wild, destructive fire (lightning, wildfire) while Agni represents controlled, beneficial fire (hearth, sacrifice).",
        establishment: "Both are aspects of fire's power - Rudra as untamed natural force, Agni as domesticated ritual tool.",
        relevance: "Shows fire's dual nature: dangerous when wild, beneficial when controlled. Both aspects are necessary."
      },
      {
        deity: "Varuna",
        type: "Punishment and Law",
        description: "Varuna judges transgressions while Rudra often delivers the punishment through disease or natural disaster.",
        establishment: "When cosmic law (Varuna) is violated, Rudra serves as the enforcer, bringing consequences through his fierce power.",
        relevance: "Separates judgment from execution. One deity determines guilt; another delivers divine retribution."
      },
      {
        deity: "Ashvins",
        type: "Disease and Healing",
        description: "Rudra can cause disease while the Ashvins cure it, representing the cycle of affliction and healing.",
        establishment: "Rudra's arrows bring sickness; the Ashvins' medicines cure it. Together they maintain balance between harm and healing.",
        relevance: "Demonstrates cosmic balance through opposition. Disease and cure are both divine, maintaining life's equilibrium."
      },
      {
        deity: "Soma",
        type: "Wild Power",
        description: "Both Rudra and soma represent dangerous power that requires careful handling - propitiation for Rudra, ritual for soma.",
        establishment: "Both can heal or harm depending on proper approach. Mishandled, both are dangerous; properly engaged, both are beneficial.",
        relevance: "Shows that great power demands great care. The most potent forces require the most precise handling."
      }
    ],

    maruts: [
      {
        deity: "Rudra",
        type: "Divine Lineage",
        description: "The Maruts are the sons of Rudra, inheriting his fierce storm nature but expressing it as collective force rather than individual power.",
        establishment: "Born from Rudra's wrath and power, the Maruts manifest as a group of storm warriors who accompany their father and Indra.",
        relevance: "Shows how divine qualities can be distributed - individual fierce power (Rudra) versus collective force (Maruts)."
      },
      {
        deity: "Indra",
        type: "Battle Companions",
        description: "The Maruts fight alongside Indra in his cosmic battles, providing additional force to his thunderbolt strikes.",
        establishment: "The Maruts allied with Indra, particularly in his battle against Vritra, multiplying his power through their collective storm force.",
        relevance: "Teaches that even the strongest benefit from companions. Collective action amplifies individual strength."
      },
      {
        deity: "Agni",
        type: "Storm and Fire",
        description: "The Maruts' storm winds can both threaten and empower Agni's flames, showing complex elemental interaction.",
        establishment: "Storm winds can extinguish small fires but spread large ones, creating complex relationship between Maruts and Agni.",
        relevance: "Illustrates how forces can be both antagonistic and cooperative depending on circumstances."
      },
      {
        deity: "Vayu",
        type: "Wind Family",
        description: "The Maruts are specialized storm winds, while Vayu is the primary wind god. Together they represent all aspects of air in motion.",
        establishment: "The Maruts can be seen as multiple manifestations of Vayu's power, specialized as storm-bringing winds.",
        relevance: "Demonstrates how a single element (air) can be governed by different deities representing different aspects."
      },
      {
        deity: "Parjanya",
        type: "Storm Bringers",
        description: "Both the Maruts and Parjanya bring rain through storms, but Maruts through battle accompaniment, Parjanya through natural clouds.",
        establishment: "The Maruts create storms as warriors; Parjanya creates them as rain-cloud deity. Different means, same result.",
        relevance: "Shows how the same natural phenomenon (rain) can have different divine causes and purposes."
      },
      {
        deity: "Soma",
        type: "Storm Fuel",
        description: "The Maruts drink soma alongside Indra before battle, using its power to amplify their storm-bringing force.",
        establishment: "When Indra shares soma with the Maruts, their collective power multiplies, creating devastating storms against evil forces.",
        relevance: "Links ritual offering with natural phenomena. Soma empowers gods to create actual weather effects."
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
      },
      {
        deity: "Indra",
        type: "Warriors and Healers",
        description: "The Ashvins heal those wounded in Indra's battles, ensuring cosmic warriors can continue protecting order.",
        establishment: "After Indra's battles against demons, the Ashvins arrive at dawn to heal the wounded and restore vitality.",
        relevance: "Shows the cycle of war and healing. Destruction in service of order must be followed by restoration."
      },
      {
        deity: "Rudra",
        type: "Disease and Cure",
        description: "Rudra can inflict disease while the Ashvins cure it, representing the balance between affliction and healing.",
        establishment: "Rudra's arrows bring sickness; Ashvins' medicines cure it. Together they maintain equilibrium between harm and health.",
        relevance: "Demonstrates cosmic balance. Disease and healing are both divine functions maintaining life's cycle."
      },
      {
        deity: "Surya",
        type: "Sun and Healing",
        description: "The Ashvins are associated with the rising sun (Surya), linking solar energy with healing and rejuvenation.",
        establishment: "The Ashvins travel in their golden chariot at sunrise, when Surya's first rays bring warmth and vitality.",
        relevance: "Connects sunlight with health. Morning sun has healing properties, embodied in the dawn-traveling Ashvins."
      },
      {
        deity: "Sarasvati",
        type: "Water and Medicine",
        description: "Sarasvati's pure waters are used by the Ashvins in their healing work, combining water's cleansing with their medical skill.",
        establishment: "Sacred water from Sarasvati is essential in Ashvins' healing rituals, purifying and restoring health.",
        relevance: "Links water purification with bodily healing. Clean water is medicine's foundation."
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
      },
      {
        deity: "Soma",
        type: "Guide and Offering",
        description: "Pushan guides the soma plants from mountain to ritual ground, and guides the offered soma to the gods.",
        establishment: "As divine path-finder, Pushan ensures soma travels correctly from growth to harvest to offering to divine consumption.",
        relevance: "Shows that even sacred substances need divine guidance to reach their proper destination."
      },
      {
        deity: "Agni",
        type: "Path and Fire",
        description: "Pushan finds paths while Agni illuminates them, working together to guide travelers and herders safely.",
        establishment: "Pushan's guidance and Agni's light combine to ensure safe travel through darkness and unknown territory.",
        relevance: "Links finding the way with seeing the way. Guidance requires illumination to be effective."
      },
      {
        deity: "Sarasvati",
        type: "Path and Flow",
        description: "Sarasvati's river provides a path for water to flow, while Pushan provides paths for people and animals to travel.",
        establishment: "Both create routes through otherwise impassable terrain - water through dry land, trails through wilderness.",
        relevance: "Shows how paths enable movement and connection. Civilization requires established routes."
      }
    ],

    vishnu: [
      {
        deity: "Indra",
        type: "Cosmic Alliance",
        description: "Vishnu and Indra work together in cosmic battles, with Vishnu's three strides establishing the cosmos while Indra protects it.",
        establishment: "Vishnu's three strides created the space of the universe which Indra then protects and maintains.",
        relevance: "Shows the division between creation (Vishnu's strides establishing cosmic space) and maintenance (Indra's ongoing protection)."
      },
      {
        deity: "Agni",
        type: "Space and Fire",
        description: "Vishnu's three strides created the cosmic space in which Agni burns, establishing the three realms of fire's manifestation.",
        establishment: "Vishnu measured the three worlds (earth, atmosphere, heaven) where Agni manifests in different forms.",
        relevance: "Shows that space precedes fire. The cosmos must be established before elements can fill it."
      },
      {
        deity: "Surya",
        type: "Strider and Illuminator",
        description: "Vishnu's three strides across the universe parallel Surya's daily journey across the sky.",
        establishment: "Both traverse cosmic space - Vishnu in three primordial steps, Surya in daily repeated journey.",
        relevance: "Links cosmic establishment with cosmic maintenance. The original journey makes the daily journey possible."
      },
      {
        deity: "Varuna",
        type: "Space and Law",
        description: "Vishnu's strides established the cosmic space in which Varuna's law operates and is enforced.",
        establishment: "Vishnu created the framework; Varuna fills it with order (Rita). Space requires law to remain organized.",
        relevance: "Shows relationship between spatial establishment and legal establishment. Physical cosmos needs moral order."
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
      },
      {
        deity: "Agni",
        type: "Wind and Fire",
        description: "Vayu feeds Agni's flames, making fire burn stronger and spreading its power across the land.",
        establishment: "Without Vayu's breath, Agni cannot burn intensely. Wind carries smoke upward and spreads fire's reach.",
        relevance: "Shows elemental interdependence. Fire needs air to exist and thrive; their cooperation creates greater power."
      },
      {
        deity: "Parjanya",
        type: "Wind and Rain",
        description: "Vayu's winds carry Parjanya's rain clouds across the sky, distributing moisture where it's needed.",
        establishment: "Wind (Vayu) moves rain clouds (Parjanya), ensuring water reaches all parts of the world.",
        relevance: "Demonstrates cooperation between atmospheric elements. Rain requires wind for proper distribution."
      }
    ],

    savitar: [
      {
        deity: "Surya",
        type: "Solar Aspects",
        description: "Savitar is the stimulating power of the sun, especially before dawn and after dusk, while Surya is the visible solar disc.",
        establishment: "Savitar represents the sun's power to stimulate and energize even when not visible, the hidden solar force.",
        relevance: "Distinguishes between manifest and unmanifest aspects of the same power, teaching that divine forces operate even when not directly perceived."
      },
      {
        deity: "Ushas",
        type: "Pre-dawn Partnership",
        description: "Savitar is particularly active before dawn, working with Ushas to awaken the world and set all things in motion.",
        establishment: "Savitar stimulates all beings to activity, while Ushas illuminates the world, working together in the transition from night to day.",
        relevance: "Shows how transition requires multiple divine forces - stimulation to act and illumination to see."
      },
      {
        deity: "Agni",
        type: "Stimulation and Fire",
        description: "Savitar's pre-dawn stimulation includes prompting the kindling of Agni for the day's first sacrifices.",
        establishment: "Savitar sets all things in motion, including the ritual kindling of fire each morning.",
        relevance: "Links cosmic stimulation with ritual action. Divine impulse initiates human worship."
      }
    ],

    aditi: [
      {
        deity: "Adityas",
        type: "Mother and Children",
        description: "Aditi is the mother of the Adityas (including Varuna, Mitra, Aryaman), representing boundless space and freedom.",
        establishment: "Aditi gave birth to the Adityas, who are often called 'sons of Aditi.' She represents the cosmic mother, infinite and all-containing.",
        relevance: "Shows the concept of divine lineage and how specific ordering principles (Adityas) emerge from infinite potential (Aditi)."
      },
      {
        deity: "Varuna",
        type: "Mother and Chief Son",
        description: "Varuna is the chief of Aditi's sons, embodying her boundless nature as cosmic law and order.",
        establishment: "Born from Aditi's infinite space, Varuna became the enforcer of boundaries within boundlessness.",
        relevance: "Shows paradox: infinite freedom (Aditi) requires limits (Varuna) to manifest as ordered cosmos."
      },
      {
        deity: "Indra",
        type: "Freedom and Protection",
        description: "Aditi's boundlessness provides the space Indra protects, linking infinite potential with active defense.",
        establishment: "Aditi's nature as unlimited space gives Indra his realm to defend against forces of chaos.",
        relevance: "Shows relationship between potential and actuality. Boundless space needs protection to remain free."
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
      },
      {
        deity: "Varuna",
        type: "Sky Dome and Ocean",
        description: "Dyaus forms the dome of heaven while Varuna governs the cosmic ocean, together encompassing all vertical space.",
        establishment: "Dyaus above, Varuna's ocean below - between them lies all existence.",
        relevance: "Shows vertical cosmic organization defining the limits within which life occurs."
      },
      {
        deity: "Agni",
        type: "Sky and Fire",
        description: "Dyaus is the source of celestial fire (lightning), which Agni brings to earth and maintains for humans.",
        establishment: "Lightning from Dyaus provided the first fire, which Agni domesticated for humanity.",
        relevance: "Traces fire's divine origin from sky to earth, connecting humans to celestial source."
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
      },
      {
        deity: "Parjanya",
        type: "Earth and Rain",
        description: "Parjanya's rain fertilizes Prithivi's soil, creating the sacred marriage of sky and earth that enables all growth.",
        establishment: "Rain from above meets earth below in the union that makes agriculture and life possible.",
        relevance: "Represents cosmic marriage through meteorology. Sky's water meets earth's soil to create fertility."
      },
      {
        deity: "Sarasvati",
        type: "Earth and River",
        description: "Sarasvati flows across Prithivi's surface, bringing water and life to the earth.",
        establishment: "Rivers (Sarasvati) carve channels through earth (Prithivi), creating landscapes and enabling civilization.",
        relevance: "Shows how water shapes earth. Rivers create the geography that enables human settlement."
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
      },
      {
        deity: "Varuna",
        type: "River and Law",
        description: "Sarasvati's course demonstrates Varuna's law - rivers flow within banks, following cosmic order (Rita).",
        establishment: "Varuna ensures rivers like Sarasvati stay their course, showing how physical law reflects cosmic law.",
        relevance: "Uses river as metaphor for Rita. Proper flow within boundaries demonstrates cosmic order in action."
      },
      {
        deity: "Soma",
        type: "Water and Filtering",
        description: "Sarasvati's pure waters filter and mix soma, purifying the offering before it reaches the gods.",
        establishment: "Sacred water from Sarasvati cleanses pressed soma and dilutes it to proper ritual strength.",
        relevance: "Shows how water purifies power. Pure water makes powerful soma suitable for divine consumption."
      },
      {
        deity: "Vak",
        type: "Flow and Speech",
        description: "Both Sarasvati and Vak are associated with flow - Sarasvati as flowing water, Vak as flowing speech.",
        establishment: "The connection between flowing water and flowing speech links expression to natural movement.",
        relevance: "Shows how speech flows like water, carrying meaning as rivers carry water. Eloquence is abundant, pure flow."
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
      },
      {
        deity: "Soma",
        type: "Prayer and Offering",
        description: "Brihaspati's mantras accompany soma offerings, giving them proper consecration and direction to the gods.",
        establishment: "Soma ritual requires correct speech (Brihaspati) alongside correct preparation to effectively convey offering.",
        relevance: "Shows ritual requires both material (soma) and immaterial (mantra). Physical and verbal actions unite."
      },
      {
        deity: "Varuna",
        type: "Speech and Law",
        description: "Brihaspati's ritual words must follow Varuna's cosmic law to be effective. Sacred speech requires cosmic order.",
        establishment: "Mantras work only when properly formulated (Brihaspati) and aligned with cosmic order (Varuna).",
        relevance: "Links ritual efficacy to cosmic law. Prayer succeeds when it harmonizes with universal order."
      },
      {
        deity: "Vak",
        type: "Sacred Speech",
        description: "Vak is speech as cosmic force; Brihaspati is skillful use of that force in ritual and prayer.",
        establishment: "Vak represents speech as power; Brihaspati represents expertise in wielding that power effectively.",
        relevance: "Distinguishes between speech as raw force (Vak) and speech as skillfully deployed tool (Brihaspati)."
      }
    ],

    aryaman: [
      {
        deity: "Mitra",
        type: "Social Harmony",
        description: "Aryaman governs hospitality and customs while Mitra governs contracts. Together they maintain social order.",
        establishment: "Both are Adityas who ensure proper social relations - Mitra through formal agreements, Aryaman through customs and hospitality.",
        relevance: "Shows how different aspects of social life are governed by different deities working toward the same end - harmonious society."
      },
      {
        deity: "Varuna",
        type: "Custom and Law",
        description: "Aryaman maintains social customs while Varuna maintains cosmic law, linking human tradition with divine order.",
        establishment: "Both enforce proper conduct - Aryaman through social expectation, Varuna through cosmic consequence.",
        relevance: "Shows how social norms reflect cosmic order. Human customs mirror divine law."
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
      },
      {
        deity: "Ribhus",
        type: "Master and Rivals",
        description: "The Ribhus, mortal craftsmen who became gods, eventually rivaled Tvashtar's skill through dedication.",
        establishment: "The Ribhus' legendary craftsmanship earned them divine status, creating friendly rivalry with Tvashtar.",
        relevance: "Shows that excellence can elevate mortals to divine status. Skill knows no inherent boundaries."
      },
      {
        deity: "Soma",
        type: "Creator's Inspiration",
        description: "Tvashtar partakes of soma to fuel his creative work and maintain his divine crafting power.",
        establishment: "Creating divine implements requires divine inspiration, which soma provides.",
        relevance: "Links creativity with inspiration. Even divine skill benefits from soma's mind-expanding properties."
      }
    ],

    yama: [
      {
        deity: "Agni",
        type: "Death and Cremation",
        description: "Yama rules the realm of the dead while Agni carries the deceased to that realm through cremation fire.",
        establishment: "Agni serves as the psychopomp, carrying souls through cremation smoke to Yama's kingdom.",
        relevance: "Shows the transition between life and death, with fire as the transformative bridge between worlds."
      },
      {
        deity: "Varuna",
        type: "Death and Life Judge",
        description: "Varuna judges the living while Yama judges the dead. Together they ensure justice across all states of existence.",
        establishment: "Varuna's domain is the living cosmos; Yama's the realm of ancestors. Justice operates in both.",
        relevance: "Shows moral accountability extends beyond death. Virtue and vice receive consequences in life and afterlife."
      },
      {
        deity: "Surya",
        type: "Light and Death",
        description: "Surya illuminates the path to Yama's realm, guiding the deceased to their final destination.",
        establishment: "The sun's rays create the path that souls follow to reach Yama's kingdom of the ancestors.",
        relevance: "Shows death as a journey requiring guidance. Even passage to the afterlife needs illumination."
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
      },
      {
        deity: "Soma",
        type: "Rain and Growth",
        description: "Parjanya's rain nourishes the mountains where soma grows, enabling the sacred plant's existence.",
        establishment: "Rain from Parjanya waters the high peaks where soma thrives, creating material basis for ritual offering.",
        relevance: "Links natural provision (rain) with ritual substance (soma). Divine action enables divine offering."
      },
      {
        deity: "Vayu",
        type: "Wind and Rain",
        description: "Vayu's winds carry Parjanya's rain clouds, distributing moisture across the world.",
        establishment: "Wind moves clouds, ensuring rain reaches all regions rather than falling in one place.",
        relevance: "Shows atmospheric cooperation. Rain needs wind for proper distribution across the land."
      }
    ],

    ratri: [
      {
        deity: "Ushas",
        type: "Night and Dawn Sisters",
        description: "Ratri (Night) and Ushas (Dawn) are sisters who alternate ruling the sky, representing complementary aspects of the daily cycle.",
        establishment: "Night gives way to dawn in eternal succession. They share the sky, taking turns ruling in perfect harmony.",
        relevance: "Shows the necessity of both rest (night) and activity (day). Darkness and light are equally essential."
      },
      {
        deity: "Varuna",
        type: "Night and Judgment",
        description: "Varuna's watchful eyes remain open even during Ratri, ensuring constant vigilance over moral order.",
        establishment: "While Ratri brings darkness and rest, Varuna's observation never sleeps. Night hides nothing from cosmic law.",
        relevance: "Establishes that moral accountability operates continuously. Darkness provides no cover from divine justice."
      },
      {
        deity: "Surya",
        type: "Night and Day",
        description: "Ratri rules when Surya departs; Surya returns when Ratri withdraws. They alternate in perfect rhythm.",
        establishment: "The daily cycle of sun's departure and return creates night (Ratri) and day (Surya).",
        relevance: "Shows cosmic rhythm and balance. Light and dark succeed each other in eternal pattern."
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
      },
      {
        deity: "Varuna",
        type: "Waters and Law",
        description: "Varuna governs the cosmic waters (Apas), ensuring they flow according to Rita (cosmic order).",
        establishment: "The Apas follow Varuna's law in their courses, never overstepping bounds unless Varuna permits.",
        relevance: "Shows how natural law (water flowing) reflects cosmic law. Physical order mirrors moral order."
      },
      {
        deity: "Agni",
        type: "Water and Fire",
        description: "Apas (Waters) and Agni represent opposing yet complementary forces essential for ritual and life.",
        establishment: "While water can quench fire, both are needed in ritual. Their interaction creates steam and transformation.",
        relevance: "Illustrates cosmic balance through opposition. Conflicting forces create dynamic equilibrium."
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
      },
      {
        deity: "Soma",
        type: "Craft and Vessel",
        description: "The Ribhus crafted divine vessels for soma offerings, combining their skill with soma's sacred purpose.",
        establishment: "Their miraculous craftsmanship created perfect cups and implements for soma ritual.",
        relevance: "Links container to content. Sacred substance requires sacred vessel; form and substance elevate each other."
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
      },
      {
        deity: "Agni",
        type: "Word and Fire",
        description: "Vak (Speech) and Agni together manifest divine will: Vak expresses intention, Agni executes transformation.",
        establishment: "Sacred speech requires sacred fire to carry meaning to the gods. Word and flame cooperate in ritual.",
        relevance: "Shows language and energy as complementary: speech conceptualizes, fire actualizes. Thought needs power to manifest."
      },
      {
        deity: "Varuna",
        type: "Speech and Truth",
        description: "Vak's speech must align with Varuna's truth (Rita) to be effective. False speech violates cosmic order.",
        establishment: "Varuna oversees the truthfulness of speech, ensuring words align with reality and cosmic law.",
        relevance: "Establishes that speech carries moral weight. Words must match truth to have power and avoid consequences."
      }
    ]
  };  // ← PROPERLY CLOSES the deityRelationships object!

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
