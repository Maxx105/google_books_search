import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Saved from "./pages/Saved";
import Search from "./pages/Search";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <Router>
        <div>
          <Nav/>
          <Wrapper className="container-fluid">
            <Header/>
            <Switch>
              <Route exact path="/" component={Search} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/saved" component={Saved} />
              <Route path="*" component={NoMatch} />
            </Switch>
          </Wrapper>
        </div>
      </Router>
  );
}


export default App;
