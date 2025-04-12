import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../App";
import { Link, useParams } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Interface = () => {
  let context = useContext(MyContext);
  const { currUser, setCurrUser } = useContext(MyContext);
  const [listing, setListing] = useState({});
  const { category, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (category && id) {
      const API_URL =
        process.env.NODE_ENV === "production"
          ? process.env.REACT_APP_API_URL // Use the production API URL
          : "http://localhost:8080";
      axios
        .get(`${API_URL}/api/listings/${category}/${id}`)
        .then((response) => {
          setListing(response.data.listing || []);
          context.setShowNavbar(false);
          context.setShowFooter(false);
          context.setInterfacePage(true);
          setListing(response.data.listing || {});
          return () => {
            context.setShowNavbar(true);
            context.setShowFooter(true);
            context.setInterfacePage(false);
          };
        })
        .catch((error) => {
          console.error("Error in axios inside useEffect:", error);
        });
    }
  }, [category, id, context.setShowFooter, context.setShowNavbar]);

  const toggleWatchlist = async () => {
    if (!currUser) {
      context.setFlashMessage({
        success: false,
        message: "Please log in to manage your watchlist.",
      });
      navigate("/login");
      return;
    }

    if (!listing._id) {
      console.error("Listing ID is missing.");
      context.setFlashMessage({
        success: false,
        message: "Listing ID is missing. Please try again.",
      });
      return;
    }

    const isInWatchlist = currUser.watchlist.some(
      (item) => item === listing._id
    );

    console.log("Sending to backend:", {
      userId: currUser.id,
      showId: listing._id,
    });

    try {
      const API_URL =
        process.env.NODE_ENV === "production"
          ? process.env.REACT_APP_API_URL // Use the production API URL
          : "http://localhost:8080";
      if (isInWatchlist) {
        // Remove from watchlist
        const response = await axios.post(`${API_URL}/remove`, {
          userId: currUser.id,
          showId: listing._id,
        });
        // setCurrUser({
        //   ...currUser,
        //   watchlist: response.data.watchlist,
        // });
        console.log("Before updating currUser:", currUser);
        setCurrUser((prevUser) => {
          if (!prevUser) {
            console.error("prevUser is null. Cannot update watchlist.");
            return null;
          }

          const updatedUser = {
            ...prevUser,
            watchlist: response.data.watchlist,
          };

          console.log("Updated User:", updatedUser);
          return updatedUser;
        });
        context.setFlashMessage({
          success: true,
          message: "Removed from your watchlist.",
        });
      } else {
        // Add to watchlist
        const response = await axios.post(`${API_URL}/add`, {
          userId: currUser.id,
          showId: listing._id,
        });
        // setCurrUser({
        //   ...currUser,
        //   watchlist: response.data.watchlist,
        // });
        console.log("Before updating currUser:", currUser);

        setCurrUser((prevUser) => {
          console.log("Previous User:", prevUser);
          if (!prevUser) {
            console.error("prevUser is null. Cannot update watchlist.");
            return null;
          }

          const updatedUser = {
            ...prevUser,
            watchlist: response.data.watchlist,
          };

          console.log("Updated User:", updatedUser);
          return updatedUser;
        });
        context.setFlashMessage({
          success: true,
          message: "Added to your watchlist.",
        });
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
      context.setFlashMessage({
        success: false,
        message:
          "An error occurred while updating your watchlist. Please try again.",
      });
    }
  };

  return (
    <div className="interface-container">
      <img className="bannerImage" src={`${listing.imgBanner}`} alt="banner" />
      <div className="info-container">
        <div className="logo-container">
          <img src={`${listing.logo}`} alt="logo" />
        </div>
        <div className="description-container">
          <div className="year-box">
            <span className="year">2024</span>
            <span className="rated">U/A 13+</span>
            <span className="seasons">5 seasons</span>
          </div>
          <div className="descriptionBox">{listing.description}</div>
          <div className="category-box">| {listing.category} |</div>
          <div className="button-box">
            <Link to={`/listings/${listing.category}/${id}/video`}>
              <button className="btn watchBtn">Watch Now</button>
            </Link>

            <button className="btn watchlist" onClick={toggleWatchlist}>
              {currUser &&
              Array.isArray(currUser.watchlist) &&
              currUser.watchlist.some((item) => item === listing._id) ? (
                <IoMdCheckmark />
              ) : (
                <FiPlus />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interface;
