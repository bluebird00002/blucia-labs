import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiSettings,
  FiChevronDown,
} from "react-icons/fi";
import logoImg from "../assets/blucia-logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-blucia-dark/95 backdrop-blur-md shadow-lg shadow-blucia-light/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-6 group">
            <div className="w-24 h-24 rounded-[1.75rem] overflow-hidden transform group-hover:scale-105 transition-transform">
              <img
                src={logoImg}
                alt="BluCia Labs logo"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-blucia-white/80 hover:text-blucia-accent transition-colors font-body font-medium"
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 glass-effect rounded-lg hover:bg-white/20 transition-all group"
                >
                  <div className="w-8 h-8 bg-gradient-purple rounded-full flex items-center justify-center text-white font-heading font-semibold text-sm">
                    {user?.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span>{getInitials(user?.name)}</span>
                    )}
                  </div>
                  <span className="hidden lg:block text-blucia-white/80 font-body font-medium">
                    {user?.name?.split(" ")[0] || "User"}
                  </span>
                  <FiChevronDown
                    className={`text-blucia-white/60 transition-transform ${
                      isProfileMenuOpen ? "rotate-180" : ""
                    }`}
                    size={16}
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-effect rounded-xl shadow-2xl shadow-blucia-light/30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-white/10">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-purple rounded-full flex items-center justify-center text-white font-heading font-semibold">
                          {user?.avatar_url ? (
                            <img
                              src={user.avatar_url}
                              alt={user.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span>{getInitials(user?.name)}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-heading font-semibold truncate">
                            {user?.name || "User"}
                          </p>
                          <p className="text-blucia-white/60 text-sm font-body truncate">
                            {user?.email || ""}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        to={user?.role === "admin" ? "/admin" : "/dashboard"}
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-blucia-white/80 hover:bg-white/10 hover:text-blucia-accent transition-colors font-body"
                      >
                        <FiSettings size={18} />
                        <span>
                          {user?.role === "admin"
                            ? "Admin Dashboard"
                            : "Dashboard"}
                        </span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/20 transition-colors font-body text-left"
                      >
                        <FiLogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-blucia-white/80 hover:text-blucia-accent transition-colors font-body font-medium"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-blucia-white p-2"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 glass-effect rounded-2xl p-4 shadow-2xl shadow-blucia-light/20 animate-in fade-in slide-in-from-top-2 border border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-blucia-white/80 hover:text-blucia-accent hover:bg-white/10 transition-all font-body rounded-xl mb-2 last:mb-0"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <div className="py-2 border-t border-white/10 mt-2">
                  <div className="flex items-center space-x-3 px-2 py-2 mb-2">
                    <div className="w-10 h-10 bg-gradient-purple rounded-full flex items-center justify-center text-white font-heading font-semibold text-sm">
                      {user?.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt={user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span>{getInitials(user?.name)}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-heading font-semibold text-sm truncate">
                        {user?.name || "User"}
                      </p>
                      <p className="text-blucia-white/60 text-xs font-body truncate">
                        {user?.email || ""}
                      </p>
                    </div>
                  </div>
                </div>
                <Link
                  to={user?.role === "admin" ? "/admin" : "/dashboard"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-3 text-blucia-white/80 hover:text-blucia-accent hover:bg-white/10 rounded-xl transition-all font-body mb-2"
                >
                  <FiSettings size={18} />
                  <span>
                    {user?.role === "admin" ? "Admin Dashboard" : "Dashboard"}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full text-left px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all font-body"
                >
                  <FiLogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-blucia-white/80 hover:text-blucia-accent hover:bg-white/10 transition-all font-body rounded-xl mb-2 last:mb-0"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
