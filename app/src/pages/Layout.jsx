import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useTheme } from "../components/theme/ThemeProvider";
import {
  Avatar,
  Button,
  Layout,
  Tag,
  Menu,
  theme,
  Image,
  Popover,
} from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAddHomeWork, MdOutlineBubbleChart } from "react-icons/md";
import { PiFolderUserBold } from "react-icons/pi";

const { Header, Sider } = Layout;


export default function LayoutRoot() {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [path, setPath] = useState("");
  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (location.pathname === "/") 
        return setPath("/Home");
    setPath(location.pathname);
  }, [location.pathname]);

  const content = (
    <div>
      <Button onClick={handleClick}>
        Change Theme to {isDarkMode ? "Light" : "Dark"}
      </Button>
    </div>
  );

  return ( 
      <Layout className="h-screen">
        <Sider
          width={250}
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            background: !isDarkMode ? colorBgContainer : "rgb(20, 20, 20)",
          }}
        >
          <div className="flex w-full h-[80px] justify-between items-center px-5">
            {isDarkMode ? (
              <Image width={80} src="LogoD.png" />
            ) : (
              <Image width={80} src="LogoL.png" />
            )}

            {!collapsed && (
              <div className="flex gap-3 items-center">
                <div className="Img">
                  <Avatar src="phonsing.jpg" className="m-[1px]" />
                </div>
                <Popover
                  placement="bottomLeft"
                  title={"Setting"}
                  content={content}
                >
                  <Button
                    icon={<IoSettingsOutline size={28} />}
                    shape="circle"
                    type="dashed"
                  />
                </Popover>
              </div>
            )}
          </div>
          <Menu
            className="px-2"
            mode="inline"
            defaultSelectedKeys={["/"]}
            selectedKeys={location.pathname}
            items={[
              {
                key: "/",
                icon: <MdOutlineAddHomeWork size={24} />,
                label: <Link to="/">Home</Link>,
              },
              {
                key: "/employee",
                icon: <PiFolderUserBold size={24} />,
                label: <Link to="/employee">Employee</Link>,
              },
              {
                key: "/service",
                icon: <MdOutlineBubbleChart size={24} />,
                label: <Link to="/service">Service</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: !isDarkMode ? colorBgContainer : "rgb(20, 20, 20)",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Tag bordered={false} color="blue" className="mt-2 ml-4 w-min">
            {path}
          </Tag>
          <Outlet />
        </Layout>
      </Layout>
  );
}
