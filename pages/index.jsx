import { Button, Col, Layout, message, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";

const timeout = 10;
const initialError = "";

/** @type {import("next").NextPage} */
export default function Home() {
  const [error, setError] = useState(initialError);
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (content !== null) {
      message.info(String(content), timeout);
    }
  }, [content]);

  const getValueByUid = async (uid) => {
    try {
      const response = await fetch(`/api/calculate/${encodeURIComponent(uid)}`);

      if (response.status === 202) {
        return setTimeout(() => getValueByUid(uid), timeout);
      }

      const { value } = await response.json();
      setContent(value);
    } catch {
      setError("Could not calculate");
    }
  };

  const handleClick = async () => {
    try {
      setError(initialError);
      const response = await fetch("/api/subscribe");
      const { uid } = await response.json();
      getValueByUid(uid);
    } catch {
      setError("Could not subscribe");
    }
  };

  return (
    <Layout>
      <Layout.Content>
        <Row justify="center">
          <Col>
            <Space direction="vertical" align="center">
              <Button onClick={handleClick}>Subscribe</Button>
              {!!error && <Typography>{error}</Typography>}
            </Space>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}
