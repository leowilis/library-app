import { useNavigate, useLocation } from "react-router-dom";
import { BookOpen, Users, BookMarked, LogOut } from "lucide-react"; // Example icons

export default function EditBook() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Borrowed List", path: "/admin/borrows", icon: BookMarked },
    { label: "User", path: "/admin/users", icon: Users },
    { label: "Book List", path: "/admin/books", icon: BookOpen },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col p-6">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#E0ECFF" }}>
          {/* Placeholder for Booky Logo Icon */}
          <span className="font-bold text-blue-600">B</span>
        </div>
        <span className="font-bold text-xl text-gray-900">Booky</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User Profile / Logout */}
      <div className="border-t border-gray-100 pt-6 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              {/* User Avatar Placeholder */}
              <img src="https://via.placeholder.com/40" alt="Admin" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Admin2</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}