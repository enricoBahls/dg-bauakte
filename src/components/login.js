import React, { useState, useEffect, createContext, useContext } from "react";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import ax from "axios";

const useStyles = makeStyles((theme) => ({
  Grid: {
    // width: "50%",
    "& .MuiTextField-root": {
      width: "90%",
    },
  },
}));

export const getToken=()=>
{
  return JSON.parse(localStorage.getItem('hyplogin')).token;
}

const Login = (props) => {
  const classes = useStyles();
  // const [logedIn, setLogedIn] = useState(false);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [login, setLogin] = useState({ logedin: false, user: "", token: "" });
  const dgLogin = () => {
    let headers = {
      "X-Username": user,
      "X-Password": pwd,
    };

    ax.get(
      'http://localhost/RESTfulAPI/csrest/v1.0/auth/logon?applClass=Common&progId=Standard"',
      { headers: headers }
    )
      .then((response) => {
        let state = {
          logedIn: true,
          user: user,
          token: response.headers["x-archivetoken"],
        };
        setLogin(state);
        localStorage.setItem("hyplogin", JSON.stringify(state));
      })
      .catch(() => {
        alert("Login nicht möglich");
      });
  };

  useEffect(() => {
    let loginString=localStorage.getItem("hyplogin");
    console.log("env", process.env.REACT_APP_API_URL);
    if (loginString!=null)
    {
      setLogin(JSON.parse(loginString));
    }
  }, []);

  if (!login.logedIn) {
    return (
      <Grid container spacing={2} className={classes.Grid}>
        <Grid item xs={12}>
          <TextField
            name="user"
            label="Benutzer"
            onChange={(e) => {
              setUser(e.currentTarget.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="pwd"
            type="password"
            label="Password"
            onChange={(e) => {
              setPwd(e.currentTarget.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={dgLogin}>Login</Button>
         
        </Grid>
      </Grid>
    );
  } else {
    return props.children ;
  }
};

export default Login; 
