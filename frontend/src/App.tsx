import React from "react";
import "./App.css";
import { Layout } from "antd";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";

const App: React.FC = () => {
  return (
    <Layout className="h-full">
      <Header />

      <Content />

      <Footer />
    </Layout>
  );
};

export default App;
