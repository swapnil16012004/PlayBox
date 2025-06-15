import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import axiosInstance from "../../axiosConfig";
import Card from "../../components/Card";

const Watchlist = () => {
  const { currUser } = useContext(MyContext);
  const [watchlistDetails, setWatchlistDetails] = useState([]);

  useEffect(() => {
    const fetchWatchlistDetails = async () => {
      if (!currUser || !currUser.watchlist || currUser.watchlist.length === 0)
        return;

      try {
        const response = await axiosInstance.get(`/listings`);
        const allShows = response.data.listings;

        const combinedShows = [
          ...(allShows.marvelListings || []),
          ...(allShows.historyListings || []),
          ...(allShows.popularMovieListings || []),
          ...(allShows.comedyListings || []),
          ...(allShows.kidListings || []),
        ];

        const filteredShows = combinedShows.filter((show) =>
          currUser.watchlist.includes(show._id)
        );

        setWatchlistDetails(filteredShows);
      } catch (error) {
        console.error("Error fetching watchlist details:", error);
      }
    };

    fetchWatchlistDetails();
  }, [currUser]);

  if (!currUser || currUser.watchlist.length === 0) {
    return (
      <div className="watchlist-container">
        <h1>Your watchlist is empty.</h1>
      </div>
    );
  }

  return (
    <div className="row justify-content-around">
      <h1 className="title pt-3 pb-4 sticky-top">Your Watchlist</h1>
      {watchlistDetails.map((show) => (
        <div
          key={show._id}
          className="col-sm-12 col-md-6 col-lg-3 mb-4 mt-2 card-body"
        >
          <Card
            _id={show._id}
            image={show.image}
            title={show.title}
            category={show.category}
          />
          <h2 className="card-title">{show.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;
