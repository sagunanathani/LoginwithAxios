import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { AuthContext } from "./Components/Auth";
import Home from "./Components/Home";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";

const App=()=>{
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem("logintokens") || ""
  );
  const setTokens = (data) => {
    localStorage.setItem("logintokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  console.log("Successfully setAuthTokens", authTokens);

  const handleLogout = () => {
    localStorage.removeItem("logintokens");
    setAuthTokens("");
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
        <h1> Login with axios </h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {authTokens ? (
                <Link onClick={handleLogout}> Logout </Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
