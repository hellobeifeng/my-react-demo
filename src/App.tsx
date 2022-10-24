import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import styles from './App.module.css';
import { HomePage, SignInPage, RegisterPage, DetailPage, NotFoundPage } from "./pages";

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          <Route path="*" element={< NotFoundPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
