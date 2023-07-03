import React from 'react';

class connectionExample extends React.Component {
  componentDidMount() {
    // Complete the end point here e.g. api/hotels, api/events
    const apiUrl = 'http://127.0.0.1:8000/api/restaurants';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
  render() {
    return <div>Example Connection</div>
  }
}
export default connectionExample;



// import './App.css';
// import MainMenu from './MainMenu';


// function App() {
//   return (
//     <div className="App">
//       <MainMenu></MainMenu>
//     </div>
//   );
// }

// export default App;
