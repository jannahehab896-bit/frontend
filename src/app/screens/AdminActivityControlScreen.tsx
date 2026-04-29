import React, { useState, useEffect } from "react";
import { TopBar } from "../components/layout/TopBar";
import { Button } from "../components/ui/Button";
import { Trash2, Clock } from "lucide-react";
import { adminService } from "../services/admin.service";
import type { AdminActivity } from "../types";

const APP_BG = "var(--app-bg)";

type PendingAction = { type: "delete" | "postpone"; id: string } | null;

export function AdminActivityControlScreen() {
  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [loading, setLoading]       = useState(true);
  const [pending, setPending]       = useState<PendingAction>(null);

  useEffect(() => {
    adminService
      .getActivities()
      .then(setActivities)
      .catch(() => setActivities([]))
      .finally(() => setLoading(false));
  }, []);

  const confirmAction = async () => {
    if (!pending) return;

    if (pending.type === "delete") {
      await adminService.deleteActivity(pending.id).catch(() => {});
      setActivities((prev) => prev.filter((a) => a.id !== pending.id));
    } else {
      await adminService.postponeActivity(pending.id).catch(() => {});
      setActivities((prev) =>
        prev.map((a) => (a.id === pending.id ? { ...a, flagged: false } : a))
      );
    }

    setPending(null);
  };

  const target = pending ? activities.find((a) => a.id === pending.id) : null;

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: APP_BG }}
    >
      <TopBar title="Activity Control" />

      <div className="flex-1 overflow-y-auto px-5 pt-2 pb-8">
        {loading && (
          <p className="text-center text-[14px] text-[#BBBBBB] dark:text-[#5E5A55] mt-8">
            Loading…
          </p>
        )}

        <div className="flex flex-col gap-3">
          {activities.map((a) => (
            <div
              key={a.id}
              className="rounded-2xl bg-white dark:bg-[#252320] shadow-sm overflow-hidden"
              style={a.flagged ? { border: "1.5px solid #EF444444" } : {}}
            >
              {/* Content */}
              <div className="px-4 pt-4 pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[14px] text-[#111] dark:text-[#F0EDE6]" style={{ fontWeight: 600 }}>
                        {a.user}
                      </p>
                      {a.flagged && (
                        <span
                          className="text-[11px] px-2 py-0.5 rounded-full"
                          style={{ background: "#FEE2E2", color: "#EF4444", fontWeight: 600 }}
                        >
                          Flagged
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#888] dark:text-[#6E6A65]" style={{ fontWeight: 500 }}>
                      {a.type} · {a.time}
                    </p>
                    <p className="text-[13px] text-[#555] dark:text-[#9A9690] mt-1 leading-relaxed">
                      {a.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="flex border-t border-[#F0F0F0] dark:border-[#2E2C29]">
                <button
                  onClick={() => setPending({ type: "postpone", id: a.id })}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 text-[13px] text-[#888] dark:text-[#6E6A65] active:bg-gray-50 dark:active:bg-[#2E2C29] transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  <Clock size={14} />
                  Postpone
                </button>
                <div className="w-px bg-[#F0F0F0] dark:bg-[#2E2C29]" />
                <button
                  onClick={() => setPending({ type: "delete", id: a.id })}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 text-[13px] active:bg-red-50 dark:active:bg-[#2E1818] transition-colors"
                  style={{ color: "#EF4444", fontWeight: 500 }}
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}

          {!loading && activities.length === 0 && (
            <p className="text-center text-[14px] text-[#888] dark:text-[#6E6A65] mt-8">
              No activities to review
            </p>
          )}
        </div>
      </div>

      {/* Confirmation dialog overlay */}
      {pending && target && (
        <div className="absolute inset-0 z-40 flex items-end justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setPending(null)}
          />
          {/* Sheet */}
          <div className="relative w-full bg-white dark:bg-[#252320] rounded-t-[28px] px-6 pt-6 pb-10 flex flex-col gap-4 shadow-[0_-8px_40px_rgba(0,0,0,0.12)]">
            <div>
              <p className="text-[18px] text-[#111] dark:text-[#F0EDE6]" style={{ fontWeight: 700 }}>
                {pending.type === "delete" ? "Delete Activity?" : "Postpone Activity?"}
              </p>
              <p className="text-[13px] text-[#888] dark:text-[#6E6A65] mt-1 leading-relaxed">
                {pending.type === "delete"
                  ? "This will permanently remove the activity. This action cannot be undone."
                  : "This will suspend the activity temporarily pending further review."}
              </p>
            </div>

            {/* Activity preview */}
            <div className="px-4 py-3 rounded-xl" style={{ background: "var(--app-bg)" }}>
              <p className="text-[13px] text-[#555] dark:text-[#9A9690]" style={{ fontWeight: 500 }}>
                {target.user}: {target.description}
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setPending(null)}>
                Cancel
              </Button>
              <Button
                variant={pending.type === "delete" ? "primary" : "brand"}
                onClick={confirmAction}
              >
                {pending.type === "delete" ? "Delete" : "Postpone"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
