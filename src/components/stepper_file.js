import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageUploader from "react-images-upload";
import { Button, Grid } from "@material-ui/core";
import Markdown from "./markdown";
import ax from "axios";
import { getToken } from "./login";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    position: "fixed",
    left: "50%",
    marginLeft: "-50%",
  },
}));

const folderForm=(name,gps)=>{
  let formData=new FormData();
  let parameter={
    docClass:
    {value:"FOLDER",flag:0,},
    docName:name,
    format:"",
    docTypeId:0,
    isVersionable:false,
    language:"DE-DE",
    indexes:
    [
      [{"fieldName":"__STAMPNAME","fieldValue":"BAUAKTE"},
      {"fieldName":"NAME","fieldValue":name},
      {"fieldName":"LAT","fieldValue":gps.lat},
      {"fieldName":"LONG","fieldValue":gps.long},
      ]]
  };
  formData.append('parameter',JSON.stringify(parameter));
  return formData; 
}

const noteForm=(name)=>
{
  let formDate=new FormData();
  let parameter={
    docClass:
    {value:"NOTE",flag:0,},
    docName:name,
    format:"",
    docTypeId:0,
    isVersionable:false,
    language:"DE-DE",
    indexes:null,
  };

  formDate.append('parameter',JSON.stringify(parameter));
  var BOM = new Uint8Array([0x0d,0x0a]);
  formDate.append('datafile',new Blob([BOM,"hallo welt"],{encoding:"UTF-8-BOM"}),"note.md");
  return formDate;
}
const picForm=(file)=>
{
  
  let formDate=new FormData();
  let parameter={
    docClass:
    {value:"IMAGE",flag:0,},
    docName:file.name,
    format:"",
    docTypeId:0,
    isVersionable:false,
    language:"DE-DE",
    indexes:null,
  };

  formDate.append('parameter',JSON.stringify(parameter));
  formDate.append('datafile',file);
  return formDate;
}

const instance = ax.create();
const createHypDoc = (dbid,data,callback) =>
{
  return instance.post(`http://localhost/RESTfulAPI/csrest/v1.0/dept/${dbid}/docs`,data,
  { headers : {
    "x-archivetoken": getToken(),
  }
}).then((response)=> callback(response.data.docId)).catch(error=> console.log(error));;
}

const createHypDocChild = (dbid,docid,data) =>
{
 
    instance.post(`http://localhost/RESTfulAPI/csrest/v1.0/dept/${dbid}/docs/${docid}/children`,data,
  { headers : {
    "x-archivetoken": getToken(),
  }
}).then((response)=> console.log(response)).catch(error=> console.log(error));

}

const StepperFile = () => {
  const classes = useStyles();
  const [gps, setGps] = useState({ long: 0, lat: 0 });
  const [text, setText] = useState("");
  const [pictures, setPictures] = useState([]);

  const onDrop = picture => {
    setPictures( picture);
  };
  const createFolder=() => {

    createHypDoc(1571768983,folderForm("Test2",gps),(folderId)=>
    {
      createHypDocChild(1571768983,folderId,noteForm("aktennotiez",text));
      pictures.forEach( p => createHypDocChild(1571768983,folderId,picForm(p)));
    });

}

useEffect(()=>{
  pictures.forEach(p => console.log(p));
},[pictures])

  useEffect( () => {
    
    navigator.geolocation.getCurrentPosition(async (e) => {
      let position = {
        lat: e.coords.latitude,
        long: e.coords.longitude,
      };  
      let response = await ax.get(`http://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.long}&appid=59be8b11569f2847a990858f19dcaed5`);
      let weather = await  response.data;

      setGps(position);

      const kelvinToCel=273.15;
       console.log(weather);
      setText(`
# Objektbeschreibung 
am ${new Date().toISOString()}

## Wetter

* Temperatur: ${weather.main.temp-kelvinToCel} C  
* Luftdruck: ${weather.main.pressure} hPa  
* Rel. Luftfeuchtigkeit: ${weather.main.humidity} %  
* Wind: ${weather.wind.speed} m/s 
* Windrichtung: ${weather.wind.deg} grd 

## Position (GPS)

* **Longitude:** *${position.long}*
* **Latitude:** *${position.lat}* 
----
# Notizen
....
      `);
    });
  }, []);

  return (
    <>
      <Grid
        container
        direction="column"
        spacing={2}
        className={classes.root}
      >
        <Grid item>
          <ImageUploader
            withPreview={true}
            withIcon={false}
            buttonText="take a Photo"
            onChange={onDrop}
          />
        </Grid>
        <Grid item>
          <Markdown onChange={(t) => console.log(t)} text={text} />
        </Grid>
        <Grid item xs={6}></Grid>
        <Button variant="contained" color="primary" onClick={createFolder}>
          Upload
        </Button>
      </Grid>
    </>
  );
};

export default StepperFile;
