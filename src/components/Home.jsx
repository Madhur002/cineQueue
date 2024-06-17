import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalComponent from "./Modal";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        url: "https://moviedatabase8.p.rapidapi.com/Filter",
        params: {
          Genre: "Action",
          OriginalLanguage: "en",
          SpokenLanguage: "English",
          Limit: "28",
        },
        headers: {
          'x-rapidapi-key': '1a08fd2731msh55a670b6f1e9e55p117051jsn9f12c04cc72b',
          'x-rapidapi-host': 'moviedatabase8.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setMovies(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedMovie(null); // Clear selected movie when modal is closed
  };

  return (
    <div className="pb-28 px-8 pt-28 h-full w-full flex justify-center gap-10 items-center flex-wrap overflow-y-auto">
      {movies &&
        movies.map((movie) => {
          return (
            <div
              onClick={() => openModal(movie)}
              key={movie.id}
              className="bg-[#ffffff22] hover:scale-[1.05] hover:drop-shadow-[0_15px_45px_rgba(255,235,147,0.32)] transition-all duration-500 ease-in-out relative overflow-hidden rounded-2xl gap-3 flex flex-col justify-start items-start w-[200px] h-[300px]"
            >
              <img
                className="h-full"
                src={movie.poster_path}
                alt={movie.original_title}
              />
              <div className="absolute bottom-0 h-[100px] w-full backdrop-blur-xl bg-[#0000007a] flex flex-col justify-start items-start p-2">
                <p className="text-[#ffffffa6] font-semibold w-[100px] text-sm truncate ...">
                  {movie.original_title}
                </p>
                <p className="text-[#ffffff60] font-semibold w-[150px] text-xs">
                  {movie.overview.slice(0, 50)}...
                </p>
              </div>
            </div>
          );
        })}
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Hi there
      </button>
      {
        selectedMovie &&
      <ModalComponent
      isOpen={isOpen}
      onClose={closeModal}
      movie={selectedMovie}
      />
    }
    </div>
  );
};

export default Home;
