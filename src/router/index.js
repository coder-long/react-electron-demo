import React, { useState, useRef } from "react";
import { HashRouter as Router, Switch, Route, Redirect, Link, NavLink } from "react-router-dom"
import { Menu, Modal, Row, Col, Button, Card, Avatar } from "antd";
import { StarOutlined, StarFilled, HeartOutlined, LogoutOutlined, ExclamationCircleOutlined, UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import Jiujia from "../components/JiuJia/Jiujia";
import TbCharts from "../components/Home/TbCharts";
import Login from "../pages/Login/Login";
import Music from "../pages/Music/Music";
import { UploadCom } from "../components/funCom";


function Implementation() {
  return <span>implementation</span>
}


const route = [
  // {
  //     component: Home,
  //     routes: [
  //         {
  //             path: '/',
  //             component: kjsjahjd,
  //             exact: true,
  //         },
  //         {
  //             path: "/child/:id",
  //             component: Child,
  //             routes: [
  //                 {
  //                     path: "/child/:id/grand-child",
  //                     component: GrandChild
  //                 }
  //             ]
  //         }
  //     ]
  // },
  {
    path: '/home',
    component: TbCharts,
    name: 'home',
    children: []
  },
  {
    path: '/implementation',
    component: Jiujia,
    name: Implementation,
    children: [
      {
        path: '/a1',
        component: '',
        name: "a1",
        children: []
      },
    ]
  },
  {
    path: '/implementation-child',
    component: Implementation,
    name: "implementation-child",
    children: []
  },
  {
    path: '/LOL',
    component: UploadCom,
    name: "LOL",
    children: []
  },
  {
    path: '/music',
    component: Music,
    name: "music",
    children: []
  },
  {
    path: '/login-module',
    component: Login,
    name: "login-module",
    children: []
  },
  {
    path: '/quit',
    component: Music,
    name: "quit",
    children: []
  },
];

export const menu = [
  {
    path: '/home',
    icon: <HeartOutlined />,
    name: '主页'
  },
  {
    icon: <StarOutlined />,
    name: '实现方式',
    children: [
      {
        path: '/implementation',
        icon: <StarFilled />,
        name: '实现方式-child',
        children: [],
      }
    ],
  },
  {
    path: '/LOL',
    icon: <HeartOutlined />,
    name: '英雄联盟'
  },
  {
    path: '/music',
    icon: <HeartOutlined />,
    name: '音乐'
  },
  {
    path: '/login-module',
    icon: <HeartOutlined />,
    name: '登录模块'
  },
]


//路由
export function MyRouter() {
  return (
    <Switch>
      {
        route.map(item => {
          return <Route key={item.path} exact={item.exact} path={item.path} component={item.component} />
        })
      }
      {/* <Route path='/404' component={Notfound} /> */}
      <Redirect from='/' to="home" />
    </Switch>
  )
}



//导航
export function HeaderMenu() {

  const [visible, setVisible] = useState(false);

  function logOutApp() {

  }

  function onClick(e) {
    if (e.key === '退出应用') {
      showConfirm()
    }
  }

  function showConfirm() {
    Modal.confirm({
      title: '是否退出应用?',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      onOk() {
        console.log('OK');
        $electron.ipcRenderer.send('quit', { msg: 'App Quit.' })
      },
      onCancel() {
        console.log('Cancel');
        setVisible(false)
      },
    });
  }

  return (
    <Menu
      defaultSelectedKeys={['主页']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      onClick={onClick}
      theme="light">
      {
        menu.map(item => {
          return item.children && item.children.length ?
            <Menu.SubMenu key={item.name} icon={item.icon} title={item.name}>
              {
                item.children.map(subItem => {
                  return <Menu.Item key={subItem.name} icon={subItem.icon}>
                    <NavLink to={subItem.path}>{subItem.name}</NavLink>
                  </Menu.Item>
                })
              }
            </Menu.SubMenu>
            :
            <Menu.Item key={item.name} icon={item.icon}>
              <NavLink to={item.path}>{item.name}</NavLink>
            </Menu.Item>
        })
      }
      <Menu.Item key="退出应用" icon={<LogoutOutlined />}>
        <span>退出应用</span>
      </Menu.Item>
    </Menu>

  )
}