import React from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/Button";

const gradient = `radial-gradient(ellipse 65% 55% at 8% 12%, rgba(148, 204, 183, 0.95), transparent),
  radial-gradient(ellipse 55% 50% at 92% 8%, rgba(148, 195, 220, 0.9), transparent),
  radial-gradient(ellipse 60% 50% at 70% 90%, rgba(195, 218, 162, 0.85), transparent),
  radial-gradient(ellipse 45% 50% at 18% 88%, rgba(135, 188, 218, 0.7), transparent),
  radial-gradient(ellipse 55% 45% at 48% 48%, rgba(255, 255, 255, 0.85), transparent),
  #C2D6CC`;

export function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ background: gradient }}
    >
      {/* Top spacer */}
      <div className="flex-1 flex flex-col items-center justify-center pt-16">
        <h1
          className="text-[36px] tracking-[-0.5px] text-[#111] mb-3"
          style={{ fontWeight: 800 }}
        >
          WELCOME
        </h1>
        <p className="text-[15px] text-[#444]">Hi there!</p>
        <p className="text-[15px] text-[#444]">We are here to help you</p>
      </div>

      {/* Bottom buttons */}
      <div className="px-6 pb-12 flex flex-col gap-3">
        <Button
          variant="secondary"
          onClick={() => navigate("/signup")}
          className="shadow-md"
        >
          Create account
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate("/login")}
        >
          Log in
        </Button>
      </div>
    </div>
  );
}