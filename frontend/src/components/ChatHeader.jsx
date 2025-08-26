import React from "react";
import { useChatStore } from "../store/useChatStore";
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelecteduser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  // console.log("printing online users");
  // console.log(onlineUsers);
  return (
    <div className="h-auto w-full bg-chat-heading  flex items-center justify-between ps-4 pe-4 py-1 border-b">
      <div className="h-10  flex justify-start items-center">
        <img className="h-8 w-8 rounded-full" src={selectedUser.profilepic} />
        <div className="self-start ms-2 ">
          <p className="text-sm text-text">{selectedUser.fullName}</p>
          {onlineUsers?.includes(selectedUser._id) ? (
            <p className="text-xs text-green-400">Online </p>
          ) : (
            <p className="text-xs text-text">Offline </p>
          )}
        </div>
      </div>
      <div>
        <X className="size-5 text-text" onClick={() => setSelecteduser(null)} />
      </div>
    </div>
  );
};

export default ChatHeader;
