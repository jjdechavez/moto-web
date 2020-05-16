import React from 'react';
import PageRoutes from './components/PageRoutes';
import AuthContextProvider from './contexts/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <PageRoutes />
      </AuthContextProvider>
    </div>
  );
}

export default App;
