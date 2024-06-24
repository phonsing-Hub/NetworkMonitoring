import React from "react";
import { Layout, theme, Steps } from "antd";
const { Content } = Layout;
import { ComboChart } from "../components/chart/ComboChart";
function Home() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Content
      className="m-[16px] p-[16px]"
      style={{ background: colorBgContainer , borderRadius: borderRadiusLG }}
    >
     <div className="chart w-2/3 overflow-hidden rounded-2xl">
     <ComboChart/>
     </div>
    </Content>
  );
}

export default Home;
