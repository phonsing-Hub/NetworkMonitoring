import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Alert, message } from "antd";
import { Input } from "@nextui-org/input";
import { TbEyeSearch } from "react-icons/tb";
import { PiEyeSlashDuotone } from "react-icons/pi";
import { MdOutlineLockReset } from "react-icons/md";

const IP = import.meta.env.VITE_DEFAULT_IP;

function ChangePassword({ isModalOpen, setIsModalOpen }) {
  const [messageError, setMessageError] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [isp1, setIsp1] = useState({
    isInvalid: false,
    errorMessage: "",
    value: "",
  });
  const [isp2, setIsp2] = useState({
    isInvalid: false,
    errorMessage: "",
    value: "",
  });
  const [isp3, setIsp3] = useState({
    isInvalid: false,
    errorMessage: "",
    value: "",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePasswordChange = async () => {
    setLoadings(true);
    setIsp1({
      isInvalid: false,
      errorMessage: "",
      value: isp1.value,
    });
    setIsp2({
      isInvalid: false,
      errorMessage: "",
      value: isp2.value,
    });
    setIsp3({
      isInvalid: false,
      errorMessage: "",
      value: isp3.value,
    });
    // Password validation regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    // Check if new password meets criteria
    if (!passwordRegex.test(isp2.value)) {
      setIsp2({
        isInvalid: true,
        errorMessage:
          "Password should be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one digit.",
        value: isp2.value,
      });
      setLoadings(false);
      return;
    }

    // Check if confirm password matches new password
    if (isp2.value !== isp3.value) {
      setIsp3({
        isInvalid: true,
        errorMessage: "Passwords do not match",
        value: isp3.value,
      });
      setLoadings(false);
      return;
    } 

    try {
      const res = await axios.put(`${IP}/api/changepassword`,{
        OldPassword: isp1.value,
        NewPassword: isp3.value
      },{ withCredentials: true });
      setLoadings(false);
      message.success(res.data.message);
      handleOk();
    } catch (error) {
      console.log(error);
      setLoadings(false);
      setMessageError(error.response.data.message);
    }
    
  };

  return (
    <Modal
      title={
        <div className="flex gap-2 items-center">
          <p>Change Password</p> <MdOutlineLockReset size={32} />
        </div>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel} type="dashed" danger>
          Cancel
        </Button>,
        <Button key="change" onClick={handlePasswordChange} loading={loadings} type="primary">
          Change Password
        </Button>,
      ]}
    >
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
          value={isp1.value}
          onChange={(event) => setIsp1({ ...isp1, value: event.target.value })}
          isInvalid={isp1.isInvalid}
          errorMessage={isp1.errorMessage}
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
          value={isp2.value}
          onChange={(event) => setIsp2({ ...isp2, value: event.target.value })}
          isInvalid={isp2.isInvalid}
          errorMessage={isp2.errorMessage}
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
          value={isp3.value}
          onChange={(event) => setIsp3({ ...isp3, value: event.target.value })}
          isInvalid={isp3.isInvalid}
          errorMessage={isp3.errorMessage}
        />
      </div>
      <p className="text-xs text-default-400 pointer-events-none mt-2">
        Should be at least 8 characters and consist of: Characters (a-z, A-Z),
        Numbers (0-9)
      </p>
      {messageError && <Alert
      message="ChangePassword"
      description={messageError}
      type="error"
      closable
      onClose
      className="mt-2"
    />}
      
    </Modal>
  );
}

export default ChangePassword;
