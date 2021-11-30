import React, { Fragment, useState } from "react";
import { List, Row, Col, Card } from 'antd'

let logData = [
  1, 2, 3, 4, 4, 5, 6, 9, 77, 1, 2, 3, 4, 4, 5, 6, 9, 77,
]

function Log(props) {

  return (
    <Fragment >

      {/* <p>{props.infomation}</p> */}

      {/* <Row >
        <Col span={4}></Col>
        <Col span={16} style={{ border: '1px solid ', overflow: 'auto', padding: 10, height: 510 }}>
          <List
            size='small'
            dataSource={logData}
            renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
          />
        </Col>
        <Col span={4}></Col>
      </Row> */}

      <Card
        size='small'
        style={{ height: 500, overflow: 'auto' }}
        title='日志信息'>
        <List
          size='small'
          split={false}
          dataSource={logData}
          renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
        />
      </Card>



    </Fragment >
  )
};

export default Log;