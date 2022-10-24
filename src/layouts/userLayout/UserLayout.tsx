import React, { ReactNode } from "react";
import styles from "./UserLayout.module.css";
import { Link } from "react-router-dom";
import { Layout } from "antd";
const { Header, Footer, Content } = Layout;

type Props = {
  children?: ReactNode
};

export const UserLayout: React.FC<Props> = (props) => {
  return (
    <Layout className={styles["user-layout-container"]}>
      <Header className={styles["header"]}>
        我是头部
      </Header>
      <Content className={styles["content"]}>
        <div className={styles["top"]}>
          <div className={styles["content-header"]}>
            <Link to="/">
              <span className={styles["title"]}>React Demo</span>
            </Link>
          </div>
          <div className={styles["desc"]}>
            React tooltit
          </div>
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>我是尾部</Footer>
    </Layout>
  );
};
