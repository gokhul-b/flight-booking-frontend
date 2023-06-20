import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === "false") {
      navigate("/search");
    }
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Redirect user to the user dashboard or desired page
      localStorage.setItem("token", false);
      navigate("/search");
      console.log("User registered:", userCredential.user);
      localStorage.setItem("userId", userCredential.user.uid);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 h-screen">
      <div className="max-w-md mx-auto sm:w-[400px]">
        <form
          onSubmit={handleSignup}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col space-y-4"
        >
          <h2 className="text-center font-medium">Sign up</h2>
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
          {error && <p>{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          >
            Signup
          </button>
        </form>
        <p className="text-center">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;
