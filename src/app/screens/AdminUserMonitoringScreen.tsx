import React, { useState, useEffect } from "react";
import { TopBar } from "../components/layout/TopBar";
import { Badge, StarRating } from "../components/ui/Badge";
import { User } from "lucide-react";
import { adminService } from "../services/admin.service";
import type { AdminUser } from "../types";

const APP_BG = "var(--app-bg)";

const statusVariant: Record<AdminUser["status"], "returned" | "lost" | "pending"> = {
  active:    "returned",
  warned:    "pending",
  suspended: "lost",
};

const statusLabel: Record<AdminUser["status"], string> = {
  active:    "Active",
  warned:    "Warned",
  suspended: "Suspended",
};

export function AdminUserMonitoringScreen() {
  const [users, setUsers]     = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .getUsers()
      .then(setUsers)
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: APP_BG }}
    >
      <TopBar title="User Monitoring" />

      <div className="flex-1 overflow-y-auto px-5 pt-2 pb-8">
        {loading && (
          <p className="text-center text-[14px] text-[#BBBBBB] dark:text-[#5E5A55] mt-8">
            Loading…
          </p>
        )}
        <div className="flex flex-col gap-3">
          {users.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#252320] shadow-sm"
            >
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--app-avatar-bg)" }}
              >
                <User size={22} className="text-[#666] dark:text-[#9A9690]" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className="text-[15px] text-[#111] dark:text-[#F0EDE6] truncate"
                    style={{ fontWeight: 600 }}
                  >
                    {u.name}
                  </p>
                  <Badge variant={statusVariant[u.status]}>
                    {statusLabel[u.status]}
                  </Badge>
                </div>
                <p className="text-[12px] text-[#888] dark:text-[#6E6A65] truncate mt-0.5">
                  {u.email}
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  <StarRating rating={u.rating} max={5} size={14} />
                  <span className="text-[12px] text-[#888] dark:text-[#6E6A65]">
                    {u.reports} report{u.reports !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
