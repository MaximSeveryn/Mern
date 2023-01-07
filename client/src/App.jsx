import {
  DesktopOutlined,
  PhoneOutlined,
  TeamOutlined,
  UserOutlined,
  FilterOutlined,
  GithubOutlined,
  LinkedinOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

import "./styles/css/App.css";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import TodoApp from "./components/TodoApp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Logo from "./svg/logo.svg";
const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    label,
    key,
    icon,
    children,
  };
}

const items = [
  getItem("Option 1", "1", <UserOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("Filter", "sub1", <FilterOutlined />, [
    getItem("All tasks", "3"),
    getItem("Personal tasks", "4"),
    getItem("Business tasks", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Contact me", "9", <PhoneOutlined />, [
    getItem(
      "GitHub",
      "10",
      <GithubOutlined href="https://github.com/Shodydosh" />
    ),
    getItem("LinkedIn", "11", <LinkedinOutlined />),
    getItem("Facebook", "12", <FacebookOutlined />),
  ]),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logoContainer">
          <img src={Logo} className="App-logo" alt="logo" />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Shodydosh</Breadcrumb.Item>
            <Breadcrumb.Item>TodoApp</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <TodoApp />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
