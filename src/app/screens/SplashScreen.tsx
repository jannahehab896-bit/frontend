import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const gradient = `radial-gradient(ellipse 65% 55% at 8% 12%, rgba(148, 204, 183, 0.95), transparent),
  radial-gradient(ellipse 55% 50% at 92% 8%, rgba(148, 195, 220, 0.9), transparent),
  radial-gradient(ellipse 60% 50% at 70% 90%, rgba(195, 218, 162, 0.85), transparent),
  radial-gradient(ellipse 45% 50% at 18% 88%, rgba(135, 188, 218, 0.7), transparent),
  radial-gradient(ellipse 55% 45% at 48% 48%, rgba(255, 255, 255, 0.85), transparent),
  #C2D6CC`;

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/welcome"), 2200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: gradient }}
    >
      <h1
        className="text-[56px] tracking-[-1px] select-none"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          color: "#111111",
          letterSpacing: "-1px",
        }}
      >
        BACK2U
      </h1>
    </div>
  );
}
