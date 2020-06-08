import React, { useState,useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Upload from "./components/upload";
import { AppBar, Toolbar, IconButton, Step } from "@material-ui/core";
import CreateNewFolder from "@material-ui/icons/CreateNewFolderOutlined";
import Map from "@material-ui/icons/Map";
import ExitToApp from "@material-ui/icons/ExitToApp";
import GeoSearch from "./components/search";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import SearchByAddress from "./components/geoAdress";


import Login from "./components/login";

function App() {
  const [position, setPosition] = useState([51.505, -0.09]);

  const handlePositionSelect = (position) => {
    console.log(position);
    setPosition(position);
  };

 

  const logOut = () =>
  {
    localStorage.removeItem ('hyplogin');
     
  }

  return (
    <div className="App">
      <Login>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" href="/new">
            <CreateNewFolder />
          </IconButton>
          <IconButton edge="start" href="/search">
            <Map />
          </IconButton>
       
          <SearchByAddress onSelect={handlePositionSelect} />
          <IconButton edge="end" href="/"  onClick={logOut}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Router>
        <Switch> 
          <Route path="/new" render = {(props) => <Upload token={props.login}/ > } exact />
          <Route
            path="/search"
            render={(props) => <GeoSearch {...props} position={position} />}
            exact
          />
        </Switch>
      </Router>
      </Login>
    </div>
  );
}

export default App;
