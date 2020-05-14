import React, { useState,useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import StepperFile from "./components/stepper_file";
import { AppBar, Toolbar, IconButton, Step } from "@material-ui/core";
import CreateNewFolder from "@material-ui/icons/CreateNewFolderOutlined";
import Map from "@material-ui/icons/Map";
import GeoSearch from "./components/search";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchByAddress from "./components/geoAdress";
import ax from 'axios';
import Login from "./components/login";

function App() {
  const [position, setPosition] = useState([51.505, -0.09]);

  const handlePositionSelect = (position) => {
    console.log(position);
    setPosition(position);
  };

  useEffect(()=>{
    console.log("mount app");
    let headers={
      'X-Username':'Administrator',
      'X-Password':'Data230Global',
    };

    ax.get('http://localhost/RESTfulAPI/csrest/v1.0/auth/logon?applClass=Common&progId=Standard"',{headers:headers}).then((result)=>{
    console.log(result);
   

    });

  },[])

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
        </Toolbar>
      </AppBar>
      <Router>
        <Switch>
          
          <Route path="/new" component={StepperFile} exact />

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
