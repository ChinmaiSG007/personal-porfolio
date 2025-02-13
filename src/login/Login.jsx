import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import "./login.css";

const userNames = ["Test1", "Test2", "Test3", "Test4"];
const passwords = ["Test1", "Test2", "Test3", "Test4"];

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userPwCred, setUserPwCred] = useState(false);
  const [userNameCred, setUserNameCred] = useState(false);
  const [toast, setToast] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [navigate]);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (passwords.includes(newPassword)) {
      setUserPwCred(true);
    } else {
      setUserPwCred(false);
    }
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    if (!userNames.includes(newUsername)) {
      setUserNameCred(false);
    } else {
      setUserNameCred(true);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleLogin = () => {
    if (!username || !password) {
      showToast("Please fill all the fields", "error");
      return;
    }

    if (!userNameCred || !userPwCred) {
      showToast("Invalid username or password", "error");
      return;
    }

    showToast("Login successful");

    localStorage.setItem("isLoggedIn", true);
    navigate("/home");
  };

  return (
    <div className={'container'}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <h2>{"Login"}</h2>
      <div className="inputBox">
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>

      <div className="inputBox">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
        />
        {password && (
          <div
            className={`show ${showPassword ? "hide" : ""}`}
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>

      <button
        className={"login"}
        onClick={handleLogin}
      >
        {"Login"}
      </button>

      <p className="login">
        {"Not a user? "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/signup");
          }}
        >
          {"Sign Up Here"}
        </a>
      </p>
    </div>
  );
};

export default Login;