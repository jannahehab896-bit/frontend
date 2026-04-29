import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { TopBar } from "../components/layout/TopBar";
import { Button } from "../components/ui/Button";
import { TextArea } from "../components/ui/Input";
import { User } from "lucide-react";
import { useRole } from "../context/RoleContext";
import { ratingService } from "../services/ratings.service";
import { finderService } from "../services/finders.service";
import type { FinderProfile } from "../types";

const APP_BG = "var(--app-bg)";
const SAGE = "#97BF6A";

const STAR_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

function InteractiveStar({
  filled,
  size = 32,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  filled: boolean;
  size?: number;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="active:scale-90 transition-transform"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill={filled ? "#F5A623" : "none"}
        stroke={filled ? "#F5A623" : "#CCCCCC"}
        strokeWidth="1.5"
      >
        <path d="M10 1.5l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.77l-4.77 2.44.91-5.32-3.87-3.77 5.34-.78z" />
      </svg>
    </button>
  );
}

export function RateFinderScreen() {
  const navigate        = useNavigate();
  const { id }          = useParams<{ id: string }>();
  const { role, setRole } = useRole();

  const [finder, setFinder]   = useState<FinderProfile | null>(null);
  const [rating, setRating]   = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    finderService
      .getFinderById(id ?? "1")
      .then(setFinder)
      .catch(() => {});
  }, [id]);

  const displayRating = hovered || rating;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await ratingService.submitRating({
        finderId: finder?.id ?? id ?? "1",
        rating,
        comment: comment.trim() || undefined,
      });
      navigate("/home");
    } catch {
      navigate("/home");
    } finally {
      setLoading(false);
    }
  };

  // Finders cannot rate other finders
  if (role === "finder") {
    return (
      <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: APP_BG }}>
        <TopBar title="Rate Finder" />
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-5">
          <div className="text-[52px]">⭐</div>
          <div>
            <p className="text-[18px] text-[#111] dark:text-[#F0EDE6]" style={{ fontWeight: 700 }}>
              Seeker Mode Required
            </p>
            <p className="text-[14px] text-[#888] dark:text-[#6E6A65] mt-2 leading-relaxed">
              Rating a finder is only available when you&apos;re in Seeker mode.
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

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: APP_BG }}
    >
      <TopBar title="Rate Finder" />

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* Finder mini-card */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#252320] shadow-sm mb-6">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--app-avatar-bg)" }}
          >
            <User size={26} className="text-[#666] dark:text-[#9A9690]" />
          </div>
          <div>
            <p className="text-[17px] text-[#111] dark:text-[#F0EDE6]" style={{ fontWeight: 700 }}>
              {finder?.name ?? "Mohamed Omar"}
            </p>
            <p className="text-[13px] text-[#888] dark:text-[#6E6A65]">Returned your item</p>
          </div>
        </div>

        <p className="text-center text-[16px] text-[#111] dark:text-[#F0EDE6] mb-1" style={{ fontWeight: 600 }}>
          How was your experience?
        </p>
        <p className="text-center text-[13px] text-[#888] dark:text-[#6E6A65] mb-6">
          Your rating helps the community
        </p>

        <div className="flex justify-center gap-3 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <InteractiveStar
              key={s}
              filled={s <= displayRating}
              size={36}
              onClick={() => setRating(s)}
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(0)}
            />
          ))}
        </div>

        {displayRating > 0 && (
          <p className="text-center text-[14px] mb-5" style={{ color: "#F5A623", fontWeight: 600 }}>
            {STAR_LABELS[displayRating]}
          </p>
        )}
        {displayRating === 0 && <div className="mb-5 h-5" />}

        <div className="mb-6">
          <p className="text-[15px] text-[#111] dark:text-[#F0EDE6] mb-2" style={{ fontWeight: 600 }}>
            Comment (optional)
          </p>
          <TextArea
            placeholder="Share your experience with this finder..."
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <Button
          variant="brand"
          onClick={handleSubmit}
          disabled={rating === 0 || loading}
          className={rating === 0 ? "opacity-50" : ""}
        >
          {loading ? "Submitting…" : "Submit Rating"}
        </Button>

        <Button
          variant="secondary"
          onClick={() => navigate("/home")}
          className="mt-3"
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
}
