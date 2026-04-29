import React from "react";

type ButtonVariant = "primary" | "secondary" | "brand" | "outline" | "chat" | "call" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#111111] text-white active:bg-[#333333]",
  secondary:
    "bg-white text-[#111111] shadow-sm active:bg-gray-50",
  brand:
    "bg-[#97BF6A] text-white active:bg-[#82aa55]",
  outline:
    "bg-white/60 text-[#111111] border border-white/80 backdrop-blur-sm active:bg-white/80",
  chat:
    "bg-[#1B3BE8] text-white active:bg-[#1530c8]",
  call:
    "bg-[#16C864] text-white active:bg-[#12b058]",
  ghost:
    "bg-transparent text-[#111111] active:bg-black/5",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 rounded-xl",
  md: "h-12 px-6 rounded-2xl",
  lg: "h-14 px-6 rounded-[28px]",
};

export function Button({
  variant = "primary",
  size = "lg",
  icon,
  fullWidth = true,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "flex items-center justify-center gap-2 transition-all duration-150 select-none",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
