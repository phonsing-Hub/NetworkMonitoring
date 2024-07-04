import React, { useEffect } from "react";
import { Layout, theme, Divider,  } from "antd";

const { Content } = Layout;
function Create() {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = 'Are you sure you want to leave?';
      event.returnValue = message; // Standard for most browsers
      return message; // For some older browsers
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  return (
    <Content
      className="m-[16px] p-[16px]"
      style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
    >
      Create
      <Divider/>
    </Content>
  );
}

export default Create;
