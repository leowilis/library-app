import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useLogout } from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/index";
import Logo from "@/assets/logo/logo.svg";
import AvatarIcon from "@/assets/avatar/avatar.svg";

const TABS = [
  { label: "Borrowed List", path: "/admin/borrowed" },
  { label: "User", path: "/admin/users" },
  { label: "Book List", path: "/admin/books" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();
  const { user } = useSelector((state: RootState) => state.auth);

  const isFormPage = 
    location.pathname.includes("/edit") || 
    location.pathname.includes("/add");

  const isPreviewPage = location.pathname.match(/\/admin\/books\/\d+$/);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        {/* LEFT SIDE: LOGO (Always Visible) */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/admin/books')}>
          <img src={Logo} alt="logo" className="w-8 h-8" />
          <span className="text-xl font-bold text-gray-900">Booky</span>
        </div>

        {/* RIGHT SIDE: Profile */}
        <div className="flex items-center gap-3">
          {isPreviewPage ? (
            <img
              src={(user as any)?.profilePhoto ?? AvatarIcon}
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover cursor-pointer"
            />
          ) : (
            <>
              <img
                src={(user as any)?.profilePhoto ?? AvatarIcon}
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="text-sm font-semibold text-gray-900">
                {(user as any)?.name ?? "Admin"}
              </span>
              <button
                onClick={logout}
                className="text-xs text-gray-500 hover:text-red-500 transition-colors ml-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Tabs - Hidden on Edit/Add AND Preview Pages */}
      {!isFormPage && !isPreviewPage && (
        <div className="px-4 md:px-8 pt-4">
          <div className="flex bg-neutral-100 rounded-2xl p-2">
            {TABS.map((tab) => {
              const active = location.pathname.startsWith(tab.path);
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className="flex-1 py-3 rounded-xl text-sm transition-all"
                  style={{
                    backgroundColor: active ? "white" : "transparent",
                    color: active ? "#1c65da" : "#6b7280",
                    fontWeight: active ? 600 : 400,
                    boxShadow: active ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Content */}
      <main className="px-4 md:px-8 py-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}