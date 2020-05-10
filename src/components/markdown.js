import React, { useState } from "react";
import ReactMarkdown from "react-markdown/with-html";
import { TextField, makeStyles, Grid } from "@material-ui/core";

/**
 * @author Enrico Bahls
 * @function Markdown
 **/

const useStyles = makeStyles((theme) => ({
  component: {
    display: "flex",
    justifyContent: "center",
    alignItems: "strech",
  },
  preview: {
    //width: "50%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "5px",
    textAlign: "left",
    //margin: "1px",
  },
  editor: {
    // width: "50%",
    "& .MuiTextField-root": {
      width: "100%",
    },
  },
}));

const Markdown = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");

  return (
    <Grid container alignItems="stretch">
      <Grid item xs={12} sm={6} className={classes.editor}>
        <TextField
          lable="Markdown"
          multiline
          variant="outlined"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} className={classes.preview}>
        <ReactMarkdown source={text} />
      </Grid>
    </Grid>
  );
};

export default Markdown;
