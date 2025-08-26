import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      console.log("error in getUsers function");
      toast(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      let res = await axiosInstance.get(`/message/${userId}`);
      // console.log("printing response");
      // console.log(res.data);
      set({ messages: res.data });
      // console.log(messages);
    } catch (error) {
      console.log("error in get messages function");
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessages: async (data) => {
    // console.log("printing from sendMessages");
    // console.log(data);
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        data
      );
      console.log("res received");
      console.log(res.data);
      set({ messages: [...(messages || []), res.data] });
      toast.success("Message sent successfully");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  },

  setSelecteduser: (selectedUser) => {
    set({ selectedUser });
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      if (
        newMessage.senderId !== selectedUser._id &&
        newMessage.receiverId !== selectedUser._id
      ) {
        return;
      }

      set({
        messages: [...(get().messages || []), newMessage],
      });
    });
  },

  unSubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
