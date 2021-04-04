import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalProvider } from "./Context/GlobalState";

import Header from './Components/Header'
import Footer from './Components/Footer'
import Projects from "./Components/Projects";
import ProjectDetails from "./Components/ProjectDetails";

const App = () => {
  return (
    <GlobalProvider>
      <Router>
      <Header />
        <Container>
          
          <Switch>
            <Route path="/" component={Projects} exact></Route>
            <Route path="/project/:id" component={ProjectDetails} exact></Route>
            <Projects />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </GlobalProvider>
  );
};

export default App;
