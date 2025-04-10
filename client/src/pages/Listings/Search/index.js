import { useContext, useEffect } from "react";
import { MyContext } from "../../../App";
import { useLocation } from "react-router-dom";

const Search = () => {
  const context = useContext(MyContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // Parse query parameters
  const key = searchParams.get("key") || "";

  if (key === "") {
    return (
      <div className="row justify-content-center">
        <h1 className="title pt-3 pb-4">No results found</h1>
      </div>
    );
  }

  useEffect(() => {
    context.setShowNavbar(true);
    context.setShowFooter(true);
    context.setInterfacePage(false);
  }, []);

  return (
    <div className="row justify-content-around">
      <h1 className="title pt-3 pb-4 sticky-top">
        Search results for "{key}":
      </h1>
      {context.marvelListings.map(
        (listing) =>
          listing.title.toLowerCase().includes(key.toLowerCase()) && (
            <div
              key={listing._id}
              className="col-sm-12 col-md-6 col-lg-3 mb-4 mt-2 card-body"
            >
              <div className="card">
                <a href={`/listings/marvel/${listing._id}`} className="newCard">
                  <img
                    src={`${listing.image}`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-img-overlay"></div>
                </a>
              </div>
              <h2 className="card-title">{listing.title}</h2>
            </div>
          )
      )}
      {context.historyListings.map(
        (listing) =>
          listing.title.toLowerCase().includes(key.toLowerCase()) && (
            <div className="col-sm-12 col-md-6 col-lg-3 mb-4 mt-2 card-body">
              <div className="card">
                <a
                  href={`/listings/history/${listing._id}`}
                  className="newCard"
                >
                  <img
                    src={`${listing.image}`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-img-overlay"></div>
                </a>
              </div>
              <h2 className="card-title">{listing.title}</h2>
            </div>
          )
      )}
      {context.popularMovieListings.map(
        (listing) =>
          listing.title.toLowerCase().includes(key.toLowerCase()) && (
            <div className="col-sm-12 col-md-6 col-lg-3 mb-4 mt-2 card-body">
              <div className="card">
                <a
                  href={`/listings/popularMovie/${listing._id}`}
                  className="newCard"
                >
                  <img
                    src={`${listing.image}`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-img-overlay"></div>
                </a>
              </div>
              <h2 className="card-title">{listing.title}</h2>
            </div>
          )
      )}
      {context.comedyListings.map(
        (listing) =>
          listing.title.toLowerCase().includes(key.toLowerCase()) && (
            <div className="col-sm-12 col-md-6 col-lg-3 mb-4 mt-2 card-body">
              <div className="card">
                <a href={`/listings/comedy/${listing._id}`} className="newCard">
                  <img
                    src={`${listing.image}`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-img-overlay"></div>
                </a>
              </div>
              <h2 className="card-title">{listing.title}</h2>
            </div>
          )
      )}
      {context.kidListings.map(
        (listing) =>
          listing.title.toLowerCase().includes(key.toLowerCase()) && (
            <div className="col-sm-12 col-md-6 col-lg-3 mb-4 mt-2 card-body">
              <div className="card">
                <a href={`/listings/kid/${listing._id}`} className="newCard">
                  <img
                    src={`${listing.image}`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-img-overlay"></div>
                </a>
              </div>
              <h2 className="card-title">{listing.title}</h2>
            </div>
          )
      )}
    </div>
  );
};

export default Search;
