import React, { useState, useEffect } from "react";
import { TopBar } from "../components/layout/TopBar";
import { Badge, StarRating } from "../components/ui/Badge";
import { BottomNav } from "../components/layout/BottomNav";
import { reportService } from "../services/reports.service";
import type { Report } from "../types";

const APP_BG = "var(--app-bg)";

type Tab = "ongoing" | "past";

const cardBg: Record<Report["status"], string> = {
  lost:     "var(--app-pink-bg)",
  returned: "var(--app-green-bg)",
};

export function PastReportsScreen() {
  const [tab, setTab]         = useState<Tab>("ongoing");
  const [allReports, setAll]  = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reportService
      .getMyReports()
      .then(setAll)
      .catch(() => setAll([]))
      .finally(() => setLoading(false));
  }, []);

  const reports = allReports.filter((r) =>
    tab === "ongoing" ? r.status === "lost" : r.status === "returned"
  );

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: APP_BG }}
    >
      <TopBar title="My Reports" />

      {/* Tab / segmented control */}
      <div className="px-5 mb-4 flex-shrink-0">
        <div
          className="inline-flex rounded-full p-1"
          style={{ background: "var(--app-nav-bg)" }}
        >
          <TabButton
            label="Ongoing"
            active={tab === "ongoing"}
            onPress={() => setTab("ongoing")}
          />
          <TabButton
            label="Past Reports"
            active={tab === "past"}
            onPress={() => setTab("past")}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-2 pb-28">
        <div className="flex flex-col gap-3">
          {loading && (
            <p className="text-center text-[14px] text-[#BBBBBB] dark:text-[#5E5A55] mt-8">
              Loading…
            </p>
          )}
          {!loading && reports.length === 0 && (
            <p className="text-center text-[14px] text-[#888] dark:text-[#6E6A65] mt-8">
              No {tab === "ongoing" ? "ongoing" : "past"} reports
            </p>
          )}
          {reports.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between px-5 py-4 rounded-[28px]"
              style={{ background: cardBg[r.status] }}
            >
              <div className="flex flex-col gap-2">
                <p
                  className="text-[17px] text-[#111] dark:text-[#F0EDE6]"
                  style={{ fontWeight: 600 }}
                >
                  {r.name}
                </p>
                <StarRating rating={r.rating} max={5} size={18} />
              </div>
              <Badge variant={r.status === "lost" ? "lost" : "returned"}>
                {r.status === "lost" ? "still lost" : "Returned"}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function TabButton({
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
