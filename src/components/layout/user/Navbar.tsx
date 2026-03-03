import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/index";
import { logout } from "@/store/authSlice";
import { ROUTES } from "@/constants";
import Logo from "@/assets/logo/logo.svg";
import Search from "@/assets/icon/Search.svg";
import Bag from "@/assets/icon/Bag.svg";
import Menubar from "@/assets/icon/Menu.svg";
import AvatarIcon from "@/assets/avatar/avatar.svg";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`${ROUTES.Search}?q=${query.trim()}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  const handleCloseSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const handleNavigate = (route: string) => {
    navigate(route);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate(ROUTES.Login);
  };

  return (
    <nav className="w-full px-4 py-4 relative bg-white shadow-sm md:mb-10 md:px-30" ref={menuRef}>
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-4">
          <img src={Logo} alt="Booky" className="h-10 w-10" />
          <span className="hidden md:block text-xl font-semibold md:text-2xl md:font-extrabold">Booky</span>
        </Link>

        {/* Search Bar - Always visible on desktop when logged in, toggleable on mobile */}
        {token ? (
          // When logged in, always show search bar on desktop
          <div className="hidden md:flex flex-1 max-w-xl mx-8 bg-white border border-neutral-300 rounded-full px-4 py-2">
            <img src={Search} width={18} height={18} alt="search" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              placeholder="Search book"
              className="flex-1 bg-transparent text-sm text-neutral-600 outline-none placeholder:text-neutral-600 ml-2"
            />
          </div>
        ) : searchOpen ? (
          // When not logged in, show search bar only when searchOpen is true
          <div className="flex-1 flex items-center gap-2 mx-3 bg-gray-100 rounded-full px-4 py-2">
            <img src={Search} width={18} height={18} alt="search" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              placeholder="Search book"
              className="flex-1 bg-transparent text-sm text-gray-600 outline-none placeholder:text-neutral-600"
            />
            <button
              onClick={handleCloseSearch}
              className="text-gray-400 text-xl leading-none"
            >
              ×
            </button>
          </div>
        ) : (
          // Search button for mobile when not logged in
          <div className="flex items-center gap-5">
            <button onClick={() => setSearchOpen(true)} className="md:hidden">
              <img src={Search} width={28} height={28} alt="search" />
            </button>
          </div>
        )}

        {/* Right side icons and buttons */}
        {token ? (
          // User profile section when logged in
          <div className="flex items-center gap-5">
            {/* Cart icon - visible on desktop when logged in */}
            <button onClick={() => navigate(ROUTES.Cart)} className="relative">
              <img src={Bag} width={28} height={28} alt="checkout" />
            </button>
            
            {/* User avatar and dropdown */}
            <div className="flex items-center gap-5">
              {user?.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <img
                  src={AvatarIcon}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
              )}
              <span className="hidden md:block text-md font-semibold">{user?.name}</span>
              <button 
                onClick={() => setMenuOpen((prev) => !prev)}
                className="ml-1"
              >
                <svg width="15" height="15" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        ) : (
          // Login/Register buttons when not logged in
          <>
            {/* Desktop Login/Register Buttons */}
            <div className="hidden md:flex gap-3">
              <button
                onClick={() => handleNavigate(ROUTES.Login)}
                className="px-6 py-2 rounded-full text-sm font-bold border border-neutral-300"
              >
                Login
              </button>
              <button
                onClick={() => handleNavigate(ROUTES.Register)}
                className="px-6 py-2 rounded-full text-sm font-bold text-white bg-[#1C65DA]"
              >
                Register
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden"
            >
              <img src={Menubar} width={28} height={28} alt="menu" />
            </button>
          </>
        )}
      </div>

      {/* Dropdown - Only for mobile when not logged in */}
      {menuOpen && !token && (
        <div className="absolute top-18 left-4 right-4 rounded-2xl bg-white shadow-md z-50 px-4 py-2 md:hidden">
          <div className="flex gap-3 py-2">
            <button
              onClick={() => handleNavigate(ROUTES.Login)}
              className="flex-1 py-2.5 rounded-full text-sm font-bold border border-neutral-300"
            >
              Login
            </button>
            <button
              onClick={() => handleNavigate(ROUTES.Register)}
              className="flex-1 py-2.5 rounded-full text-sm font-bold text-white bg-[#1C65DA]"
            >
              Register
            </button>
          </div>
        </div>
      )}

      {/* Dropdown - For logged in users (both mobile and desktop) */}
      {menuOpen && token && (
        <div className="absolute top-16 right-19 w-48 rounded-2xl bg-white shadow-md z-50 px-4 py-2">
          <div className="flex flex-col">
            {[
              { label: "Profile", route: ROUTES.Profile },
              { label: "Borrowed List", route: ROUTES.ProfileBorrowed },
              { label: "Reviews", route: ROUTES.ProfileReviews },
            ].map(({ label, route }) => (
              <button
                key={label}
                onClick={() => handleNavigate(route)}
                className="text-left py-4 text-sm text-gray-950 font-semibold border-gray-100"
              >
                {label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="text-left py-3 text-sm font-semibold text-[#EE1D52]"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}