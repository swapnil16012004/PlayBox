import axiosInstance from "../../../axiosConfig";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../App";
import { useParams, useNavigate, Navigate } from "react-router-dom";

const Video = () => {
  const context = useContext(MyContext);
  const [listing, setListing] = useState([]);
  const { category, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      axiosInstance
        .get(`/listings/${category}/${id}/video`)
        .then((response) => {
          console.log(response.data);
          setListing(response.data.listing || []);
          context.setShowNavbar(false);
          context.setShowFooter(false);
          context.setInterfacePage(true);
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            context.setFlashMessage({
              success: false,
              message: error.response.data.message,
            });
            // navigate("/login");
          } else {
            console.error("An error occurred:", error);
          }
        });
    }
  }, [category, id]);

  return (
    <>
      {typeof listing.video === "string" && listing.video ? (
        <iframe
          width="560"
          height="315"
          src={listing.video}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Video;
