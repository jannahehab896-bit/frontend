import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

interface TopBarProps {
  title: string;
  onBack?: () => void;
  rightSlot?: React.ReactNode;
}

export function TopBar({ title, onBack, rightSlot }: TopBarProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex items-center justify-between px-5 pt-14 pb-4 flex-shrink-0">
      <button
        onClick={handleBack}
        className="w-9 h-9 flex items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10 transition-colors"
      >
        <ArrowLeft size={22} strokeWidth={2.2} className="text-[#111] dark:text-[#F0EDE6]" />
      </button>
      <h2 className="text-[18px] text-[#111] dark:text-[#F0EDE6] tracking-[-0.3px]" style={{ fontWeight: 700 }}>
        {title}
      </h2>
      <div className="w-9 h-9 flex items-center justify-center">
        {rightSlot ?? null}
      </div>
    </div>
  );
}