import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Camera } from "lucide-react";
import { TopBar } from "../components/layout/TopBar";
import { Button } from "../components/ui/Button";
import { TextArea, SelectField } from "../components/ui/Input";
import { reportService } from "../services/reports.service";

const APP_BG = "var(--app-bg)";

const categoryOptions = [
  { value: "",            label: "Select Item"  },
  { value: "bag",         label: "Bag"          },
  { value: "wallet",      label: "Wallet"       },
  { value: "keys",        label: "Keys"         },
  { value: "electronics", label: "Electronics"  },
  { value: "other",       label: "Other"        },
];

export function ReportItemScreen() {
  const navigate  = useNavigate();
  const location  = useLocation();

  // Pre-select category if coming from a category card on HomeScreen
  const preselect = (location.state as { category?: string } | null)?.category ?? "";

  const [description, setDescription] = useState("");
  const [loc, setLoc]                 = useState("");
  const [date, setDate]               = useState({ dd: "", mm: "", yyyy: "" });
  const [category, setCategory]       = useState(preselect);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      const formattedDate = `${date.yyyy}-${date.mm.padStart(2, "0")}-${date.dd.padStart(2, "0")}`;
      await reportService.submitReport({
        description,
        location: loc,
        date: formattedDate,
        category,
        // imageUrl would come from a prior image-upload step:
        // POST /uploads/image  →  { url: string }
      });
      navigate("/home", { state: { reportSubmitted: true } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: APP_BG }}
    >
      <TopBar title="Report Item" />

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* Image upload area */}
        <div className="flex justify-center mt-2 mb-6">
          <div className="w-40 h-40 rounded-2xl bg-white dark:bg-[#252320] shadow-sm flex flex-col items-center justify-center gap-2 active:bg-gray-50 cursor-pointer border-2 border-dashed border-[#E0E0E0] dark:border-[#3A3734] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1645276255969-680d5b62789d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
              alt="Item"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Upload button */}
        <div className="flex justify-center mb-6">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#252320] shadow-sm border border-[#E0E0E0] dark:border-[#3A3734] text-[13px] text-[#555] dark:text-[#9A9690] active:bg-gray-50">
            <Camera size={14} />
            Change photo
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl mb-4" style={{ background: "#FEE2E2" }}>
            <span className="text-[#EF4444] text-[15px]">✕</span>
            <p className="text-[14px] text-[#111]" style={{ fontWeight: 500 }}>{error}</p>
          </div>
        )}

        {/* Description */}
        <div className="mb-4">
          <p className="text-[15px] text-[#111] dark:text-[#F0EDE6] mb-2" style={{ fontWeight: 600 }}>
            Description
          </p>
          <TextArea
            placeholder="enter description...."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Location */}
        <div className="flex items-center gap-3 mb-4">
          <p className="text-[15px] text-[#111] dark:text-[#F0EDE6] flex-shrink-0" style={{ fontWeight: 600 }}>
            Location:
          </p>
          <input
            type="text"
            placeholder="Enter location"
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            className="flex-1 h-10 px-3 rounded-xl border border-[#E0E0E0] dark:border-[#3A3734] bg-white dark:bg-[#252320] text-[14px] text-[#111] dark:text-[#F0EDE6] placeholder:text-[#CCC] focus:outline-none focus:border-[#111] dark:focus:border-[#9A9690]"
          />
        </div>

        {/* Date */}
        <div className="flex items-center gap-3 mb-4">
          <p className="text-[15px] text-[#111] dark:text-[#F0EDE6] flex-shrink-0" style={{ fontWeight: 600 }}>
            Date:
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="DD"
              maxLength={2}
              value={date.dd}
              onChange={(e) => setDate((d) => ({ ...d, dd: e.target.value }))}
              className="w-14 h-10 text-center rounded-xl border border-[#E0E0E0] dark:border-[#3A3734] bg-white dark:bg-[#252320] text-[14px] text-[#111] dark:text-[#F0EDE6] placeholder:text-[#CCC] focus:outline-none focus:border-[#111]"
            />
            <input
              type="text"
              placeholder="MM"
              maxLength={2}
              value={date.mm}
              onChange={(e) => setDate((d) => ({ ...d, mm: e.target.value }))}
              className="w-14 h-10 text-center rounded-xl border border-[#E0E0E0] dark:border-[#3A3734] bg-white dark:bg-[#252320] text-[14px] text-[#111] dark:text-[#F0EDE6] placeholder:text-[#CCC] focus:outline-none focus:border-[#111]"
            />
            <input
              type="text"
              placeholder="YYYY"
              maxLength={4}
              value={date.yyyy}
              onChange={(e) => setDate((d) => ({ ...d, yyyy: e.target.value }))}
              className="w-20 h-10 text-center rounded-xl border border-[#E0E0E0] dark:border-[#3A3734] bg-white dark:bg-[#252320] text-[14px] text-[#111] dark:text-[#F0EDE6] placeholder:text-[#CCC] focus:outline-none focus:border-[#111]"
            />
          </div>
        </div>

        {/* Category */}
        <div className="flex items-center gap-3 mb-8">
          <p className="text-[15px] text-[#111] dark:text-[#F0EDE6] flex-shrink-0" style={{ fontWeight: 600 }}>
            category:
          </p>
          <div className="flex-1">
            <SelectField
              options={categoryOptions}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>

        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting…" : "Submit"}
        </Button>
      </div>
    </div>
  );
}
