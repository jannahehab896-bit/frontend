import { RouterProvider } from "react-router";
import { router } from "./routes";
import { DarkModeProvider } from "./context/DarkModeContext";
import { RoleProvider } from "./context/RoleContext";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <RoleProvider>
          <RouterProvider router={router} />
        </RoleProvider>
      </AuthProvider>
    </DarkModeProvider>
  );
}