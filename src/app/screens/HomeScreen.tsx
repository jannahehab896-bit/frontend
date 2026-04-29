import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Bell, MapPin, Edit3 } from "lucide-react";
import { BottomNav } from "../components/layout/BottomNav";
import { useRole } from "../context/RoleContext";
import { useAuth } from "../context/AuthContext";
import { reportService } from "../services/reports.service";
import type { Report } from "../types";

const APP_BG = "var(--app-bg)";

const CATEGORIES = [
  {
    id: "bag",
    label: "Bags",
    color: "#F8F8F8",
    image:
      "https://images.unsplash.com/photo-1645276255969-680d5b62789d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    fit: "cover" as const,
  },
  {
    id: "wallet",
    label: "Wallets",
    color: "#F8F8F8",
    image:
      "https://images.unsplash.com/photo-1639789972200-4c5dafacb6fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    fit: "cover" as const,
  },
  {
    id: "keys",
    label: "Keys",
    color: "#F8F8F8",
    image:
      "https://images.unsplash.com/photo-1575908539614-ff89490f4a78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    fit: "cover" as const,
  },
  {
    id: "electronics",
    label: "Headphones",
    color: "#F8F8F8",
    image:
      "https://images.unsplash.com/photo-1722891067479-5fd39edbfc3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    fit: "contain" as const,
  },
  {
    id: "other",
    label: "Documents",
    color: "#F8F8F8",
    image:
      "https://images.unsplash.com/photo-1487274910620-1add53247020?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    fit: "cover" as const,
  },
];

export function HomeScreen() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { role, setRole } = useRole();
  const { user }  = useAuth();

  const [showToast, setShowToast]       = useState(false);
  const [ongoingReports, setOngoing]    = useState<Report[]>([]);

  // Success toast after report submission
  useEffect(() => {
    const state = location.state as { reportSubmitted?: boolean } | null;
    if (state?.reportSubmitted) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  // Load ongoing (lost) reports
  useEffect(() => {
    reportService
      .getMyReports()
      .then((reports) => setOngoing(reports.filter((r) => r.status === "lost")))
      .catch(() => setOngoing([]));
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: APP_BG }}
    >
      {/* Success toast */}
      {showToast && (
        <div
          className="absolute top-16 left-5 right-5 z-30 flex items-center gap-2 px-4 py-3 rounded-xl shadow-md"
          style={{ background: "var(--app-green-bg)" }}
        >
          <span className="text-[#97BF6A] text-[15px]">✓</span>
          <p
            className="text-[14px] text-[#111] dark:text-[#F0EDE6]"
            style={{ fontWeight: 500 }}
          >
            Item reported successfully
          </p>
        </div>
      )}

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Header */}
        <div className="px-5 pt-14 flex items-start justify-between">
          <div>
            <h1
              className="text-[28px] text-[#111] dark:text-[#F0EDE6] leading-tight"
              style={{ fontWeight: 700 }}
            >
              Hello, {user?.name?.split(" ")[0] ?? "there"}
            </h1>
            <button className="flex items-center gap-1 mt-1">
              <MapPin size={13} className="text-[#555] dark:text-[#9A9690]" />
              <span className="text-[13px] text-[#555] dark:text-[#9A9690]">
                {user?.location ?? "Egypt, Giza"}
              </span>
              <Edit3
                size={11}
                className="text-[#999] dark:text-[#5E5A55] ml-0.5"
              />
            </button>
          </div>

          {/* Bell — only shows badge in seeker mode */}
          <button
            onClick={() => navigate("/notifications")}
            className="mt-1 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#252320] shadow-sm active:bg-gray-50 dark:active:bg-[#2E2C29] transition-colors relative"
          >
            <Bell size={20} className="text-[#111] dark:text-[#F0EDE6]" />
            {role === "seeker" && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#EF4444] rounded-full border-2 border-[#F5F3EE] dark:border-[#1A1916]" />
            )}
          </button>
        </div>

        {/* Role Toggle */}
        <div className="px-5 mt-5">
          <div
            className="inline-flex rounded-full p-1"
            style={{ background: "var(--app-nav-bg)" }}
          >
            <ModeButton
              label="Seeker"
              active={role === "seeker"}
              onPress={() => setRole("seeker")}
            />
            <ModeButton
              label="Finder"
              active={role === "finder"}
              onPress={() => setRole("finder")}
            />
          </div>
        </div>

        {/* What did you lose? — horizontal scroll categories */}
        <div className="mt-6">
          <p
            className="px-5 text-[15px] text-[#111] dark:text-[#F0EDE6] mb-3"
            style={{ fontWeight: 600 }}
          >
            {role === "finder" ? "What did you find?" : "What did you lose?"}
          </p>
          <div
            className="flex gap-3 overflow-x-auto pb-1"
            style={{
              paddingLeft: "20px",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            } as React.CSSProperties}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className="flex-shrink-0 w-[145px] rounded-2xl overflow-hidden active:opacity-90 transition-opacity aspect-[4/3] relative flex flex-col justify-end"
                style={{ background: cat.color }}
                onClick={() =>
                  navigate("/report", { state: { category: cat.id } })
                }
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full"
                  style={{ objectFit: cat.fit, padding: cat.fit === "contain" ? "8px" : "0" }}
                />
                <div className="relative z-10 p-3 bg-gradient-to-t from-black/40 to-transparent">
                  <span
                    className="text-[15px] text-white drop-shadow-sm"
                    style={{ fontWeight: 700 }}
                  >
                    {cat.label}
                  </span>
                </div>
              </button>
            ))}
            <div className="w-5 flex-shrink-0" />
          </div>
        </div>

        {/* Ongoing Reports */}
        <div className="px-5 mt-6">
          <div className="flex items-center justify-between mb-3">
            <p
              className="text-[15px] text-[#111] dark:text-[#F0EDE6]"
              style={{ fontWeight: 600 }}
            >
              Ongoing Reports
            </p>
            <button
              className="text-[13px] text-[#888] dark:text-[#6E6A65]"
              onClick={() => navigate("/past-reports")}
            >
              See all →
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {ongoingReports.length === 0 && (
              <p className="text-[13px] text-[#BBBBBB] dark:text-[#5E5A55]">
                No ongoing reports
              </p>
            )}
            {ongoingReports.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white dark:bg-[#252320] shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-[20px]"
                    style={{ background: "var(--app-blue-bg)" }}
                  >
                    {reportService.getCategoryEmoji(r.category)}
                  </div>
                  <span
                    className="text-[15px] text-[#111] dark:text-[#F0EDE6]"
                    style={{ fontWeight: 500 }}
                  >
                    {r.name}
                  </span>
                </div>

                <span
                  className="text-[13px] text-[#111] dark:text-[#F0EDE6] bg-white dark:bg-[#1A1916] border border-[#E0E0E0] dark:border-[#3A3734] rounded-full px-3 py-1.5 select-none"
                  style={{ fontWeight: 500 }}
                >
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function ModeButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <button
      onClick={onPress}
      className={[
        "px-5 h-9 rounded-full text-[14px] transition-all duration-200",
        active
          ? "bg-white dark:bg-[#333330] text-[#111] dark:text-[#F0EDE6]"
          : "text-white/60",
      ].join(" ")}
      style={{ fontWeight: 600 }}
    >
      {label}
    </button>
  );
}
