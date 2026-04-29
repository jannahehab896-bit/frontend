import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { MessageSquare, Phone, ShieldCheck, User } from "lucide-react";
import { TopBar } from "../components/layout/TopBar";
import { Button } from "../components/ui/Button";
import { StarRating } from "../components/ui/Badge";
import { useRole } from "../context/RoleContext";
import { finderService } from "../services/finders.service";
import type { FinderProfile } from "../types";

const APP_BG = "var(--app-bg)";
const SAGE = "#97BF6A";

export function FinderDetailsScreen() {
  const navigate = useNavigate();
  const { id }   = useParams<{ id: string }>();
  const { role } = useRole();

  const [finder, setFinder]   = useState<FinderProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    finderService
      .getFinderById(id ?? "1")
      .then(setFinder)
      .catch(() => setFinder(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !finder) {
    return (
      <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: APP_BG }}>
        <TopBar title="Finder Details" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[14px] text-[#BBBBBB] dark:text-[#5E5A55]">
            {loading ? "Loading…" : "Finder not found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: APP_BG }}
    >
      <TopBar title="Finder Details" />

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* Profile Card — elevated */}
        <div
          className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#252320] mb-5"
          style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
        >
          {/* Circular avatar */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--app-avatar-bg)" }}
          >
            <User size={28} className="text-[#666] dark:text-[#9A9690]" />
          </div>

          <div className="flex-1">
            <p
              className="text-[18px] text-[#111] dark:text-[#F0EDE6]"
              style={{ fontWeight: 700 }}
            >
              {finder.name}
            </p>
            <div className="mt-1">
              <StarRating rating={finder.rating} max={5} size={16} />
            </div>
            {finder.isTrusted && (
              <p className="text-[12px] mt-1" style={{ color: SAGE, fontWeight: 600 }}>
                Trusted finder
              </p>
            )}
          </div>
        </div>

        {/* Finder message — chat bubble */}
        <div className="mb-5">
          <p
            className="text-[12px] uppercase tracking-wider text-[#999] dark:text-[#5E5A55] mb-2"
            style={{ fontWeight: 600 }}
          >
            Message
          </p>
          <div className="rounded-[20px] rounded-tl-[6px] px-4 py-3 bg-white dark:bg-[#252320] shadow-sm">
            <p className="text-[14px] text-[#555] dark:text-[#9A9690] leading-relaxed">
              &quot;{finder.message}&quot;
            </p>
          </div>
        </div>

        {/* Contact section */}
        <div className="mb-4">
          <p
            className="text-[12px] uppercase tracking-wider text-[#999] dark:text-[#5E5A55] mb-2"
            style={{ fontWeight: 600 }}
          >
            Contact
          </p>
          {/* Phone number display */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-[#252320] shadow-sm mb-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--app-sage-bg)" }}
            >
              <Phone size={16} style={{ color: SAGE }} />
            </div>
            <div>
              <p className="text-[12px] text-[#999] dark:text-[#5E5A55]">Phone number</p>
              <p className="text-[15px] text-[#111] dark:text-[#F0EDE6]" style={{ fontWeight: 600 }}>
                {finder.phone}
              </p>
            </div>
          </div>

          {/* Two equal buttons */}
          <div className="flex gap-3">
            <Button
              variant="primary"
              icon={<MessageSquare size={17} />}
              onClick={() => {}}
            >
              Chat
            </Button>
            <Button
              variant="brand"
              icon={<Phone size={17} />}
              onClick={() => {}}
            >
              Call
            </Button>
          </div>
        </div>

        {/* Safety note */}
        <div
          className="flex items-start gap-2.5 px-4 py-3 rounded-2xl mb-5"
          style={{ background: "var(--app-sage-bg)" }}
        >
          <ShieldCheck size={16} className="flex-shrink-0 mt-0.5" style={{ color: SAGE }} />
          <p className="text-[13px] text-[#555] dark:text-[#9A9690] leading-relaxed" style={{ fontWeight: 500 }}>
            Meet in a public place when retrieving your item
          </p>
        </div>

        {/* Mark as Returned — seeker only */}
        {role === "seeker" && (
          <Button
            variant="ghost"
            style={{ background: "#1A5C3E", color: "white" }}
            onClick={() => navigate("/item-returned")}
          >
            Mark as Returned
          </Button>
        )}
      </div>
    </div>
  );
}
