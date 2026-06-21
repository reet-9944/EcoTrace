import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { calculateTotal, getPersonalizedTips } from '../utils/footprintLogic';
import type { QuestionId } from '../utils/footprintLogic';
import { RefreshCw, Lightbulb } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  answers: Record<QuestionId, number>;
  onReset: () => void;
}

const COLORS = {
  transport: '#2d6a4f',
  diet: '#40916c',
  energy: '#52b788',
  shopping: '#74c69d'
};

/**
 * Dashboard component visualizes footprint data and provides recommendations.
 */
export const Dashboard: React.FC<DashboardProps> = memo(({ answers, onReset }) => {
  const totalFootprint = calculateTotal(answers);
  const tips = getPersonalizedTips(answers);

  const data = Object.entries(answers).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    color: COLORS[key as keyof typeof COLORS] || '#74c69d'
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-panel" 
      style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--panel-padding)', maxWidth: '1000px', margin: '0 auto', width: '100%' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="gradient-text" style={{ fontSize: 'var(--title-size)', marginBottom: '1rem', fontWeight: 800 }}>Your Footprint Analysis</h2>
        <div aria-live="polite" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.75rem', color: 'var(--color-primary)', flexWrap: 'wrap' }}>
          <motion.span 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5, delay: 0.3 }}
            style={{ fontSize: 'var(--score-size)', fontWeight: 800, lineHeight: 1 }}
            data-testid="total-score"
          >
            {totalFootprint}
          </motion.span>
          <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>kg CO₂ / mo</span>
        </div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
          {totalFootprint < 300 ? 'Incredible! You are leading the way towards a sustainable future.' : 
           totalFootprint < 600 ? 'You are doing great, but there is still room to optimize your impact.' : 
           'Your footprint is above average. Check our tailored recommendations below to lower it.'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'var(--gap-large)' }}>
        
        {/* Breakdown Chart */}
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700 }}>
             Emission Sources
          </h3>
          <div style={{ height: 320, width: '100%', padding: '1rem 0', background: 'var(--color-surface-solid)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 20, left: -25, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--color-text-muted)', fontWeight: 600, fontSize: 11 }} 
                  dy={10} 
                  dx={-5}
                  interval={0} 
                  angle={-45}
                  textAnchor="end"
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} dx={-10} />
                <Tooltip 
                  cursor={{ fill: 'rgba(45, 106, 79, 0.05)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={1500}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Actionable Tips */}
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700 }}>
            <Lightbulb size={24} color="var(--color-primary)" /> Tailored Actions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {tips.map((tip, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (idx * 0.15), type: 'spring' }}
                style={{ 
                  backgroundColor: 'var(--color-surface-solid)', 
                  border: '1px solid var(--color-border)',
                  borderLeft: `4px solid ${tip.impact === 'High' ? 'var(--color-danger)' : tip.impact === 'Medium' ? '#f59e0b' : 'var(--color-success)'}`,
                  padding: '1.5rem', 
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: '1.1rem' }}>{tip.title}</h4>
                  <span 
                    aria-label={`Impact level: ${tip.impact}`}
                    style={{ 
                      fontSize: '0.75rem', 
                      padding: '0.3rem 0.75rem', 
                      borderRadius: 'var(--radius-full)', 
                      backgroundColor: tip.impact === 'High' ? 'var(--color-danger-bg)' : tip.impact === 'Medium' ? '#fef3c7' : '#e6f4ea',
                      color: tip.impact === 'High' ? 'var(--color-danger)' : tip.impact === 'Medium' ? '#b45309' : 'var(--color-success)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                    {tip.impact}
                  </span>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <button 
          onClick={onReset} 
          className="btn-primary" 
          style={{ padding: '1rem 2rem' }}
          aria-label="Recalculate footprint from the beginning"
          data-testid="recalculate-button"
        >
          <RefreshCw size={20} aria-hidden="true" /> Recalculate Footprint
        </button>
      </div>
    </motion.div>
  );
});

