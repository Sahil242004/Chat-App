import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import UpdateProfile from "./pages/UpdateProfile";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";

import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";

const App = () => {
  const { checkAuth, authUser, isCheckAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckAuth && !authUser) {
    return (
      <div className="h-screen bg-chat-heading flex justify-center items-center">
        <Loader className="size-10 animate-spin text-text" />
      </div>
    );
  }

  return (
    <div className="flex overflow-hidden flex-col min-h-screen w-screen">
      <Navbar />
      <div className="flex-1 ">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="signup" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/update-profile"
            element={authUser ? <UpdateProfile /> : <Navigate to="/signup" />}
          />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
