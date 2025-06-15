import New from "../../../components/New";
import Slideshow from "../../../components/Slideshow";
import { useContext, useEffect } from "react";
import { MyContext } from "../../../App";
import { Link } from "react-router-dom";
import Svg from "../../../components/Svg";
import Card from "../../../components/Card";

const Home = () => {
  const context = useContext(MyContext);

  useEffect(() => {
    context.setShowNavbar(true);
    context.setShowFooter(true);
    context.setInterfacePage(false);
    return () => {
      context.setShowNavbar(false);
      context.setShowFooter(false);
      context.setInterfacePage(true);
      context.setLoading(false);
      window.scrollTo(0, 0);
    };
  }, [context]);

  if (context.loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {context.currUser?.username === "admin" && <New />}

      <Slideshow />
      <div className="container">
        <div className="row justify-content-around">
          {/* Marvel Listings */}
          {context.marvelListings?.length > 0 && (
            <>
              <Link
                to={`/listings/${context.marvelListings[0]?.category}`}
                style={{ textDecoration: "none" }}
              >
                <button
                  className="btn bttn btn-outlined cat-btn mb-3"
                  type="submit"
                >
                  <span className="span category">marvel</span>
                  <span className="second">
                    <Svg />
                  </span>
                </button>
              </Link>

              {context.marvelListings.slice(0, 6).map((item) => (
                <div
                  key={item._id}
                  className="col-sm-12 col-md-6 col-lg-2 mb-4 mt-2 card-body"
                >
                  <Card {...item} />
                  <h2 className="card-title">{item.title}</h2>
                </div>
              ))}
            </>
          )}

          {/* History Listings */}
          {context.historyListings?.length > 0 && (
            <>
              <Link
                to={`/listings/${context.historyListings[0]?.category}`}
                style={{ textDecoration: "none" }}
              >
                <button
                  className="btn bttn btn-outlined cat-btn mb-3"
                  type="submit"
                >
                  <span className="span category">history</span>
                  <span className="second">
                    <Svg />
                  </span>
                </button>
              </Link>

              {context.historyListings.slice(0, 6).map((item) => (
                <div
                  key={item._id}
                  className="col-sm-12 col-md-6 col-lg-2 mb-4 mt-2 card-body"
                >
                  <Card {...item} />
                  <h2 className="card-title">{item.title}</h2>
                </div>
              ))}
            </>
          )}

          {/* Popular Movie Listings */}
          {context.popularMovieListings?.length > 0 && (
            <>
              <Link
                to={`/listings/${context.popularMovieListings[0]?.category}`}
                style={{ textDecoration: "none" }}
              >
                <button
                  className="btn bttn btn-outlined cat-btn mb-3 correctWidth"
                  type="submit"
                >
                  <span className="span category">popular movies</span>
                  <span className="second">
                    <Svg />
                  </span>
                </button>
              </Link>

              {context.popularMovieListings.slice(0, 6).map((item) => (
                <div
                  key={item._id}
                  className="col-sm-12 col-md-6 col-lg-2 mb-4 mt-2 card-body"
                >
                  <Card {...item} />
                  <h2 className="card-title">{item.title}</h2>
                </div>
              ))}
            </>
          )}

          {/* Comedy Listings */}
          {context.comedyListings?.length > 0 && (
            <>
              <Link
                to={`/listings/${context.comedyListings[0]?.category}`}
                style={{ textDecoration: "none" }}
              >
                <button
                  className="btn bttn btn-outlined cat-btn mb-3"
                  type="submit"
                >
                  <span className="span category">comedy</span>
                  <span className="second">
                    <Svg />
                  </span>
                </button>
              </Link>

              {context.comedyListings.slice(0, 6).map((item) => (
                <div
                  key={item._id}
                  className="col-sm-12 col-md-6 col-lg-2 mb-4 mt-2 card-body"
                >
                  <Card {...item} />
                  <h2 className="card-title">{item.title}</h2>
                </div>
              ))}
            </>
          )}

          {/* Kids Listings */}
          {context.kidListings?.length > 0 && (
            <>
              <Link
                to={`/listings/${context.kidListings[0]?.category}`}
                style={{ textDecoration: "none" }}
              >
                <button
                  className="btn bttn btn-outlined cat-btn mb-3"
                  type="submit"
                >
                  <span className="span category">kids</span>
                  <span className="second">
                    <Svg />
                  </span>
                </button>
              </Link>

              {context.kidListings.slice(0, 6).map((item) => (
                <div
                  key={item._id}
                  className="col-sm-12 col-md-6 col-lg-2 mb-4 mt-2 card-body"
                >
                  <Card {...item} />
                  <h2 className="card-title">{item.title}</h2>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
