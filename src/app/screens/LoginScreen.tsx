import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { SocialAuth } from "../components/SocialAuth";
import { authService } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

const gradient = `radial-gradient(ellipse 65% 55% at 8% 12%, rgba(148, 204, 183, 0.95), transparent),
  radial-gradient(ellipse 55% 50% at 92% 8%, rgba(148, 195, 220, 0.9), transparent),
  radial-gradient(ellipse 60% 50% at 70% 90%, rgba(195, 218, 162, 0.85), transparent),
  radial-gradient(ellipse 45% 50% at 18% 88%, rgba(135, 188, 218, 0.7), transparent),
  radial-gradient(ellipse 55% 45% at 48% 48%, rgba(255, 255, 255, 0.85), transparent),
  #C2D6CC`;

export function LoginScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveToken, setUser } = useAuth();

  const [form, setForm]     = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  const successMsg = (location.state as { success?: string } | null)?.success;

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await authService.login({ email: form.email, password: form.password });
      saveToken(res.accessToken);
      setUser(res.user);
      navigate("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto" style={{ background: gradient }}>
      {/* Header */}
      <div className="px-6 pt-16 pb-8 flex-shrink-0">
        <h1
          className="text-[34px] text-[#111] leading-tight"
          style={{ fontWeight: 800 }}
        >
          Welcome<br />Back
        </h1>
      </div>

      {/* Form card */}
      <div className="flex-1 bg-white rounded-t-[32px] px-6 pt-8 pb-6 flex flex-col gap-5 shadow-[0_-8px_40px_rgba(0,0,0,0.06)]">
        {/* Success banner */}
        {successMsg && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: "#E4F5E4" }}>
            <span className="text-[#16C864] text-[15px]">✓</span>
            <p className="text-[14px] text-[#111]" style={{ fontWeight: 500 }}>
              {successMsg}
            </p>
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: "#FEE2E2" }}>
            <span className="text-[#EF4444] text-[15px]">✕</span>
            <p className="text-[14px] text-[#111]" style={{ fontWeight: 500 }}>
              {error}
            </p>
          </div>
        )}

        <Input
          label="Email"
          type="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={update("email")}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={update("password")}
        />

        <div className="flex justify-end -mt-2">
          <button className="text-[13px] text-[#111] underline decoration-[#111]/50">
            Forgot password?
          </button>
        </div>

        <Button variant="brand" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in…" : "Log In"}
        </Button>

        <SocialAuth mode="login" />

        <p className="text-center text-[13px] text-[#888] pb-2">
          Don&apos;t have an account?{" "}
          <button
            className="text-[#1B3BE8]"
            style={{ fontWeight: 600 }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
