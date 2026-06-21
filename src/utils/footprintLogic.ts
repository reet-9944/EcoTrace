/**
 * Represents the distinct categories of questions evaluated in the footprint calculation.
 */
export type QuestionId = 'transport' | 'diet' | 'energy' | 'shopping';

/**
 * Represents a single answer option for a question.
 */
export interface Answer {
  /** The descriptive text shown to the user */
  label: string;
  /** Estimated CO2 footprint in kg per month for this option */
  value: number;
  /** The Lucide icon name associated with this answer */
  icon?: string;
}

/**
 * Represents a footprint evaluation question.
 */
export interface Question {
  /** Unique identifier corresponding to the category */
  id: QuestionId;
  /** The main question text */
  title: string;
  /** Additional context explaining why this question matters */
  description: string;
  /** The list of selectable answers */
  options: Answer[];
}

export const questions: Question[] = [
  {
    id: 'transport',
    title: 'How do you usually commute?',
    description: 'Transportation is often the largest portion of an individual\'s carbon footprint.',
    options: [
      { label: 'Car (Gasoline)', value: 400, icon: 'Car' },
      { label: 'Public Transit', value: 100, icon: 'Bus' },
      { label: 'Bicycle / Walk', value: 0, icon: 'Bike' },
      { label: 'Electric Vehicle', value: 150, icon: 'CarFront' },
    ]
  },
  {
    id: 'diet',
    title: 'What best describes your diet?',
    description: 'Food production, especially meat, has a significant impact on emissions.',
    options: [
      { label: 'Heavy Meat Eater', value: 250, icon: 'Beef' },
      { label: 'Average', value: 180, icon: 'Utensils' },
      { label: 'Vegetarian', value: 100, icon: 'Carrot' },
      { label: 'Vegan', value: 70, icon: 'Leaf' },
    ]
  },
  {
    id: 'energy',
    title: 'How is your home powered?',
    description: 'Home energy use can be reduced by switching to renewables or improving efficiency.',
    options: [
      { label: 'Fossil Fuels (Grid)', value: 300, icon: 'Zap' },
      { label: 'Mixed Grid', value: 200, icon: 'Lightbulb' },
      { label: '100% Renewable', value: 50, icon: 'Sun' },
      { label: 'Off-grid Solar', value: 10, icon: 'BatteryFull' },
    ]
  },
  {
    id: 'shopping',
    title: 'What are your shopping habits?',
    description: 'Manufacturing and shipping new products consume substantial resources.',
    options: [
      { label: 'Frequent New Items', value: 200, icon: 'ShoppingBag' },
      { label: 'Average Consumer', value: 120, icon: 'ShoppingCart' },
      { label: 'Mostly Second-hand', value: 50, icon: 'Recycle' },
      { label: 'Minimalist', value: 20, icon: 'Package' },
    ]
  }
];

/**
 * Calculates the total estimated carbon footprint based on the provided answers.
 * 
 * @param answers - A record mapping each QuestionId to the selected CO2 value.
 * @returns The total estimated monthly CO2 footprint in kg.
 */
export const calculateTotal = (answers: Record<QuestionId, number>): number => {
  return Object.values(answers).reduce((sum, val) => sum + val, 0);
};

/**
 * Represents an actionable recommendation for the user.
 */
export interface Tip {
  /** The short, imperative title of the recommendation */
  title: string;
  /** A detailed explanation of why the action helps and how to do it */
  description: string;
  /** The relative impact level of making this change */
  impact: 'High' | 'Medium' | 'Low';
}

/**
 * Generates personalized, actionable tips based on the user's specific answers.
 * Analyzes threshold values for each category to provide relevant advice.
 * 
 * @param answers - A record mapping each QuestionId to the selected CO2 value.
 * @returns An array of targeted recommendations.
 */
export const getPersonalizedTips = (answers: Record<QuestionId, number>): Tip[] => {
  const tips: Tip[] = [];

  if (answers['transport'] >= 300) {
    tips.push({
      title: 'Consider Carpooling or Public Transit',
      description: 'Since you drive frequently, switching to transit or carpooling just 2 days a week can cut your transport footprint by 40%.',
      impact: 'High'
    });
  }

  if (answers['diet'] >= 180) {
    tips.push({
      title: 'Try Meatless Mondays',
      description: 'Swapping meat for plant-based alternatives once a week significantly reduces greenhouse gas emissions.',
      impact: 'Medium'
    });
  }

  if (answers['energy'] >= 200) {
    tips.push({
      title: 'Switch to an Energy Provider with Renewables',
      description: 'Check if your local utility offers a green energy program. It is often a simple switch with a huge impact.',
      impact: 'High'
    });
  }
  
  if (answers['shopping'] >= 120) {
      tips.push({
        title: 'Embrace Second-hand Shopping',
        description: 'Buying vintage or thrifted items reduces the demand for new manufacturing and saves items from landfills.',
        impact: 'Medium'
      });
  }

  // Fallback tip if they are doing great
  if (tips.length === 0) {
    tips.push({
      title: 'Share Your Knowledge',
      description: 'You are doing amazing! The best thing you can do now is educate others and advocate for systemic changes.',
      impact: 'Low'
    });
  }

  return tips;
};
