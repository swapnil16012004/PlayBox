import { useContext, useEffect } from "react";
import { MyContext } from "../../App";

const New = () => {
  let context = useContext(MyContext);

  return (
    <div className="new">
      <span className="btn-new">
        <a href={`/listings/new/${context.marvelListings[0]?.category}`}>
          Add {context.marvelListings[0]?.category || "unknown"} shows
        </a>
      </span>
      <span className="btn-new">
        <a href={`/listings/new/${context.historyListings[0]?.category}`}>
          Add {context.historyListings[0]?.category || "unknown"} shows
        </a>
      </span>
      <span className="btn-new">
        <a href={`/listings/new/${context.popularMovieListings[0]?.category}`}>
          Add {context.popularMovieListings[0]?.category || "unknown"} shows
        </a>
      </span>
      <span className="btn-new">
        <a href={`/listings/new/${context.comedyListings[0]?.category}`}>
          Add {context.comedyListings[0]?.category || "unknown"} shows
        </a>
      </span>
      <span className="btn-new">
        <a href={`/listings/new/${context.kidListings[0]?.category}`}>
          Add {context.kidListings[0]?.category || "unknown"} shows
        </a>
      </span>
    </div>
  );
};

export default New;
