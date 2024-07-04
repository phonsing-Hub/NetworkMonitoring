import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, message, theme } from "antd";
import { Progress } from "@nextui-org/react";
//components
import TableEmp from "../components/table/TableEmp";

const { Content } = Layout;
const IP = import.meta.env.VITE_DEFAULT_IP;

export default function Employee() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getEmployee = async () => {
    try {
      const response = await axios.get(`${IP}/api/emp/all`, {
        withCredentials: true,
      });
      //console.log(response.data);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      message.error("error.response.data.message");
    }
  };

  useEffect(() => {
    getEmployee();
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

        <TableEmp users={users} />
      </Content>
    </div>
  );
}
