import React from "react";
import { Layout, Typography } from "antd";

export const Footer: React.FC = () => {
  return (
    <Layout.Footer>
      <Typography.Title level={5} style={{ textAlign: "center" }}>
      FrontEnd ©2022 Created by Ant UED
      </Typography.Title>
    </Layout.Footer>
  );
};
