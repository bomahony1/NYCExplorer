
import './App.css';
import MainMenu from './MainMenu';
import React, { useState, useEffect } from 'react';
import Welcome from '../Welcome';


function App() {

  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
   
    const animationDuration = 3000; //
    const timeout = setTimeout(() => {
      setShowAnimation(false);
    }, animationDuration);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="App">
      {showAnimation ? (
        <div className="animation">
          {/* 在此处插入您的动画组件 */}
          < Welcome />
        </div>
      ) : (
        // return to mainmenu
        <MainMenu />
      )}
    </div>
  );
}

export default App;


// test for  backend connect

// class connectionExample extends React.Component {
//   componentDidMount() {
//     // Complete the end point here e.g. api/hotels, api/events
//     const apiUrl = 'http://127.0.0.1:8000/api/restaurants';
//     fetch(apiUrl)
//       .then((response) => response.json())
//       .then((data) => console.log(data));
//   }
//   render() {
    
//     return (
//     <div className="App">
//       <MainMenu></MainMenu>
//     </div>
//   );
    
//   }
// }
// export default connectionExample;

