import React, { useState , useEffect } from "react";

import { Reac } from "react-leaflet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { makeStyles } from "@material-ui/core";
import SearchByAddress from "./geoAdress";
import { getToken } from "./login";
import ax from "axios";

const useStyles = makeStyles((theme) => ({

  map: {
 
    "& .leaflet-container": {
      width: "100%",
      height: "80vh",
    },
  },
}));


const GeoSearch = (props) => {
  const classes = useStyles();
  const [position, setPosition] = useState([49.13, 9.15]);
  const [landMarks,setLandMarks] = useState([]);

  const queryArchive = async (bounds) => {
    const instance = ax.create();
    let req = { 
      
        "domain": "Content",
        "stampName": "BAUAKTE",
        "fieldValues": [
          {
            "fieldName": "Latitude",
            "fieldValue": `>=${bounds._southWest.lat}  & <= ${bounds._northEast.lat} `
          },
          {
            "fieldName": "Longitude",
            "fieldValue": `<=${bounds._northEast.lng} & >= ${bounds._southWest.lng}`
          },
        ]
      };
    
      let resp = await instance.post(`${process.env.REACT_APP_API_URL}/query/search`, req, {
        headers: {
          "x-archivetoken": getToken(),
        },
      }) ;

      if (resp.status==200)
      {
        instance.post(`${process.env.REACT_APP_API_URL}/query/indexes?stampName=Bauakte`,{docIdents:resp.data.docIdents}, 
        { headers: 
          {
          "x-archivetoken": getToken(),
        }
      }).then(r => {
        // map landmarks 
        console.log(r)
        setLandMarks(r.data.map(index => {
           let indexObj = {};
           index.forEach(e => {
             indexObj[e.fieldName]=e.fieldValue.replace(',','.');
           });
           return indexObj;
        } ))
      });
    }
  }

  useEffect(() => {
    console.log(landMarks);
   
  }, [landMarks])

  const [state] = useState({
    lat: 49.105,
    lng: 9.13,
    zoom: 13,
  });

  return (
    <div className={classes.map}>
      <SearchByAddress onSelect={p => setPosition(p)} />
      <Map
        center={position}
        zoom={state.zoom}
        ondragend={(e) => {
          queryArchive(e.target.getBounds());
        }}
      >
        <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />

        {landMarks.map(lm => (
          <Marker position={[parseFloat(lm.LAT),parseFloat(lm.LONG)]}>
            <Popup> <a href ={`${process.env.REACT_APP_DOC_URL}/ViewDocument/${process.env.REACT_APP_DEP_ID}/${lm.DOCID}`} target="_blank"> {lm.NAME} </a> </Popup>
          </Marker>
          )
        )}
      </Map>
    </div> 
  );
};

export default GeoSearch;
