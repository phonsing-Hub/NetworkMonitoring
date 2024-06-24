import React, { useState } from "react";
import { Layout, theme } from "antd";
import { Progress } from "@nextui-org/react";
//components
import TableEmp from "../components/table/TableEmp";

const { Content } = Layout;

export default function Employee() {
  const [users, setUsers] = useState([{
    id: "AP0001",
    name: "APL",
    lastname: "PS",
    sex: "Male",
    email: "apl.ps@gmail.com",
    status: "Active",
    department: "CEO",
    role: "root",
    images: "APL.png"
  }]);
  const [loading, setLoading] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div className="overflow-auto">
      <Content
        className="m-[16px] p-[16px]"
        style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
      >
        { loading && <Progress
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="mb-4 w-full"
        />}

        <TableEmp  users={users}/>
      </Content>
    </div>
  );
}
