import React from 'react';
import '../style/index.scss';
import Login from './Login'
import Register from './Register'
import Profile from './Profile'

function App() {
  return (
    <div className="container">
      NutriApp
      <Profile />
    </div>
  );
}

export default App;
