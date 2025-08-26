import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Loader, Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const SideBar = () => {
  const { getUsers, users, selectedUser, setSelecteduser, isUserLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  let [filterUsers, setFilterUsers] = useState(false);
  useEffect(() => {
    getUsers();
    // console.log(users);
  }, [getUsers]);

  useEffect(() => {
    // console.log(selectedUser);
  }, [selectedUser]);

  let filteredUsers = filterUsers
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUserLoading)
    return (
      <div className="h-full  border-r w-96 overflow-auto bg-chat-heading border p-4 flex justify-center items-center ">
        <Loader className="animate-spin text-text" />
      </div>
    );
  return (
    <div className="bg-chat-heading h-full w-96 overflow-auto  flex flex-col border border-black ">
      <div className="w-full h-auto bg-chat-heading text-text flex gap-3 pt-2 pb-2   justify-start ps-4 items-center">
        <Users className="size-4" />
        <p className="text-sm">Contacts</p>
      </div>
      <div className="w-full h-auto bg-chat-heading text-text flex border-b pb-2  justify-start ps-4 items-center">
        <p className="flex items-center gap-2 text-xs">
          <input
            onChange={() => setFilterUsers((prev) => !prev)}
            type="checkbox"
            className="bg-black rounded border-2 border-black flex items-center justify-center peer-checked:after:content-['✓'] peer-checked:after:text-white peer-checked:after:text-sm peer-checked:after:font-bold transition duration-200"
          />{" "}
          Show Online ({onlineUsers.length - 1})
        </p>
      </div>

      <div className="">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className={`${
              selectedUser?._id === user._id ? "bg-navbar" : "bg-chat-heading text-text"
            } hover:bg-navbar`}
          >
            <button
              onClick={() => {
                if (selectedUser === user._id) {
                  return setSelecteduser(null);
                }
                setSelecteduser(user);
              }}
              key={user._id}
              className={`cursor-pointer w-full h-14 px-4 py-2  flex items-center`}
            >
              <div className="relative">
                <img className="h-10 w-10 rounded-full" src={user.profilepic} />
                {onlineUsers.includes(user._id) && (
                  <span className="h-2 w-2 bg-green-400 rounded-full absolute top-1 right-0" />
                )}
              </div>
              <div className="ms-3">
                <h3 className="text-sm text-white">{user.fullName}</h3>
                <h3 className="text-xs text-gray-400">{user.fullName}</h3>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
