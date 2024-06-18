import { Card, Skeleton } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchUserMovies
} from "../actions/movieActions";
import ModalComponent from "./Modal";
import { useNavigate } from "react-router-dom";

const MoviePage = () => {
  // const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user?.user);
  const movies = useSelector((state) => state.movies.usermovies);
  console.log("movies asdasdasda",movies);
  useEffect(() => {
    dispatch(fetchUserMovies(user));
  }, [dispatch, user]);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedMovie(null); // Clear selected movie when modal is closed
  };

  useEffect(() => {
    if (movies?.length === 0) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 5000); // Wait for 5 seconds

      // Clean up the timeout if the component unmounts or if the dependency changes
      return () => clearTimeout(timer);
    }
  }, [movies?.length, navigate]);
  
  return (
    <div className="pb-28 px-8 pt-28 h-full w-full flex justify-center gap-10 items-center flex-wrap overflow-y-auto">
      { movies?.length <= 0 ? (
        <>
        {[...Array(20)].fill(null).map((_, index) => (
          <Card
            key={index} // Add a unique key for each card
            className="w-[200px] bg-[#ffffff0e] h-[300px] space-y-5"
            radius="lg"
          >
            <Skeleton className="bg-[#ffffff57] rounded-lg">
              <div className="h-[200px] rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3 pl-4">
              <Skeleton className="bg-[#ffffff57] w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="bg-[#ffffff57] w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="bg-[#ffffff57] w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </Card>
        ))}
      </>
      ) : (
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
        })
      )}
      {selectedMovie && (
        <ModalComponent
          isOpen={isOpen}
          onClose={closeModal}
          movie={selectedMovie}
        />
      )}
    </div>
  );
};

export default MoviePage;
