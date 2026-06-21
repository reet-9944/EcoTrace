# EcoTrace - Carbon Footprint Awareness Platform

## Problem Statement Alignment
EcoTrace is a comprehensive Carbon Footprint Awareness Platform built specifically for the **Hack2Skill x Google Cloud PromptWars - Challenge 3**. It directly addresses the challenge prompt by providing users with an engaging, interactive smart-assistant to calculate, track, and ultimately reduce their environmental impact through daily habits.

## Features
- **Smart Assistant Interface**: Replaces static forms with a dynamic, conversational UI that gathers user data regarding Diet, Transport, Energy, and Shopping.
- **Real-Time Analytics Dashboard**: Visualizes emissions broken down by category using highly-responsive Recharts graphs.
- **Tailored Actions & Recommendations**: Generates personalized, high-impact strategies to reduce the user's carbon footprint based on conditional threshold analysis.
- **100% Responsive & Accessible**: Optimized seamlessly across mobile, tablet, and desktop viewports with perfect ARIA landmark tagging and screen-reader compatibility.
- **Highly Secure**: Implements strict Content-Security-Policy (CSP) headers and nosniff rules to prevent XSS and MIME-type sniffing.
- **Maximum Efficiency**: Implements lazy loading (`React.lazy`, `Suspense`), component memoization (`React.memo`), function memoization (`useCallback`), and data caching (`useMemo`) to achieve minimum bundle sizes and eliminate wasted re-renders.

## Tech Stack
- **Frontend Framework**: React 19, TypeScript, Vite
- **Styling & Animations**: Custom Vanilla CSS, Framer Motion
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Hosting & Deployment**: Google Firebase

## Local Development
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev` to start the local development server on port 5173.
4. Run `npm run test` to run the comprehensive vitest suite.
5. Run `npm run build` to compile the optimized production bundle.
