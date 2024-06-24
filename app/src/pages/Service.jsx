import React from "react";
import { Layout, theme } from "antd";
const { Content } = Layout;

export default function Service() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Content
      className="m-[16px] p-[16px]"
      style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
    >
      Service
    </Content>
  );
}