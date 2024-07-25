import React, { useState, useEffect } from "react";
import axios from "axios";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useTheme } from "../components/theme/ThemeProvider";
import { Button, Layout, Tag, Menu, theme, Image, Popover, Switch } from "antd";
import { Button as Btn, Avatar } from "@nextui-org/react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { IoEarthSharp, IoSettingsOutline } from "react-icons/io5";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineLockReset,
  MdLogout,
} from "react-icons/md";
import { TiRss } from "react-icons/ti";
import { TbDevicesSearch } from "react-icons/tb";

//components
import ChangePassword from "../auth/ChangePassword";

const { Header, Sider } = Layout;
const IP = import.meta.env.VITE_DEFAULT_IP;
const axiosInstance = axios.create({
  baseURL: IP,
  withCredentials: true,
});

export default function LayoutRoot() {
  const location = useLocation();
  const basePath = `/${location.pathname.split("/")[1]}`;
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [path, setPath] = useState("");
  const [logoutloading, setLogoutloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    setLogoutloading(true);
    axiosInstance
      .get("/api/logout")
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        setLogoutloading(false);
        console.error("Error clearing cookie:", error);
      });
  };

  useEffect(() => {
    if (location.pathname === "/") return setPath("/Home");
    setPath(location.pathname);
  }, [location.pathname]);

  const content = (
    <div className="flex flex-col gap-2">
      <Btn
        color="warning"
        size="sm"
        radius="sm"
        variant="light"
        endContent={<MdOutlineLockReset size={22} />}
        className="w-full"
        onPress={() => setIsModalOpen(true)}
      >
        Change Password
      </Btn>
      <Btn
        color="danger"
        size="sm"
        radius="sm"
        variant="ghost"
        endContent={<MdLogout size={22} />}
        className="w-full"
        isLoading={logoutloading}
        onPress={handleLogout}
      >
        Logout
      </Btn>
    </div>
  );

  return (
    <Layout className="h-screen">
      <Sider
        width={250}
        collapsedWidth="0"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: !isDarkMode ? colorBgContainer : "rgb(20, 20, 20)",
        }}
      >
        <div className="flex w-full h-[80px] justify-between items-center px-5">
          {isDarkMode ? (
            <Image width={80} src="/LogoD.png" />
          ) : (
            <Image width={80} src="/LogoL.png" />
          )}

          {!collapsed && (
            <div className="flex gap-3 items-center">
              <Avatar
                className="m-[1px]"
                name="Polsing"
                isBordered
                color="primary"
              ></Avatar>

              <Popover
                placement="bottomLeft"
                title={"Setting"}
                content={content}
                //overlayStyle={{ width: '120px' }}
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
        <div className="px-2">
          <hr />
        </div>
        <Menu
          className="px-1"
          mode="inline"
          defaultSelectedKeys={["/"]}
          selectedKeys={basePath}
          items={[
            {
              key: "/",
              icon: <IoEarthSharp size={24} />,
              label: <Link to="/">Home</Link>,
            },
            {
              key: "/devices",
              icon: <TbDevicesSearch size={24} />,
              label: <Link to="/devices">Devices</Link>,
            },
            {
              key: "/service",
              icon: <TiRss size={24} />,
              label: <Link to="/service">Service</Link>,
            },
          ]}
        />
        <div className="px-2">
          <hr />
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: !isDarkMode ? colorBgContainer : "rgb(20, 20, 20)",
          }}
          className="flex justify-between items-center"
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
          <Switch
            checkedChildren={<MdOutlineDarkMode size={22} />}
            unCheckedChildren={<MdOutlineLightMode size={22} />}
            onChange={handleClick}
            className="mr-4"
          />
        </Header>
        <Tag bordered={false} color="blue" className="mt-2 ml-4 w-min">
          {path}
        </Tag>
        <ChangePassword
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <Outlet />
      </Layout>
    </Layout>
  );
}
