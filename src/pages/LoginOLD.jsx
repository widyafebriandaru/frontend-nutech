import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/authSlice";
import axios from "axios";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    username: "", // For registration only
    password: "",
    confirmPassword: "", // For registration only
  });

  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(true);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/Products");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const toggleLoginRegister = () => {
    setShowLogin(!showLogin);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isRegistering) {
      if (userData.password !== userData.confirmPassword) {
        console.log("Passwords do not match.");
        return;
      }

      try {
        await axios.post("http://localhost:3002/users", {
          name: userData.username,
          email: userData.email,
          password: userData.password,
          confPassword: userData.confirmPassword,
          accountType: "Pegawai",
        });
        toggleLoginRegister();
        alert("Register Success, please login to your account");
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-400 via-black to-white bg-right-bottom">
        <div className="bg-white shadow-lg rounded p-8 sm:m-28 mx-10 my-20">
          {isRegistering ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Username:</label>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-gray-600 to-black text-white rounded px-4 py-2"
              >
                Register
              </button>
              <p className="mt-4">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-gray-600 underline"
                  onClick={() => setIsRegistering(false)}
                >
                  Back to Login
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-gray-600 to-black text-white rounded px-4 py-2"
              >
                Login
              </button>
              <p className="mt-4">
                Do not have an account?{" "}
                <button
                  type="button"
                  className="text-gray-600 underline"
                  onClick={() => setIsRegistering(true)}
                >
                  Register here
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
