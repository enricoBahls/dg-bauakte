import React, { useState } from "react";

import { Reac } from "react-leaflet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { makeStyles } from "@material-ui/core";

/**
 * @author
 * @function GeoSearch
 **/
// https://blog.logrocket.com/how-to-use-react-leaflet/

const useStyles = makeStyles((theme) => ({
  map: {
    // width: "50%",
    "& .leaflet-container": {
      width: "100%",
      height: "80vh",
    },
  },
}));

const GeoSearch = (props) => {
  const classes = useStyles();
  const [state] = useState({
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  });

  //const { Map: LeafletMap, TileLayer, Marker, Popup } = ;

  return (
    <div className={classes.map}>
      <Map
        center={[state.lat, state.lng]}
        zoom={state.zoom}
        ondragend={(e) => {
          console.log(e.target.getBounds());
        }}
      >
        <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      </Map>
    </div>
  );
};

export default GeoSearch;
