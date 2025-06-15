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
import axiosInstance from "./axiosConfig";
import Watchlist from "./pages/Watchlist";

let MyContext = createContext();

function App() {
  const [currUser, setCurrUser] = useState(() => {
    const storedUser = localStorage.getItem("currUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

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

  // ✅ Restore session from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("currUser");

    if (token && storedUser) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      try {
        const user = JSON.parse(storedUser);
        setCurrUser({
          username: user.username,
          _id: user._id,
          watchlist: user.watchlist || [],
        });
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("currUser");
      }
    }

    setLoading(false);
  }, []);

  // ✅ Sync currUser to localStorage on change
  useEffect(() => {
    if (currUser) {
      localStorage.setItem("currUser", JSON.stringify(currUser));
    } else {
      localStorage.removeItem("currUser");
    }
  }, [currUser]);

  // Body scroll lock for Interface page
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

  // Auto-hide flash message
  useEffect(() => {
    if (flashMessage && !isManuallyClosed) {
      const timer = setTimeout(() => {
        setFlashMessage(null);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage, isManuallyClosed]);

  useEffect(() => {
    if (flashMessage) setIsManuallyClosed(false);
  }, [flashMessage]);

  // Fetch all listings
  useEffect(() => {
    axiosInstance
      .get(`/listings`)
      .then((response) => {
        const data = response.data.listings;
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
          <Route path="/:username/watchlist" element={<Watchlist />} />
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
