import React from "react";
import { Image } from "antd";
import { Spinner } from "@nextui-org/react";

function Loading() {
  return (
    <main className="flex flex-col h-screen w-screen justify-center items-center">
      <Image src="LogoL.png" width={400} />
      <Spinner
        label="Loading ..."
        color="default"
        labelColor="foreground"
        size="lg"
      />
    </main>
  );
}

export default Loading;
