import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, User, X } from "lucide-react";
import { useState } from "react";

const UpdateProfile = () => {
  const { isUpdatingProfile, authUser, updateProfile } = useAuthStore();
  let [selectedImage, setSelectedImage] = useState(null);
  let [viewImg, setViewImg] = useState(false);
  console.log(authUser);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      console.log("Image base64:", base64Image);
      setSelectedImage(base64Image);
      await updateProfile({ profilepic: base64Image });
    };
  };

  return (
    <div className="min-h-[calc(100vh-32px)] bg-navbar relative  p-8 flex justify-center ">
      <div className="w-96 h-full my-auto bg-chat-heading text-text shadow-lg p-6 flex flex-col items-center rounded-2xl">
        {/* proile image */}
        <div className="text-center flex flex-col items-center gap-5 justify-center">
          <h1>
            <User className="inline size-5" /> Profile
          </h1>
          <div className="relative">
            <img
              onClick={() => setViewImg(true)}
              src={selectedImage || authUser.profilepic}
              className="h-30 w-30 object-cover rounded-full"
            />
            <label className="cursor-pointer" htmlFor="profilepic">
              <Camera className="p-1 text-white rounded-full top-20 absolute size-8 bg-navbar  right-0" />
            </label>
            <input
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
              id="profilepic"
              className="hidden"
              type="file"
            />
          </div>
        </div>
        {/* profile details */}
        <div className="w-full p-4">
          <div className="mt-3 w-full">
            <label htmlFor="email" className="block text-xs mb-1">
              Full Name :
            </label>
            <input
              disabled
              id="email"
              className="border w-full text-xs px-2 py-1 focus:outline-none focus:ring-0 focus:border-base-content"
              value={authUser.fullName}
              type="email"
            />
          </div>

          <div className="mt-3 w-full">
            <label htmlFor="email" className="block text-xs mb-1">
              Email :
            </label>
            <input
              disabled
              id="email"
              className="border w-full text-xs px-2 py-1 focus:outline-none focus:ring-0 focus:border-base-content"
              value={authUser.email}
              type="email"
            />
          </div>
        </div>
        <hr />

        {/* extra details */}
        <div className="w-full space-y-2 p-4 text-sm">
          <p>
            Status:
            {authUser ? (
              <span className="ms-4 text-green-800">Online</span>
            ) : (
              ""
            )}
          </p>
          <p>
            Created at : {new Date(authUser.createdAt).toLocaleString("en-IN")}
          </p>
        </div>
      </div>
      <div
        className={`bg-pri z-10 ${
          viewImg ? "block" : "hidden"
        } top-8 max-w-96 w-auto absolute shadow-lg items-center rounded-2xl`}
      >
        <div className="relative">
          <img className="object-cover" src={authUser.profilepic} />
          <X
            className="top-2 absolute right-2"
            onClick={() => setViewImg(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
