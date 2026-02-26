import { Layout } from "antd";

import { ServerLayoutProvider } from "@/context/ServerLayoutContext";
import SideBar from "@/components/layout/SideBar";


const siderStyle: React.CSSProperties = {
  overflow: 'hidden',
  position: 'relative',
  insetInlineStart: 0,
  top: 0,
  height: '100vh',
};

export default function ServerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ServerLayoutProvider>
        <Layout>
            <SideBar siderStyle={siderStyle} />
            {children}
        </Layout>
    </ServerLayoutProvider>
  );
}
