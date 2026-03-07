import { Layout } from "antd";

import { ServerLayoutProvider } from "@/context/ServerLayoutContext";
import { ServerMemberProvider } from "@/context/ServerMemberContext";
import SideBar from "@/components/layout/SideBar";
import { ServerAdminProvider } from "@/context/ServerAdminContext";


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
        <ServerMemberProvider>
          <ServerAdminProvider>
            <Layout>
                <SideBar siderStyle={siderStyle} />
                {children}
            </Layout>
          </ServerAdminProvider>
        </ServerMemberProvider>
    </ServerLayoutProvider>
  );
}
