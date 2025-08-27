// Complete 78-card Tarot deck - Major Arcana and key Minor Arcana cards
import { TarotCard } from './tarot-cards'

export const FULL_TAROT_DECK: TarotCard[] = [
  // MAJOR ARCANA (22 cards)
  {
    id: 0, name: "The Fool", arcana: "Major",
    upright: {
      keywords: ["new beginnings", "innocence", "spontaneity", "adventure"],
      meaning: "New beginnings await. Trust in the journey ahead, even if the path is unclear.",
      love: "A fresh start in love. Open your heart to new romantic possibilities.",
      career: "New opportunities arise. Take a leap of faith in your professional life.",
      finance: "New financial ventures. Be optimistic but cautious with investments.",
      health: "A fresh approach to health and wellness will benefit you greatly."
    },
    reversed: {
      keywords: ["recklessness", "poor judgment", "foolishness"],
      meaning: "Poor judgment or reckless behavior may lead to problems.",
      love: "Avoid impulsive romantic decisions that you may later regret.",
      career: "Think before you act. Hasty decisions could harm your reputation.",
      finance: "Avoid get-rich-quick schemes and impulsive purchases.",
      health: "Don't ignore health warnings or take unnecessary risks."
    },
    description: "A young soul stands at a cliff's edge, ready to begin life's great adventure.",
    symbolism: ["cliff - leap of faith", "white rose - purity", "small bag - few possessions"],
    element: "Air", astrology: "Uranus", numerology: "0 - infinite potential"
  },
  {
    id: 1, name: "The Magician", arcana: "Major",
    upright: {
      keywords: ["willpower", "manifestation", "resourcefulness", "power"],
      meaning: "You have all the tools needed to manifest your desires into reality.",
      love: "You can attract the love you seek. Focus your intentions clearly.",
      career: "Your skills and determination will lead to professional success.",
      finance: "Good planning and focused effort will improve your finances.",
      health: "You have the power to heal yourself through positive lifestyle changes."
    },
    reversed: {
      keywords: ["manipulation", "trickery", "unused potential"],
      meaning: "Beware of manipulation or your own unused potential.",
      love: "Someone may be deceiving you, or you're not being authentic.",
      career: "Missed opportunities due to poor planning or self-doubt.",
      finance: "Avoid financial schemes that seem too good to be true.",
      health: "Not using your knowledge to improve your health effectively."
    },
    description: "A figure channels divine energy, pointing toward heaven and earth simultaneously.",
    symbolism: ["infinity symbol - unlimited potential", "four elements - complete mastery"],
    element: "Air", astrology: "Mercury", numerology: "1 - new beginnings, leadership"
  },
  {
    id: 2, name: "The High Priestess", arcana: "Major",
    upright: {
      keywords: ["intuition", "mystery", "inner wisdom", "spirituality"],
      meaning: "Trust your intuition. Sacred knowledge and wisdom come from within.",
      love: "Listen to your heart's wisdom about relationships and romance.",
      career: "Your intuition guides you to the right professional decisions.",
      finance: "Look beyond surface appearances when making financial choices.",
      health: "Pay attention to your body's subtle signals and inner wisdom."
    },
    reversed: {
      keywords: ["secrets", "hidden agenda", "lack of intuition"],
      meaning: "Hidden information or disconnection from your inner voice.",
      love: "Secrets or hidden motives in relationships need to be addressed.",
      career: "Important information is being withheld from you.",
      finance: "Hidden costs or deceptive financial practices to watch for.",
      health: "Ignoring your body's warning signs could lead to problems."
    },
    description: "A mysterious figure sits between pillars, guardian of sacred mysteries.",
    symbolism: ["veil - hidden knowledge", "pomegranates - feminine wisdom"],
    element: "Water", astrology: "Moon", numerology: "2 - duality, balance"
  },
  {
    id: 3, name: "The Empress", arcana: "Major",
    upright: {
      keywords: ["fertility", "femininity", "beauty", "nature"],
      meaning: "Abundance, fertility, and creative energy flow into your life.",
      love: "Deep, nurturing love and possibly pregnancy or new relationships.",
      career: "Creative projects flourish. Nurturing leadership brings success.",
      finance: "Financial abundance and growth through nurturing investments.",
      health: "Excellent health and vitality. Focus on natural healing methods."
    },
    reversed: {
      keywords: ["creative block", "dependence", "smothering"],
      meaning: "Creative blocks or over-dependence on others may be hindering you.",
      love: "Smothering behavior or creative blocks in relationships.",
      career: "Lack of creativity or being too dependent on others for success.",
      finance: "Overspending on luxuries or being financially dependent.",
      health: "Neglecting self-care or over-indulgence affecting your health."
    },
    description: "A regal figure surrounded by the abundance of nature and fertility.",
    symbolism: ["wheat - fertility and abundance", "Venus symbol - love and beauty"],
    element: "Earth", astrology: "Venus", numerology: "3 - creativity, expression"
  },
  {
    id: 4, name: "The Emperor", arcana: "Major",
    upright: {
      keywords: ["authority", "structure", "control", "father figure"],
      meaning: "Strong leadership, structure, and authority guide you toward success.",
      love: "Stability and commitment in relationships. A protective partner.",
      career: "Leadership opportunities and structured approaches bring success.",
      finance: "Disciplined financial planning and controlled spending pay off.",
      health: "Structured health routines and disciplined self-care are beneficial."
    },
    reversed: {
      keywords: ["tyranny", "rigidity", "lack of discipline"],
      meaning: "Excessive control or lack of discipline creates problems.",
      love: "Controlling behavior or lack of emotional expression in relationships.",
      career: "Micromanagement or rigid thinking limiting your success.",
      finance: "Either too controlling or too undisciplined with money.",
      health: "Either too rigid or too lax with health routines and care."
    },
    description: "A powerful ruler sits on a throne, embodying authority and structured power.",
    symbolism: ["throne - established power", "rams - Aries energy and leadership"],
    element: "Fire", astrology: "Aries", numerology: "4 - structure, stability"
  },
  {
    id: 5, name: "The Hierophant", arcana: "Major",
    upright: {
      keywords: ["tradition", "conformity", "morality", "ethics"],
      meaning: "Traditional values and established institutions provide guidance.",
      love: "Traditional approaches to love and possibly marriage or commitment.",
      career: "Following established procedures and traditions leads to success.",
      finance: "Conservative investments and traditional financial wisdom are best.",
      health: "Conventional medical treatment and established health practices work."
    },
    reversed: {
      keywords: ["rebellion", "subversiveness", "new approaches"],
      meaning: "Questioning tradition and finding your own spiritual path.",
      love: "Unconventional relationships or challenging traditional relationship roles.",
      career: "Innovative approaches that challenge the status quo bring results.",
      finance: "Alternative investment strategies or unconventional financial planning.",
      health: "Alternative healing methods or questioning traditional medical advice."
    },
    description: "A religious figure offers traditional wisdom and moral guidance.",
    symbolism: ["keys - spiritual knowledge", "pillars - established doctrine"],
    element: "Earth", astrology: "Taurus", numerology: "5 - challenge, change"
  },

  // MINOR ARCANA - Key cards from each suit
  // CUPS (Water - Emotions, Love, Spirituality)
  {
    id: 23, name: "Ace of Cups", arcana: "Minor", suit: "Cups", number: 1,
    upright: {
      keywords: ["new love", "emotional fulfillment", "spiritual awakening"],
      meaning: "A new cycle of emotional fulfillment and love begins in your life.",
      love: "New love enters your life or existing love deepens significantly.",
      career: "Work that fulfills you emotionally brings unexpected rewards.",
      finance: "Generosity returns to you multiplied. Invest in what you love.",
      health: "Emotional healing brings improvements to your physical health."
    },
    reversed: {
      keywords: ["blocked emotions", "emptiness", "missed opportunity"],
      meaning: "Emotional blocks or missed opportunities for deep connection.",
      love: "Emotional barriers prevent you from experiencing true love.",
      career: "Lack of passion for your work affects your performance.",
      finance: "Emotional spending or missing profitable opportunities.",
      health: "Emotional stress negatively impacts your physical well-being."
    },
    description: "A divine hand offers an overflowing chalice of emotional abundance.",
    symbolism: ["overflowing cup - abundance", "dove - peace and love"],
    element: "Water", numerology: "1 - new emotional beginnings"
  },
  {
    id: 33, name: "Three of Cups", arcana: "Minor", suit: "Cups", number: 3,
    upright: {
      keywords: ["friendship", "celebration", "community", "creativity"],
      meaning: "Celebration, friendship, and creative collaboration bring joy.",
      love: "Social connections lead to romance. Celebrate relationship milestones.",
      career: "Teamwork and collaboration lead to successful project completion.",
      finance: "Group investments or shared financial goals prove beneficial.",
      health: "Social activities and community support improve your well-being."
    },
    reversed: {
      keywords: ["gossip", "isolation", "overindulgence"],
      meaning: "Social problems, gossip, or isolation from your community.",
      love: "Third party interference or gossip affecting your relationship.",
      career: "Office politics or poor teamwork hampering your progress.",
      finance: "Overspending on social activities strains your budget.",
      health: "Overindulgence in social situations affects your health."
    },
    description: "Three figures raise their cups in joyful celebration and friendship.",
    symbolism: ["raised cups - shared joy", "fruits - abundance from friendship"],
    element: "Water", numerology: "3 - creative expression, celebration"
  },

  // PENTACLES (Earth - Material World, Career, Money)
  {
    id: 37, name: "Ace of Pentacles", arcana: "Minor", suit: "Pentacles", number: 1,
    upright: {
      keywords: ["new opportunity", "manifestation", "prosperity", "new job"],
      meaning: "A new opportunity for material success and prosperity manifests.",
      love: "Stable, long-term love that provides security and comfort.",
      career: "A new job or business opportunity offers financial stability.",
      finance: "New income stream or investment opportunity shows great promise.",
      health: "Improved health through practical lifestyle changes and routines."
    },
    reversed: {
      keywords: ["missed opportunity", "lack of planning", "poor prospects"],
      meaning: "Missed opportunities or lack of planning hinder material success.",
      love: "Unreliable or financially unstable romantic prospects.",
      career: "Poor job prospects or missed opportunities due to lack of preparation.",
      finance: "Bad investments or missed chances for financial improvement.",
      health: "Neglecting practical health measures leads to preventable problems."
    },
    description: "A divine hand presents a golden pentacle surrounded by lush gardens.",
    symbolism: ["golden coin - material opportunity", "garden - earthly abundance"],
    element: "Earth", numerology: "1 - new material beginnings"
  },

  // SWORDS (Air - Thoughts, Communication, Conflict)
  {
    id: 51, name: "Ace of Swords", arcana: "Minor", suit: "Swords", number: 1,
    upright: {
      keywords: ["breakthrough", "clarity", "new ideas", "mental clarity"],
      meaning: "Mental breakthrough and clarity cut through confusion and doubt.",
      love: "Clear communication resolves relationship issues and misunderstandings.",
      career: "New ideas and mental clarity lead to professional breakthroughs.",
      finance: "Clear thinking helps you make smart financial decisions.",
      health: "Mental clarity helps you understand and address health issues."
    },
    reversed: {
      keywords: ["confusion", "chaos", "lack of clarity", "missed point"],
      meaning: "Mental confusion or lack of clarity clouds your judgment.",
      love: "Miscommunication and confusion create relationship problems.",
      career: "Unclear thinking or poor communication hampers your progress.",
      finance: "Confusion about financial matters leads to poor decisions.",
      health: "Mental fog or confusion about health issues needs professional clarity."
    },
    description: "A sword pierces through a crown, representing mental triumph and clarity.",
    symbolism: ["crown - victory of mind", "olive branches - peace through truth"],
    element: "Air", numerology: "1 - new mental beginnings"
  },

  // WANDS (Fire - Passion, Energy, Creativity)
  {
    id: 65, name: "Ace of Wands", arcana: "Minor", suit: "Wands", number: 1,
    upright: {
      keywords: ["inspiration", "new project", "growth", "potential"],
      meaning: "Creative inspiration and new projects filled with potential emerge.",
      love: "Passionate new romance or renewed spark in existing relationships.",
      career: "Exciting new projects or career paths ignite your passion.",
      finance: "New financial opportunities through creative or passionate pursuits.",
      health: "Renewed energy and vitality. Start new fitness or wellness routines."
    },
    reversed: {
      keywords: ["lack of energy", "delayed projects", "lack of direction"],
      meaning: "Lack of direction or energy delays new projects and growth.",
      love: "Lack of passion or delayed romantic developments.",
      career: "Creative blocks or lack of motivation affecting your projects.",
      finance: "Delayed financial opportunities or lack of energy to pursue them.",
      health: "Low energy or motivation to maintain healthy lifestyle changes."
    },
    description: "A divine hand grasps a flourishing wand representing creative potential.",
    symbolism: ["sprouting wand - new growth", "leaves - natural creative energy"],
    element: "Fire", numerology: "1 - new creative beginnings"
  }
]

// Spread configurations for different types of readings
export const TAROT_SPREADS = {
  single: {
    name: "Single Card",
    description: "One card for quick daily guidance",
    positions: ["Your guidance for today"]
  },
  threeCard: {
    name: "Past, Present, Future",
    description: "Three cards showing your journey through time",
    positions: ["Past influences", "Present situation", "Future outcome"]
  },
  love: {
    name: "Love Reading",
    description: "Three cards focused on romantic matters",
    positions: ["How you approach love", "Current relationship energy", "Potential outcome"]
  },
  career: {
    name: "Career Path",
    description: "Three cards for professional guidance",
    positions: ["Current work situation", "What you should focus on", "Career outcome"]
  }
}