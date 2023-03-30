import React from "react";
import { Col, Divider, Row, Typography, Layout, Space } from "antd";

const { Header, Footer, Sider, Content } = Layout;

const { Title } = Typography;
const App = () => {
  return (
    <div className="App">
      <Layout>
        <Header>
          <Title>Old St eCommerce</Title>
        </Header>
        <Content>
          <p>But first, a word from our sponsors:</p>
          <img
            className="ad"
            src={`http://localhost:8000/ads/?r=${Math.floor(
              Math.random() * 1000
            )}`}
            alt="ad"
          />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
      <header></header>
      products goes here..
    </div>
  );
};

export default App;
