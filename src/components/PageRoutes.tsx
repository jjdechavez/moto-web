import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// import lazyImport from "./lazyImport";
import Dashboard from "./pages/dashboard";
import Cookie from "./pages/Cookie";
import Login from "./authentication/Login";
import ProtectedProviderRoute from "./utils/ProtectedProviderRoute";
import ProtectedRoute from "./utils/ProtectedRoutes";
import ItemContextProvider from "../contexts/dashboard/ItemContext";
import Checkout from "./pages/dashboard/Checkout";
import Header from "./pages/dashboard/Header";
import { getAccessToken } from "./utils/accessToken";
import { About } from "./pages/dashboard/About";
import { AuthContext } from "../contexts/AuthContext";

// const Login = lazyImport("./authentication/Login");
// const Dashboard = lazyImport("./dashboard");
// const ProtectedRoute = lazyImport("./utils/ProtectedRoutes");

const PageRoutes = (): JSX.Element => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;
  const token = getAccessToken();

  return (
    // <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <div>
          {token && user && <Header />}
          <Switch>
            <ProtectedProviderRoute exact path="/" provider={ItemContextProvider} component={Dashboard} />
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/checkout" component={Checkout} />
            <ProtectedRoute path="/about" component={About} />
            <Route path="/cookie" component={Cookie} />
          </Switch>
        </div>
      </Router>
    // </Suspense>
  );
}

export default PageRoutes;