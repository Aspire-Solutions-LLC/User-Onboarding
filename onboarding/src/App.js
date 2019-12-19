import React from 'react';
import { Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm'
import OnboardingForm from './components/OnboardingForm'



function App() {
  return (
    <div className="App">
      
      <Route path="/register" component={RegistrationForm} />
      <Route path="/onboarding" component={OnboardingForm} />
    </div>
  );
}

export default App;
