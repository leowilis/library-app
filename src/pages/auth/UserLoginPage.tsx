import {  useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'sonner'
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useAuth";

// Logo & Icons
import Logo from "@/assets/logo/logo.svg";
import EyeOpen from "@/assets/icon/eye.svg";
import EyeOff from "@/assets/icon/eyeclose.svg";

export default function UserLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { mutate: login, isPending } = useLogin()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(
      { email, password },
      {
        onSuccess: () => toast.success('Welcome back!'),
        onError: () => toast.error('Wrong email or password'),
      }
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-5">
          <img src={Logo} width={33} height={33} alt="logo" />
          <h1 className="text-2xl font-bold">Booky</h1>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">Login</h1>
        <p className="text-md text-neutral-700">
          Sign in to manage your library account.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-7">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-3 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 bg-transparent border-none cursor-pointer"
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

          {/* Button */}
          <Button
            type="submit"
            disabled={login.isPending}
            size={"xl"}
            style={{
              backgroundColor: "#1C65DA",
              color: "white",
              width: "100%",
              borderRadius: "9999px",
            }}
          >
            {login.isPending ? "Loading..." : "Login"}
          </Button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-neutral-950 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
