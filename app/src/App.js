import React, { useState, useEffect } from 'react';
import Welcome from './Welcome';
import MainMenu from './MainMenu';
import './App.css';

const handleAnimationComplete = () => {
  const elements = document.querySelectorAll('[data-name="mojs-shape"]');
  elements.forEach((element) => {
    element.style.display = 'none';
  });
};

const App = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const animationDuration = 2000;
    const timeout = setTimeout(() => {
      setShowAnimation(false);
      handleAnimationComplete(); 
    }, animationDuration);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="App">
      {showAnimation ? (
        <div className="animation">
          <Welcome onAnimationComplete={handleAnimationComplete} />
        </div>
      ) : (
        <MainMenu />
      )}
    </div>
  );
};

export default App;