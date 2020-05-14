import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import lazyImport from "./lazyImport";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Dashboard from "./pages/dashboard";
import Cookie from "./pages/Cookie";
import Login from "./authentication/Login";
import LoginContextProvider from "../contexts/LoginContext";

// const Login = lazyImport("./authentication/Login");
// const Dashboard = lazyImport("./dashboard");
// const ProtectedRoute = lazyImport("./utils/ProtectedRoutes");

const PageRoutes = (): JSX.Element => {
    return (
      // <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <div>
            {/* <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul> */}
            <Switch>
              <ProtectedRoutes exact path="/" component={Dashboard} />
              <LoginContextProvider>
                <Route path="/login" component={Login}></Route>
              </LoginContextProvider>
              <Route path="/cookie" component={Cookie}></Route>
            </Switch>
          </div>
        </Router>
      // </Suspense>
    );
}

export default PageRoutes;