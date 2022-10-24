import React, { ReactNode } from "react";
import { Breadcrumb, Layout, Menu  } from 'antd'
import type { MenuProps } from 'antd';
import { Header, Footer } from "../../components";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import styles from './MainLayout.module.css'

type Props = {
  children?: ReactNode
};

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Layout.Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout className={styles["site-layout-background"]} style={{ padding: '24px 0' }}>
          <Layout.Sider className={styles["site-layout-background"]} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items2}
            />
          </Layout.Sider>
          <Layout.Content style={{ padding: '0 24px', minHeight: 600 }}>{children}</Layout.Content>
        </Layout>
      </Layout.Content>
      <Footer />
    </>
  );
};
