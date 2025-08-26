import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useState } from "react";
import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import Chats from "./Chats";
import { Images, Loader, SendHorizontal } from "lucide-react";
import ChatInput from "./ChatInput";
import { formatTime } from "../lib/utils";
import { useRef } from "react";

const ChatWindow = () => {
  let lastChatRef = useRef(null);
  // const { unSubscribeFromMessages, subscribeToMessages } = useChatStore();

  // console.log(chatUser);

  const {
    messages,
    selectedUser,
    isMessagesLoading,
    getMessages,
    subscribeToMessages,
    unSubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unSubscribeFromMessages();
    // console.log(messages);
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unSubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messages && lastChatRef.current)
      lastChatRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // return (
  //   <div className="h-ful w-full bg-ter p-8">
  //     <div className="w-full h-full  flex flex-col justify-center items-center">
  //       <h1 className="text-black block font-semibold text-5xl">Chat Window</h1>
  //       <p className="text-black text-sm mt-4">Please Select a user to chat</p>
  //     </div>
  //   </div>
  // );

  return (
    <div className="h-ful w-full flex flex-col bg-chat-heading ">
      <ChatHeader />
      {/* <Chats /> */}{" "}
      {isMessagesLoading ? (
        <div className="w-full h-[calc(100vh-160px)] overflow-y-auto bg-heading-bg flex flex-col justify-center items-center">
          <h1 className="text-text block font-semibold text-5xl">
            <Loader className="animate-spin text-text" />
          </h1>
          <p className="text-text">Loading Chats</p>
          {/* <p className="text-black text-sm mt-4">Please Select a user to chat</p> */}
        </div>
      ) : (
        <div className="w-full h-full bg-chat-bg overflow-y-auto">
          <div className="flex flex-col  px-4 py-4">
            {messages?.map((message) => (
              <div
                ref={lastChatRef}
                key={message._id}
                className={` max-w-2/4 min-w-10 flex flex-col ${
                  message.senderId === authUser._id
                    ? "self-end "
                    : "self-start  "
                } mt-2`}
              >
                <p
                  className={`text-[10px] text-text pe-1 ${
                    message.senderId === authUser._id
                      ? "self-end pe-1"
                      : "self-start  ps-1"
                  }`}
                >
                  {formatTime(message.createdAt)}
                </p>
                <div
                  className={`max-w-auto ${
                    message.senderId === authUser._id
                      ? " bg-gray-500/40 text-white"
                      : "  text-black bg-blue-400/50"
                  } shadow-xl  text-black   rounded-lg text-xs  `}
                >
                  <div className="flex flex-col">
                    {message.text && (
                      <p className="p-2">
                        {message.image && (
                          <img
                            className="max-h-auto max-w-auto mb-2 rounded-md"
                            src={message.image}
                            alt="image "
                          />
                        )}
                        {message.text}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="bg-white max-w-2/4 shadow-xl   p-3 rounded-lg text-xs self-start mt-2">
          Hello Sahil Daling Hello Sahil Daling Hello Sahil Daling Hello Sahil
        </div>
        <div className=" max-w-2/4 p-3 shadow-xl mt-4 rounded-lg text-xs self-end">
          Hello Sahil Daling Hello Sahil DalingHello Sahil DalingHello Sahil
          DalingHello Sahil DalingHello Sahil DalingHello Sahil DalingHello
          Sahil DalingHello Sahil DalingHello Sahil DalingHello Sahil
          DalingHello Sahil DalingHello Sahil Daling
        </div> */}
          </div>
          {/* <h1 className="text-black block font-semibold text-5xl">Chat Window</h1>
      <p className="text-black text-sm mt-4">Please Select a user to chat</p> */}
        </div>
      )}
      <ChatInput />
    </div>
  );
};

export default ChatWindow;
