import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const SmartAssistant = lazy(() => import('./components/SmartAssistant').then(m => ({ default: m.SmartAssistant })));
const Dashboard = lazy(() => import('./components/Dashboard').then(m => ({ default: m.Dashboard })));
import type { QuestionId } from './utils/footprintLogic';
import { Leaf } from 'lucide-react';

function App(): React.ReactElement {
  const [answers, setAnswers] = useState<Record<QuestionId, number> | null>(null);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <header role="banner" style={{ padding: 'var(--header-padding)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-primary)' }}>
          <Leaf size={28} />
          <h1 style={{ fontSize: '1.25rem', fontWeight: 600 }}>EcoTrace</h1>
        </div>
        <nav role="navigation" style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-muted)' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Resources</a>
        </nav>
      </header>

      {/* Main Content */}
      <main role="main" style={{ flex: 1, padding: 'var(--panel-padding) 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          {!answers ? (
            <motion.div
              key="assistant"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%' }}
            >
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: 'var(--title-size)', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1rem' }}>
                  Discover Your Impact.
                </h2>
                <p style={{ fontSize: '1.125rem', color: 'var(--color-text-muted)', maxWidth: '500px', margin: '0 auto' }}>
                  Let our smart assistant guide you through a quick assessment of your carbon footprint, and get personalized tips to reduce it.
                </p>
              </div>
              
              <Suspense fallback={<div style={{ textAlign: 'center', color: 'var(--color-primary)', padding: '2rem' }}>Loading...</div>}>
                <SmartAssistant onComplete={(res) => setAnswers(res)} />
              </Suspense>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%' }}
            >
              <Suspense fallback={<div style={{ textAlign: 'center', color: 'var(--color-primary)', padding: '2rem' }}>Analyzing...</div>}>
                <Dashboard answers={answers} onReset={() => setAnswers(null)} />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer role="contentinfo" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.875rem', borderTop: '1px solid var(--color-border)' }}>
        <p>© {new Date().getFullYear()} EcoTrace Carbon Footprint Awareness Platform.</p>
      </footer>
    </div>
  );
}

export default App;
