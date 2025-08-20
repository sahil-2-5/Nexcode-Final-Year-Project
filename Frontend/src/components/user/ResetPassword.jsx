import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Ensure email is passed via state

  const handleResetPassword = async () => {
    if (!newPassword) {
      alert("Please enter a new password.");
      return;
    }

    try {
      await axios.post("http://localhost:3030/user/resetPassword", {
        email,
        newPassword,
      });
      alert("Password reset successfully");
      navigate("/form"); 
    } catch (err) {
      alert("Failed to reset password");
    }
  };

  return (
    <div className="h-screen w-full bg-black flex justify-center items-center">
      <div className="w-[90%] sm:w-[400px] p-6 bg-zinc-900 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 text-center text-white">
          Set New Password
        </h2>

        <label className="block text-sm font-medium mb-1 text-white">
          New Password
        </label>
        <input
          type="password"
          className="input w-full mb-4"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
