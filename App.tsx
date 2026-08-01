
import React, { useState, useCallback } from 'react';
import { SIDE_QUESTS } from './constants';

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center">
    <svg 
      className="animate-spin h-10 w-10 text-brand-accent mb-3" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      ></circle>
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <p className="text-lg text-brand-secondary-text">Summoning a new quest...</p>
  </div>
);

const App: React.FC = () => {
  const [currentQuest, setCurrentQuest] = useState<string>("Your next Sidequests awaits your command... Click below!");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNewQuest = useCallback(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      let newQuest = currentQuest;
      if (SIDE_QUESTS.length === 0) {
        newQuest = "The ancient scrolls are empty... no quests found!";
      } else if (SIDE_QUESTS.length === 1) {
        newQuest = SIDE_QUESTS[0];
      } else {
        let attempts = 0;
        const maxAttempts = SIDE_QUESTS.length * 2; 
        do {
          const randomIndex = Math.floor(Math.random() * SIDE_QUESTS.length);
          newQuest = SIDE_QUESTS[randomIndex];
          attempts++;
        } while (newQuest === currentQuest && attempts < maxAttempts);
      }
      setCurrentQuest(newQuest);
      setIsLoading(false);
    }, 700); // Simulate a brief delay for effect
  }, [currentQuest]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
      <header className="mb-10 sm:mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-title-from via-brand-title-via to-brand-title-to mb-3 tracking-tight">
          Sidequest Generator
        </h1>
        <p className="text-md sm:text-lg text-brand-secondary-text">Your next adventure is but a click away!</p>
      </header>

      <main className="w-full">
        <div 
          className={`bg-brand-card backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl min-h-[200px] sm:min-h-[240px] flex flex-col items-center justify-center text-center mb-10 sm:mb-12 transition-opacity duration-300 ease-in-out border border-brand-card-border ${isLoading ? 'opacity-60' : 'opacity-100'}`}
          aria-live="polite"
          role="region"
          aria-labelledby="quest-title"
        >
          <h2 id="quest-title" className="sr-only">Current Sidequest</h2>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <p className="text-xl sm:text-2xl text-brand-primary-text font-medium leading-relaxed animate-fadeIn">
              {currentQuest}
            </p>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={handleNewQuest}
            disabled={isLoading || SIDE_QUESTS.length === 0}
            className={`
              bg-gradient-to-r from-brand-accent via-amber-500 to-orange-500
              hover:from-brand-accent-dark hover:via-amber-600 hover:to-orange-600
              text-slate-900 
              font-bold py-3 sm:py-4 px-8 sm:px-10 text-lg sm:text-xl
              rounded-lg shadow-lg hover:shadow-xl 
              transform hover:scale-105 active:scale-95
              transition-all duration-200 ease-in-out 
              focus:outline-none focus:ring-4 focus:ring-brand-accent focus:ring-opacity-60
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md
            `}
          >
            {isLoading ? 'Conjuring...' : 'Start a New Sidequest'}
          </button>
        </div>
      </main>
      
      <footer className="mt-12 sm:mt-16 text-center">
        <p className="text-sm text-brand-secondary-text opacity-75">
          Powered by Earlskey.
        </p>
      </footer>
    </div>
  );
};

export default App;
