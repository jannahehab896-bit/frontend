import React from "react";
import { useNavigate, useLocation } from "react-router";
import { Home, FileText, Settings, User, Plus } from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: <Home size={20} />, label: "Home", path: "/home" },
  { icon: <FileText size={20} />, label: "Reports", path: "/past-reports" },
  { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
  { icon: <User size={20} />, label: "Profile", path: "/profile" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="absolute bottom-6 left-0 right-0 flex justify-center px-5 flex-shrink-0 z-20">
      <div
        className="flex items-center h-[64px] px-4 gap-1 rounded-full"
        style={{ background: "var(--app-nav-bg)", boxShadow: "0 8px 32px rgba(0,0,0,0.35)" }}
      >
        {navItems.slice(0, 2).map((item) => (
          <NavButton
            key={item.path}
            item={item}
            active={location.pathname === item.path}
            onPress={() => navigate(item.path)}
          />
        ))}

        {/* Center FAB */}
        <button
          onClick={() => navigate("/report")}
          className="mx-2 w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-[#333330] active:bg-gray-100 dark:active:bg-[#3A3734] transition-colors shadow"
        >
          <Plus size={22} className="text-[#111] dark:text-[#F0EDE6]" strokeWidth={2.5} />
        </button>

        {navItems.slice(2).map((item) => (
          <NavButton
            key={item.path}
            item={item}
            active={location.pathname === item.path}
            onPress={() => navigate(item.path)}
          />
        ))}
      </div>
    </div>
  );
}

function NavButton({
  item,
  active,
  onPress,
}: {
  item: NavItem;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <button
      onClick={onPress}
      className={[
        "w-11 h-11 flex items-center justify-center rounded-full transition-colors",
        active ? "text-white" : "text-white/50",
      ].join(" ")}
    >
      {item.icon}
    </button>
  );
}