import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Edit2, Star, Package, CheckCircle } from "lucide-react";
import { BottomNav } from "../components/layout/BottomNav";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/users.service";
import type { User } from "../types";

const APP_BG = "var(--app-bg)";
const SAGE   = "#97BF6A";

export function ProfileScreen() {
  const navigate      = useNavigate();
  const { user: ctxUser, setUser } = useAuth();

  // Prefer context user; fall back to fetching if context is empty
  const [profile, setProfile] = useState<User | null>(ctxUser);

  useEffect(() => {
    if (!ctxUser) {
      userService.getProfile().then((u) => {
        setProfile(u);
        setUser(u);
      }).catch(() => {});
    } else {
      setProfile(ctxUser);
    }
  }, [ctxUser, setUser]);

  const stats = [
    { icon: <Package size={18} />,    value: String(profile?.reportsCount ?? "—"), label: "Reports" },
    { icon: <CheckCircle size={18} />, value: String(profile?.matchesCount ?? "—"),  label: "Matches" },
    { icon: <Star size={18} />,        value: profile ? profile.rating.toFixed(1) : "—", label: "Rating"  },
  ];

  const personalFields = [
    { label: "Full Name", value: profile?.name     ?? "—" },
    { label: "Email",     value: profile?.email    ?? "—" },
    { label: "Phone",     value: profile?.phone    ?? "—" },
    { label: "Location",  value: profile?.location ?? "—" },
  ];

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: APP_BG }}>
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Top gradient card */}
        <div
          className="pt-14 pb-8 px-5 flex flex-col items-center gap-3"
          style={{ background: "var(--app-profile-gradient)" }}
        >
          {/* Avatar */}
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-[40px]"
              style={{ background: "rgba(151,191,106,0.2)", border: `3px solid ${SAGE}` }}
            >
              🙂
            </div>
            <button
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center shadow"
              style={{ background: SAGE }}
            >
              <Edit2 size={13} className="text-white" />
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-[22px] text-[#111] dark:text-[#F0EDE6]" style={{ fontWeight: 700 }}>
              {profile?.name ?? "—"}
            </h1>
            <div className="flex items-center justify-center gap-1 mt-1">
              <MapPin size={13} className="text-[#555] dark:text-[#9A9690]" />
              <span className="text-[13px] text-[#555] dark:text-[#9A9690]">
                {profile?.location ?? "—"}
              </span>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-6 mt-2">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1" style={{ color: SAGE }}>
                  {s.icon}
                  <span className="text-[18px] text-[#111] dark:text-[#F0EDE6]" style={{ fontWeight: 700 }}>
                    {s.value}
                  </span>
                </div>
                <span className="text-[12px] text-[#888] dark:text-[#6E6A65]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Edit profile */}
        <div className="px-5 mt-5">
          <div className="bg-white dark:bg-[#252320] rounded-2xl shadow-sm p-4 flex flex-col gap-4">
            <p className="text-[15px] text-[#111] dark:text-[#F0EDE6]" style={{ fontWeight: 600 }}>
              Personal Info
            </p>
            {personalFields.map((field) => (
              <div key={field.label} className="flex flex-col gap-1">
                <span className="text-[12px] text-[#888] dark:text-[#6E6A65]">{field.label}</span>
                <div className="flex items-center justify-between border-b border-[#EBEBEB] dark:border-[#3A3734] pb-2">
                  <span className="text-[15px] text-[#111] dark:text-[#F0EDE6]">{field.value}</span>
                  <Edit2 size={14} className="text-[#BBBBBB] dark:text-[#5E5A55]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings shortcut */}
        <div className="px-5 mt-4">
          <button
            onClick={() => navigate("/settings")}
            className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl active:opacity-80 transition-opacity"
            style={{ background: SAGE }}
          >
            <span className="text-white text-[15px]" style={{ fontWeight: 600 }}>
              Go to Settings
            </span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
