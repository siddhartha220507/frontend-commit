import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "./redux/favoriteSlice";
import { fetchHistory } from "./redux/historySlice";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import CinematicLoader from "./components/CinematicLoader";
import CustomCursor from "./components/CustomCursor";

// Lazy loading all pages for performance
const Home = React.lazy(() => import("./pages/Home"));
const Movies = React.lazy(() => import("./pages/Movies"));
const MovieDetails = React.lazy(() => import("./pages/MovieDetails"));
const Search = React.lazy(() => import("./pages/Search"));
const Favorites = React.lazy(() => import("./pages/Favorites"));
const WatchHistory = React.lazy(() => import("./pages/WatchHistory"));
const CelebrityMatch = React.lazy(() => import("./pages/CelebrityMatch"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites());
      dispatch(fetchHistory());
    }
  }, [user, dispatch]);

  return (
    <BrowserRouter>
      <div className="app">
        <CustomCursor />
        <Navbar />
        <main>
          <CinematicLoader>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/search" element={<Search />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/history" element={<WatchHistory />} />
                <Route path="/celebrity" element={<CelebrityMatch />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </Suspense>
          </CinematicLoader>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;