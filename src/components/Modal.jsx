/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Heart from "react-animated-heart";
import ReactStars from "react-rating-stars-component";
export default function ModalComponent({ isOpen, onClose, movie }) {
  const [watch, setWatched] = useState(false);
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const genreArray = movie.genres.split(",").map((genre) => genre.trim());

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <Modal
      backdrop="blur"
      size="2xl"
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        body: "rounded-3xl bg-[#000000] overflow-hidden",
        base: "rounded-3xl bg-[#000000] dark:bg-[#19172c] text-[#a8b0d3]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        <div
          style={{ backgroundImage: `url(${movie.poster_path})` }}
          className="overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="rounded-3xl flex h-full overflow-hidden justify-center backdrop-blur-3xl items-start w-full gap-6">
            <img
              className="w-[350px] h-[500px] rounded-l-3xl object-cover"
              src={movie.poster_path}
              alt={movie.original_title}
            />
            <div className="mr-4 h-[500px] relative flex flex-col justify-start items-start">
              <p className="text-xl text-[#edededc2] font-semibold mt-4 mr-2">
                {movie.original_title}{" "}
                <span className="text-[#cbcbcb9d] w-[300px] text-sm mb-3">
                  {formatDate(movie.release_date)}
                </span>
              </p>
              <p className="text-[#cbcbcb9d] max-h-[190px] overflow-y-auto w-[300px] mt-4">
                {movie.overview}
              </p>
              <div className="cursor-pointer flex gap-2">
                {genreArray.map((genre, index) => (
                  <div
                    key={index}
                    className="flex text-xs px-2 my-3 p-1 bg-[#ffffff28] text-[#cbcbcb9d] rounded-full"
                  >
                    {genre.slice(0, 12)}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4 justify-end text-[#cbcbcb9d] absolute bottom-6">
                <div className="z-30 flex justify-start items-center gap-3">
                  <p className="font-semibold">Rating</p>
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                  />
                  </div>
                <div className="relative flex justify-start items-center">
                  <button
                    onClick={() => {
                      setWatched(!watch);
                    }}
                    className=""
                  >
                    {watch ? "Added to Watch list" : "Add to Watch list"}
                  </button>
                  <div className={`absolute right-0 ${watch ? "mr-[-45px]" : "mr-[-25px]"}`}>
                    <Heart isClick={watch} onClick={() => setWatched(!watch)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}

{
  /*
  
              <Button color="secondary" variant="light" onClick={onClose}>
                Close
              </Button>
  
  <ModalFooter>
<Button color="primary" onClick={onClose}>
  Action
</Button>
</ModalFooter> */
}
