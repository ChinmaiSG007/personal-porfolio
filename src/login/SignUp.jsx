import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import "./login.css";

const userNames = ["Test1", "Test2", "Test3", "Test4"];

const Login = () => {
    const navigate = useNavigate();
    const [userStatus, setUserStatus] = useState("new-user");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");
    const [usernameMessage, setUsernameMessage] = useState({ text: "", isValid: false });
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn) {
            navigate("/home");
        }
    }, [navigate]);

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 4) strength++;
        if (password.length >= 8) strength++;
        if (password.length >= 10) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[1-9]/.test(password)) strength++;
        if (/[A-Za-z0-3]/.test(password)) strength++;

        if (password.length === 0) return "";
        if (strength <= 2) return "weak";
        if (strength > 2 && strength <= 4) return "medium";
        return "strong";
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === "password") {
            setPasswordStrength(calculatePasswordStrength(value));
        }

        if (name === "username") {
            if (!userNames.includes(value)) {
                setUsernameMessage({ text: "Username is available", isValid: true });
            } else {
                setUsernameMessage({ text: "Username is not available", isValid: false });
            }
        }
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const handleSignUp = () => {
        if (!formData.name.trim()) {
            showToast('Please enter your name', 'error');
            return;
        }

        if (!validateEmail(formData.email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }

        if (userNames.includes(formData.username)) {
            showToast('Username is not available', 'error');
            return;
        }

        if (passwordStrength !== "strong") {
            showToast('Password is too weak', 'error');
            return;
        }

        showToast('Sign up successful!', 'success');
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("username", formData.username);
        localStorage.setItem("name", formData.name);
        setTimeout(() => {
            navigate("/home");
        }, 2000);
    };

    const handleLogin = () => {
        const { username, password } = formData;

        if (!username || !password) {
            toast({
                title: "Error",
                description: "Please fill in all fields",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Success",
            description: "Login successful!",
        });

        localStorage.setItem("isLoggedIn", true);
        navigate("/home");
    };

    const isNewUser = userStatus === "new-user";


    const AuthContent = () => {
        return (
            <div className={`container ${isNewUser ? passwordStrength : ""}`}>
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
                <h2>{isNewUser ? "Sign Up" : "Login"}</h2>

                {isNewUser && (
                    <>
                        <div className="inputBox">
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="inputBox">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </>
                )}

                <div className="inputBox">
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleInputChange}
                        style={{
                            border: formData.username && (usernameMessage.isValid ? "1px solid green" : "1px solid red")
                        }}
                    />
                    {formData.username && (
                        <p className="message" style={{ color: usernameMessage.isValid ? "green" : "red" }}>
                            {usernameMessage.text}
                        </p>
                    )}
                </div>

                <div className="inputBox">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {formData.password && (
                        <div
                            className={`show ${showPassword ? "hide" : ""}`}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    )}
                </div>

                <button
                    className={isNewUser ? "signUp" : "login"}
                    onClick={isNewUser ? handleSignUp : handleLogin}
                >
                    {isNewUser ? "Sign Up" : "Login"}
                </button>

                <p className="login">
                    {isNewUser ? "Already a user? " : "Not a user? "}
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setUserStatus(isNewUser ? "existing-user" : "new-user");
                            setFormData({
                                username: "",
                                password: "",
                                name: "",
                                email: "",
                            });
                            setPasswordStrength("");
                            setUsernameMessage({ text: "", isValid: false });
                            navigate(isNewUser ? "/login" : "/signup");
                        }}
                    >
                        {isNewUser ? "Login Here" : "Sign Up Here"}
                    </a>
                </p>
                {isNewUser && <div className="strengthMeter" />}
            </div>
        );
    };

    return <AuthContent />;
};

export default Login;