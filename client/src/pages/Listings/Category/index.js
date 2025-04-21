import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../App";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Category = () => {
  let context = useContext(MyContext);
  const [listings, setListings] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const { category } = useParams();
  // const API_URL =
  //   process.env.NODE_ENV === "production"
  //     ? process.env.REACT_APP_API_URL
  //     : "http://localhost:8080";
  useEffect(() => {
    if (category) {
      axios
        .get(`/api/listings/${category}`)
        .then((response) => {
          setListings(response.data.listings || []);
          setCategoryTitle(response.data.category);
          context.setShowNavbar(false);
          context.setShowFooter(false);
          context.setInterfacePage(false);
        })
        .catch((error) => {
          console.error("Error in axios inside useEffect:", error);
        });
    }
  }, [category, context]);
  return (
    <>
      <h1 className="title pt-3 pb-4 sticky-top">
        watch {categoryTitle} shows
      </h1>

      <div className="row d-flex card-container pb-5">
        {listings.map((listing) => (
          <div
            className="col-sm-12 col-md-6 col-lg-3 mb-4 mt-2 card-body"
            key={listing._id}
          >
            <div className="card">
              <Link
                to={`/listings/${listing.category}/${listing._id}`}
                className="newCard"
              >
                <img
                  src={`${listing.image}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-img-overlay"></div>
              </Link>
            </div>
            <h2 className="card-title ml-1">{listing.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default Category;
