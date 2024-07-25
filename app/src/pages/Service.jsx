import React, { useState } from "react";
import { Layout, theme } from "antd";
const { Content } = Layout;

import Tableservice from "../components/tableservice/Tableservice";
export default function Service() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
 

  return (
    <div className="overflow-auto">
    <Content
      className="m-[16px] p-[16px]"
      style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
    >
     <Tableservice/>
    </Content>
    </div>
  );
}
