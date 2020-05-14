import React from 'react';
import PageRoutes from './components/PageRoutes';
import ItemContextProvider from './contexts/dashboard/ItemContext';

function App() {
  return (
    <div className="App">
      <ItemContextProvider>
        <PageRoutes />
      </ItemContextProvider>
    </div>
  );
}

export default App;
