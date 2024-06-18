/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Heart from "react-animated-heart";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovie,
  editMovie,
  fetchMovies,
  fetchUserMovies,
  getUserMovie,
  rateMovie,
  toggleWatched,
} from "../actions/movieActions";
import { loginUser, signUpUser } from "../actions/userActions";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
export default function ModalComponent({ isOpen, onClose, movie }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user?.user);
  const userMovie = useSelector((state) => state.movies.userMovie);

  const [watch, setWatched] = useState(false);
  const [authForm, showAuthForm] = useState(false);
  const [login, showLogin] = useState(false);
  const [deleteModal, showDeleteModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [rating, setRating] = useState(movie.rating || 0);

  const [editData, setEditData] = useState({
    original_title: movie.original_title,
    overview: movie.overview,
  });

  useEffect(() => {
    if (user) {
      dispatch(getUserMovie(movie._id, user));
    }
  }, [dispatch, movie._id, user]);

  const ratingChanged = (newRating) => {
    setRating(newRating);
    if (user) {
      dispatch(rateMovie(movie._id, newRating, user, movie)).then(()=>{
        dispatch(fetchUserMovies());
        dispatch(fetchMovies());
      }).then(()=>{
        onClose();
        window.location.reload();
      })
    } else {
      showAuthForm(true);
    }
  };


  const toggleWatchlist = () => {
    const newWatchStatus = !watch;
    setWatched(newWatchStatus);
    if (user) {
      dispatch(toggleWatched(movie._id, newWatchStatus, user, movie));
    } else {
      showAuthForm(true);
    }
  };

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeLogin = (e) => {
    setFormDataLogin({
      ...formDataLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    dispatch(signUpUser(formData));
    onClose(); // Close the modal after submission
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("formDataLogin", formDataLogin);
    dispatch(loginUser(formDataLogin));
    onClose(); // Close the modal after submission
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editMovie(movie._id, editData))
      .then(() => {
        dispatch(fetchUserMovies());
        dispatch(fetchMovies());
      })
      .then(() => {
        setEditMode(false);
        onClose();
        window.location.reload(); // Refresh the page after the updates
      })
      .catch((error) => {
        console.error("Error editing movie:", error);
      });
  };

  const handleDeleteSubmit = () => {
    dispatch(deleteMovie(movie._id)).then(()=>{
      dispatch(fetchUserMovies());
      toast.success("Deleted Successfully")
    }).then(()=>{
      onClose(); // Close the modal after submission
      window.location.reload();
    })
  };

  useEffect(() => {
    // Initialize the watch state from the movie prop
    setWatched(movie.watched || false);
    setRating(movie.rating || 0);
  }, [movie]);

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const genreArray = movie.genres.split(",").map((genre) => genre.trim());

  return (
    <>
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
                {editMode ? (
                  <div className="w-[300px] flex flex-col gap-3">
                    <input
                      type="text"
                      name="original_title"
                      value={editData.original_title}
                      onChange={handleEditChange}
                      className="focus:outline-none bg-transparent text-xl text-[#edededc2] font-semibold mt-4 mr-2"
                    />
                    <textarea
                      type="text"
                      rows={4}
                      name="overview"
                      value={editData.overview}
                      onChange={handleEditChange}
                      className=" resize-none bg-transparent text-[#cbcbcb9d] max-h-[250px] overflow-y-auto w-[300px] focus:outline-none"
                    />
                    <button
                      onClick={handleEditSubmit}
                      className="text-[#ededed] bg-[#ffffff28] text-sm p-2 rounded-full mt-2"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
                <div className="flex flex-col gap-3 justify-end text-[#cbcbcb9d] absolute bottom-6">
                  <div className="flex justify-start items-center gap-2">
                    <button
                      onClick={() => {
                        showDeleteModal(true);
                      }}
                      className="flex justify-start items-center gap-3 text-xs px-2 p-1 bg-[#ffffff28] hover:bg-[#ffffff67] text-[#cbcbcb9d] hover:text-[#ffffff] transition-all duration-300 ease-in-out rounded-full"
                    >
                      Delete <MdDelete />
                    </button>
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="flex justify-start items-center gap-3 text-xs px-2 p-1 bg-[#ffffff28] hover:bg-[#ffffff67] text-[#cbcbcb9d] hover:text-[#ffffff] transition-all duration-300 ease-in-out rounded-full"
                    >
                      Edit <MdModeEdit />
                    </button>
                  </div>
                  <div className="z-30 flex justify-start items-center gap-3">
                    <p className="font-semibold">Rating</p>
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      value={rating}
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
                    <div
                      className={`absolute right-0 ${
                        watch ? "mr-[-45px]" : "mr-[-25px]"
                      }`}
                    >
                      <Heart isClick={watch} onClick={toggleWatchlist} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
      {deleteModal && (
        <>
          <Modal
            backdrop="blur"
            size="lg"
            isOpen={isOpen}
            onClose={onClose}
            classNames={{
              body: "z-50 rounded-3xl bg-[#000000] overflow-hidden",
              base: "z-50 rounded-3xl bg-[#000000] dark:bg-[#19172c] text-[#a8b0d3]",
              closeButton: "z-50 hover:bg-white/5 active:bg-white/10",
            }}
          >
            <ModalContent>
              <div className="overflow-hidden">
                <div className="absolute inset-0 bg-black/60"></div>
                <div>
                  <ModalHeader>
                    <h1 className="z-50 text-xl font-semibold text-[#ffffff]">
                      Are you sure you want to delete ?
                    </h1>
                  </ModalHeader>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={handleDeleteSubmit}>
                      Action
                    </Button>
                  </ModalFooter>
                </div>
              </div>
            </ModalContent>
          </Modal>
        </>
      )}
      {authForm && (
        <>
          {login ? (
            <>
              {/* Login up modal */}
              <Modal
                backdrop="blur"
                size="xl"
                isOpen={isOpen}
                onClose={onClose}
                classNames={{
                  body: "z-50 rounded-3xl bg-[#000000] overflow-hidden",
                  base: "z-50 rounded-3xl bg-[#000000] dark:bg-[#19172c] text-[#a8b0d3]",
                  closeButton: "z-50 hover:bg-white/5 active:bg-white/10",
                }}
              >
                <ModalContent>
                  <div className="overflow-hidden">
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div>
                      <ModalHeader>
                        <h1 className="z-50 text-xl font-semibold text-[#ffffff]">
                          Login{" "}
                          <spam className="text-[#ffffff74]">
                            to rate and add to watchlist
                          </spam>
                        </h1>
                      </ModalHeader>
                      <ModalBody>
                        <form
                          onSubmit={handleLoginSubmit}
                          className="z-50 flex flex-col gap-4"
                        >
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formDataLogin.email}
                            onChange={handleChangeLogin}
                            className="focus:outline-none p-2 rounded-full pl-4 bg-[#ffffff1b] text-[#dcdcdc]"
                            required
                          />
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formDataLogin.password}
                            onChange={handleChangeLogin}
                            className="focus:outline-none p-2 rounded-full pl-4 bg-[#ffffff1b] text-[#dcdcdc]"
                            required
                          />
                          <div className="text-[#dcdcdc69] flex justify-between items-center">
                            <button
                              onClick={() => {
                                showLogin(false);
                              }}
                            >
                              Create an account ?{" "}
                              <span className="text-[#dcdcdcc6]">Sign Up</span>
                            </button>
                            <Button
                              type="submit"
                              color="primary"
                              className="rounded-full my-4"
                            >
                              Submit
                            </Button>
                          </div>
                        </form>
                      </ModalBody>
                    </div>
                  </div>
                </ModalContent>
              </Modal>
            </>
          ) : (
            // Sign up modal
            <Modal
              backdrop="blur"
              size="xl"
              isOpen={isOpen}
              onClose={onClose}
              classNames={{
                body: "z-50 rounded-3xl bg-[#000000] overflow-hidden",
                base: "z-50 rounded-3xl bg-[#000000] dark:bg-[#19172c] text-[#a8b0d3]",
                closeButton: "z-50 hover:bg-white/5 active:bg-white/10",
              }}
            >
              <ModalContent>
                <div className="overflow-hidden">
                  <div className="absolute inset-0 bg-black/60"></div>
                  <div>
                    <ModalHeader>
                      <h1 className="z-50 text-xl font-semibold text-[#ffffff]">
                        Sign Up{" "}
                        <spam className="text-[#ffffff74]">
                          to rate and add to watchlist
                        </spam>
                      </h1>
                    </ModalHeader>
                    <ModalBody>
                      <form
                        onSubmit={handleSignUpSubmit}
                        className="z-50 flex flex-col gap-4"
                      >
                        <input
                          type="text"
                          name="userName"
                          placeholder="User Name"
                          value={formData.userName}
                          onChange={handleChange}
                          className=" focus:outline-none p-2 rounded-full pl-4 bg-[#ffffff1b] text-[#dcdcdc]"
                          required
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                          className="focus:outline-none p-2 rounded-full pl-4 bg-[#ffffff1b] text-[#dcdcdc]"
                          required
                        />
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          className="focus:outline-none p-2 rounded-full pl-4 bg-[#ffffff1b] text-[#dcdcdc]"
                          required
                        />
                        <div className="text-[#dcdcdc69] flex justify-between items-center">
                          <button
                            onClick={() => {
                              showLogin(true);
                            }}
                          >
                            Already a user ?{" "}
                            <span className="text-[#dcdcdcc6]">Login</span>
                          </button>
                          <Button
                            type="submit"
                            color="primary"
                            className="rounded-full my-4"
                          >
                            Submit
                          </Button>
                        </div>
                      </form>
                    </ModalBody>
                  </div>
                </div>
              </ModalContent>
            </Modal>
          )}
        </>
      )}
    </>
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
