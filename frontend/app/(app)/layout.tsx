// app/(app)/layout.tsx
import { RootWrapper } from "../../components/RootWrapper";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <RootWrapper>{children}</RootWrapper>;
}
