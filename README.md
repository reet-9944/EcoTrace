# EcoTrace - Carbon Footprint Awareness Platform

![EcoTrace Banner](https://via.placeholder.com/1200x400/52796f/ffffff?text=EcoTrace+-+Carbon+Footprint+Awareness)



EcoTrace is a smart, dynamic, and interactive platform designed to help users calculate, understand, and reduce their carbon footprint. Instead of a static, overwhelming form, EcoTrace uses a conversational "Smart Assistant" (EcoGuide) to contextually gather information about a user's daily habits across four major categories: Transportation, Diet, Energy, and Shopping.

## 🧠 Approach and Logic

### Dynamic Smart Assistant
The core of the application is a step-by-step interactive assistant. It presents questions sequentially, keeping the cognitive load low. 
- **Contextual Data Gathering**: As the user selects options (e.g., "Heavy Meat Eater" or "Public Transit"), the underlying state engine records the CO₂ emission value associated with that choice.
- **Smooth Transitions**: Built with `framer-motion`, the UI feels soothing, minimal, and premium, avoiding harsh "lightning-fast" jumps in favor of smooth fade-ins and satisfying hover states.

### Logical Decision Making
The calculation engine (`src/utils/footprintLogic.ts`) does more than just sum up numbers:
1. **Calculation**: It aggregates the total monthly CO₂ footprint based on the user's specific answers.
2. **Personalized Actionable Tips**: The engine analyzes the highest-impact areas. For instance, if the user scores high in Transportation but low in Diet, the system logically generates tips heavily weighted towards transit (e.g., Carpooling) rather than generic, irrelevant advice. Each tip is categorized by its potential impact (High, Medium, Low).

### Design Aesthetics
Following modern web design principles:
- **Earthy Palette**: Sage greens, soft creams, and warm grays to match the environmental theme.
- **Minimalist**: Clean typography (`Inter` font), ample whitespace, and glassmorphism elements (`glass-panel`).
- **Accessibility**: Semantic HTML and ARIA labels are used to ensure the platform is usable by everyone.

## 🚀 How it Works

1. **Start Assessment**: The user is greeted by the EcoGuide assistant.
2. **Answer Questions**: The user clicks through simple, icon-driven option cards detailing their habits.
3. **View Dashboard**: Upon completion, a comprehensive dashboard visualizes the data.
4. **Take Action**: The user is presented with high-impact, personalized recommendations to lower their footprint.

## 🛠️ Tech Stack & Setup
- **React 18**
- **TypeScript** (for type safety and clean architecture)
- **Vite** (for blazing fast builds)
- **Framer Motion** (for soothing animations)
- **Lucide React** (for crisp SVG icons)
- **Vanilla CSS** (for precise, lightweight styling)

### Running Locally
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Open the provided localhost link in your browser.

## 📝 Assumptions Made
- The emission values assigned to options (e.g., Car = 400kg CO₂/mo) are rough, relative approximations designed to demonstrate the logical engine's functionality rather than exact scientific measurements.
- A "monthly" timeframe is used for easier conceptualization by the average user.

