// actions/userActions.js
import axios from "axios";
import { toast } from "react-toastify";

// const apiUrl = 'http://localhost:3000';
const apiUrl = "https://backend-cinequeue-m5oxsas1y-madhur002s-projects.vercel.app";

export const signUpUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/signup`, userData);
    dispatch({ type: "SIGN_UP", payload: response.data });
    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify(response.data));
    toast.success("Successfully Signed in");
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, userData);
    dispatch({ type: "LOGIN_USER", payload: response.data });

    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify(response.data));
    toast.success("Successfully logged in");
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

// actions/userActions.js
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("user");

  // Show toast notification
  toast.success("Successfully logged out");
  dispatch({ type: "LOGOUT_USER" });
};
