import { Bell, Crown, Settings, Shield, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../../routes/endPoints";
import { useAuth } from "../../../../hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const username = JSON.parse(localStorage.getItem("user"))?.name || "Premium User";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-1">
                <Shield className="w-8 h-8 text-pink-600 stroke-2" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">LozoAcademy</h1>
                <div className="flex items-center space-x-1">
                  <Crown className="w-3 h-3 text-yellow-53" />
                  <span className="text-yellow-53 text-xs font-medium">PREMIUM</span>
                </div>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to={ENDPOINTS.USER.COURSES} className="text-azure-84 hover:text-white transition-colors">
                Khóa học
              </Link>
              <Link to={ENDPOINTS.USER.LABS} className="text-azure-84 hover:text-white transition-colors">
                Phòng lab
              </Link>
              <Link to={ENDPOINTS.USER.CFT} className="text-azure-84 hover:text-white transition-colors">
                CTF
              </Link>
              <Link to={ENDPOINTS.USER.ABOUT} className="text-azure-84 hover:text-white transition-colors">
                Giới thiệu
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Link to={ENDPOINTS.USER.DASHBOARD} className="p-2 hover:bg-gray-800/50 rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-azure-65" />
              </Link>
              <Link to={ENDPOINTS.USER.PROFILE} className="p-2 hover:bg-gray-800/50 rounded-xl transition-colors">
                <Settings className="w-5 h-5 text-azure-65" />
              </Link>
              <Link to={ENDPOINTS.USER.PROFILE} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-56 to-rose-51 rounded-xl flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-azure-84 text-sm">Xin chào, </span>
                  <span className="text-white text-sm font-medium">{username}</span>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-800/50 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5 text-azure-65" />
              </button>
            </div>
          </div>
        </div>
      </header>
  );
}