import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../utils/footprintLogic';
import type { QuestionId } from '../utils/footprintLogic';
import { ArrowLeft, Leaf, Car, Bus, Bike, CarFront, Beef, Utensils, Carrot, Zap, Lightbulb, Sun, BatteryFull, ShoppingBag, ShoppingCart, Recycle, Package } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Car: <Car size={24} />,
  Bus: <Bus size={24} />,
  Bike: <Bike size={24} />,
  CarFront: <CarFront size={24} />,
  Beef: <Beef size={24} />,
  Utensils: <Utensils size={24} />,
  Carrot: <Carrot size={24} />,
  Leaf: <Leaf size={24} />,
  Zap: <Zap size={24} />,
  Lightbulb: <Lightbulb size={24} />,
  Sun: <Sun size={24} />,
  BatteryFull: <BatteryFull size={24} />,
  ShoppingBag: <ShoppingBag size={24} />,
  ShoppingCart: <ShoppingCart size={24} />,
  Recycle: <Recycle size={24} />,
  Package: <Package size={24} />
};

interface SmartAssistantProps {
  onComplete: (answers: Record<QuestionId, number>) => void;
}

/**
 * SmartAssistant component guides the user through the footprint questions.
 */
export const SmartAssistant: React.FC<SmartAssistantProps> = memo(({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<QuestionId, number>>>({});

  const question = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;

  const handleSelect = useCallback((value: number) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);
    
    if (isLastStep) {
      onComplete(newAnswers as Record<QuestionId, number>);
    } else {
      setTimeout(() => setCurrentStep(curr => curr + 1), 350);
    }
  }, [answers, question.id, isLastStep, onComplete]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
    }
  }, [currentStep]);

  const progress = ((currentStep) / questions.length) * 100;

  return (
    <div className="glass-panel" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--panel-padding)', maxWidth: '650px', margin: '0 auto', width: '100%' }}>
      
      {/* Header & Progress */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          {currentStep > 0 ? (
            <button 
              onClick={handleBack} 
              aria-label="Go to previous step"
              data-testid="back-button"
              style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-muted)', gap: '0.5rem', fontWeight: 500, transition: 'color 0.2s' }} 
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} 
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
            >
              <ArrowLeft size={18} aria-hidden="true" /> Back
            </button>
          ) : (
            <div />
          )}
          <span style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-accent)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>
            <Leaf size={18} /> EcoGuide
          </span>
        </div>
        
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p style={{ textAlign: 'right', fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '0.75rem', fontWeight: 500 }}>
          Step {currentStep + 1} of {questions.length}
        </p>
      </div>

      {/* Question Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 30, filter: 'blur(4px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <h2 className="gradient-text" style={{ fontSize: '1.8rem', marginBottom: '0.75rem', fontWeight: 700 }}>
            {question.title}
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', marginBottom: '2.5rem' }}>
            {question.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.25rem' }}>
            {question.options.map((option, idx) => {
              const isSelected = answers[question.id] === option.value;
              return (
                <button
                  key={idx}
                  className={`option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(option.value)}
                  aria-pressed={isSelected}
                  aria-label={`Select option: ${option.label}`}
                  data-testid={`option-${option.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div style={{ 
                    color: isSelected ? 'var(--color-primary)' : 'var(--color-text-muted)', 
                    marginBottom: '0.75rem',
                    background: isSelected ? 'rgba(45, 106, 79, 0.1)' : 'var(--color-bg)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-full)',
                    transition: 'all 0.3s ease'
                  }}>
                    {option.icon && iconMap[option.icon]}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '1.05rem', color: isSelected ? 'var(--color-primary)' : 'var(--color-text)' }}>{option.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
});

