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
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.length;
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
    <nav className="w-full px-4 py-4 relative md:mb-10 md:px-30" ref={menuRef}>
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-4">
          <img src={Logo} alt="Booky" className="h-10 w-10" />
          <span className="hidden md:block text-xl font-semibold md:text-2xl md:font-extrabold">Booky</span>
        </Link>

        {/* Search Bar */}
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
            <button onClick={() => navigate(ROUTES.Cart)} className="relative">
              {cartCount > 0 ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M3 6H21" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <img src={Bag} width={28} height={28} alt="checkout" />
              )}
              
              {/* Badge counter */}
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center text-[11px] font-bold px-1">
                  {cartCount}
                </div>
              )}
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
        <div className="absolute top-18 left-4 right-4 rounded-2xl shadow-md z-50 px-4 py-2 md:hidden">
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
        <div className="relative top-1 min-w-full rounded-2xl shadow-md px-4 py-2 md:w-48">
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