import ChannelPanel from "@/components/layout/ChannelPanel";

const siderStyle: React.CSSProperties = {
  overflow: 'hidden',
  position: 'relative',
  insetInlineStart: 0,
  top: 0,
  height: '100vh',
};

export default function ChannelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
