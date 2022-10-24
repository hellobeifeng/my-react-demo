import { Layout, Menu } from "antd";
import React from "react";
import styles from './Header.module.css'

const items = [
  {
    key: '1',
    label: `顶部菜单1`,
  },
  {
    key: '2',
    label: `顶部菜单2`,
  }
]


export const Header: React.FC = () => {
  return (
    <Layout.Header className="header">
      <div className={styles.logo} />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items} />
    </Layout.Header>
  ) 
}