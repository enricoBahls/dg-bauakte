import React from "react";
import logo from "./logo.svg";
import "./App.css";
import StepperFile from "./components/stepper_file";
import { AppBar, Toolbar, IconButton, Step } from "@material-ui/core";
import CreateNewFolder from "@material-ui/icons/CreateNewFolderOutlined";
import Map from "@material-ui/icons/Map";
import GeoSearch from "./components/search";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" href="/new">
            <CreateNewFolder />
          </IconButton>
          <IconButton edge="start" href="/search">
            <Map />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Router>
        <Switch>
          <Route path="/new" component={StepperFile} exact />

          <Route path="/search" component={GeoSearch} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
