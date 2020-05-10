import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import ImageUploader from "react-images-upload";
import { Button } from "@material-ui/core";
import Markdown from "./markdown";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  actionContainer: {
    marginBottom: theme.spacing(2),
  },
  input: {
    display: "none",
  },
}));

const ImageUpload = (props) => {
  return (
    <ImageUploader
      withPreview={true}
      withIcon={false}
      buttonText="take a Photo"
    />
  );
};

const Comment = (props) => {
  //const md = new MarkdownIt();
  useEffect(() => {
    console.log("whats up");
  });

  return <Markdown></Markdown>;
};

const StepperFile = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    { lable: "Take Foto", component: ImageUpload },
    { lable: "Add Comment", component: Comment },
  ];

  const nextStep = () => {
    let step = activeStep + 1;
    if (step >= steps.length) step = 0;
    console.log(step);
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step) => (
          <Step key={step.lable}>
            <StepLabel>{step.lable}</StepLabel>
            <StepContent>
              {step.component()}
              <div className={classes.actionContainer}>
                <Button onClick={nextStep} variant="contained" color="primary">
                  Next
                </Button>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {/*<Camera onTakePhoto={(uri) => console.log(uri)} />*/}
    </div>
  );
};

export default StepperFile;
