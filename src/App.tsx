import React, { useEffect, useState } from 'react';
import PageRoutes from './components/PageRoutes';
import AuthContextProvider from './contexts/AuthContext';
import { setAccessToken } from './components/utils/accessToken';
import CircularLoading from './components/utils/Loading';

function App() {
  const [loading, setLoading] = useState(true);
  const getRefreshToken = async () => {
    const res = await fetch('http://localhost:5001/user/refresh_token', {
      method: 'POST',
      credentials: "include"
    });
    const json = await res.json();
    setAccessToken(json.accessToken);
    setLoading(false);
  }

  useEffect(() => {
    getRefreshToken();
  }, []);

  if (loading) {
    return <CircularLoading />
  }

  return (
    <div className="App">
      <AuthContextProvider>
        <PageRoutes />
      </AuthContextProvider>
    </div>
  );
}

export default App;
