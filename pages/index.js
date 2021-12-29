import { Button, Col, Layout, message, Row, Typography } from 'antd';
import React from 'react';

const timeout = 10;

/** @type {import("next").NextPage} */
export default function Home() {
  const [error, setError] = React.useState("");
  const [content, setContent] = React.useState(null);

  React.useEffect(() => {
    if (content !== null) {
      message.info(content, timeout);
    }
  }, [content]);

  const getValueByUid = async (uid) => {
    try {
      const body = JSON.stringify({ uid });
      const response = await fetch("/api/calculate", { method: "POST", body });

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
        <Row justify='center'>
          <Col>
            <Button onClick={handleClick}>Subscribe</Button>
            {!!error && <Typography>{error}</Typography>}
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}
