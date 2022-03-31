import React from "react";
import { Layout } from "antd";
import { Auth } from "./Auth";

export const Header: React.FC = () => {
  return (
    <Layout.Header>
      <div className="max-w-[1280px] mx-auto flex justify-between items-center h-full text-white">
        <img
          height="50"
          src={process.env.PUBLIC_URL + "/logo.png"}
          alt="Butcher Logo"
        />

        <Auth />
      </div>
    </Layout.Header>
  );
};
