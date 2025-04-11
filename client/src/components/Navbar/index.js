import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import axios from "axios";
import { Link } from "react-router-dom";

import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import { PiDownloadSimpleBold } from "react-icons/pi";

const Navbar = () => {
  let context = useContext(MyContext);
  const [user, setUser] = useState(context.currUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    console.log("Current User in Navbar:", context.currUser);
    setUser(context.currUser);
    console.log("User state updated:", user);
  }, [context.currUser, user]);

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      const API_URL = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${API_URL}/logout`);
      const data = response.data;
      console.log("Logout successful, setting state...");
      context.setFlashMessage({ success: true, message: data.message });
      setTimeout(() => {
        context.setIsLoggedIn(false);
        context.setCurrUser(null);
      }, 100);
    } catch (error) {
      console.error("Error during logout:", error);
      const errorMessage = error.response?.data?.message || "Logout failed";
      context.setFlashMessage({ success: false, message: errorMessage });
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav
      className="navbar navbar-expand-md border-bottom sticky-top"
      style={{ borderColor: "black" }}
    >
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav mr">
            <span className="explore">
              <a className="navbar-brand" href="/listings">
                <svg
                  className="svgIcon"
                  viewBox="0 0 512 512"
                  height="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
                </svg>
                <span className="navbar-brand-span">PlayBox</span>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </span>
          </div>
          <div className="navbar-nav ms-auto">
            <form
              className="d-flex"
              role="search"
              action="/listings/search"
              method="get"
            >
              <input
                className="form-control me-2 search-inp"
                type="search"
                placeholder="Search destinations"
                name="key"
              />
              <button className="btn bttn ml-1">
                <svg
                  height="20"
                  width="24"
                  fill="#FFFFFF"
                  viewBox="0 0 24 24"
                  data-name="Layer 1"
                  id="Layer_1"
                  className="sparkle"
                >
                  <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                </svg>

                <span className="text">Search</span>
              </button>
            </form>
          </div>
          <div className="navbar-nav ms-auto auth">
            {context.isLoggedIn && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 4 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      sx={{
                        width: 45,
                        height: 45,
                        backgroundColor: "#a47cf3",
                      }}
                    >
                      {user?.username?.charAt(0)?.toUpperCase() || "?"}
                    </Avatar>
                  </IconButton>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <Link to={"/watchlist"} className="watchlistLink">
                    <MenuItem>
                      <PiDownloadSimpleBold className="watchlistBtn" />{" "}
                      Watchlist
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout}>
                    <Logout fontSize="small" />
                    &nbsp; &nbsp; Logout
                  </MenuItem>
                </Menu>
              </>
            )}
            {!context.isLoggedIn && (
              <>
                <Link to={"/signup"} className="btn-new pad1">
                  <b>Sign up</b>
                </Link>
                <Link to={"/login"} className="btn-new pad2">
                  <b>Log in</b>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
