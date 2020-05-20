import React, { useEffect, useState } from 'react';
import PageRoutes from './components/PageRoutes';
import AuthContextProvider from './contexts/AuthContext';
import { setAccessToken } from './components/utils/accessToken';
import CircularLoading from './components/utils/Loading';
import { changePort } from './actions/AuthActions';

function App() {
  const [loading, setLoading] = useState(true);
  const getRefreshToken = async () => {
    const res = await fetch(`http://localhost:${changePort}/user/refresh_token`, {
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

// install jwt-decode. 
// getAccessToken. !token return true
// check the token if expired by Date.now() >= exp_token * 1000 return false : true - inside on trycatch catch return false
// token not valid requestNew accesstoken

export default App;
