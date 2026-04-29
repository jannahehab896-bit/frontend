import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { TopBar } from "../components/layout/TopBar";
import { Badge } from "../components/ui/Badge";
import { useRole } from "../context/RoleContext";
import { notificationService } from "../services/notifications.service";
import type { Notification } from "../types";

const APP_BG = "var(--app-bg)";

export function NotificationsScreen() {
  const navigate = useNavigate();
  const { role } = useRole();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (role === "seeker") {
      notificationService
        .getNotifications()
        .then(setNotifications)
        .catch(() => setNotifications([]));
    }
  }, [role]);

  const handleNotificationPress = (n: Notification) => {
    // Mark as read then navigate
    notificationService.markRead(n.id).catch(() => {});
    navigate(n.path);
  };

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: APP_BG }}
    >
      <TopBar title="Notification" />

      <div className="flex-1 overflow-y-auto px-5 pt-2 pb-8">
        {role === "finder" ? (
          /* Finders cannot receive match notifications */
          <div className="flex flex-col items-center justify-center h-full text-center gap-4 pb-16">
            <div className="text-[48px]">🔔</div>
            <p className="text-[16px] text-[#111] dark:text-[#F0EDE6]" style={{ fontWeight: 600 }}>
              No notifications
            </p>
            <p className="text-[13px] text-[#888] dark:text-[#6E6A65] leading-relaxed max-w-[240px]">
              Match notifications are only available in Seeker mode.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {notifications.length === 0 && (
              <p className="text-center text-[14px] text-[#888] dark:text-[#6E6A65] mt-8">
                No notifications yet
              </p>
            )}
            {notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => handleNotificationPress(n)}
                className="flex items-center justify-between w-full px-4 py-4 rounded-2xl active:opacity-80 transition-colors"
                style={{ background: "var(--app-notif-bg)" }}
              >
                <span
                  className="text-[15px] text-[#111] dark:text-[#F0EDE6]"
                  style={{ fontWeight: 500 }}
                >
                  {n.message}
                </span>
                <Badge variant="notification">{n.count}</Badge>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
