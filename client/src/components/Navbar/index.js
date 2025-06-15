import { useContext, useState } from "react";
import { MyContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const context = useContext(MyContext);
  const user = context.currUser;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = async () => {
    try {
      await context.setCurrUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("currUser");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/listings">
          Play Box
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form
            className="d-flex ms-auto me-3"
            role="search"
            action="/listings/search"
            method="get"
          >
            <input
              className="form-control me-2"
              type="search"
              name="key"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-warning" type="submit">
              Search
            </button>
          </form>

          <ul className="navbar-nav mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item">
                  <Avatar
                    sx={{ bgcolor: "#ff9800", cursor: "pointer" }}
                    onClick={handleClick}
                  >
                    {user.username?.charAt(0).toUpperCase() || "?"}
                  </Avatar>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link
                        to={`/${user.username}/edit`}
                        className="dropdown-item"
                      >
                        Edit Profile
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link
                        to={`/${user.username}/watchlist`}
                        className="dropdown-item"
                      >
                        Watchlist
                      </Link>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        handleLogout();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <Link to="/login" className="btn btn-warning">
                    <FaUser className="me-1" />
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
