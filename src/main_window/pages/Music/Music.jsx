import React, { useState, useRef } from "react";
import { Menu, Modal, Row, Col, Button, Card, Avatar } from "antd";
import { StarOutlined, StarFilled, HeartOutlined, LogoutOutlined, ExclamationCircleOutlined, UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import MyAudio from "../../components/audio";
import './music.scss'


function Music() {
  const musicArr = [
    {
      img: "aa",
      title: 'aa',
      description: 'aaaa',

      cover: <img alt="example" src="https://y.qq.com/music/photo_new/T002R300x300M000003cKIKZ1J4Yyu_1.jpg?max_age=2592000" />,
      // avatar:  <img alt="example" src="https://y.qq.com/music/photo_new/T002R300x300M000003cKIKZ1J4Yyu_1.jpg?max_age=2592000" />,
      avatar: <Avatar src="https://y.qq.com/music/photo_new/T002R300x300M000003cKIKZ1J4Yyu_1.jpg?max_age=2592000" />,
      audioSrc: "http://dl.stream.qqmusic.qq.com/C400001XzzJQ0DcCst.m4a?guid=6817178060&vkey=BB70EE7EB6CB14329D55B117253CEDEC0587C24A4C39E21EC015DFA8EB81628727EE70E3AF0D106C8E2DCAB66F9AF584045D9C39906B1671&uin=&fromtag=66"
    },
    {
      img: "bb",
      title: 'bb',
      description: 'bbb',
      cover: <img alt="example" src="https://y.qq.com/music/photo_new/T002R300x300M000003cKIKZ1J4Yyu_1.jpg?max_age=2592000" />,
      avatar: <Avatar src="https://y.qq.com/music/photo_new/T002R300x300M000003cKIKZ1J4Yyu_1.jpg?max_age=2592000" />
    },
    {
      img: "cc",
      title: 'cc',
      description: 'ccc',
      cover: <img alt="example" src="https://y.qq.com/music/photo_new/T002R300x300M000003cKIKZ1J4Yyu_1.jpg?max_age=2592000" />,
      avatar: <Avatar src="https://y.qq.com/music/photo_new/T002R300x300M000003cKIKZ1J4Yyu_1.jpg?max_age=2592000" />
    },
    {
      img: "dd",
      title: 'dd',
      description: 'ddd',
      cover: <img alt="example" src="https://y.qq.com/music/photo_new/T002R300x300M000003cKIKZ1J4Yyu_1.jpg?max_age=2592000" />,
      avatar: <Avatar src="https://y.qq.com/music/photo_new/T002R300x300M000003cKIKZ1J4Yyu_1.jpg?max_age=2592000" />
    },
    {
      img: "ee",
      title: 'ee',
      description: 'eee',
      cover: <img alt="example" src="https://y.qq.com/music/photo_new/T002R300x300M000003cKIKZ1J4Yyu_1.jpg?max_age=2592000" />,
      avatar: <Avatar src="https://y.qq.com/music/photo_new/T002R300x300M000003cKIKZ1J4Yyu_1.jpg?max_age=2592000" />
    },
  ]

  const [col, setCol] = useState(24 / 4);//4列

  const CardMetaStyle = {
    textAlign: 'center'
  }


  return (
    <div className="music">
      <Row style={{ height: "5%", margin: '0 0 10px' }}>
        <Col span={24} style={{ textAlign: 'right', }}>
          <Button onClick={() => setCol(6)} icon={<AppstoreOutlined />}></Button>&nbsp;
          <Button onClick={() => setCol(24)} icon={<UnorderedListOutlined />}></Button>
        </Col>
      </Row>
      <Row gutter={[15, col === 6 ? 25 : 8]} style={{ height: 'calc(85% - 10px)', maxHeight: "90%", overflowY: 'auto', }}>
        {
          musicArr.map(item => {
            return (
              <Col key={item.title} span={col}>
                <Card
                  hoverable
                  // style={{ width: 240 }}
                  cover={col === 6 ? item.cover : null}
                  size='small'
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
        <Col span={24} style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
          <audio style={{ width: '100%' }} controls src="http://dl.stream.qqmusic.qq.com/C400001XzzJQ0DcCst.m4a?guid=6817178060&vkey=BB70EE7EB6CB14329D55B117253CEDEC0587C24A4C39E21EC015DFA8EB81628727EE70E3AF0D106C8E2DCAB66F9AF584045D9C39906B1671&uin=&fromtag=66"></audio>
          {/* <audio style={{ width: '100%' }} controls src="http://jqueryplugins.qiniudn.com/jq22m1.mp3"></audio> */}
        </Col>
      </Row>
      <Row style={{ height: "10%" }}>
        <Col span={24} style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
          <MyAudio />
          {/* <div dangerouslySetInnerHTML={{ __html: ArObj }}></div> */}
        </Col>
      </Row>
    </div>
  )
}

export default Music;