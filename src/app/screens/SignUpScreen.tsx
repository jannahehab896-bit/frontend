import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { SocialAuth } from "../components/SocialAuth";
import { authService } from "../services/auth.service";

const gradient = `radial-gradient(ellipse 65% 55% at 8% 12%, rgba(148, 204, 183, 0.95), transparent),
  radial-gradient(ellipse 55% 50% at 92% 8%, rgba(148, 195, 220, 0.9), transparent),
  radial-gradient(ellipse 60% 50% at 70% 90%, rgba(195, 218, 162, 0.85), transparent),
  radial-gradient(ellipse 45% 50% at 18% 88%, rgba(135, 188, 218, 0.7), transparent),
  radial-gradient(ellipse 55% 45% at 48% 48%, rgba(255, 255, 255, 0.85), transparent),
  #C2D6CC`;

export function SignUpScreen() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSignUp = async () => {
    setError(null);
    setLoading(true);
    try {
      await authService.signUp({
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        password: form.password,
      });
      navigate("/login", { state: { success: "Account created successfully" } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto" style={{ background: gradient }}>
      {/* Header area */}
      <div className="px-6 pt-16 pb-8 flex-shrink-0">
        <h1
          className="text-[34px] text-[#111] leading-tight"
          style={{ fontWeight: 800 }}
        >
          Create an<br />account
        </h1>
      </div>

      {/* Form card */}
      <div className="flex-1 bg-white rounded-t-[32px] px-6 pt-8 pb-6 flex flex-col gap-5 shadow-[0_-8px_40px_rgba(0,0,0,0.06)]">
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
          label="Full Name"
          type="text"
          placeholder="Enter Full Name"
          value={form.fullName}
          onChange={update("fullName")}
        />
        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter Phone Number"
          value={form.phone}
          onChange={update("phone")}
        />
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

        <Button
          variant="brand"
          onClick={handleSignUp}
          disabled={loading}
          className="mt-1"
        >
          {loading ? "Creating account…" : "Sign Up"}
        </Button>

        <SocialAuth mode="signup" />

        <p className="text-center text-[12px] text-[#999] pb-2">
          By signing up, you agree to our{" "}
          <button className="underline text-[#555]">Terms</button> and{" "}
          <button className="underline text-[#555]">Privacy Policy</button>.
        </p>
      </div>
    </div>
  );
}
