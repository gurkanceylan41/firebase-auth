import React, { useState } from "react";
import { update, auth, resetPassword } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({
      displayName,
      photoURL: avatar,
    });
    dispatch(
      login({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      })
    );
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPassword(password);
    if (result) {
      setPassword("");
    }
  };

  return (
    <div className="grid gap-y-10">
      <form onSubmit={handleSubmit} className="grid gap-y-4">
        <h1 className="text-xl font-bold mb-4">Update Profile</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={displayName}
              placeholder="John Doe"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Photo URL
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={avatar}
              placeholder="https://example.com/photo.jpg"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex disabled:opacity-20 cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </div>
      </form>

      <form onSubmit={handleResetSubmit} className="grid gap-y-4">
        <h1 className="text-xl font-bold mb-4">Update Password</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <input
              type="password"
              value={password}
              placeholder="Leave blank if you don't want to change it!"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex disabled:opacity-20 cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
