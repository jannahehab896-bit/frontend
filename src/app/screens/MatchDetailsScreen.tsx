import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { MapPin, ChevronRight } from "lucide-react";
import { TopBar } from "../components/layout/TopBar";
import { Button } from "../components/ui/Button";
import { useRole } from "../context/RoleContext";
import { matchService, timeAgo } from "../services/matches.service";
import type { Match } from "../types";

const APP_BG = "var(--app-bg)";
const SAGE = "#97BF6A";

export function MatchDetailsScreen() {
  const navigate = useNavigate();
  const { id }   = useParams<{ id: string }>();
  const { role, setRole } = useRole();

  const [match, setMatch]     = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role === "seeker") {
      matchService
        .getMatchById(id ?? "1")
        .then(setMatch)
        .catch(() => setMatch(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id, role]);

  const handleNotMine = async () => {
    if (match) await matchService.dismissMatch(match.id).catch(() => {});
    navigate("/home");
  };

  // Finders cannot receive match notifications or view match details actions
  if (role === "finder") {
    return (
      <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: APP_BG }}>
        <TopBar title="Match Details" />
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-5">
          <div className="text-[52px]">🔍</div>
          <div>
            <p className="text-[18px] text-[#111] dark:text-[#F0EDE6]" style={{ fontWeight: 700 }}>
              Seeker Mode Required
            </p>
            <p className="text-[14px] text-[#888] dark:text-[#6E6A65] mt-2 leading-relaxed">
              Match notifications are only available when you're looking for a lost item.
            </p>
          </div>
          <button
            onClick={() => setRole("seeker")}
            className="h-12 px-8 rounded-[28px] text-[15px] text-white transition-all"
            style={{ background: SAGE, fontWeight: 600 }}
          >
            Switch to Seeker
          </button>
        </div>
      </div>
    );
  }

  if (loading || !match) {
    return (
      <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: APP_BG }}>
        <TopBar title="Match Details" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[14px] text-[#BBBBBB] dark:text-[#5E5A55]">
            {loading ? "Loading…" : "Match not found"}
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
      <TopBar title="Match Details" />

      {/* Location + time subtitle */}
      <div className="px-5 pb-3 flex items-center gap-1.5 flex-shrink-0">
        <MapPin size={13} className="text-[#888] dark:text-[#6E6A65] flex-shrink-0" />
        <span className="text-[13px] text-[#555] dark:text-[#9A9690]" style={{ fontWeight: 500 }}>
          {match.location}
        </span>
        <span className="text-[13px] text-[#BBBBBB] dark:text-[#5E5A55] mx-0.5">·</span>
        <span className="text-[12px] text-[#999] dark:text-[#5E5A55]">
          {timeAgo(match.createdAt)}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* Finder's note — chat bubble style */}
        <div className="mb-5">
          <p
            className="text-[12px] uppercase tracking-wider text-[#999] dark:text-[#5E5A55] mb-2"
            style={{ fontWeight: 600 }}
          >
            Finder&apos;s note
          </p>
          <div className="rounded-[20px] rounded-tl-[6px] px-4 py-3 bg-white dark:bg-[#252320] shadow-sm">
            <p className="text-[14px] text-[#555] dark:text-[#9A9690] leading-relaxed">
              &quot;{match.finderNote}&quot;
            </p>
          </div>
        </div>

        {/* Item Match Card */}
        <div className="mb-2">
          <p
            className="text-[12px] uppercase tracking-wider text-[#999] dark:text-[#5E5A55] mb-2"
            style={{ fontWeight: 600 }}
          >
            Item match
          </p>
          <div
            className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#252320]"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
          >
            <img
              src={match.itemImageUrl}
              alt={match.itemName}
              className="w-[72px] h-[72px] rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p
                className="text-[17px] text-[#111] dark:text-[#F0EDE6]"
                style={{ fontWeight: 700 }}
              >
                {match.itemName}
              </p>
              <p className="text-[13px] mt-0.5" style={{ color: SAGE, fontWeight: 600 }}>
                Likely yours
              </p>

              {/* Match percentage + progress bar */}
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12px] text-[#888] dark:text-[#6E6A65]" style={{ fontWeight: 500 }}>
                    Match confidence
                  </span>
                  <span className="text-[13px]" style={{ color: SAGE, fontWeight: 700 }}>
                    {match.confidence}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-[#E8E8E8] dark:bg-[#3A3734] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${match.confidence}%`, background: SAGE }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[12px] text-[#BBBBBB] dark:text-[#5E5A55] mb-6 px-1">
          Based on description, color, and location data.
        </p>

        {/* Primary CTA */}
        <div className="mb-3">
          <Button
            variant="primary"
            icon={<ChevronRight size={18} />}
            onClick={() => navigate(`/finder/${match.finder.id}`)}
          >
            View Finder Details
          </Button>
        </div>

        {/* Secondary — "Not mine" */}
        <Button variant="secondary" onClick={handleNotMine}>
          Not mine
        </Button>
      </div>
    </div>
  );
}
