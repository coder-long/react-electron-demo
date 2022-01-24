import React, { useState, useRef } from "react";
import { Menu, Modal, Row, Col, Button, Card, Avatar } from "antd";
import { StarOutlined, StarFilled, HeartOutlined, LogoutOutlined, ExclamationCircleOutlined, UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';

function Music() {
  const musicArr = [
    {
      img: "aa",
      title: 'aa',
      description: 'aaaa',
      cover: <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />,
      // avatar:  <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />,
      avatar: <Avatar src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
    },
    {
      img: "bb",
      title: 'bb',
      description: 'bbb',
      cover: <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />,
      avatar: <Avatar src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
    },
    {
      img: "cc",
      title: 'cc',
      description: 'ccc',
      cover: <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />,
      avatar: <Avatar src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
    },
    {
      img: "dd",
      title: 'dd',
      description: 'ddd',
      cover: <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />,
      avatar: <Avatar src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
    },
    {
      img: "ee",
      title: 'ee',
      description: 'eee',
      cover: <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />,
      avatar: <Avatar src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
    },
  ]

  const [col, setCol] = useState(24 / 4);//4列


  return (
    <>
      <Row>
        <Col span={24} style={{ textAlign: 'right', }}>
          <Button onClick={() => setCol(6)} icon={<AppstoreOutlined />}></Button>&nbsp;
          <Button onClick={() => setCol(24)} icon={<UnorderedListOutlined />}></Button>
        </Col>
      </Row>
      <Row gutter={[15, col === 6 ? 25 : 8]} style={{ maxHeight: "95%", overflowY: 'auto', padding: '10px 0' }}>

        {
          musicArr.map(item => {
            return (
              <Col key={item.title} span={col}>
                <Card
                  hoverable
                  // style={{ width: 240 }}
                  cover={col === 6 ? item.cover : null}
                >
                  <Card.Meta
                    avatar={col === 6 ? null : item.avatar}
                    style={{ textAlign: col === 6 ? 'center' : 'left' }}
                    title="Europe Street beat"
                    description="www.instagram.com" />
                </Card>
              </Col>
            )
          })
        }
      </Row>
    </>
  )
}

export default Music;