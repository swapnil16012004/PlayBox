import { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import axiosInstance from "../../axiosConfig";
import Slider from "react-slick";

const Slideshow = () => {
  const context = useContext(MyContext);

  useEffect(() => {
    axiosInstance
      .get(`/listings`)
      .then((response) => {
        context.setMarvelListings(response.data.listings.marvelListings || []);
        context.setHistoryListings(
          response.data.listings.historyListings || []
        );
        context.setPopularMovieListings(
          response.data.listings.popularMovieListings || []
        );
        context.setComedyListings(response.data.listings.comedyListings || []);
        context.setKidListings(response.data.listings.kidListings || []);
      })
      .catch((error) => {
        console.error("Error in axios inside useEffect:", error);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };

  return (
    <div className="paddingContainer mt-3 mb-5">
      <div className="homeBannerSection">
        <Slider {...settings}>
          {/* Marvel Listings */}
          {context.marvelListings?.[11] && (
            <div className="item">
              <img
                className="banner"
                src={context.marvelListings[11]?.imgBanner || ""}
                alt="Marvel Banner"
              />
              <img
                className="show-img"
                src={context.marvelListings[11]?.logo || ""}
                alt="Loki"
              />
              <h5 className="info">
                <li className="show-info">&#x2022; 2023</li>
                &nbsp;
                <li className="show-info">&#x2022; 2 seasons</li>
                &nbsp;
                <li className="show-info gray">&nbsp; UA 13+ &nbsp;</li>
              </h5>
              <h5 className="show-category">
                | {context.marvelListings[11]?.category || "Unknown"} |
              </h5>
              <a
                href={`/listings/marvel/${context.marvelListings[11]?._id}`}
                className="watch-link"
              >
                <button className="watch">Watch Now</button>
              </a>
            </div>
          )}

          {/* History Listings */}
          {context.historyListings?.[2] && (
            <div className="item">
              <img
                className="banner"
                src={context.historyListings[2]?.imgBanner || ""}
                alt="History Banner"
              />
              <img
                className="show-img historyImg"
                src={context.historyListings[2]?.logo || ""}
                alt="Subhedar"
              />
              <h5 className="show-category historyCat">
                | {context.historyListings[2]?.category || "Unknown"} |
              </h5>
              <a
                href={`/listings/history/${context.historyListings[2]?._id}`}
                className="watch-link hisLink"
              >
                <button className="watch">Watch Now</button>
              </a>
            </div>
          )}

          {/* Popular Movie Listings */}
          {context.popularMovieListings?.[0] && (
            <div className="item">
              <img
                className="banner"
                src={context.popularMovieListings[0]?.imgBanner || ""}
                alt="Popular Movie Banner"
              />
              <img
                className="show-img"
                src={context.popularMovieListings[0]?.logo || ""}
                alt="Sita Ramam"
              />
              <h5 className="show-category popularMovieCat">
                | {context.popularMovieListings[0]?.category || "Unknown"} |
              </h5>
              <a
                href={`/listings/popularMovie/${context.popularMovieListings[0]?._id}`}
                className="watch-link movieLink"
              >
                <button className="watch">Watch Now</button>
              </a>
            </div>
          )}

          {/* Comedy Listings */}
          {context.comedyListings?.[1] && (
            <div className="item">
              <img
                className="banner"
                src={context.comedyListings[1]?.imgBanner || ""}
                alt="Comedy Banner"
              />
              <img
                className="show-img doSmall"
                src={context.comedyListings[1]?.logo || ""}
                alt="Housefull 4"
              />
              <h5 className="show-category comedyCat">
                | {context.comedyListings[1]?.category || "Unknown"} |
              </h5>
              <a
                href={`/listings/comedy/${context.comedyListings[1]?._id}`}
                className="watch-link comLink"
              >
                <button className="watch">Watch Now</button>
              </a>
            </div>
          )}

          {/* Kid Listings */}
          {context.kidListings?.[0] && (
            <div className="item">
              <img
                className="banner"
                src={context.kidListings[0]?.imgBanner || ""}
                alt="Kid Banner"
              />
              <img
                className="show-img"
                src={context.kidListings[0]?.logo || ""}
                alt="Legends of Hanuman"
              />
              <h5 className="info">
                <li className="show-info">&#x2022; 2024</li>
                &nbsp;
                <li className="show-info">&#x2022; 4 seasons</li>
                &nbsp;
                <li className="show-info gray">&nbsp; UA 7+ &nbsp;</li>
              </h5>
              <h5 className="show-category kidCat">
                | {context.kidListings[0]?.category || "Unknown"} |
              </h5>
              <a
                href={`/listings/kid/${context.kidListings[0]?._id}`}
                className="watch-link kidLink"
              >
                <button className="watch">Watch Now</button>
              </a>
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default Slideshow;
