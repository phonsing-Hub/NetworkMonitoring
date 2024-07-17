import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, message, theme } from "antd";
import { Progress } from "@nextui-org/react";
//components
import TableMNR from "../components/tabledevices/TableMNR";

const { Content } = Layout;
const IP = import.meta.env.VITE_DEFAULT_IP;

export default function Devices() {
  const [devices, setDevices] = useState([null]);
  const [loading, setLoading] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  async function getHosts() {
    setLoading(true);
   try {
    const result = await axios.get(`${IP}/api/getHosts`);
   // console.log(result.data.hosts);
    setDevices(result.data.hosts);
    setLoading(false);
   } catch (error) {
    setLoading(false);
    console.log(error.response.data.message);
    message.error(error.response.data.message);
   }
    
  }
  useEffect(() => {
    getHosts();
  }, []);

  return (
    <div className="overflow-auto">
      <Content
        className="m-[16px] p-[16px]"
        style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
      >
        {loading && (
          <Progress
            size="sm"
            isIndeterminate
            aria-label="Loading..."
            className="mb-4 w-full"
          />
        )}

        <TableMNR devices={devices} />
      </Content>
    </div>
  );
}
