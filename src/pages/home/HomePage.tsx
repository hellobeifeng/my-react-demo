import React from "react";
import { MainLayout } from "../../layouts/mainLayout";
import { useSelector } from "../../redux/hooks";

export const HomePage: React.FC = () => {
  const { token, username } = useSelector(state => state.user)
  return (
    <MainLayout>
      <div>主页</div>
      <div>{username}{token}</div>
    </MainLayout>
  )
}