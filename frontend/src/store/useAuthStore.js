import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });

      // Connect to socket
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");

      // Connect to socket
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");

      // Disconnect from socket
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  login: async (data) => {
    // Initiates the login process by setting the isLoggingIn state to true
    set({ isLoggingIn: true });
    try {
      // Attempts to send a login request to the server and awaits the response
      const res = await axiosInstance.post("/auth/login", data);
      // Updates the authUser state with the data received from the server upon successful login
      set({ authUser: res.data });
      // Displays a success message toast to notify the user of successful login
      toast.success("Logged in successfully");

      // Calls the connectSocket method to establish a socket connection after successful login
      // This method is responsible for establishing a socket connection with the server

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      // Ensures that the isLoggingIn state is set back to false after the login attempt, regardless
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: async () => {
    // if user is not authenticated, don't connect to socket
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    //set socket state
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: async () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
