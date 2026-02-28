import { useState } from "react";
import { useRegister } from "@/hooks/useAuth";
import { toast } from 'sonner'
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "@/constants";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Logo & Icons
import Logo from "@/assets/logo/logo.svg";
import EyeOpen from "@/assets/icon/eye.svg";
import EyeOff from "@/assets/icon/eyeclose.svg";

export default function RegisterPage() {
  const navigate = useNavigate()
  const { mutate: register, isPending } = useRegister()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    register(
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      },
      {
        onSuccess: () => {
          toast.success('Account created successfully! Please log in.')
          navigate(ROUTES.Login)
        },
        onError: () => toast.error('Failed to create account. Please try again.'),
      }
    )
  }

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
            <Label htmlFor="name" className="text-sm font-semibold">Name</Label>
            <Input 
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-3 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="email" className="text-sm font-bold">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-3 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="phone" className="text-sm font-bold">Nomor Handphone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-3 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="password" className="text-sm font-bold">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm outline-none focus:border-blue-500"
                required
              />
              {/* Show password */}
              <button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                  setShowConfirm(!showConfirm);
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
            <Label htmlFor="confirmPassword" className="text-sm font-bold">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm outline-none focus:border-blue-500"
                required
              />
              {/* Show password */}
              <button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                  setShowConfirm(!showConfirm);
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

          {/* Button */}
          <Button
            type="submit"
            disabled={isPending}
            size={"xl"}
            style={{
              backgroundColor: "#1C65DA",
              color: "white",
              width: "100%",
              borderRadius: "9999px",
            }}
          >
            {isPending ? "Loading..." : "Submit"}
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
