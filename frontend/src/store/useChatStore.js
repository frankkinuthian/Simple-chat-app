import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // Fetches the list of users from the server and updates the store with the result
  getUsers: async () => {
    set({
      isUsersLoading: true,
    });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Fetches messages for a specific user from the server and updates the store with the result
  getMessages: async (userId) => {
    set({
      isMessagesLoading: true,
    });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // selected user clicked
  setSelectedUser: (selectedUser) => set({ selectedUser })
}));