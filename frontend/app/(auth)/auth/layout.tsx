// app/(auth)/auth/layout.tsx
import { RootWrapper } from "../../../components/RootWrapper";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <RootWrapper>{children}</RootWrapper>;
}
