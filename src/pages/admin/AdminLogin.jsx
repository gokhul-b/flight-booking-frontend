import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTokenFixed, setIsTokenFixed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenFixed) {
      navigate("/addflights");
    }
  }, [isTokenFixed, navigate]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const query = { email: email, password: password };
    const url = "https://weak-pear-magpie.cyclic.app/adminlogin";
    const doNavigate = () => {
      setTimeout(() => {
        navigate("/addflights");
      }, 2000);
      localStorage.setItem("token", true);
    };
    const isAuthenticated = async () => {
      try {
        const response = await axios.get(url, { params: query });
        const bool = response.data;
        console.log(bool);
        if (bool) {
          // localStorage.setItem("token", true);
          setIsTokenFixed(true);
          // navigate("/addflights");
          doNavigate();
        } else {
          setEmail("");
          setPassword("");
        }
        // if (bool) {
        //   setTimeout(() => {
        //     navigate("/addflights");
        //   }, 2000);
        //   localStorage.setItem("token", true);
        // } else {
        //   setEmail("");
        //   setPassword("");
        // }
      } catch (error) {
        console.error(error);
      }
    };
    isAuthenticated();
  };
  // const navi = async() => {
  //     localStorage.setItem('token',true)
  // }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="max-w-md mx-auto sm:w-[400px]">
        <form
          onSubmit={handleAdminLogin}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col space-y-4"
        >
          <h2 className="text-center font-medium">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="border rounded w-full py-2 px-3 text-gray-700"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="border rounded w-full py-2 px-3 text-gray-700"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default AdminLogin;
