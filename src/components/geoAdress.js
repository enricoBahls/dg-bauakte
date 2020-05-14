import React, { useState, useEffect, createRef } from "react";
import { InputBase, IconButton, Grid, Menu, MenuItem } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

/**
 * @author
 * @function SearchByAdress
 **/

const SearchByAddress = (props) => {
  const [address, setAddress] = useState({ city: "", street: "" });
  const [addressList, setAddressList] = useState([]);
  const menuRef = createRef();

  const [open, setOpen] = useState(false);

  const handleSearch = (e) => {
    axios
      .get("https://nominatim.openstreetmap.org/search", {
        params: { format: "json", ...address },
      })
      .then((response) => {
        setAddressList(response.data);
      });
    //setOpen(true);
  };

  useEffect(() => {
    console.log(addressList);
    setOpen(true);
  }, [addressList]);

  useEffect(() => {
    setOpen(false);
  }, []);

  const handleSearchClose = (e) => {
    setOpen(false);
    //setOpen(true);
  };

  const handlePlaceSelect = (e) => {
    let addr = addressList[e.currentTarget.value];
    props.onSelect([addr.lat, addr.lon]);
    setOpen(false);
  };

  const handleAddressChange = (e) => {
    let value = e.currentTarget.value;
    let addrComponents = value.split(",");

    let addr = {
      city: addrComponents[0],
      street: addrComponents.length > 1 ? addrComponents[1] : "",
    };
    setAddress(addr);
    console.log({ value, addrComponents, addressList });
  };

  return (
    <Grid container alignItems="baseline">
      <Grid item>
        <InputBase
          placeholder="Citty, Street"
          inputProps={{ "aria-label": "City, Street" }}
          onChange={handleAddressChange}
          ref={menuRef}
        />
      </Grid>
      <Grid item>
        <IconButton onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
        <Menu
          open={open}
          onClose={handleSearchClose}
          //anchorEl={menuRef}
          keepMounted
        >
          {addressList.map((item, i) => (
            <MenuItem key={i} value={i} onClick={handlePlaceSelect}>
              {item.display_name}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    </Grid>
  );
};

export default SearchByAddress;
