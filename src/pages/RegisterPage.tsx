import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegister } from "@/features/auth/hooks";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo/logo.svg";
import EyeOpen from "@/assets/icon/eye.svg";
import EyeOff from "@/assets/icon/eyeclose.svg";

export default function RegisterPage() {
  const navigate = useNavigate();
  const register = useRegister();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password is not match!");
      return;
    }

    setLoading(true);
    try {
      await register({ name, email, password });
      navigate("/login");
    } catch {
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-4 mb-6">
          <img src={Logo} width={33} height={33} alt="logo" />
          <span className="font-bold text-2xl">Booky</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-1">Register</h1>
        <p className="text-neutral-700 text-sm font-semibold mb-6">
          Create your account to start borrowing books.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-3 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-3 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Nomor Handphone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-3 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm outline-none focus:border-blue-500"
                required
              />
              {/* Show password */}
              <button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                  setShowConfirmPassword(!showConfirmPassword);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-0 text-gray-400"
              >
                <img
                  src={showPassword ? EyeOff : EyeOpen}
                  width={20}
                  height={20}
                  alt="toggle password"
                />
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm outline-none focus:border-blue-500"
                required
              />
              {/* Show password */}
              <button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                  setShowConfirmPassword(!showConfirmPassword);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-0 text-gray-400"
              >
                <img
                  src={showPassword ? EyeOff : EyeOpen}
                  width={20}
                  height={20}
                  alt="toggle password"
                />
              </button>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Button */}
          <Button
            type="submit"
            disabled={loading}
            size={"xl"}
            style={{
              backgroundColor: "#1C65DA",
              color: "white",
              width: "100%",
              borderRadius: "9999px",
            }}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm text-neutral-950 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
