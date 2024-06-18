import "./App.css";
import Home from "./components/Home";
import MoviePage from "./components/MoviePage";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="bg-[url('/images/wallpaper2.avif')] bg-cover bg-no-repeat w-full h-screen">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
              <Home />
          }
        />
        <Route path="/myMovies" element={<MoviePage />} />
      </Routes>
    </div>
  );
}

export default App;
