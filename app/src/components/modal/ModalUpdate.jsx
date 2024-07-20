import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
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

export default function ModalUpdate({
  updateModalDevices,
  setUpdateModalDevices,
  getHosts,
  hostId,
}) {
  const isInitialMount = useRef(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [points, setPoints] = useState(0);
  const [status, setStatus] = useState("");
  const [details, setDetails] = useState("");
  const [err, setErr] = useState(null);

  async function Submit() {
    setLoading(true);
    setErr(null);
    const host = {
      name,
      ip,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      points,
      status: status.currentKey,
      details,
    };
    if (!host.name || !host.ip) {
      setLoading(false);
      return setErr("name or ip is empty");
    }
    try {
      console.log(host);
      await axios.put(`${IP}/api/updateHost/${hostId}`, host, {
        withCredentials: true,
      });
      getHosts();
      setLoading(false);
      setUpdateModalDevices(false);
    } catch (error) {
      setLoading(false);
      if (error.response.data.message) setErr(error.response.data.message);
    }
  }

  async function getHostId(id) {
    try {
      const result = await axios.get(`${IP}/api/getHost/${id}`, {
        withCredentials: true,
      });
      setName(result.data.host.name || "");
      setIp(result.data.host.ip || "");
      setLatitude(result.data.host.latitude || "");
      setLongitude(result.data.host.longitude || "");
      setPoints(result.data.host.points || 0);
      setStatus(result.data.host.status || "");
      setDetails(
        result.data.host.details ||
          "Suzy Queue 4455 Landing Lane, APT 4 Louisville, KY 40018-1234"
      );
    } catch (error) {
      message.error(error.response.data.message);
      setUpdateModalDevices(false);
    }
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getHostId(hostId);
    }
  }, [hostId]);

  return (
    <>
      <Modal
        loading={modalLoading}
        title="Update Devices"
        open={updateModalDevices}
        onOk={() => setUpdateModalDevices(false)}
        onCancel={() => setUpdateModalDevices(false)}
        width={750}
        footer={[
          <Button
            key="Cancel"
            size="sm"
            radius="sm"
            variant="light"
            className="mr-2"
            onPress={() => setUpdateModalDevices(false)}
          >
            Cancel
          </Button>,
          <Button
            key="Update"
            size="sm"
            radius="sm"
            variant="ghost"
            color="primary"
            onPress={Submit}
            isLoading={loading}
          >
            Update
          </Button>,
        ]}
      >
        <Divider />
        <div className="grid grid-cols-2 gap-2 px-2 pt-2">
          <Input
            variant="faded"
            radius="sm"
            label="Device name"
            placeholder="ABC"
            labelPlacement="outside"
            defaultValue="name"
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
            defaultValue="name"
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
            endContent={
              <Chip
                radius="sm"
                color={status === "Active" ? "success" : "primary"}
              >
                {status}
              </Chip>
            }
            onSelectionChange={setStatus}
          >
            <SelectItem key="Active">Active</SelectItem>
            <SelectItem key="Paused">Paused</SelectItem>
          </Select>
          <div className="flex items-center mt-4">
            <p className="mr-2">Points: </p>
            <Rate tooltips={desc} onChange={setPoints} value={points} />
          </div>
        </div>
        <div className="h-auto py-4 px-2 mb-4">
          <p className="pb-1">Details</p>
          <TextArea
            showCount
            maxLength={100}
            placeholder={details}
            onChange={(e) => setDetails(e.target.value)}
            value={details}
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
