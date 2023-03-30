import React, { useEffect, useState, useRef } from "react";
import {
  Col,
  Divider,
  Row,
  Rate,
  Typography,
  Layout,
  Card,
  Radio,
  Spin,
  Result,
  Modal,
} from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  resetProductList,
  selectProducts,
  selectPendingProducts,
  selectEndOfCatalog,
} from "./reducer";
import { formatCurrency, formatRelativeTime } from "./util";

const { Content } = Layout;

const { Title, Text } = Typography;
const App = () => {
  const [modal, modalContext] = Modal.useModal();
  const dispatch = useDispatch();
  const [sortValue, setSortValue] = useState("title");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(2);
  const productsGet = useSelector(selectProducts);
  const loading = useSelector(selectPendingProducts);
  const endOfCatalog = useSelector(selectEndOfCatalog);

  const prevAd = useRef(0);

  // Reset the page when sort value has changed and initialize first page
  useEffect(() => {
    const fetchData = async () => {
      dispatch(resetProductList());
      setProducts([]);
      const response = await dispatch(
        getProducts({ sort: sortValue, page: 1 })
      );
      setProducts(response.payload);
      dispatch(getProducts({ sort: sortValue, page: 2 }));
      setPage(2);
    };

    fetchData();
  }, [dispatch, sortValue]);

  const fetchNextSetOfProducts = async () => {
    const nextPage = page + 1;
    await dispatch(getProducts({ sort: sortValue, page: nextPage }));
    setPage(nextPage);
  };

  const handleScroll = () => {
    const documentScrollHeight = document.body.scrollHeight - 5;
    const windowOffset = window.innerHeight + window.pageYOffset;

    // check if I reached bottom of the page, if so, add the next products to display then set to next page to make another call
    if (windowOffset >= documentScrollHeight && !loading && !endOfCatalog) {
      setProducts(products.concat(productsGet));
      if ((page - 1) % 2 === 0) {
        showAd();
      }
      fetchNextSetOfProducts();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const showAd = () => {
    let secondsToGo = 10;

    let adToPresent = Math.floor(Math.random() * 1000);

    // Locate an ad that isn't the same with the previous shown ad
    while (adToPresent === prevAd.current) {
      adToPresent = Math.floor(Math.random() * 1000);
    }
    prevAd.current = adToPresent;

    const ad = (
      <img
        className="ad"
        src={`http://localhost:8000/ads/?r=${adToPresent}`}
        alt="ad"
      />
    );

    const instance = modal.info({
      title: "But first, a word from our sponsor",
      content: (
        <div>
          {ad} This ad will close after {secondsToGo} second
        </div>
      ),
      okText: "close",
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: (
          <div>
            {ad} This ad will close after {secondsToGo} second
          </div>
        ),
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
  };

  return (
    <div className="App">
      <Layout className="layout" style={{ alignItems: "center" }}>
        <Title>Old St eCommerce</Title>
        <Content style={{ width: "1200px", marginBottom: "50px" }}>
          <div style={{ textAlign: "right" }}>
            <Text strong>Sort By: </Text>
            <Radio.Group
              value={sortValue}
              disabled={loading}
              onChange={(event) => {
                setSortValue(event.target.value);
              }}
            >
              <Radio.Button value="title">Title</Radio.Button>
              <Radio.Button value="price">Price</Radio.Button>
              <Radio.Button value="rating">Rating</Radio.Button>
            </Radio.Group>
          </div>
          <Divider />
          <Row gutter={[16, 24]}>
            {products.map((item) => (
              <Col span={8} key={item.id + item.title}>
                <Card
                  title={item.title}
                  style={{ width: "100%", height: "100%" }}
                  extra={formatRelativeTime(item.date)}
                  cover={
                    <img alt="thumbnail" src={item.thumbnail} height={300} />
                  }
                >
                  <Text strong>{formatCurrency(item.price)}</Text>
                  <div>
                    <span>
                      {` Rating: `}
                      <Rate disabled defaultValue={item.rating} allowHalf />
                      {` (${item.rating}) `}
                    </span>
                  </div>

                  <p>{item.description}</p>
                </Card>
              </Col>
            ))}
            <div style={{ textAlign: "center", width: "100%" }}>
              {loading || products.length === 0 ? (
                <Spin
                  tip="Loading"
                  size="large"
                  style={{ alignItems: "center" }}
                />
              ) : (
                ""
              )}
              {endOfCatalog && !loading && (
                <React.Fragment>
                  <Divider />
                  <Result
                    icon={<SmileOutlined />}
                    title="~ end of catalogue ~"
                  />
                </React.Fragment>
              )}
            </div>
          </Row>
        </Content>
      </Layout>
      {modalContext}
    </div>
  );
};

export default App;
