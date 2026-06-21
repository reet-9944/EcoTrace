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

  test('getPersonalizedTips provides medium impact tip for diet', () => {
    const mockAnswers = {
      transport: 100, // Low
      diet: 180,      // Medium
      energy: 50,     // Low
      shopping: 20    // Low
    };
    
    const tips = getPersonalizedTips(mockAnswers);
    const dietTip = tips.find(t => t.title.includes('Meatless Mondays'));
    expect(dietTip).toBeDefined();
    expect(dietTip?.impact).toBe('Medium');
  });

  test('getPersonalizedTips provides high impact tip for energy', () => {
    const mockAnswers = {
      transport: 100, // Low
      diet: 100,      // Low
      energy: 200,    // High
      shopping: 20    // Low
    };
    
    const tips = getPersonalizedTips(mockAnswers);
    const energyTip = tips.find(t => t.title.includes('Energy Provider with Renewables'));
    expect(energyTip).toBeDefined();
    expect(energyTip?.impact).toBe('High');
  });

  test('getPersonalizedTips provides medium impact tip for shopping', () => {
    const mockAnswers = {
      transport: 100, // Low
      diet: 100,      // Low
      energy: 50,     // Low
      shopping: 120   // Medium
    };
    
    const tips = getPersonalizedTips(mockAnswers);
    const shoppingTip = tips.find(t => t.title.includes('Second-hand Shopping'));
    expect(shoppingTip).toBeDefined();
    expect(shoppingTip?.impact).toBe('Medium');
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
