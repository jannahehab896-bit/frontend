import React from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/Button";
import { useRole } from "../context/RoleContext";

const APP_BG = "var(--app-bg)";
const SAGE = "#97BF6A";

export function ItemReturnedScreen() {
  const navigate = useNavigate();
  const { role, setRole } = useRole();

  // Finders cannot change item status to returned
  if (role === "finder") {
    return (
      <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: APP_BG }}>
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-5">
          <div className="text-[52px]">📦</div>
          <div>
            <p className="text-[18px] text-[#111] dark:text-[#F0EDE6]" style={{ fontWeight: 700 }}>
              Seeker Mode Required
            </p>
            <p className="text-[14px] text-[#888] dark:text-[#6E6A65] mt-2 leading-relaxed">
              Marking an item as returned is only available in Seeker mode.
            </p>
          </div>
          <button
            onClick={() => setRole("seeker")}
            className="h-12 px-8 rounded-[28px] text-[15px] text-white"
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
      className="w-full h-full flex flex-col items-center justify-between px-6 py-16"
      style={{ background: APP_BG }}
    >
      {/* Top spacer */}
      <div />

      {/* Success content */}
      <div className="flex flex-col items-center text-center gap-5">
        {/* Icon */}
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center text-[64px]"
          style={{ background: "var(--app-green-bg)" }}
        >
          ✅
        </div>

        <div>
          <h1
            className="text-[28px] text-[#111] dark:text-[#F0EDE6] leading-tight"
            style={{ fontWeight: 800 }}
          >
            Item Returned{"\n"}Successfully!
          </h1>
          <p className="text-[14px] text-[#888] dark:text-[#6E6A65] mt-3 leading-relaxed">
            Great news! Your item has been returned.{"\n"}
            Don't forget to rate your finder.
          </p>
        </div>

        {/* Returned item detail */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#252320] shadow-sm w-full">
          <img
            src="https://images.unsplash.com/photo-1551081717-5574f25d3a21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200"
            alt="Returned item"
            className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
          />
          <div>
            <p className="text-[17px] text-[#111] dark:text-[#F0EDE6]" style={{ fontWeight: 700 }}>
              Black wallet
            </p>
            <p className="text-[13px] text-[#888] dark:text-[#6E6A65] mt-0.5">Returned by Mohamed omar</p>
            <p className="text-[13px] mt-0.5" style={{ color: "#16C864", fontWeight: 600 }}>
              Returned ✓
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full flex flex-col gap-3">
        <Button
          variant="brand"
          onClick={() => navigate("/rate/1")}
        >
          Rate the Finder
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate("/home")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}