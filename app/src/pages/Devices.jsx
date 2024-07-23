import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, message, theme } from "antd";
import { Progress } from "@nextui-org/react";
//components
import TableMNR from "../components/tabledevices/TableMNR";
import ModalInseart from "../components/modal/ModalInseart";
import ModalUpdate from "../components/modal/ModalUpdate";

const { Content } = Layout;
const IP = import.meta.env.VITE_DEFAULT_IP;

export default function Devices() {
  const [devices, setDevices] = useState([null]);
  const [loading, setLoading] = useState(false);
  const [addModalDevices, setAddModalDevices] = useState(false);
  const [updateModalDevices, setUpdateModalDevices] = useState(false);
  const [hostId, setHostId] = useState(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  async function getHosts() {
    setLoading(true);
    try {
      const result = await axios.get(`${IP}/api/getHosts`,{
        withCredentials: true,
    });
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

  const UpdateHost = async (id) => {
    setUpdateModalDevices(true);
    setHostId(id);
  }

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

        <TableMNR
          devices={devices}
          getHosts={getHosts}
          setAddModalDevices={setAddModalDevices}
          UpdateHost={UpdateHost}
        />
      </Content>
      <ModalInseart
        addModalDevices={addModalDevices}
        setAddModalDevices={setAddModalDevices}
        getHosts={getHosts}
      />
      <ModalUpdate
        updateModalDevices={updateModalDevices}
        setUpdateModalDevices={setUpdateModalDevices}
        getHosts={getHosts}
        hostId={hostId}
      />
    </div>
  );
}
