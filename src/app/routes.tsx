import { createBrowserRouter, Outlet } from "react-router";
import { SplashScreen } from "./screens/SplashScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ReportItemScreen } from "./screens/ReportItemScreen";
import { NotificationsScreen } from "./screens/NotificationsScreen";
import { MatchDetailsScreen } from "./screens/MatchDetailsScreen";
import { FinderDetailsScreen } from "./screens/FinderDetailsScreen";
import { PastReportsScreen } from "./screens/PastReportsScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { RateFinderScreen } from "./screens/RateFinderScreen";
import { ItemReturnedScreen } from "./screens/ItemReturnedScreen";
import { AdminUserMonitoringScreen } from "./screens/AdminUserMonitoringScreen";
import { AdminActivityControlScreen } from "./screens/AdminActivityControlScreen";
import { useDarkMode } from "./context/DarkModeContext";

function Root() {
  const { isDark } = useDarkMode();
  return (
    <div className="min-h-screen bg-zinc-300 flex items-center justify-center md:p-8">
      <div
        className={`relative w-full md:w-[390px] h-screen md:h-[844px] overflow-hidden md:rounded-[44px] ${isDark ? "dark" : ""}`}
        style={{
          background: "var(--app-card)",
          boxShadow: "0 40px 80px -10px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.06)",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: SplashScreen },
      { path: "welcome", Component: WelcomeScreen },
      { path: "signup", Component: SignUpScreen },
      { path: "login", Component: LoginScreen },
      { path: "home", Component: HomeScreen },
      { path: "report", Component: ReportItemScreen },
      { path: "notifications", Component: NotificationsScreen },
      { path: "match/:id", Component: MatchDetailsScreen },
      { path: "finder/:id", Component: FinderDetailsScreen },
      { path: "past-reports", Component: PastReportsScreen },
      { path: "settings", Component: SettingsScreen },
      { path: "profile", Component: ProfileScreen },
      { path: "rate/:id", Component: RateFinderScreen },
      { path: "item-returned", Component: ItemReturnedScreen },
      { path: "admin/users", Component: AdminUserMonitoringScreen },
      { path: "admin/activity", Component: AdminActivityControlScreen },
    ],
  },
]);
