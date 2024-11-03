import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, emailVerification } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import UpdateProfile from "../components/UpdateProfile";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/login", {
      replace: true,
    });
  };

  const handleVerification = async () => {
    await emailVerification();
  };

  if (user) {
    return (
      <div className="max-w-xl mx-auto py-5">
        <h1 className="flex gap-x-4 py-5 items-center">
          {user.photoURL && (
            <img src={user.photoURL} className="w-14 h-14 rounded-full" />
          )}
          Session Active ({user.email})
          <button
            onClick={handleLogout}
            className="inline-flex text-nowrap disabled:opacity-20 cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button>
          {!user.Verified && (
            <button
              onClick={handleVerification}
              className="inline-flex text-nowrap disabled:opacity-20 cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Verify Email
            </button>
          )}
        </h1>

        <UpdateProfile />
      </div>
    );
  }

  return (
    <div>
      <Link to={"/register"}>Sign Up</Link>
      <Link to={"/login"}>Login</Link>
    </div>
  );
};

export default Home;
