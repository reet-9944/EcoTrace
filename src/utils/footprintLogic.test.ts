import { expect, test, describe } from 'vitest';
import { calculateTotal, getPersonalizedTips } from './footprintLogic';

describe('footprintLogic validation', () => {
  test('calculateTotal correctly sums the footprint values', () => {
    const mockAnswers = {
      transport: 400,
      diet: 250,
      energy: 300,
      shopping: 200
    };
    
    const total = calculateTotal(mockAnswers);
    expect(total).toBe(1150);
  });

  test('getPersonalizedTips provides high impact tips for high values', () => {
    const mockAnswers = {
      transport: 400, // High
      diet: 70,       // Low (Vegan)
      energy: 50,     // Low (Renewable)
      shopping: 20    // Low (Minimalist)
    };
    
    const tips = getPersonalizedTips(mockAnswers);
    
    // We expect it to trigger the transport tip
    const transportTip = tips.find(t => t.title.includes('Carpooling or Public Transit'));
    expect(transportTip).toBeDefined();
    expect(transportTip?.impact).toBe('High');
    
    // Diet should not trigger
    const dietTip = tips.find(t => t.title.includes('Meatless Mondays'));
    expect(dietTip).toBeUndefined();
  });

  test('getPersonalizedTips provides fallback tip if everything is great', () => {
    const mockAnswers = {
      transport: 0,
      diet: 70,
      energy: 10,
      shopping: 20
    };
    
    const tips = getPersonalizedTips(mockAnswers);
    expect(tips.length).toBe(1);
    expect(tips[0].title).toBe('Share Your Knowledge');
    expect(tips[0].impact).toBe('Low');
  });
});
