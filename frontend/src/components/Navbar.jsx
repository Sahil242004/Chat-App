import { LogOut, MessageSquareQuote, User } from "lucide-react";
import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate, useNavigate } from "react-router";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  let navigate = useNavigate();

  return (
    <div className="w-full h-8 bg-navbar flex items-center justify-between px-4">
      {/* left side */}
      <div className="cursor-pointer text-text ps-4 flex gap-2 items-center" onClick={() => navigate("/")}>
      <MessageSquareQuote className="text-text size-5" /><p className="text-text">Gossip</p>
      </div>
      {/* right side */}
      <div className="flex items-center gap-2">
        {authUser ? (
          <>
            <div
              onClick={() => navigate("/update-profile")}
              className=" rounded-md bg-navbar-2 px-1 py-[2px] hover:scale-95 cursor-pointer text-xs flex items-center space-x-1"
            >
              <User className="size-3 text-text" />
              <p className="text-[11px] text-text">Profile</p>
            </div>
            <div
              onClick={() => logout()}
              className=" rounded-md bg-navbar-2 px-1 py-[2px] hover:scale-95 cursor-pointer text-xs flex items-center space-x-1"
            >
              <LogOut className="size-3 text-text" />
              <p className="text-[11px] text-text">Logout</p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
