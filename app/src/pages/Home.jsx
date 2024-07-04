import React from "react";
import { Layout, theme, Steps } from "antd";
import { useTheme } from "../components/theme/ThemeProvider";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const { Content } = Layout;

function Home() {
  const { isDarkMode } = useTheme();
  const MapColors = isDarkMode ? "36c61296590b4f4e" : "740fa6c4a4fd7408";
  const position = { lat: 13.804, lng: 100.576 };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Content
      className="m-[16px] overflow-hidden"
      style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
    >
      <APIProvider apiKey={import.meta.env.VITE_MAPS_API_KEY}>
        <Map defaultCenter={position} defaultZoom={10} mapId={MapColors} minZoom={2}>
          <Marker position={{lat: 13.955811, lng: 100.420914}} />
        </Map>
      </APIProvider>
    </Content>
  );
}

export default Home;
