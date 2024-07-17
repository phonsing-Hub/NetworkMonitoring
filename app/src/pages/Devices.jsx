import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, message, theme } from "antd";
import { Progress } from "@nextui-org/react";
//components
import TableEmp from "../components/tabledevices/TableMNR";

const { Content } = Layout;
const IP = import.meta.env.VITE_DEFAULT_IP;

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // useEffect(() => {
  //   const eventSource = new EventSource("http://localhost:3000/api/ping");
  //   eventSource.onmessage = (event) => {
  //     const newStatus = JSON.parse(event.data);
  //     console.log(newStatus);
  //     setHosts(newStatus);
  //   };

  //   eventSource.onerror = (error) => {
  //     console.error("EventSource failed:", error);
  //   };
  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);

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

        <TableEmp hosts={devices} />
      </Content>
    </div>
  );
}
