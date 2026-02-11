// app/(app)/layout.tsx
import { RootWrapper } from "../../components/RootWrapper";
import { AuthProvider } from "@/context/AuthContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <RootWrapper><AuthProvider>{children}</AuthProvider></RootWrapper>;
}
