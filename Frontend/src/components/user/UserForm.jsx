import React, { useState, Suspense, useContext } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Environment, OrbitControls } from "@react-three/drei";
import { Link, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import Blueobj from "../3D/circle/Blueobj";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";

const UserForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotCard, setShowForgotCard] = useState(false);

  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOtp] = useState("");

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const user = await login(email, password);
      if (user && user.status) {
        navigate("/dashboard");
      } else {
        alert(user?.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:3030/user/signup", {
        fullName,
        username,
        email,
        contactNumber,
        password,
      })
      .then((res) => {
        alert("Account Created Successfully");
        setIsLogin(!isLogin);
        setEmail("");
        setPassword("");
      })
      .catch((e) => {
        alert("incorrect username or password");
      });
  };

  const sendOTP = async (email) => {
    await axios
      .post("http://localhost:3030/user/sendOTP", { email })
      .then((res) => {
        alert("OTP Sent Successfully");
      })
      .catch((e) => {
        alert("Error sending OTP");
      });
  };

  const varifyOTP = async (email, otp) => {
    await axios
      .post("http://localhost:3030/user/verifyOTP", { email, otp })
      .then((res) => {
        alert("OTP Verified Successfully");
        setShowForgotCard(false);
        setShowOTPInput(false);
        setOtp("");
        navigate("/resetpassword", { state: { email } });
      })
      .catch((e) => {
        alert("Error verifying OTP");
      });
  };

  return (
    <>
      <Link to="/" className="HomeIcon z-10 absolute p-8">
        <MdOutlineArrowBackIos color="white" size={25} />
      </Link>
      <div className="flex w-full bg-black text-white">
        <div className="h-screen w-1/2">
          <Canvas camera={{ fov: 30, position: [0, 0, 350] }}>
            <Environment
              files={[
                "https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/4k/photo_studio_01_4k.exr",
              ]}
            />
            <ambientLight intensity={1} />
            <OrbitControls enableZoom={false} />
            <Suspense fallback={null}>
              <Blueobj position={[0, 0, 0]} />
            </Suspense>
          </Canvas>
        </div>
        <div className="h-screen w-1/2 flex items-center justify-center text-white">
          <div className="backdrop-blur-sm p-6 rounded-xl flex flex-col justify-center -ml-56 h-[380px] w-[430px]">
            {isLogin ? (
              <>
                <form>
                  <h1 className="text-3xl font-bold mb-4">
                    Login to your account
                  </h1>
                  <p className="text-sm mb-6">
                    Log in to your account to get started
                  </p>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                      className="input"
                      placeholder="s@example.com"
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-2"
                    >
                      Password
                    </label>
                    <input
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      id="password"
                      className="input"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <p
                      onClick={() => setShowForgotCard(true)}
                      className="text-blue-500 font-semibold"
                    >
                      Forgot Password?
                    </p>
                  </div>

                  {showForgotCard && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black h-96 bg-opacity-100 z-50">
                      <div className="w-[90%] sm:w-[400px] p-6 bg-black rounded-2xl">
                        <h2 className="text-xl font-semibold mb-5 text-center">
                          Reset Password
                        </h2>

                        <label className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          readOnly
                          className="input w-full bg-zinc-900 cursor-not-allowed mb-4"
                        />

                        {/* OTP Input Field */}
                        {showOTPInput && (
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                              Enter OTP
                            </label>
                            <div className="flex justify-between gap-2">
                              {[...Array(6)].map((_, i) => (
                                <input
                                  key={i}
                                  type="text"
                                  maxLength={1}
                                  className="w-10 h-10 text-center text-lg border border-zinc-400 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  value={otp[i] || ""}
                                  id={`otp-${i}`}
                                  onChange={(e) => {
                                    const val = e.target.value.replace(
                                      /\D/,
                                      ""
                                    );
                                    if (!val) return;

                                    const newOtp = otp.split("");
                                    newOtp[i] = val;
                                    setOtp(newOtp.join(""));

                                    const nextInput = document.getElementById(
                                      `otp-${i + 1}`
                                    );
                                    if (nextInput) nextInput.focus();
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Backspace") {
                                      e.preventDefault(); // Prevent default backspace behavior
                                      const newOtp = otp.split("");
                                      newOtp[i] = "";
                                      setOtp(newOtp.join(""));

                                      const prevInput = document.getElementById(
                                        `otp-${i - 1}`
                                      );
                                      if (prevInput && otp[i] === "")
                                        prevInput.focus();
                                    }
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Send OTP or Verify OTP Buttons */}
                        {!showOTPInput ? (
                          <button
                            type="button"
                            onClick={() => {
                              setShowOTPInput(true);
                              sendOTP(email);
                            }}
                            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold"
                          >
                            Send OTP
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold"
                            onClick={() => {
                              varifyOTP(email, otp);
                            }}
                          >
                            Verify OTP
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setShowForgotCard(false);
                            setShowOTPInput(false);
                            setOtp("");
                          }}
                          className="mt-4 text-sm text-gray-500 hover:underline w-full text-center"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <button
                      type="submit"
                      onClick={handleLogin}
                      className="w-full bg-zinc-300 text-zinc-950 px-4 py-2 rounded-lg font-semibold"
                    >
                      Log in
                    </button>
                  </div>

                  <div className="flex justify-center text-sm">
                    <label className="text-zinc-500">
                      Don't have an account?
                    </label>
                    <p
                      onClick={handleToggleForm}
                      className="text-blue-500 ml-2 font-semibold cursor-pointer"
                    >
                      Sign up
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-4">Create an account</h1>
                <p className="text-sm mb-6">
                  Enter your email below to create your account
                </p>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Full Name"
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    autoComplete="off"
                    required
                    className="input"
                    placeholder="Username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    autoComplete="off"
                    required
                    className="input"
                    placeholder="s@example.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    className="input"
                    placeholder="Phone number"
                    onChange={(e) => {
                      setContactNumber(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-2"
                  >
                    Password
                  </label>
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    id="password"
                    className="input"
                  />
                </div>

                <div className="mb-6">
                  <button
                    onClick={handleSignup}
                    className="w-full bg-zinc-300 text-zinc-950 px-4 py-2 rounded-lg font-semibold"
                  >
                    Sign up
                  </button>
                </div>

                <div className="flex justify-center text-sm">
                  <label className="text-zinc-500">
                    Already have an account?
                  </label>
                  <p
                    onClick={handleToggleForm}
                    className="text-blue-500 ml-2 font-semibold cursor-pointer"
                  >
                    Log in
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForm;
