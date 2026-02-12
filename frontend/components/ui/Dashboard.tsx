// import React from 'react';
// import {
//   AppstoreOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   ShopOutlined,
//   TeamOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
// import { Avatar, Badge, Layout, Menu, theme } from 'antd';
// import Image from 'next/image';
// import SideBar from '../layout/SideBar';
// import ChannelPanel from '../layout/ChannelPanel';
// import ChatPanel from '../layout/ChatPanel';

// export const { Header, Content, Footer, Sider } = Layout;

// const siderStyle: React.CSSProperties = {
//   overflow: 'auto',
//   height: '100vh',
//   position: 'sticky',
//   insetInlineStart: 0,
//   top: 0,
//   scrollbarWidth: 'thin',
//   scrollbarGutter: 'stable',
// };

// const items: MenuProps['items'] = [
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   AppstoreOutlined,
//   TeamOutlined,
//   ShopOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: `nav ${index + 1}`,
// }));

// const App: React.FC = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <Layout hasSider>

//       <SideBar siderStyle={siderStyle} />
//       <ChannelPanel siderStyle={siderStyle} />

//       <ChatPanel />

//     </Layout>
//   );
// };

// export default App;