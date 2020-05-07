import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import lazyImport from "./lazyImport";

const Login = lazyImport("./authentication/Login");
const Dashboard = lazyImport("./dashboard");

const PageRoutes = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/login"><Login /></Route>
            </Switch>
          </div>
        </Router>
      </Suspense>
    );
}

export default PageRoutes;