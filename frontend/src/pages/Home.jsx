import React from "react";
import { useChatStore } from "../store/useChatStore";
import SideBar from "../components/SideBar";
import ChatWindow from "../components/ChatWindow";

const Home = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-[calc(100vh-32px)] w-full bg-chat-heading flex">
      {/* side bar */}
      <SideBar />
      {/* main screen */}
      {selectedUser ? (
        <ChatWindow />
      ) : (
        <div className="h-ful w-full bg-heading-bg  p-8">
          <div className="w-full h-full  flex flex-col justify-center items-center">
            <h1 className="text-text block font-semibold text-5xl">
              Welcome To Gossip
            </h1>
            <p className="text-text text-sm mt-4">
              Please Select a user to chat
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
