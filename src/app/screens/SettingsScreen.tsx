import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronRight,
  Bell,
  Shield,
  Globe,
  Moon,
  HelpCircle,
  LogOut,
  ArrowLeft,
  Users,
  Activity,
  Check,
} from "lucide-react";
import { BottomNav } from "../components/layout/BottomNav";
import { useDarkMode } from "../context/DarkModeContext";

const APP_BG = "var(--app-bg)";
const SAGE = "#97BF6A";

const LANGUAGES = [
  "Chinese",
  "Spanish",
  "English",
  "Italian",
  "German",
  "French",
];

interface SettingRowProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  danger?: boolean;
}

function SettingRow({ icon, label, sublabel, right, onPress, danger }: SettingRowProps) {
  return (
    <div
      onClick={onPress}
      className={`w-full flex items-center gap-4 px-4 py-3.5 bg-white dark:bg-[#252320] transition-colors ${onPress ? "cursor-pointer active:bg-gray-50 dark:active:bg-[#2E2C29]" : ""}`}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: danger ? "#FEE2E2" : "var(--app-sage-bg)" }}
      >
        <span style={{ color: danger ? "#EF4444" : SAGE }}>{icon}</span>
      </div>
      <div className="flex-1 text-left">
        <p
          className="text-[15px]"
          style={{ fontWeight: 500, color: danger ? "#EF4444" : "var(--app-text)" }}
        >
          {label}
        </p>
        {sublabel && (
          <p className="text-[12px] mt-0.5" style={{ color: "var(--app-text-muted)" }}>
            {sublabel}
          </p>
        )}
      </div>
      {right ?? <ChevronRight size={16} className="text-[#BBBBBB] dark:text-[#5E5A55]" />}
    </div>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-5 rounded-2xl overflow-hidden bg-white dark:bg-[#252320] shadow-sm divide-y divide-[#F0F0F0] dark:divide-[#2E2C29]">
      {children}
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <p
      className="px-5 pt-6 pb-2 text-[12px] uppercase tracking-widest text-[#999] dark:text-[#5E5A55]"
      style={{ fontWeight: 600 }}
    >
      {label}
    </p>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0"
      style={{ background: value ? SAGE : "#D1D5DB" }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
        style={{ transform: value ? "translateX(20px)" : "translateX(0)" }}
      />
    </button>
  );
}

export function SettingsScreen() {
  const navigate = useNavigate();
  const { isDark, toggle: toggleDark } = useDarkMode();
  const [notifications, setNotifications] = useState(true);
  const [selectedLang, setSelectedLang] = useState("English");
  const [langSheetOpen, setLangSheetOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: APP_BG }}>
      {/* Header */}
      <div className="px-5 pt-14 pb-4 flex items-center gap-3 flex-shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-[#252320] shadow-sm active:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={18} className="text-[#111] dark:text-[#F0EDE6]" />
        </button>
        <h1 className="text-[22px] text-[#111] dark:text-[#F0EDE6]" style={{ fontWeight: 700 }}>
          Settings
        </h1>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Preferences */}
        <SectionLabel label="Preferences" />
        <SectionCard>
          <SettingRow
            icon={<Bell size={17} />}
            label="Push Notifications"
            sublabel="Alerts for matches & updates"
            right={<Toggle value={notifications} onChange={setNotifications} />}
          />
          <SettingRow
            icon={<Moon size={17} />}
            label="Dark Mode"
            sublabel="Switch to a darker theme"
            right={<Toggle value={isDark} onChange={() => toggleDark()} />}
          />
          <SettingRow
            icon={<Globe size={17} />}
            label="Language"
            sublabel={selectedLang}
            onPress={() => setLangSheetOpen(true)}
          />
        </SectionCard>

        {/* Account */}
        <SectionLabel label="Account" />
        <SectionCard>
          <SettingRow
            icon={<Shield size={17} />}
            label="Privacy & Security"
            sublabel="Manage your data & permissions"
            onPress={() => {}}
          />
          <SettingRow
            icon={<HelpCircle size={17} />}
            label="Help & Support"
            sublabel="FAQs, contact us"
            onPress={() => {}}
          />
        </SectionCard>

        {/* Admin Panel */}
        <SectionLabel label="Admin" />
        <SectionCard>
          <SettingRow
            icon={<Users size={17} />}
            label="User Monitoring"
            sublabel="View user ratings & reports"
            onPress={() => navigate("/admin/users")}
          />
          <SettingRow
            icon={<Activity size={17} />}
            label="Activity Control"
            sublabel="Manage & moderate activity"
            onPress={() => navigate("/admin/activity")}
          />
        </SectionCard>

        {/* Danger zone */}
        <SectionLabel label="Session" />
        <SectionCard>
          <SettingRow
            icon={<LogOut size={17} />}
            label="Log Out"
            danger
            onPress={() => navigate("/welcome")}
            right={<span />}
          />
        </SectionCard>

        {/* App version */}
        <p className="text-center text-[12px] text-[#BBBBBB] dark:text-[#5E5A55] mt-8 pb-2">
          BACK2U · v1.0.0
        </p>
      </div>

      <BottomNav />

      {/* Language picker — bottom sheet, same style as existing confirmation dialogs */}
      {langSheetOpen && (
        <div className="absolute inset-0 z-40 flex items-end justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setLangSheetOpen(false)}
          />

          {/* Sheet */}
          <div className="relative w-full bg-white dark:bg-[#252320] rounded-t-[28px] pb-10 shadow-[0_-8px_40px_rgba(0,0,0,0.12)]">
            {/* Sheet handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-[#E0E0E0] dark:bg-[#3A3734]" />
            </div>

            {/* Title */}
            <p
              className="px-6 pt-3 pb-4 text-[18px] text-[#111] dark:text-[#F0EDE6]"
              style={{ fontWeight: 700 }}
            >
              Language
            </p>

            {/* Divider */}
            <div className="h-px bg-[#F0F0F0] dark:bg-[#2E2C29]" />

            {/* Language list — same row style as SettingRow */}
            <div className="divide-y divide-[#F0F0F0] dark:divide-[#2E2C29]">
              {LANGUAGES.map((lang) => {
                const isSelected = lang === selectedLang;
                return (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangSheetOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-6 py-4 active:bg-gray-50 dark:active:bg-[#2E2C29] transition-colors"
                  >
                    <span
                      className="text-[15px] text-[#111] dark:text-[#F0EDE6]"
                      style={{ fontWeight: isSelected ? 600 : 400 }}
                    >
                      {lang}
                    </span>
                    {isSelected && (
                      <Check size={17} style={{ color: SAGE }} strokeWidth={2.5} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
