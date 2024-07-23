import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "../theme/ThemeProvider";
import {
  Input,
  Divider,
  Button,
  Select,
  SelectItem,
  Chip,
} from "@nextui-org/react";
import { Modal, Input as Inputantd, Rate, message } from "antd";
import {
  TbDevicesCode,
  TbWorldLatitude,
  TbWorldLongitude,
} from "react-icons/tb";
import { MdDeviceHub } from "react-icons/md";
import { BiMessageAltError } from "react-icons/bi";

const IP = import.meta.env.VITE_DEFAULT_IP;
const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const { TextArea } = Inputantd;

export default function ModalInseart({
  addModalDevices,
  setAddModalDevices,
  getHosts,
}) {
  const { isDarkMode } = useTheme();
  let themeMode = isDarkMode ? "dark" : "light";
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [points, setPoints] = useState(0);
  const [status, setStatus] = useState(new Set([]));
  const [details, setDetails] = useState("");
  const [err, setErr] = useState();
  async function Submit() {
    setLoading(true);
    setErr(null);
    const host = {
      name,
      ip,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude) ,
      points,
      status: status.currentKey,
      details,
    };
    if (!host.name || !host.ip) 
        return setErr(" name or ip is empty");
    try {
      await axios.post(`${IP}/api/createHost`,host,{
          withCredentials: true,
      });
      getHosts();
      setLoading(false);
      setAddModalDevices(false);
    } catch (error) {
      setLoading(false);
      if(error.response.data.message)
        setErr(error.response.data.message)
    }
  }

  return (
    <>
      <Modal
        title="Add Devices"
        open={addModalDevices}
        onOk={() => setAddModalDevices(false)}
        onCancel={() => setAddModalDevices(false)}
        width={750}
        footer={[
          <Button
            key="Cancel"
            size="sm"
            radius="sm"
            variant="light"
            className="mr-2"
            onPress={() => setAddModalDevices(false)}
          >
            Cancel
          </Button>,
          <Button
            key="Add"
            size="sm"
            radius="sm"
            variant="ghost"
            color="primary"
            onPress={Submit}
            isLoading={loading}
          >
            Add
          </Button>,
        ]}
      >
        <Divider />
        <div className={`${themeMode} grid grid-cols-2 gap-2 px-2 pt-2`}>
          <Input
            variant="faded"
            radius="sm"
            label="Device name"
            placeholder="ABC"
            labelPlacement="outside"
            endContent={<TbDevicesCode className={iconClasses} />}
            value={name}
            onValueChange={setName}
          />
          <Input
            variant="faded"
            radius="sm"
            label="Domainname or IPv4"
            placeholder="abc.com || 8.8.8.8"
            labelPlacement="outside"
            endContent={<MdDeviceHub className={iconClasses} />}
            value={ip}
            onValueChange={setIp}
          />
          <Input
            variant="faded"
            radius="sm"
            label="Latitude"
            placeholder="000.000"
            labelPlacement="outside"
            endContent={<TbWorldLatitude className={iconClasses} />}
            value={latitude}
            onValueChange={setLatitude}
          />
          <Input
            variant="faded"
            radius="sm"
            label="Longitude"
            placeholder="000.000"
            labelPlacement="outside"
            endContent={<TbWorldLongitude className={iconClasses} />}
            value={longitude}
            onValueChange={setLongitude}
          />
          <Select
            variant="faded"
            radius="sm"
            label="Status"
            placeholder="Select"
            labelPlacement="outside"
            selectedKeys={status}
            onSelectionChange={setStatus}
          >
            <SelectItem key="Active">Active</SelectItem>
            <SelectItem key="Paused">Paused</SelectItem>
          </Select>
          <div className="flex items-center mt-4">
            <p className="mr-2">Ponits: </p>
            <Rate tooltips={desc} onChange={setPoints} value={points} />
            {/* {rate ? <span>{desc[rate - 1]}</span> : null} */}
          </div>
        </div>
        <div className="h-auto py-4 px-2 mb-4">
          <p className="pb-1">Details</p>
          <TextArea
            showCount
            maxLength={100}
            placeholder="Suzy Queue 4455 Landing Lange, APT 4 Louisville, KY 40018-1234"
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        {err && (
          <Chip
            radius="sm"
            variant="flat"
            color="danger"
            startContent={<BiMessageAltError />}
            className="mb-2"
          >
            {err}
          </Chip>
        )}
        <Divider />
      </Modal>
    </>
  );
}
