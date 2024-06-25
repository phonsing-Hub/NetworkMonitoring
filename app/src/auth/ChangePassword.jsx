import React, { useState } from "react";
import { Modal, Button } from "antd";
import { Input } from "@nextui-org/input";
import { TbEyeSearch } from "react-icons/tb";
import { PiEyeSlashDuotone } from "react-icons/pi";
import { MdOutlineLockReset } from "react-icons/md";

function ChangePassword({ isModalOpen, setIsModalOpen }) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      title={
        <div className=" flex gap-2 items-center">
          <p>Change Password</p> <MdOutlineLockReset size={32} />
        </div>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button onClick={handleCancel}>Cancal</Button>,
        <Button onClick={""}>Change Password</Button>,
      ]}>
      <div className="w-full flex flex-col gap-2">
        <Input
          label="Old Password"
          variant="bordered"
          placeholder="Enter Old Password"
          size="sm"
          radius="sm"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <PiEyeSlashDuotone className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <TbEyeSearch className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="w-full"
        />
        <Input
          label="New Password"
          variant="bordered"
          placeholder="Enter New Password"
          size="sm"
          radius="sm"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <PiEyeSlashDuotone className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <TbEyeSearch className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="w-full"
        />
        <Input
          label="Confirm Password"
          variant="bordered"
          placeholder="Enter Confirm Password"
          size="sm"
          radius="sm"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <PiEyeSlashDuotone className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <TbEyeSearch className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="w-full"
        />
      </div>
      <p className="text-xs text-default-400 pointer-events-none mt-2">
        Should be at least 8 characters to consist of - Characters (a-z,A-Z) -
        Number (0-9)
      </p>
    </Modal>
  );
}

export default ChangePassword;
