import "./App.css";
import React, { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Listings/Home";
import Flash from "./components/Flash";
import Search from "./pages/Listings/Search";
import AddNewProduct from "./pages/Listings/AddNewProduct";
import Category from "./pages/Listings/Category";
import Interface from "./pages/Listings/Interface";
import Video from "./pages/Listings/Video";
import Login from "./pages/Users/Login";
import SignUp from "./pages/Users/SignUp";
import axios from "axios";
import Watchlist from "./pages/Watchlist";

let MyContext = createContext();

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [marvelListings, setMarvelListings] = useState([]);
  const [historyListings, setHistoryListings] = useState([]);
  const [popularMovieListings, setPopularMovieListings] = useState([]);
  const [comedyListings, setComedyListings] = useState([]);
  const [kidListings, setKidListings] = useState([]);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [interfacePage, setInterfacePage] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isManuallyClosed, setIsManuallyClosed] = useState(false);

  const values = {
    currUser,
    setCurrUser,
    loading,
    setLoading,
    marvelListings,
    setMarvelListings,
    historyListings,
    setHistoryListings,
    popularMovieListings,
    setPopularMovieListings,
    comedyListings,
    setComedyListings,
    kidListings,
    setKidListings,
    showNavbar,
    setShowNavbar,
    showFooter,
    setShowFooter,
    interfacePage,
    setInterfacePage,
    flashMessage,
    setFlashMessage,
    isSubmitting,
    setIsSubmitting,
    isLoggedIn,
    setIsLoggedIn,
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (interfacePage) {
      body.classList.add("addOverflow");
    } else {
      body.classList.remove("addOverflow");
    }

    return () => {
      body.classList.remove("addOverflow");
    };
  }, [interfacePage]);

  useEffect(() => {
    if (flashMessage && !isManuallyClosed) {
      console.log("Flash mounted");
      const timer = setTimeout(() => {
        setFlashMessage(null);
        console.log("Flash message cleared");
      }, 8000);
      return () => {
        clearTimeout(timer);
        console.log("Flash unmounted");
      };
    }
  }, [flashMessage, isManuallyClosed]);

  useEffect(() => {
    if (flashMessage) {
      setIsManuallyClosed(false);
    }
  }, [flashMessage]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/checkLoginStatusFlag");
        const data = response.data;
        console.log(data);
        if (data.isLoggedIn) {
          setIsLoggedIn(true);
          setCurrUser({
            username: data.user.username,
            id: data.user._id,
            watchlist: data.user.watchlist || [],
          });
        } else {
          setIsLoggedIn(false);
          setCurrUser(null);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
        setCurrUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [currUser]);

  useEffect(() => {
    axios
      .get("/api/listings")
      .then((response) => {
        const data = response.data.listings;
        console.log(data);
        setMarvelListings(data.marvelListings || []);
        setHistoryListings(data.historyListings || []);
        setPopularMovieListings(data.popularMovieListings || []);
        setComedyListings(data.comedyListings || []);
        setKidListings(data.kidListings || []);
      })
      .catch((error) => {
        console.error("Error in axios inside useEffect:", error);
      })
      .finally(() => {
        setLoading(false);
        window.scrollTo(0, 0);
      });
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <MyContext.Provider value={values}>
        {showNavbar && <Navbar />}

        {flashMessage && (
          <Flash
            success={flashMessage.success}
            message={flashMessage.message}
            onClose={() => {
              setIsManuallyClosed(true);
              setFlashMessage(null);
            }}
          />
        )}

        <Routes>
          <Route path="/" element={<Navigate to={"/listings"} replace />} />
          <Route path="/listings" element={<Home />} />
          <Route path="/listings/search" element={<Search />} />
          <Route path="/listings/new/:show" element={<AddNewProduct />} />
          <Route path="/listings/:category" element={<Category />} />
          <Route path="/listings/:category/:id" element={<Interface />} />
          <Route path="/listings/:category/:id/video" element={<Video />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>

        {showFooter && <Footer />}
      </MyContext.Provider>
    </Router>
  );
}

export default App;
export { MyContext };
