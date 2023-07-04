
import React, { useState, useEffect } from 'react';
import Welcome from './Welcome';
import MainMenu from './MainMenu';
import './App.css';

const App = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const animationDuration = 2000;
    const timeout = setTimeout(() => {
      setShowAnimation(false);
      handleAnimationComplete(); // Call the function when the animation is completed
    }, animationDuration);

    return () => clearTimeout(timeout);
  }, []);

  const handleAnimationComplete = () => {
    const elements = document.querySelectorAll('[data-name="mojs-shape"]');
    elements.forEach((element) => {
      element.style.display = 'none';
    });
  };

  return (
    <div className="App">
      {showAnimation ? (
        <div className="animation">
          {/* <Welcome /> will handle animationFinished internally */}
          <Welcome onAnimationComplete={handleAnimationComplete} />
        </div>
      ) : (
        // Show the MainMenu component after the animation has finished
        <MainMenu />
      )}
    </div>
  );
};

export default App;

