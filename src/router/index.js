import React, { useState, useRef } from "react";
import { HashRouter as Router, Switch, Route, Redirect, Link, NavLink } from "react-router-dom"
import { Menu, Modal, Row, Col, Button, Card, Avatar } from "antd";
import history from "./config";
import { StarOutlined, StarFilled, HeartOutlined, LogoutOutlined, ExclamationCircleOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import Jiujia from "../components/JiuJia/Jiujia";
import TbCharts from "../pages/Home/TbCharts";
import Login from "../pages/Login/Login";
import Music from "../pages/Music/Music";
import Setting from "../components/Setting/Setting";
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
    path: '/home/index',
    component: TbCharts,
    name: 'homeIndex',
    children: []
  },
  {
    path: '/home/implementation',
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
    path: '/home/implementation-child',
    component: Implementation,
    name: "implementation-child",
    children: []
  },
  {
    path: '/home/LOL',
    component: UploadCom,
    name: "LOL",
    children: []
  },
  {
    path: '/home/music',
    component: Music,
    name: "music",
    children: []
  },
  {
    path: '/home/quit',
    component: Music,
    name: "quit",
    children: []
  },
  {
    path: '/home/setting',
    component: Setting,
    name: "setting",
    children: []
  },
];

export const menu = [
  {
    path: '/home/index',
    icon: <HeartOutlined />,
    name: '主页'
  },
  {
    icon: <StarOutlined />,
    name: '实现方式',
    children: [
      {
        path: '/home/implementation',
        icon: <StarFilled />,
        name: '实现方式-child',
        children: [],
      }
    ],
  },
  {
    path: '/home/LOL',
    icon: <HeartOutlined />,
    name: '英雄联盟'
  },
  {
    path: '/home/music',
    icon: <HeartOutlined />,
    name: '音乐'
  },
  {
    path: '/home/setting',
    icon: <SettingOutlined />,
    name: '设置'
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
      <Redirect from='/home' to="/home/index" />
    </Switch>
  )
}



//导航
export function HeaderMenu() {
  return (
    <Menu
      defaultSelectedKeys={['主页']}
      defaultOpenKeys={['sub1']}
      mode="inline"
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
    </Menu>

  )
}