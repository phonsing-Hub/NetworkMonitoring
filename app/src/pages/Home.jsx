import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, theme, Button } from "antd";
import { Autocomplete, AutocompleteItem, Chip } from "@nextui-org/react";
import { useTheme } from "../components/theme/ThemeProvider";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { FaServer } from "react-icons/fa";
import { AiOutlineCloudServer } from "react-icons/ai";

const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0";
const IP = import.meta.env.VITE_DEFAULT_IP;
const { Content } = Layout;

function Home() {
  const { isDarkMode } = useTheme();
  const MapColors = isDarkMode ? "36c61296590b4f4e" : "740fa6c4a4fd7408";
  const defaultPosition = { lat: 13.804, lng: 100.576 };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [location, setLocaltion] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [selectedKey, setSelectedKey] = useState(null);

  async function getLocationAll() {
    try {
      const res = await axios.get(`${IP}/api/location/all`, {
        withCredentials: true,
      });
      setLocaltion(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getLocationAll();
  }, []);

  const onSelectionChange = (id) => {
    setSelectedKey(id);
    const loc = location.find((l) => l.id === id);
    if (loc) {
      setMapCenter({
        lat: parseFloat(loc.latitude),
        lng: parseFloat(loc.longitude),
      });
    } else {
      setMapCenter(null);
    }
  };

  const handleSearch = (value) => {
    setSearchId(value);
  };

  return (
    <Content
      className="m-[16px] p-[16px]"
      style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
    >
     
      <div className="absolute z-[99] mt-2.5 right-[90px]">
        <Autocomplete
          placeholder="Search ... "
          className="max-w-xs text-xs"
          size="xs"
          radius="sm"
          variant="faded"
          onSelectionChange={onSelectionChange}
          onInputChange={handleSearch}
        >
          {location.map((animal) => (
            <AutocompleteItem
              key={animal.id}
              value={animal.id}
              startContent={<FaServer className="iconClasses" />}
              className="chart"
            >
              {animal.id}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
      <APIProvider apiKey={import.meta.env.VITE_MAPS_API_KEY}>
        <Map
          mapId={MapColors}
          defaultCenter={defaultPosition}
          center={mapCenter}
          defaultZoom={14}
          minZoom={2}
        >
          {location.map((loc) => (
            <AdvancedMarker
              key={loc.id}
              position={{
                lat: parseFloat(loc.latitude),
                lng: parseFloat(loc.longitude),
              }}
            >
              <Chip
                key={loc.id}
                startContent={<AiOutlineCloudServer size={18} className="font-bold" />}
                variant="faded"
                color={selectedKey === loc.id ? "danger" : "secondary"}
              >
                {loc.id}
              </Chip>
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </Content>
  );
}

export default Home;
