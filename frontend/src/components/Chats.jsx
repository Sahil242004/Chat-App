import React from "react";
import { useChatStore } from "../store/useChatStore";
import { Key, Loader } from "lucide-react";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { formatTime } from "../lib/utils";

const Chats = () => {
  const {
    messages,
    selectedUser,
    isMessagesLoading,
    getMessages,
    setSelecteduser,
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

  if (isMessagesLoading)
    return (
      <div className="w-full h-[calc(100vh-160px)] overflow-y-auto bg-red-400  flex flex-col justify-center items-center">
        <h1 className="text-black block font-semibold text-5xl">
          <Loader className="animate-spin" />
        </h1>
        <p>Loading Chats</p>
        {/* <p className="text-black text-sm mt-4">Please Select a user to chat</p> */}
      </div>
    );

  return (
    <div className="w-full h-full bg-chat-bg overflow-y-auto">
      <div className="flex flex-col  px-4 py-4">
        {messages?.map((message) => (
          <div
            key={message._id}
            className={` max-w-2/4 min-w-10 flex flex-col ${
              message.senderId === authUser._id ? "self-end " : "self-start  "
            } mt-2`}
          >
            <p
              className={`text-[10px] pe-1 ${
                message.senderId === authUser._id
                  ? "self-end pe-1"
                  : "self-start  ps-1"
              }`}
            >
              {formatTime(message.createdAt)}
            </p>
            <div
              className={`max-w-full ${
                message.senderId === authUser._id
                  ? " bg-white"
                  : "  text-black bg-blue-400/40"
              } shadow-xl  text-black   rounded-lg text-xs  `}
            >
              <div className="flex flex-col">
                {(message.text || message.image) && (
                  <p className="p-2">
                    {message.image && (
                      <img
                        className="max-h-60 max-w-60 mb-2 rounded-md"
                        src={message.image}
                      />
                    )}
                    <span>{message.text ? message.text : "image"}</span>
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
  );
};

export default Chats;
